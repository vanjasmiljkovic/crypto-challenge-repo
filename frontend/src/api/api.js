import Axios from "axios";
import * as qs from "qs";

export const http = Axios.create({
  baseURL: "http://localhost:4000",
});

export const getLatestQuotes = async (assets) => {
  const query = qs.stringify({
    assets,
  });
  console.log("query", query);
  console.log(`/assets/quotes?${query}`);

  const { data } = await http.get(`/assets/quotes?${query}`);

  return data;
};

export const getHistoricalQuotes = async (asset, timestamp) => {
  const { data } = await http.get(
    `/assets/quotes/historical/${asset}/${timestamp}`
  );

  return data;
};
