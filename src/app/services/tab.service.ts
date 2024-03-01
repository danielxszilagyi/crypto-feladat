import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subscription, map, of } from 'rxjs';

import { AssetIcon, CryptoSymbol } from '../models/symbol.model';
import { User } from '../models/user.model';

import { IndexedDbService } from './indexedDB.service';
import { environment } from '../../environments/environment';

import { dummyIcons } from './icons.dummy';
import { dummySymbols } from './symbols.dummy';

@Injectable({
  providedIn: 'root',
})
export class TabService implements OnDestroy {
  loggedInUserSub!: Subscription;
  loggedInUser$!: Observable<User>;
  tabs$: BehaviorSubject<CryptoSymbol[]> = new BehaviorSubject<CryptoSymbol[]>(
    []
  );

  constructor(private http: HttpClient, private db: IndexedDbService) {}

  /**
   * Get user's tabs from the database and update the tabs array
   * @param username
   */
  refreshTabs(username: string): void {
    this.db.getUserByUsername(username).then((user) => {
      if (user) {
        this.tabs$.next(user.tabs);
      }
    });
  }

  /**
   * Add tab to the tabs array and update the database
   * @param username
   * @param chosenSymbol
   */
  addTab(username: string, chosenSymbol: CryptoSymbol): void {
    if (!username) return;
    this.updateTabs(username, [...this.tabs$.getValue(), chosenSymbol]);
    this.refreshTabs(username);
  }

  /**
   * Remove tab from the tabs array and update the database
   * @param username
   * @param index
   */
  removeTab(username: string, index: number): void {
    if (!username) return;
    const tabs = this.tabs$.getValue();
    tabs.splice(index, 1);
    this.tabs$.next(tabs);
    this.updateTabs(username, tabs);
    this.refreshTabs(username);
  }

  /**
   * Save tabs to the database
   * @param username
   * @param newTabs
   */
  private updateTabs(username: string, newTabs: CryptoSymbol[]): void {
    if (!username) return;
    this.db.saveTabs(username, newTabs);
  }

  /**
   * Get icons from the dummy icon API and find the icon by asset_id.
   * If the icon is not found, return a default icon.
   * @param assetIdToFind
   * @returns Icon data
   */
  provideIcons(assetIdToFind: string): AssetIcon {
    const findResult = dummyIcons.find(
      (icon) => icon.asset_id === assetIdToFind
    );
    if (findResult === undefined) {
      return {
        asset_id: '',
        url: 'https://cdn-icons-png.flaticon.com/512/5172/5172584.png',
      };
    } else {
      return findResult;
    }
  }

  /**
   * Get symbols from the API and remove unnecessary data
   * @returns Observable
   */
  getSymbols(): Observable<CryptoSymbol[]> {
    // !REMOVE THIS
    return of(dummySymbols) as Observable<CryptoSymbol[]>;

    const options = environment.options;
    return this.http
      .get<CryptoSymbol[]>(
        `https://rest.coinapi.io/v1/symbols?filter_symbol_id=BITSTAMP_SPOT_&filter_asset_id=USD`,
        options
      )
      .pipe(
        map((response: CryptoSymbol[]) => {
          // remove unnecessary data
          const data: CryptoSymbol[] = response.map((item: CryptoSymbol) => {
            const { asset_id_base, symbol_id, symbol_id_exchange } = item;
            return { asset_id_base, symbol_id, symbol_id_exchange };
          });
          return data;
        })
      );
  }

  ngOnDestroy(): void {
    this.loggedInUserSub.unsubscribe();
  }
}
