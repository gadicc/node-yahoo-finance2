export interface PriceJson {
  maxAge: number;                       // 1,
  preMarketSource: string;              // 'FREE_REALTIME',   TODO | allvalues
  postMarketChangePercent: number;      // -0.0033553976,
  postMarketChange: number;             // -0.45999146,
  postMarketTime: number;               // 1611881999,
  postMarketPrice: number;              // 136.63,
  postMarketSource: string;             // 'DELAYED',
  regularMarketChangePercent: number;   // -0.034985226,
  regularMarketChange: number;          // -4.970001,
  regularMarketTime: number;            // 1611867601,
  priceHint: number;                    // 2,
  regularMarketPrice: number;           // 137.09,
  regularMarketDayHigh: number;         // 141.99,
  regularMarketDayLow: number;          // 136.7,
  regularMarketVolume: number;          // 142621028,
  averageDailyVolume10Day: number;      // 118130257,
  averageDailyVolume3Month: number;     // 110435154,
  regularMarketPreviousClose: number;   // 142.06,
  regularMarketSource: string;          // 'FREE_REALTIME',  TODO | allvalues
  regularMarketOpen: number;            // 139.52,
  exchange: string;                     // 'NMS',
  exchangeName: string;                 // 'NasdaqGS',
  exchangeDataDelayedBy: number;        // 0,
  marketState: string;                  // 'PREPRE',
  quoteType: string;                    // 'EQUITY',
  symbol: string;                       // 'AAPL',
  underlyingSymbol: null | string;      // null,  TODO
  shortName: string;                    // 'Apple Inc.',
  longName: string;                     // 'Apple Inc.',
  currency: string;                     // 'USD',
  quoteSourceName: string;              // 'Delayed Quote',
  currencySymbol: string;               // '$',
  fromCurrency: null | string;          // null,
  toCurrency: null | string;            // null,
  lastMarket: null | string;            // null,
  marketCap: number;                    // 2306306211840
}

export interface Price extends Omit<PriceJson,'preMarketTime'|'postMarketTime'|'regularMarketTime'> {
  preMarketTime: Date;
  postMarketTime: Date;
  regularMarketTime: Date;
}
