<template>
  <div class="contain">
    <div class="coin">
      <h1>Bitcoin (BTC) Price</h1>
      <p>
        Bitcoin live price in US Dollar (USD). View value statistics, market cap and supply
      </p>
      <hr />
      <h2>Bitcoin Price Chart</h2>
      <!-- <coin-changes-graph /> -->
      <div class="coin__info">
        <div class="info__stats">
          <div class="stats__value">
            <h2>Bitcoin Value Statistics</h2>
            <p>
              An overview showing the statistics of Bitcoin, such as the base and quote currency, the rank, and trading volume.
            </p>
            <div class="table value__table">
              <div class="table__item">
                <div class="item__header">Price to USD</div>
                <div class="item__value">$ 41.3K</div>
              </div>
              <div class="table__item">
                <div class="item__header">Price to USD</div>
                <div class="item__value">$ 41.3K</div>
              </div>
              <div class="table__item">
                <div class="item__header">Price to USD</div>
                <div class="item__value">$ 41.3K</div>
              </div>
              <div class="table__item">
                <div class="item__header">Price to USD</div>
                <div class="item__value">$ 41.3K</div>
              </div>
            </div>
          </div>
          <div class="stats__other">
            <h2>Other Stats Info</h2>
            <p>
              An overview showing the statistics of Bitcoin, such as the base and quote currency, the rank, and trading volume.
            </p>
            <div class="table other__table">
              <div class="table__item">
                <div class="item__header">Price to USD</div>
                <div class="item__value">$ 41.3K</div>
              </div>
              <div class="table__item">
                <div class="item__header">Price to USD</div>
                <div class="item__value">$ 41.3K</div>
              </div>
              <div class="table__item">
                <div class="item__header">Price to USD</div>
                <div class="item__value">$ 41.3K</div>
              </div>
              <div class="table__item">
                <div class="item__header">Price to USD</div>
                <div class="item__value">$ 41.3K</div>
              </div>
            </div>
          </div>
        </div>
        <div class="info__description">
          <div class="coin__description">
            <h2>What is Bitcoin?</h2>
          </div>
          <div class="description__links">
            <h2>Bitcoin Links</h2>
            <div class="table links__table">
              <div class="table__item">
                <div class="item__header">Website</div>
                <a target="blank" href="https://bitcoin.org/en/" class="item__value">
                  bitcoin.org
                </a>
              </div>
              <div class="table__item">
                <div class="item__header">Website</div>
                <a target="blank" href="https://bitcoin.org/en/" class="item__value">
                  bitcoin.org
                </a>
              </div>
              <div class="table__item">
                <div class="item__header">Website</div>
                <a target="blank" href="https://bitcoin.org/en/" class="item__value">
                  bitcoin.org
                </a>
              </div>
              <div class="table__item">
                <div class="item__header">Website</div>
                <a target="blank" href="https://bitcoin.org/en/" class="item__value">
                  bitcoin.org
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

export default {
  name: "CoinPage",

  components: {
    FooterComponent,
  },
}
</script>

<style scoped>
.coin {
  padding: 35px 60px 0;
  margin-bottom: 170px;
  position: relative;
  width: calc(100% - 120px);
}

a {
  text-decoration: none;
  color: var(--primary-color);
  transition: var(--primary-transition);
}

a:hover {
  text-decoration: underline;
  color: var(--primary-color-hover);
}

.coin > h1 {
  text-align: center;
  margin-bottom: 15px;
  user-select: none;

  cursor: pointer;
}

.coin > p {
  margin-top: 0;
  text-align: center;
}

.coin__info {
  display: flex;
  flex-direction: column;
  row-gap: 32px;
}

.coin__info > div {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.coin__info > div > div {
  width: 46%;
}

.table {
  display: flex;
  flex-direction: column;
}

.table__item {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 20px;

  border-bottom: 1px solid #ddd;
  transition: var(--primary-transition);
}

.table__item:hover {
  background: #fff;
}

.item__value {
  font-weight: 700;
}
</style>
