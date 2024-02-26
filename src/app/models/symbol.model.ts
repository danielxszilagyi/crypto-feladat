export interface Symbol {
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
