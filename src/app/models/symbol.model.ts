export interface CryptoSymbol {
  asset_id_base: string;
  asset_id_base_exchange?: string;
  asset_id_quote?: string;
  asset_id_quote_exchange?: string;
  data_end?: string;
  data_orderbook_end?: string;
  data_orderbook_start?: string;
  data_quote_end?: string;
  data_quote_start?: string;
  data_start?: string;
  data_trade_end?: string;
  data_trade_start?: string;
  exchange_id?: string;
  price?: number;
  price_precision?: number;
  size_precision?: number;
  symbol_id: string;
  symbol_id_exchange: string;
  symbol_type?: string;
  volume_1day?: number;
  volume_1day_usd?: number;
  volume_1hrs?: number;
  volume_1hrs_usd?: number;
  volume_1mth?: number;
  volume_1mth_usd?: number;
}

export interface SymbolHistoryData {
  time_period_start: string;
  time_period_end: string;
  time_open: string;
  time_close: string;
  price_open: number;
  price_high: number;
  price_low: number;
  price_close: number;
  volume_traded: number;
  trades_count: number;
}

export interface AssetIcon {
  asset_id: string;
  url: string;
}
