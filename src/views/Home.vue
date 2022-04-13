<template>
  <div class="container">
    <loader-component v-if="isLoading" />
    <div v-show="!isLoading" class="content__preview">
      <h2>Global Crypto Stats</h2>
      <div class="total-stats">
        <div class="content__item">
          <h3>Total Cryptocurrencies</h3>
          <span>{{ totalCoins }}</span>
        </div>
        <div class="content__item">
          <h3>Total Exchanges</h3>
          <span>{{ totalExchanges }}</span>
        </div>
        <div class="content__item">
          <h3>Total Market Cap</h3>
          <span>${{ totalMarketCap }}</span>
        </div>
        <div class="content__item">
          <h3>Total 24h Volume</h3>
          <span>${{ total24hVolume }}</span>
        </div>
        <div class="content__item">
          <h3>Total Markets</h3>
          <span>{{ totalMarkets }}</span>
        </div>
      </div>
      <div class="section__header">
        <h2>Top 10 Cryptos In The World</h2>
        <router-link to="/cryptocurrencies">Show more</router-link>
      </div>
      <coins-list :count="10" />
      <div class="section__header">
        <h2 class="news">Latest Cryto News</h2>
        <router-link to="/news">Show more</router-link>
      </div>
      <news-list :count="6" />
    </div>
    <footer-component />
  </div>
</template>

<script>
import CoinsList from "@/components/CoinsList.vue";
import NewsList from "@/components/NewsList.vue";
import LoaderComponent from "@/components/Loader.vue";
import FooterComponent from "@/components/FooterComponent.vue";
import { getGlobalStats } from "@/data/cryptocurrencies.js";
import millify from 'millify';

export default {
  name: "HomePage",

  components: {
    CoinsList,
    NewsList,
    LoaderComponent,
    FooterComponent,
  },

  data() {
    return {
      isLoading: true,
      stats: null,
      totalCoins: 0,
      totalExchanges: 0,
      totalMarketCap: 0,
      total24hVolume: 0,
      totalMarkets: 0,
    };
  },

  async mounted() {
    await getGlobalStats().then(response => this.stats = response.data);
  },

  watch: {
    stats: {
      handler(data) {
        for (let prop in data) {
          console.log(prop, data[prop])
          if (!Array.isArray(data[prop]))
            this.$data[prop] = millify(+data[prop]);
        }
        this.isLoading = false;
      },
      deep: true,
    },
  },
}
</script>

<style scoped>
.container {
  position: relative;
  min-height: 100vh;
}

.content__preview {
  padding: 35px 60px 0;
  margin-bottom: 170px;
}

h2 {
  font-size: 1.9em;
  font-weight: 700;
  margin-bottom: 30px;
  margin-top: 0;
}

.section__header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 35px;
}

.section__header > h2 {
  margin: 0;
}

h2.news {
  margin-top: 60px;
}

.section__header > a {
  font-weight: 500;
  font-size: 1.3em;
  color: var(--primary-color);
  transition: var(--primary-transition);
}

.section__header > a:hover {
  color: var(--primary-color-hover);
}

.total-stats {
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;

  margin-bottom: 70px;
}

.content__item {
  display: flex;
  flex-direction: column;
}

.content__item h3 {
  margin: 0;

  color: #848587;
  font-weight: 400;
  font-size: 0.9em;
  user-select: none;
}

.content__item span {
  font-weight: 500;
  font-size: 1.4em;
}
</style>
