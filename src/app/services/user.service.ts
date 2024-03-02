import { Injectable } from '@angular/core';
import { IndexedDbService } from './indexedDB.service';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';
import { CryptoSymbol } from '../models/symbol.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  loggedInUserObj: BehaviorSubject<User | null> =
    new BehaviorSubject<User | null>(null);
  constructor(private db: IndexedDbService) {}

  /**
   * Handles user login. If user is not found, adds user to the database.
   * If user is found, verifies password.
   * @param username
   * @param password
   */
  async checkUserInDb(username: string, password: string): Promise<boolean> {
    const loginResult = await this.db
      .getUserByUsername(username)
      .then((userInDB) => {
        if (!userInDB) {
          this.addUser(username, password);
          return this.login(username, password);
        } else {
          return this.login(username, password);
        }
      });
    return loginResult;
  }

  /**
   * Verifies user's password and logs in the user.
   * If user is not found, adds user to the database.
   * @param username
   * @param password
   * @returns Promise
   */
  login(username: string, password: string): Promise<boolean> {
    const result = this.db
      .verifyPassword(username, password)
      .then(async (result: boolean) => {
        if (result === true) {
          const user = this.db.getUserByUsername(username);
          this.loggedInUserObj.next(await user);
          console.log(`User logged in as "${username}"`);
          return true;
        } else {
          console.log('Wrong Password');
          return false;
        }
      });
    return result;
  }

  /**
   * Adds user to the database.
   * @param username
   * @param password
   */
  addUser(username: string, password: string): void {
    if (!username && !password) return;
    this.db.addUser(username, password);
  }

  /**
   * Saves the tabs to the database
   * @param tabs
   */
  saveTabs(tabs?: CryptoSymbol[]): void {
    const username = this.loggedInUserObj.getValue()?.username;
    if (!username) return;
    this.db.saveTabs(username, tabs);
  }

  /**
   * Adds a symbol to the user's favorites in db
   * @param symbol
   */
  addFavorite(symbol: CryptoSymbol): void {
    console.log(`user serv`);
    const username = this.loggedInUserObj.getValue()?.username;
    if (!username) return;
    this.db.addFavorite(username, symbol);
  }

  /**
   * Removes a symbol from the user's favorites in db
   * @param index
   */
  removeFavorite(index: number): void {
    const username = this.loggedInUserObj.getValue()?.username;
    if (!username) return;
    // this.db.removeFavorite(username, symbol);
  }

  get loggedInUser$() {
    return this.loggedInUserObj.asObservable();
  }
}
