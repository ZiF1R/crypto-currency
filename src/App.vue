<template>
  <nav-bar />
  <router-view />
</template>

<script>
import NavBar from "@/components/navigation/Nav.vue";

export default {
  components: {
    NavBar,
  },

  created() {
    // fetch("https://coinranking1.p.rapidapi.com/coins?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h&tiers=1&orderBy=marketCap&orderDirection=desc&limit=50&offset=0", {
    //   "method": "GET",
    //   "headers": {
    //     "x-rapidapi-host": "coinranking1.p.rapidapi.com",
    //     "x-rapidapi-key": "1e65278a3emsh9f2b6c733cedaa9p1fa99cjsn2242707d1d90"
    //   }
    // })
    // .then(response => {
    //   return response.json();
    // })
    // .then(response => {
    //   console.log(response);
    // })
    // .catch(err => {
    //   console.error(err);
    // });
  },
}
</script>

<style>
:root {
  --primary-color: #42b983;
  --text-color: #2c3e50;
}

body {
  padding: 0;
  margin: 0;

  font-size: 16px;
  overflow: hidden;
}

#app {
  font-family: 'Segoe UI', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--text-color);
}
</style>
