<template>
  <div class="coin">
    <div class="coin__header">
      <span class="coin__name">
        {{ number }}.
        {{ coin.name }}
      </span>
      <img :src="coin.iconUrl" :alt="coin.name" />
    </div>
    <hr />
    <div class="coin__info">
      <span class="info__price">
        Price: ${{ price }}
      </span>
      <span class="info__capitalization">
        Market Cap: {{ marketCap }}
      </span>
      <span class="info__change">
        Daily change: {{ change }}%
      </span>
    </div>
  </div>
</template>

<script>
import millify from 'millify';

export default {
  name: "CoinsListItem",

  props: {
    number: {
      type: Number,
      required: true,
      default: 0,
      validator: value => {
        return value >= 0
      }
    },
    coin: {
      type: Object,
      required: true,
      default() {
        return {
          "24hVolume": "",
          btcPrice: "",
          change: "",
          coinrankingUrl: "",
          color: "",
          iconUrl: "",
          listedAt: 0,
          lowVolume: false,
          marketCap: "",
          name: "",
          price: "",
          rank: 0,
          sparkline: [],
          symbol: "",
          tier: 0,
          uuid: "",
        };
      },
    },
  },

  data() {
    return {
      price: millify(this.coin.price),
      marketCap: millify(this.coin.marketCap),
      change: millify(this.coin.change),
    };
  },
}
</script>

<style scoped>
.coin {
  background: #fff;
  width: calc(280px - 32px);
  margin: 0 16px;
  cursor: pointer;
  user-select: none;

  transition: var(--primary-transition);
}

.coin:hover {
  box-shadow: 0 5px 15px #d4d4d4;
}

hr {
  border: none;
  height: 1px;
  background: #eee;
  margin: 0;
}

.coin__header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 15px 25px;
}

.coin__header > span {
  font-weight: 500;
}

.coin__header > img {
  width: 30px;
  height: 30px;
}

.coin__info {
  display: flex;
  flex-direction: column;
  padding: 15px 25px 10px;
}

.coin__info > span {
  font-size: 0.9em;
  margin-bottom: 10px;
}
</style>
