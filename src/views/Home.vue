<template>
  <div class="container">
    <div class="total-stats">
      <h2>Global Crypto Stats</h2>
      <div class="total-stats__content">
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
      <div class="top-cryptos">
        <h2>Top 10 Cryptos In The World</h2>
        <router-link to="/cryptocurrencies">
          Show more
        </router-link>
      </div>
      <coins-list :count="10" />
    </div>
    <footer-component />
  </div>
</template>

<script>
import CoinsList from "@/components/CoinsList.vue";
import FooterComponent from "@/components/FooterComponent.vue";
import { getCoins } from "@/data/cryptocurrencies.js";
import millify from 'millify';

export default {
  name: "HomePage",

  components: {
    CoinsList,
    FooterComponent,
  },

  data() {
    return {
      stats: null,
      totalCoins: 0,
      totalExchanges: 0,
      totalMarketCap: 0,
      total24hVolume: 0,
      totalMarkets: 0,
    };
  },

  async mounted() {
    await getCoins(1).then(response => this.stats = response.data.stats);
  },

  watch: {
    stats: {
      handler(data) {
        for (let prop in data)
          this.$data[prop] = millify(+data[prop]);
      },
      deep: true,
    },
  },
}
</script>

<style scoped>
.container {
  position: relative;
  width: calc(100% - var(--nav-width));
  min-height: 100vh;
}

.total-stats {
  padding: 35px 60px 0;
}

h2 {
  font-size: 1.9em;
  font-weight: 700;
  margin-bottom: 30px;
  margin-top: 0;
}

.top-cryptos {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 35px;
}

.top-cryptos > h2 {
  margin: 0;
}

.top-cryptos > a {
  font-weight: 500;
  font-size: 1.3em;
  color: var(--primary-color);
  transition: var(--primary-transition);
}

.top-cryptos > a:hover {
  color: var(--primary-color-hover);
}

.total-stats__content {
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
