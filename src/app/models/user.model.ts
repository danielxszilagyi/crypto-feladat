import { Symbol } from './symbol.model';
export interface User {
  username: string;
  password: string;
  tabs: Symbol[];
  favorites?: any[];
}
