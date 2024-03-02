import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

import { CryptoSymbol } from '../models/symbol.model';
import { User } from '../models/user.model';

import { IndexedDbService } from './indexedDB.service';

@Injectable({
  providedIn: 'root',
})
export class FavouritesService implements OnDestroy {
  loggedInUserSub!: Subscription;
  loggedInUser$!: Observable<User>;
  favourites$: BehaviorSubject<any> = new BehaviorSubject<any>([]);

  constructor(private db: IndexedDbService) {}

  /**
   * Refresh the favourites list
   * @param username
   */
  refreshFavs(username: string) {
    this.db.getUserByUsername(username).then((user) => {
      if (user) {
        this.favourites$.next(user.favourites);
      }
    });
  }

  /**
   * Add a new favourite to the list and refresh
   * @param username
   * @param newFav
   */
  addFav(username: string, newFav: CryptoSymbol) {
    if (!username) return;
    this.updateFavs(username, [...this.favourites$.getValue(), newFav]);
    this.refreshFavs(username);
  }

  /**
   * Remove a favourite from the list and refresh
   * @param username
   * @param index
   */
  removeFav(username: string, index: number) {
    if (!username) return;
    const favs = this.favourites$.getValue();
    favs.splice(index, 1);
    this.favourites$.next(favs);
    this.updateFavs(username, favs);
    this.refreshFavs(username);
  }

  /**
   * Update the favourites list in the database
   * @param username
   * @param newFavs
   */
  private updateFavs(username: string, newFavs: CryptoSymbol[]) {
    if (!username) return;
    this.db.saveFavorite(username, newFavs);
  }

  ngOnDestroy(): void {
    this.loggedInUserSub.unsubscribe();
  }
}
