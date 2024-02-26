import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, distinct, map } from 'rxjs';
import { Symbol } from '../models/symbol.model';

@Injectable({
  providedIn: 'root',
})
export class TabService {
  tabs: BehaviorSubject<Symbol[]> = new BehaviorSubject<Symbol[]>([]);
  constructor(private http: HttpClient) {}
  getTabs() {
    this.tabs.next(JSON.parse(localStorage.getItem('tabs') || '[]'));
  }

  addTab(chosenSymbol: Symbol) {
    this.tabs.next([...this.tabs.getValue(), chosenSymbol]);
    localStorage.setItem('tabs', JSON.stringify(this.tabs.getValue()));
  }

  removeTab(index: number) {
    const tabs = this.tabs.getValue();
    tabs.splice(index, 1);
    this.tabs.next(tabs);
    localStorage.setItem('tabs', JSON.stringify(tabs));
  }

  getSymobols(): Observable<Symbol[]> {
    const options = {
      headers: {
        'X-CoinAPI-Key': 'F5344750-F538-435A-B927-340D1EDE10DD',
      },
    };

    return this.http
      .get<Symbol[]>(
        `https://rest.coinapi.io/v1/symbols?filter_symbol_id=BITSTAMP_SPOT_&filter_asset_id=USD`,
        options
      )
      .pipe(
        map((response: Symbol[]) => {
          // remove unnecessary data
          const data: Symbol[] = response.map((item: Symbol) => {
            const { asset_id_base, symbol_id, symbol_id_exchange } = item;
            return { asset_id_base, symbol_id, symbol_id_exchange };
          });
          return data;
        })
      );
    return this.http.get<any>(`https://rest.coinapi.io/v1/assets`, options);
  }
}
