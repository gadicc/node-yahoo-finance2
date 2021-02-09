import type {
  ModuleOptions,
  ModuleOptionsWithValidateTrue,
  ModuleOptionsWithValidateFalse,
  ModuleThis,
} from '../lib/moduleCommon';

export type HistoricalResult = Array<HistoricalRow>;

export interface HistoricalRow {
  date: Date;
  open: number;
  high: number;
  low: number;
  close: number;
  adjClose?: number;
  volume: number;
}

export interface HistoricalOptions {
  period1: Date | string | number;
  period2?: Date | string | number;
  interval?: '1d' | '1wk' | '1mo';  // '1d',  TODO all | types
  events?: string;                  // 'history',
  includeAdjustedClose?: boolean;   // true,
}

const queryOptionsDefaults: Omit<HistoricalOptions,'period1'> = {
  interval: '1d',
  events: 'history',
  includeAdjustedClose: true,
};

export default function historical(
  this: ModuleThis,
  symbol: string,
  queryOptionsOverrides: HistoricalOptions,
  moduleOptions?: ModuleOptionsWithValidateTrue
): Promise<HistoricalResult>;

export default function historical(
  this: ModuleThis,
  symbol: string,
  queryOptionsOverrides: HistoricalOptions,
  moduleOptions?: ModuleOptionsWithValidateFalse
): Promise<any>;

export default function historical(
  this: ModuleThis,
  symbol: string,
  queryOptionsOverrides: HistoricalOptions,
  moduleOptions?: ModuleOptions
): Promise<any> {

  return this._moduleExec({
    moduleName: "historical",

    query: {
      url: "https://query1.finance.yahoo.com/v7/finance/download/" + symbol,
      schemaKey: "#/definitions/HistoricalOptions",
      defaults: queryOptionsDefaults,
      overrides: queryOptionsOverrides,
      fetchType: 'csv',
      transformWith(queryOptions: HistoricalOptions) {
        if (!queryOptions.period2)
          queryOptions.period2 = new Date();

        const dates = [ 'period1', 'period2' ] as const;
        for (let fieldName of dates) {
          const value = queryOptions[fieldName];
          if (value instanceof Date)
            queryOptions[fieldName] = Math.floor(value.getTime() / 1000);
          else (typeof value === 'string')
            queryOptions[fieldName] = Math.floor(new Date(value as string).getTime() / 1000);
        }

        return queryOptions;
      }
    },

    result: {
      schemaKey: "#/definitions/HistoricalResult",
    },

    moduleOptions,
  });
}
