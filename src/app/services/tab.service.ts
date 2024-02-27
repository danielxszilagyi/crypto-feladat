import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subscription, map, of } from 'rxjs';

import { Symbol } from '../models/symbol.model';
import { User } from '../models/user.model';

import { IndexedDbService } from './indexedDB.service';

@Injectable({
  providedIn: 'root',
})
export class TabService implements OnDestroy {
  loggedInUserSub!: Subscription;
  loggedInUser$!: Observable<User>;
  tabs$: BehaviorSubject<Symbol[]> = new BehaviorSubject<Symbol[]>([]);

  constructor(private http: HttpClient, private db: IndexedDbService) {}

  refreshTabs(username: string) {
    this.db.getUserByUsername(username).then((user) => {
      if (user) {
        this.tabs$.next(user.tabs);
      }
    });
  }

  addTab(username: string, chosenSymbol: Symbol) {
    if (!username) return;
    this.updateTabs(username, [...this.tabs$.getValue(), chosenSymbol]);
    this.refreshTabs(username);
  }

  removeTab(username: string, index: number) {
    if (!username) return;
    const tabs = this.tabs$.getValue();
    tabs.splice(index, 1);
    this.tabs$.next(tabs);
    this.updateTabs(username, tabs);
    this.refreshTabs(username);
  }

  private updateTabs(username: string, newTabs: Symbol[]) {
    if (!username) return;
    this.db.saveTabs(username, newTabs);
  }

  /**
   * Get symbols from the API and remove unnecessary data
   * @returns Observable
   */
  getSymbols(): Observable<Symbol[]> {
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
    // console.log(jsonData);

    // !REMOVE THIS
    const jsonData: Symbol[] = [
      {
        asset_id_base: 'BTC',
        symbol_id: 'BITSTAMP_SPOT_BTC_USD',
        symbol_id_exchange: 'BTCUSD',
      },
      {
        asset_id_base: 'EUR',
        symbol_id: 'BITSTAMP_SPOT_EUR_USD',
        symbol_id_exchange: 'EURUSD',
      },
      {
        asset_id_base: 'XRP',
        symbol_id: 'BITSTAMP_SPOT_XRP_USD',
        symbol_id_exchange: 'XRPUSD',
      },
      {
        asset_id_base: 'LTC',
        symbol_id: 'BITSTAMP_SPOT_LTC_USD',
        symbol_id_exchange: 'LTCUSD',
      },
      {
        asset_id_base: 'ETH',
        symbol_id: 'BITSTAMP_SPOT_ETH_USD',
        symbol_id_exchange: 'ETHUSD',
      },
      {
        asset_id_base: 'BCH',
        symbol_id: 'BITSTAMP_SPOT_BCH_USD',
        symbol_id_exchange: 'BCHUSD',
      },
      {
        asset_id_base: 'GBP',
        symbol_id: 'BITSTAMP_SPOT_GBP_USD',
        symbol_id_exchange: 'GBPUSD',
      },
      {
        asset_id_base: 'XLM',
        symbol_id: 'BITSTAMP_SPOT_XLM_USD',
        symbol_id_exchange: 'XLMUSD',
      },
      {
        asset_id_base: 'PAX',
        symbol_id: 'BITSTAMP_SPOT_PAX_USD',
        symbol_id_exchange: 'PAXUSD',
      },
      {
        asset_id_base: 'LINK',
        symbol_id: 'BITSTAMP_SPOT_LINK_USD',
        symbol_id_exchange: 'LINKUSD',
      },
      {
        asset_id_base: 'USDC',
        symbol_id: 'BITSTAMP_SPOT_USDC_USD',
        symbol_id_exchange: 'USDCUSD',
      },
      {
        asset_id_base: 'ZRX',
        symbol_id: 'BITSTAMP_SPOT_ZRX_USD',
        symbol_id_exchange: 'ZRXUSD',
      },
      {
        asset_id_base: 'MKR',
        symbol_id: 'BITSTAMP_SPOT_MKR_USD',
        symbol_id_exchange: 'MKRUSD',
      },
      {
        asset_id_base: 'KNC',
        symbol_id: 'BITSTAMP_SPOT_KNC_USD',
        symbol_id_exchange: 'KNCUSD',
      },
      {
        asset_id_base: 'DAI',
        symbol_id: 'BITSTAMP_SPOT_DAI_USD',
        symbol_id_exchange: 'DAIUSD',
      },
      {
        asset_id_base: 'GUSD',
        symbol_id: 'BITSTAMP_SPOT_GUSD_USD',
        symbol_id_exchange: 'GUSDUSD',
      },
      {
        asset_id_base: 'AAVE',
        symbol_id: 'BITSTAMP_SPOT_AAVE_USD',
        symbol_id_exchange: 'AAVEUSD',
      },
      {
        asset_id_base: 'BAT',
        symbol_id: 'BITSTAMP_SPOT_BAT_USD',
        symbol_id_exchange: 'BATUSD',
      },
      {
        asset_id_base: 'UMA',
        symbol_id: 'BITSTAMP_SPOT_UMA_USD',
        symbol_id_exchange: 'UMAUSD',
      },
      {
        asset_id_base: 'UNI',
        symbol_id: 'BITSTAMP_SPOT_UNI_USD',
        symbol_id_exchange: 'UNIUSD',
      },
      {
        asset_id_base: 'YFI',
        symbol_id: 'BITSTAMP_SPOT_YFI_USD',
        symbol_id_exchange: 'YFIUSD',
      },
      {
        asset_id_base: 'SNX',
        symbol_id: 'BITSTAMP_SPOT_SNX_USD',
        symbol_id_exchange: 'SNXUSD',
      },
      {
        asset_id_base: 'ALGO',
        symbol_id: 'BITSTAMP_SPOT_ALGO_USD',
        symbol_id_exchange: 'ALGOUSD',
      },
      {
        asset_id_base: 'AUDIO',
        symbol_id: 'BITSTAMP_SPOT_AUDIO_USD',
        symbol_id_exchange: 'AUDIOUSD',
      },
      {
        asset_id_base: 'CRV',
        symbol_id: 'BITSTAMP_SPOT_CRV_USD',
        symbol_id_exchange: 'CRVUSD',
      },
      {
        asset_id_base: 'USDT',
        symbol_id: 'BITSTAMP_SPOT_USDT_USD',
        symbol_id_exchange: 'USDTUSD',
      },
      {
        asset_id_base: 'COMP',
        symbol_id: 'BITSTAMP_SPOT_COMP_USD',
        symbol_id_exchange: 'COMPUSD',
      },
      {
        asset_id_base: 'GRT',
        symbol_id: 'BITSTAMP_SPOT_GRT_USD',
        symbol_id_exchange: 'GRTUSD',
      },
      {
        asset_id_base: 'EURT',
        symbol_id: 'BITSTAMP_SPOT_EURT_USD',
        symbol_id_exchange: 'EURTUSD',
      },
      {
        asset_id_base: 'MATIC',
        symbol_id: 'BITSTAMP_SPOT_MATIC_USD',
        symbol_id_exchange: 'MATICUSD',
      },
      {
        asset_id_base: 'SUSHI',
        symbol_id: 'BITSTAMP_SPOT_SUSHI_USD',
        symbol_id_exchange: 'SUSHIUSD',
      },
      {
        asset_id_base: 'OMG',
        symbol_id: 'BITSTAMP_SPOT_OMG_USD',
        symbol_id_exchange: 'OMGUSD',
      },
      {
        asset_id_base: 'ENJ',
        symbol_id: 'BITSTAMP_SPOT_ENJ_USD',
        symbol_id_exchange: 'ENJUSD',
      },
      {
        asset_id_base: 'CHZ',
        symbol_id: 'BITSTAMP_SPOT_CHZ_USD',
        symbol_id_exchange: 'CHZUSD',
      },
      {
        asset_id_base: 'ALPHA',
        symbol_id: 'BITSTAMP_SPOT_ALPHA_USD',
        symbol_id_exchange: 'ALPHAUSD',
      },
      {
        asset_id_base: 'STORJ',
        symbol_id: 'BITSTAMP_SPOT_STORJ_USD',
        symbol_id_exchange: 'STORJUSD',
      },
      {
        asset_id_base: 'SAND',
        symbol_id: 'BITSTAMP_SPOT_SAND_USD',
        symbol_id_exchange: 'SANDUSD',
      },
      {
        asset_id_base: 'AXS',
        symbol_id: 'BITSTAMP_SPOT_AXS_USD',
        symbol_id_exchange: 'AXSUSD',
      },
      {
        asset_id_base: 'HBAR',
        symbol_id: 'BITSTAMP_SPOT_HBAR_USD',
        symbol_id_exchange: 'HBARUSD',
      },
      {
        asset_id_base: 'FET',
        symbol_id: 'BITSTAMP_SPOT_FET_USD',
        symbol_id_exchange: 'FETUSD',
      },
      {
        asset_id_base: 'SKL',
        symbol_id: 'BITSTAMP_SPOT_SKL_USD',
        symbol_id_exchange: 'SKLUSD',
      },
      {
        asset_id_base: 'SXP',
        symbol_id: 'BITSTAMP_SPOT_SXP_USD',
        symbol_id_exchange: 'SXPUSD',
      },
      {
        asset_id_base: 'ADA',
        symbol_id: 'BITSTAMP_SPOT_ADA_USD',
        symbol_id_exchange: 'ADAUSD',
      },
      {
        asset_id_base: 'SLP',
        symbol_id: 'BITSTAMP_SPOT_SLP_USD',
        symbol_id_exchange: 'SLPUSD',
      },
      {
        asset_id_base: 'SHIB',
        symbol_id: 'BITSTAMP_SPOT_SHIB_USD',
        symbol_id_exchange: 'SHIBUSD',
      },
      {
        asset_id_base: 'PERP',
        symbol_id: 'BITSTAMP_SPOT_PERP_USD',
        symbol_id_exchange: 'PERPUSD',
      },
      {
        asset_id_base: 'SGB',
        symbol_id: 'BITSTAMP_SPOT_SGB_USD',
        symbol_id_exchange: 'SGBUSD',
      },
      {
        asset_id_base: 'DYDX',
        symbol_id: 'BITSTAMP_SPOT_DYDX_USD',
        symbol_id_exchange: 'DYDXUSD',
      },
      {
        asset_id_base: 'GALA',
        symbol_id: 'BITSTAMP_SPOT_GALA_USD',
        symbol_id_exchange: 'GALAUSD',
      },
      {
        asset_id_base: 'AMP',
        symbol_id: 'BITSTAMP_SPOT_AMP_USD',
        symbol_id_exchange: 'AMPUSD',
      },
      {
        asset_id_base: 'FTM',
        symbol_id: 'BITSTAMP_SPOT_FTM_USD',
        symbol_id_exchange: 'FTMUSD',
      },
      {
        asset_id_base: 'AVAX',
        symbol_id: 'BITSTAMP_SPOT_AVAX_USD',
        symbol_id_exchange: 'AVAXUSD',
      },
      {
        asset_id_base: 'IMX',
        symbol_id: 'BITSTAMP_SPOT_IMX_USD',
        symbol_id_exchange: 'IMXUSD',
      },
      {
        asset_id_base: 'NEXO',
        symbol_id: 'BITSTAMP_SPOT_NEXO_USD',
        symbol_id_exchange: 'NEXOUSD',
      },
      {
        asset_id_base: 'CTSI',
        symbol_id: 'BITSTAMP_SPOT_CTSI_USD',
        symbol_id_exchange: 'CTSIUSD',
      },
      {
        asset_id_base: 'CVX',
        symbol_id: 'BITSTAMP_SPOT_CVX_USD',
        symbol_id_exchange: 'CVXUSD',
      },
      {
        asset_id_base: 'RAD',
        symbol_id: 'BITSTAMP_SPOT_RAD_USD',
        symbol_id_exchange: 'RADUSD',
      },
      {
        asset_id_base: 'ANT',
        symbol_id: 'BITSTAMP_SPOT_ANT_USD',
        symbol_id_exchange: 'ANTUSD',
      },
      {
        asset_id_base: 'GODS',
        symbol_id: 'BITSTAMP_SPOT_GODS_USD',
        symbol_id_exchange: 'GODSUSD',
      },
      {
        asset_id_base: 'INJ',
        symbol_id: 'BITSTAMP_SPOT_INJ_USD',
        symbol_id_exchange: 'INJUSD',
      },
      {
        asset_id_base: 'BAND',
        symbol_id: 'BITSTAMP_SPOT_BAND_USD',
        symbol_id_exchange: 'BANDUSD',
      },
      {
        asset_id_base: 'RNDR',
        symbol_id: 'BITSTAMP_SPOT_RNDR_USD',
        symbol_id_exchange: 'RNDRUSD',
      },
      {
        asset_id_base: 'RLY',
        symbol_id: 'BITSTAMP_SPOT_RLY_USD',
        symbol_id_exchange: 'RLYUSD',
      },
      {
        asset_id_base: '1INCH',
        symbol_id: 'BITSTAMP_SPOT_1INCH_USD',
        symbol_id_exchange: '1INCHUSD',
      },
      {
        asset_id_base: 'VEGA',
        symbol_id: 'BITSTAMP_SPOT_VEGA_USD',
        symbol_id_exchange: 'VEGAUSD',
      },
      {
        asset_id_base: 'ENS',
        symbol_id: 'BITSTAMP_SPOT_ENS_USD',
        symbol_id_exchange: 'ENSUSD',
      },
      {
        asset_id_base: 'LRC',
        symbol_id: 'BITSTAMP_SPOT_LRC_USD',
        symbol_id_exchange: 'LRCUSD',
      },
      {
        asset_id_base: 'MANA',
        symbol_id: 'BITSTAMP_SPOT_MANA_USD',
        symbol_id_exchange: 'MANAUSD',
      },
      {
        asset_id_base: 'APE',
        symbol_id: 'BITSTAMP_SPOT_APE_USD',
        symbol_id_exchange: 'APEUSD',
      },
      {
        asset_id_base: 'MPL',
        symbol_id: 'BITSTAMP_SPOT_MPL_USD',
        symbol_id_exchange: 'MPLUSD',
      },
      {
        asset_id_base: 'SOL',
        symbol_id: 'BITSTAMP_SPOT_SOL_USD',
        symbol_id_exchange: 'SOLUSD',
      },
      {
        asset_id_base: 'DOT',
        symbol_id: 'BITSTAMP_SPOT_DOT_USD',
        symbol_id_exchange: 'DOTUSD',
      },
      {
        asset_id_base: 'NEAR',
        symbol_id: 'BITSTAMP_SPOT_NEAR_USD',
        symbol_id_exchange: 'NEARUSD',
      },
      {
        asset_id_base: 'FTT',
        symbol_id: 'BITSTAMP_SPOT_FTT_USD',
        symbol_id_exchange: 'FTTUSD',
      },
      {
        asset_id_base: 'DOGE',
        symbol_id: 'BITSTAMP_SPOT_DOGE_USD',
        symbol_id_exchange: 'DOGEUSD',
      },
      {
        asset_id_base: 'FLR',
        symbol_id: 'BITSTAMP_SPOT_FLR_USD',
        symbol_id_exchange: 'FLRUSD',
      },
      {
        asset_id_base: 'CEL',
        symbol_id: 'BITSTAMP_SPOT_CEL_USD',
        symbol_id_exchange: 'CELUSD',
      },
      {
        asset_id_base: 'SUI',
        symbol_id: 'BITSTAMP_SPOT_SUI_USD',
        symbol_id_exchange: 'SUIUSD',
      },
      {
        asset_id_base: 'DGLD',
        symbol_id: 'BITSTAMP_SPOT_DGLD_USD',
        symbol_id_exchange: 'DGLDUSD',
      },
      {
        asset_id_base: 'LDO',
        symbol_id: 'BITSTAMP_SPOT_LDO_USD',
        symbol_id_exchange: 'LDOUSD',
      },
      {
        asset_id_base: 'RGT',
        symbol_id: 'BITSTAMP_SPOT_RGT_USD',
        symbol_id_exchange: 'RGTUSD',
      },
      {
        asset_id_base: 'PYUSD',
        symbol_id: 'BITSTAMP_SPOT_PYUSD_USD',
        symbol_id_exchange: 'PYUSDUSD',
      },
      {
        asset_id_base: 'UST',
        symbol_id: 'BITSTAMP_SPOT_UST_USD',
        symbol_id_exchange: 'USTUSD',
      },
      {
        asset_id_base: 'WECAN',
        symbol_id: 'BITSTAMP_SPOT_WECAN_USD',
        symbol_id_exchange: 'WECANUSD',
      },
      {
        asset_id_base: 'TRAC',
        symbol_id: 'BITSTAMP_SPOT_TRAC_USD',
        symbol_id_exchange: 'TRACUSD',
      },
      {
        asset_id_base: 'PEPE',
        symbol_id: 'BITSTAMP_SPOT_PEPE_USD',
        symbol_id_exchange: 'PEPEUSD',
      },
      {
        asset_id_base: 'LMWR',
        symbol_id: 'BITSTAMP_SPOT_LMWR_USD',
        symbol_id_exchange: 'LMWRUSD',
      },
      {
        asset_id_base: 'VEXT',
        symbol_id: 'BITSTAMP_SPOT_VEXT_USD',
        symbol_id_exchange: 'VEXTUSD',
      },
      {
        asset_id_base: 'BLUR',
        symbol_id: 'BITSTAMP_SPOT_BLUR_USD',
        symbol_id_exchange: 'BLURUSD',
      },
    ];
    return of(jsonData) as Observable<Symbol[]>;
  }

  ngOnDestroy(): void {
    this.loggedInUserSub.unsubscribe();
  }
}
