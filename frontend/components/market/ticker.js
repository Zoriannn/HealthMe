import { restClient } from '@polygon.io/client-js';
import snapshotAllTickers from './mock/snapshotAllTickers';
import { AAPL, MSFT, DHI, NVDA, AMZN } from './mock/aggs';

const POLYGON_API_KEY = 'uFHrDcO0dynkCOGCIu4HEfr5OEfCiQzb';
const client = restClient(POLYGON_API_KEY);

export default class Ticker {
  constructor(ticker) {
    this.ticker = ticker;
  }

  // eslint-disable-next-line arrow-body-style
  static getSnapshotAllTickers = () => {
    // Mock data
    return snapshotAllTickers;

    // const query = {
    //   limit: 10000,
    // };
    // const options = {};

    // return Promise.all([
    //   client.stocks.snapshotAllTickers(query, options),
    // ]);
  };

  getAggregates = () => {
    // Mock data
    const t = [AAPL, MSFT, DHI, NVDA, AMZN];
    const r = t[Math.floor(Math.random() * t.length)];
    return r;

    // const multiplier = 2;
    // const timespan = 'day';
    // const from = '2023-01-01';
    // const to = '2023-04-14';
    // const query = {
    //   limit: 10000,
    // };
    // const options = {};

    // return Promise.all([
    //   client.stocks.aggregates(
    //     this.ticker,
    //     multiplier,
    //     timespan,
    //     from,
    //     to,
    //     query,
    //     options,
    //   ),
    // ]);
  };

  getLastQuote = async () => Promise.all([client.stocks.lastQuote(this.ticker)]);

  getLastTrade = async () => Promise.all([client.stocks.lastTrade(this.ticker)]);

  getSummaries = async () => {
    const query = {
      limit: 1000,
    };
    const options = {};

    return Promise.all([
      client.stocks.summaries(this.ticker, query, options),
    ]);
  };
}
