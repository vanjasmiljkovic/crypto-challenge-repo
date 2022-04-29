const axios = require("axios");

const CoinMarketApi = axios.create({
  baseURL: "http://pro-api.coinmarketcap.com",
  headers: {
    "X-CMC_PRO_API_KEY": "6cb0d063-affe-463f-8196-e10a45e5b3c2",
  },
});

const getAssetsQuote = async (assets) => {
  try {
    const symbolCSV = assets.join(",");

    const { data } = await CoinMarketApi.get(
      `/v1/cryptocurrency/quotes/latest?symbol=${symbolCSV}`
    );

    const hasError = data.status.error_code !== 0;

    let prices = [];

    if (hasError) {
      prices = assets.map((asset) => ({ name: asset, price: null }));
    } else {
      prices = assets.map((asset) => {
        const { price } = data.data[asset].quote.USD;
        return { name: asset, price };
      });
    }

    return prices;
  } catch (e) {
    console.log(e);
    console.error(`Error while fetching the CoinMarketApi quotes. ${assets}`);
    return null;
  }
};

module.exports = { getAssetsQuote };
