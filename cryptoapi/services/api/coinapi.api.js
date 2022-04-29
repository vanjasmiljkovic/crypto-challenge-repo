const axios = require("axios");

// https://rest.coinapi.io/v1/exchangerate/BTC/USD?time=2021-04-20
const CoinApi = axios.create({
  baseURL: "https://rest.coinapi.io",
  headers: {
    "X-CoinAPI-Key": "6A6F8F32-402A-4E49-A966-B9F1050FAC5F",
  },
});

const getQuotesHistorical = async (asset, time) => {
  const { data } = await CoinApi.get(
    `/v1/exchangerate/${asset}/USD?time=${time}`
  );

  return data;
};

module.exports = { getQuotesHistorical };
