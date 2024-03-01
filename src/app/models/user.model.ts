import { CryptoSymbol } from './symbol.model';
export interface User {
  username: string;
  password: string;
  tabs: CryptoSymbol[];
  favourites?: any[];
}
