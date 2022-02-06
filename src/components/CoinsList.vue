<template>
  <div class="coins-list">
    <loader-component v-if="isLoading" />
    <coins-list-item
      v-else
      :coin="coin"
      :number="index + 1"
      v-for="(coin, index) in coins"
      :key="index"
    />
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
    }
  },

  components: {
    CoinsListItem,
    LoaderComponent,
  },

  data() {
    return {
      coins: null,
      isLoading: true,
    };
  },

  async mounted() {
    await getCoins(this.count).then(response => {
      this.coins = response.data.coins;
      this.isLoading = false;
    });
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
</style>
