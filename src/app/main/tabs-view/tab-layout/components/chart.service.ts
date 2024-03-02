import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { chartData2 } from './chart.data';
import {
  CryptoSymbol,
  SymbolHistoryData,
} from '../../../../models/symbol.model';
import { Observable, map, of } from 'rxjs';
import { ChartData } from '../../../../models/chart.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ChartService {
  constructor(private http: HttpClient) {}

  /**
   * Get symbol history data for chart from API
   * @param symbol
   * @returns Observable with chart data
   */
  getData(symbol: CryptoSymbol): Observable<ChartData[]> {
    const options = environment.options;

    // 7days history data with 1HRS period
    const period = '1HRS';
    const limit = '168';

    // return  of(chartData2)
    // get history data of the choosen symbol from API based on period and limit
        return this.http
          .get<SymbolHistoryData[]>(
            `${environment.baseUrl}ohlcv/${symbol.symbol_id}/history?period_id=${period}&limit=${limit}`,
            options
          )
        .pipe(
          map((response: SymbolHistoryData[]) => {
            // construct data for chart from response
            const data: ChartData[] = [
              {
                name: symbol.symbol_id,
                series: response
                  .map((item: SymbolHistoryData) => {
                    const { time_close, price_close } = item;

                    // make date format mm:dd:hh:mm
                    const date = new Date(time_close);
                    const month = String(date.getMonth() + 1).padStart(2, '0');
                    const day = String(date.getDate()).padStart(2, '0');
                    const hours = String(date.getUTCHours()).padStart(2, '0');
                    const minutes = String(date.getUTCMinutes()).padStart(
                      2,
                      '0'
                    );
                    const mmddhhmmFormat = `${month}.${day} ${hours}:${minutes}`;

                    return { name: mmddhhmmFormat, value: price_close };
                  })
                  .reverse(),
              },
            ];
            return data;
          })
        )
  }
}
