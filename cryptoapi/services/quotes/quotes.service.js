const CoinMarketCapApi = require("../api/coinmarketcap.api");
const CoinApi = require("../api/coinapi.api");
const { timestampNow } = require("../datetime/datetime.service");

const INVALIDATE_CACHE_AFTER = 30; //seconds

// cache
const assetsCache = {
  BTC: {
    timestamp: null,
    price: null,
  },
  ETH: {
    timestamp: null,
    price: null,
  },
};

const isValidTimestamp = (timestamp) => {
  if (!timestamp) {
    return false;
  } else {
    const now = timestampNow();
    const delta = now - timestamp;
    return delta < INVALIDATE_CACHE_AFTER;
  }
};

const getQuotes = async (assets) => {
  const cachedPrices = [];
  const assetsToFetch = [];

  // cached assets handling
  assets.forEach((asset) => {
    const cached = assetsCache[asset];
    const canReadFromCache = cached
      ? isValidTimestamp(cached.timestamp)
      : false;

    if (canReadFromCache) {
      cachedPrices.push({ name: asset, price: cached.price, fromCache: true });
    } else {
      assetsToFetch.push(asset);
    }
  });

  const hasItemsToFetch = assetsToFetch.length > 0;
  let fetchedPrices = [];

  if (hasItemsToFetch) {
    fetchedPrices = await CoinMarketCapApi.getAssetsQuote(assetsToFetch);

    // Updating the cache
    fetchedPrices.forEach((fetchedPrice) => {
      if (fetchedPrice.price) {
        assetsCache[fetchedPrice.name] = {
          timestamp: timestampNow(),
          price: fetchedPrice.price,
        };
      }
    });
  }

  const fetchPricesDecorated = fetchedPrices.map((fp) => ({
    ...fp,
    fromCache: false,
  }));

  return [...cachedPrices, ...fetchPricesDecorated];
};

const getQuotesHistorical = async (asset, timestamp) => {
  const date = new Date(timestamp * 1000);
  return CoinApi.getQuotesHistorical(asset, date.toISOString());
};

module.exports = {
  getQuotes,
  getQuotesHistorical,
};
