<template>
  <div class="coin__container">
    <loader-component v-if="isLoading" />
    <div v-else class="coin__article">
      <h1>{{ coinName }} ({{ coinSymbol }}) Price</h1>
      <p>
        {{ coinName }} live price in US Dollar (USD). View value statistics, market cap and supply
      </p>
      <hr />
      <h2>{{ coinName }} Price Chart</h2>
      <chart-component :coinUUID="coinUUID" :chartColor="color" />
      <div class="coin__info">
        <div class="info__stats">
          <div class="stats__value">
            <h2>{{ coinName }} Value Statistics</h2>
            <p>
              An overview showing the statistics of {{ coinName }}, such as the base and quote currency, the rank, and trading volume.
            </p>
            <div class="table value__table">
              <div class="table__item" v-for="(stat, index) in valueStats" :key="index">
                <span class="item__header">{{ stat.name }}</span>
                <span class="item__value">{{ stat.value }}</span>
              </div>
            </div>
          </div>
          <div class="stats__other">
            <h2>Other Stats Info</h2>
            <p>
              An overview showing the statistics of {{ coinName }}, such as the base and quote currency, the rank, and trading volume.
            </p>
            <div class="table other__table">
              <div class="table__item" v-for="(stat, index) in otherStats" :key="index">
                <span class="item__header">{{ stat.name }}</span>
                <span class="item__value">{{ stat.value }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="info__description">
          <div class="coin__description">
            <h2>What is {{ coinName }}?</h2>
            <p v-html="coinDesc"></p>
          </div>
          <div class="description__links">
            <h2>{{ coinName }} Links</h2>
            <div class="table links__table">
              <div class="table__item" v-for="(website, index) in links" :key="index">
                <span class="item__header">{{ getValidWebsiteName(website.type) }}</span>
                <a target="blank" :href="website.url" class="item__value">
                  {{ website.name }}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <footer-component />
  </div>
</template>

<script>
import FooterComponent from "@/components/FooterComponent.vue";
import ChartComponent from '@/components/ChartComponent.vue';
import LoaderComponent from "@/components/Loader.vue";
import { getCoin } from "@/data/cryptocurrencies.js";
import millify from 'millify';

export default {
  name: "CoinPage",

  components: {
    FooterComponent,
    LoaderComponent,
    ChartComponent,
  },

  data() {
    return {
      isLoading: true,
      coin: null,
      coinUUID: null,
      valueStats: null,
      otherStats: null,
      links: null,
      coinName: null,
      coinSymbol: null,
      coinDesc: null,
      color: null,
    };
  },

  created() {
    let currentUrl = new URL(window.location.href);

    // currentUrl.pathname for example -> /cryptocurrencies/razxDUgYGNAdQ
    // regular expression removes '/cryptocurrencies/' part
    // the rest of the path is uuid
    this.coinUUID = currentUrl.pathname.replace(/\/.*\//, "");
  },

  async mounted() {
    let answer = await getCoin(this.coinUUID);
    this.coin = answer.data.coin;
    this.arrangeCoinData();
    this.isLoading = false;
  },

  methods: {
    arrangeCoinData() {
      this.coinName = this.coin.name;
      this.coinSymbol = this.coin.symbol;
      this.coinDesc = this.coin.description;
      this.valueStats = this.getValueStats();
      this.otherStats = this.getOtherStats();
      this.links = this.coin.links;
      this.color = this.coin.color;
    },
    getValueStats() {
      return [
        {
          name: "Price to USD",
          value: "$" + millify(this.coin.price || 0),
        },
        {
          name: "Rank",
          value: millify(this.coin.rank || 0),
        },
        {
          name: "24h Volume",
          value: "$" + millify(this.coin["24hVolume"] || 0),
        },
        {
          name: "Market Cap",
          value: "$" + millify(this.coin.marketCap || 0),
        },
        {
          name: "All-time-high",
          value: "$" + millify(this.coin.allTimeHigh.price || 0),
        }
      ];
    },
    getOtherStats() {
      return [
        {
          name: "Number Of Markets",
          value: this.coin.numberOfMarkets
        },
        {
          name: "Number Of Exchanges",
          value: this.coin.numberOfExchanges
        },
        {
          name: "Aprroved Supply",
          value: this.coin.supply.confirmed ? "✔" : "✖",
        },
        {
          name: "Total Supply",
          value: "$" + millify(this.coin.supply.total || 0)
        },
        {
          name: "Circulating Supply",
          value: "$" + millify(this.coin.supply.circulating || 0)
        },
      ];
    },
    getValidWebsiteName(name) {
      name = name.replace("_", " ");
      return `${name[0].toUpperCase()}${name.slice(1)}`;
    }
  },
}
</script>

<style>
.coin__article {
  padding: 35px 60px 0;
  margin-bottom: 170px;
  position: relative;
  width: calc(100% - 120px);
}

.coin__article a {
  text-decoration: none;
  color: var(--primary-color);
  transition: var(--primary-transition);
}

.coin__article a:hover {
  text-decoration: underline;
  color: var(--primary-color-hover);
}

.coin__article > h1 {
  text-align: center;
  margin-bottom: 15px;
  user-select: none;

  cursor: pointer;
}

.coin__article > p {
  margin-top: 0;
  text-align: center;
}

.coin__article .coin__info {
  display: flex;
  flex-direction: column;
  row-gap: 32px;
}

.coin__article .coin__info > div {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.coin__article .coin__info > div > div {
  width: 46%;
}

.coin__article .table {
  display: flex;
  flex-direction: column;
}

.coin__article .table__item {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 20px;

  border-bottom: 1px solid #ddd;
  transition: var(--primary-transition);
}

.coin__article .table__item:hover {
  background: #fff;
}

.coin__article .item__value {
  font-weight: 700;
}
</style>
