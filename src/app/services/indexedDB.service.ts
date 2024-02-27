// indexeddb.service.ts
import { Injectable } from '@angular/core';

import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class IndexedDbService {
  private db!: IDBDatabase;

  constructor() {
    this.openDatabase();
  }

  /**
   * Open IndexedDB
   */
  private openDatabase() {
    const request = indexedDB.open('crypto_feladat', 1);

    request.onupgradeneeded = (event: any) => {
      const db = event.target.result;

      const objectStore = db.createObjectStore(
        'users',
        {
          keyPath: 'username',
        },
        { unique: true }
      );
    };

    request.onsuccess = (event: any) => {
      this.db = event.target.result;
    };

    request.onerror = (event: any) => {
      console.error('Error opening IndexedDB', event.target.error);
    };
  }

  /**
   * Add user to DB
   * @param username
   * @param password
   * @returns Promise
   */
  async addUser(username: string, password: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(['users'], 'readwrite');
      const objectStore = transaction.objectStore('users');

      const request = objectStore.put({
        username,
        password: password,
        tabs: [],
        favourites: [],
      });

      request.onsuccess = () => {
        resolve();
      };

      request.onerror = (error: any) => {
        reject(error.target.error);
      };
    });
  }

  /**
   * verify password based on username and password
   * @param username
   * @param password
   * @returns boolean based on password match
   */
  async verifyPassword(username: string, password: string): Promise<boolean> {
    const user = await this.getUserByUsername(username);

    if (user) {
      return user.password === password;
    }

    return false;
  }

  /**
   * Get user by username from DB
   * @param username
   * @returns User object
   */
  getUserByUsername(username: string): Promise<User> {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(['users'], 'readonly');
      const objectStore = transaction.objectStore('users');
      const request = objectStore.get(username);

      request.onsuccess = () => {
        resolve(request.result);
      };

      request.onerror = (error: any) => {
        reject(error.target.error);
      };
    });
  }

  /**
   * Save tabs to user in DB
   * @param username
   * @param tabs
   */
  saveTabs(username: string, tabs: Symbol[] | any): void {
    const transaction = this.db.transaction(['users'], 'readwrite');
    const objectStore = transaction.objectStore('users');
    const request = objectStore.get(username);

    request.onsuccess = () => {
      const user = request.result;
      user.tabs = tabs;
      objectStore.put(user);
    };
  }
}
