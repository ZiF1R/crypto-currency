<template>
  <div class="coins-list">
    <loader-component v-if="isLoading" />
    <template v-else>
      <coins-list-item
        :coin="coin"
        :number="index + 1"
        v-for="(coin, index) in filteredCoins"
        :key="index"
      />
      <p v-if="filteredCoins.length < 1">
        No matches found!
      </p>
    </template>
  </div>
</template>

<script>
import CoinsListItem from "@/components/CoinsListItem.vue";
import { getCoins } from "@/data/cryptocurrencies.js";
import LoaderComponent from "@/components/Loader.vue";

export default {
  name: "CoinsList",

  props: {
    count: {
      type: Number,
      required: true,
      default: 1,
    },
    searchCoin: {
      type: String,
      required: false,
      default: "",
    },
  },

  components: {
    CoinsListItem,
    LoaderComponent,
  },

  data() {
    return {
      coins: null,
      filteredCoins: null,
      isLoading: true,
    };
  },

  async mounted() {
    await getCoins(this.count).then(response => {
      this.coins = response.data.coins;
      this.filteredCoins = this.coins;
      this.isLoading = false;
    });
  },

  watch: {
    searchCoin(searchVal) {
      return this.filteredCoins =
        this.coins.filter(coin =>
          coin.name.toLowerCase().includes(searchVal.toLowerCase())
        );
    },
  },
}
</script>

<style scoped>
.coins-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  margin-left: -16px;
  margin-right: -16px;
  row-gap: 32px;

  margin-bottom: 170px;
}

p {
  font-weight: 700;
  font-size: 2em;
  margin: 40px auto 0;
}
</style>
