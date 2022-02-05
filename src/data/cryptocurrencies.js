import { API_KEY } from "@/.env.js";

export const getGlobalStats = async () => {
  let answer = null;
  await fetch("https://coinranking1.p.rapidapi.com/stats?referenceCurrencyUuid=yhjMzLPhuIDl", {
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "coinranking1.p.rapidapi.com",
      "x-rapidapi-key": API_KEY
    }
  })
  .then(response => {
    return response.json();
  })
  .then(response => answer = response)
  .catch(err => {
    console.error(err);
  });

  return answer;
}

export const getCoins = async (limit) => {
  if (typeof limit !== "number" || limit < 0)
    throw new TypeError("The limit must be a number greater than 0!");

  let answer = null;
  await fetch(`https://coinranking1.p.rapidapi.com/coins?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h&tiers=1&orderBy=marketCap&orderDirection=desc&limit=${limit}&offset=0`, {
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "coinranking1.p.rapidapi.com",
      "x-rapidapi-key": API_KEY
    }
  })
  .then(response => {
    return response.json();
  })
  .then(response => answer = response)
  .catch(err => {
    console.error(err);
  });

  return answer;
};
