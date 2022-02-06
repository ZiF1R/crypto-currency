import { API_KEY } from "@/.env.js";

export const getGlobalStats = async () => {
  let answer = await fetch("https://coinranking1.p.rapidapi.com/stats?referenceCurrencyUuid=yhjMzLPhuIDl", {
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "coinranking1.p.rapidapi.com",
      "x-rapidapi-key": API_KEY
    }
  }).catch(err => console.error(err));

  return await answer.json();
};

export const getCoins = async (limit) => {
  if (typeof limit !== "number" || limit < 0)
    throw new TypeError("The limit must be a number greater than 0!");

  let answer = await fetch(`https://coinranking1.p.rapidapi.com/coins?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h&tiers=1&orderBy=marketCap&orderDirection=desc&limit=${limit}&offset=0`, {
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "coinranking1.p.rapidapi.com",
      "x-rapidapi-key": API_KEY
    }
  }).catch(err => console.error(err));

  return await answer.json();
};

export const getCoin = async (coinUUID) => {
  let answer = await fetch(`https://coinranking1.p.rapidapi.com/coin/${coinUUID}?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h`, {
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "coinranking1.p.rapidapi.com",
      "x-rapidapi-key": API_KEY
    }
  }).catch(err => console.error(err));

  return await answer.json();
};

export const getCoinHistory = async (coinUUID, timeSpan) => {
  let answer = await fetch(`https://coinranking1.p.rapidapi.com/coin/${coinUUID}/history?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=${timeSpan}`, {
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "coinranking1.p.rapidapi.com",
      "x-rapidapi-key": API_KEY
    }
  }).catch(err => console.error(err));

  return await answer.json();
};
