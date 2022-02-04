<template>
  <div class="container">
    <div class="total-stats">
      <h2>Global Crypto Stats</h2>
      <div class="total-stats__content">
        <div class="content__item">
          <h3>Total Cryptocurrencies</h3>
          <span>{{ millifyStat(stats?.totalCoins) }}</span>
        </div>
        <div class="content__item">
          <h3>Total Exchanges</h3>
          <span>{{ millifyStat(stats?.totalExchanges) }}</span>
        </div>
        <div class="content__item">
          <h3>Total Market Cap</h3>
          <span>${{ millifyStat(stats?.totalMarketCap) }}</span>
        </div>
        <div class="content__item">
          <h3>Total 24h Volume</h3>
          <span>${{ millifyStat(stats?.total24hVolume) }}</span>
        </div>
        <div class="content__item">
          <h3>Total Markets</h3>
          <span>{{ millifyStat(stats?.totalMarkets) }}</span>
        </div>
      </div>
      <h2>Top 10 Cryptos In The World</h2>
      <coins-list :count="10" />
    </div>
  </div>
</template>

<script>
import CoinsList from "@/components/CoinsList.vue";
import { getCoins } from "@/data/cryptocurrencies.js";
import millify from 'millify';

export default {
  name: "HomePage",

  components: {
    CoinsList,
  },

  data() {
    return {
      stats: null,
      coins: null,
    };
  },

  async mounted() {
    await getCoins(1).then(response => {
      this.stats = response.data.stats;
      this.coins = response.data.coins;
      console.log(response);
    })
  },

  methods: {
    millifyStat(stat = 0) {
      return millify(+stat);
    }
  },
}
</script>

<style scoped>
.container {
  position: relative;
  width: calc(100% - var(--nav-width) - 120px);
  padding: 35px 60px 0;
}

h2 {
  font-size: 1.9em;
  font-weight: 700;
  margin-bottom: 30px;
  margin-top: 0;
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
