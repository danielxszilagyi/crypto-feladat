# Crypto feladat

![](https://img.shields.io/badge/Angular-17.0.8-blue)
![](https://img.shields.io/badge/Typescript-blue)
![](https://img.shields.io/badge/@swimlane-ngx--charts-blue)
![](https://img.shields.io/badge/@Angular--Material-grey)
![](https://img.shields.io/badge/Bootstrap-grey)

####

_Ez a projekt egy előre megadott feladatleírás alapján készült._

A koncepció egy egyszerű tab-os felépítéssel rendelkezö webapp ami képes megjeleníteni adott kriptovaluták egy hétre visszamenőleges árváltozásait, illetve lehetöséget biztosít egyszerű árfolyamszámítás elvégzésére.

## Features

- Bejelentkezés és adatok felhasználóhoz rendelése
- Kedvencek
- Criptovaluták tabokon való megjelenítése
- Diagramm elözményadatokkal
- Árfolyam kalkulátor

## API Kommunikáció

Az adatok lekérése a [coinAPI](https://docs.coinapi.io/) nyílt szolgáltatásán keresztül került megvalósításra.

#### Get history

```http
  GET ohlcv/exchanges/:exchange_id/history
```

| Parameter     | Type     | Description                                                                                                            |
| :------------ | :------- | :--------------------------------------------------------------------------------------------------------------------- |
| `exchange_id` | `string` | **Required**. Id of item to fetch                                                                                      |
| `period_id`   | `string` | **Optional**. Requested timeseries [period](https://docs.coinapi.io/market-data/rest-api/ohlcv/ohlcv-list-all-periods) |

#### Get symbols

```http
  GET symbols
```

| Parameter            | Type     | Description   |
| :------------------- | :------- | :------------ |
| `filter_symbol_id`   | `string` | **Optional**. |
| `filter_exchange_id` | `string` | **Optional**. |
| `filter_asset_id`    | `string` | **Optional**. |

## Environment Változók

A sikeres API kommunikációhoz elengedhetetlen a szemelyes kulcs megadása. Ezt az enviroment.ts és enviroment.development.ts fájlokban kell megadni.

`X-CoinAPI-Key` : `SZEMELYES-KULCS`

## Elindítás

Sikeres klónozás után az alábbi parancsokkal futtatható lokálisan a projekt.

```bash
  cd crypto-feladat
  npm install
  npm run start
```

## Készítette

- [@danielxszilagyi](https://www.github.com/danielxszilagyi)
