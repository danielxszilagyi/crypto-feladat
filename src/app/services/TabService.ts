import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subscription, of } from 'rxjs';
import { Symbol } from '../models/symbol.model';
import { User } from '../models/user.model';
import { UserService } from './user.service';
import { IndexedDbService } from './indexedDB.service';

@Injectable({
  providedIn: 'root',
})
export class TabService implements OnDestroy {
  loggedInUserSub!: Subscription;
  loggedInUser$!: Observable<User>;
  tabs: BehaviorSubject<Symbol[]> = new BehaviorSubject<Symbol[]>([]);

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private db: IndexedDbService
  ) {
    // this.loggedInUserSub = this.userService.loggedInUser$.subscribe({
    //   next: (user) => {
    //     if (user) {
    //       console.log(`if`);
    //       this.getTabs(user.tabs);
    //     }
    //   },
    // });
  }

  getTabs(tabs: Symbol[]) {
    // this.tabs.next(tabs);
    // this.tabs.next(JSON.parse(localStorage.getItem('tabs') || '[]'));
  }

  addTab(username: string, chosenSymbol: Symbol) {
    if (!username) return;
    this.tabs.next([...this.tabs.getValue(), chosenSymbol]);
    // localStorage.setItem('tabs', JSON.stringify(this.tabs.getValue()));
    this.updateTabs(username, [...this.tabs.getValue(), chosenSymbol]);
  }

  removeTab(username: string, index: number) {
    if (!username) return;
    const currentTabs = this.tabs.getValue();
    const newTabs = currentTabs.splice(index, 1);
    this.tabs.next(newTabs);
    this.updateTabs(username, newTabs);
    // localStorage.setItem('tabs', JSON.stringify(tabs));
  }

  private updateTabs(username: string, newTabs: Symbol[]) {
    // this.tabs.next(newTabs);
    if (!username) return;
    this.db.saveTabs(username, newTabs);
    // localStorage.setItem('tabs', JSON.stringify(tabs));
  }

  /**
   * Get symbols from the API and remove unnecessary data
   * @returns Observable
   */
  getSymobols(): Observable<Symbol[]> {
    const options = {
      headers: {
        'X-CoinAPI-Key': 'F5344750-F538-435A-B927-340D1EDE10DD',
      },
    };

    // return this.http
    //   .get<Symbol[]>(
    //     `https://rest.coinapi.io/v1/symbols?filter_symbol_id=BITSTAMP_SPOT_&filter_asset_id=USD`,
    //     options
    //   )
    //   .pipe(
    //     map((response: Symbol[]) => {
    //       // remove unnecessary data
    //       const data: Symbol[] = response.map((item: Symbol) => {
    //         const { asset_id_base, symbol_id, symbol_id_exchange } = item;
    //         return { asset_id_base, symbol_id, symbol_id_exchange };
    //       });
    //       return data;
    //     })
    //   );
    return of();
    // return this.http.get<any>(`https://rest.coinapi.io/v1/assets`, options);
  }

  ngOnDestroy(): void {
    this.loggedInUserSub.unsubscribe();
  }
}
