<template>
  <div class="coins-list">
    <coins-list-item
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
    CoinsListItem
  },

  data() {
    return {
      coins: null
    };
  },

  async mounted() {
    await getCoins(this.count).then(response => {
      this.coins = response.data.coins;
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
