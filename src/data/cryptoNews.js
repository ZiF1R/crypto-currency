import { API_KEY } from "@/.env.js";

export const getNews = async (count = 6, category = "business", country = "US", lang="EN") => {
  let answer = await fetch(`https://bing-news-search1.p.rapidapi.com/news/search?q=${category}&count=${count}&setLang=${lang}&cc=${country}&freshness=Week&originalImg=true&textFormat=Raw&safeSearch=Off`, {
    "method": "GET",
    "headers": {
      "x-bingapis-sdk": "true",
      "x-rapidapi-host": "bing-news-search1.p.rapidapi.com",
      "x-rapidapi-key": API_KEY,
    }
  }).catch(err => console.error(err));

  return await answer.json();
};
