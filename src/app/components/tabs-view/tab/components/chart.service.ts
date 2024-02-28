import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { chartData2 } from './chart.data';
import { Symbol, SymbolHistoryData } from '../../../../models/symbol.model';
import { Observable, map, of } from 'rxjs';
import { ChartData } from '../../../../models/chart.model';

@Injectable({
  providedIn: 'root',
})
export class ChartService {
  constructor() {}

  /**
   * Get symbol history data for chart from API
   * @param symbol
   * @returns Observable
   */
  getData(symbol: Symbol): Observable<ChartData[]> {
    const options = environment.options;

    return of(chartData2).pipe(
      map((response: SymbolHistoryData[]) => {
        // create chart data from symbol history data
        const data: ChartData[] = [
          {
            name: symbol.symbol_id,
            series: response
              .map((item: SymbolHistoryData) => {
                const { time_close, price_close } = item;

                // make date format mm:dd:hh:mm
                const date = new Date(time_close);
                const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
                const day = String(date.getDate()).padStart(2, '0');
                const hours = String(date.getUTCHours()).padStart(2, '0');
                const minutes = String(date.getUTCMinutes()).padStart(2, '0');
                const mmddhhmmFormat = `${month}.${day} ${hours}:${minutes}`;

                return { name: mmddhhmmFormat, value: price_close };
              })
              .reverse(),
          },
        ];
        // console.log(data);
        return data;
      })
    );
  }
}
