<template>
  <div class="container">
    <main>
      <h1>Cryptocurrencies</h1>
      <input placeholder="Search Cryptocurrency" v-model="searchCoin" type="text" />
      <coins-list :searchCoin="searchCoin" :count="100" />
    </main>
    <footer-component />
  </div>
</template>

<script>
import FooterComponent from "@/components/FooterComponent.vue";
import CoinsList from "@/components/CoinsList.vue";

export default {
  name: "CryptocurrencyPage",

  components: {
    FooterComponent,
    CoinsList,
  },

  data() {
    return {
      searchCoin: "",
    };
  },
}
</script>


<style scoped>
main {
  padding: 35px 60px 0;
  margin-bottom: 170px;
}

h1 {
  margin-top: 0;
  margin-bottom: 30px;
}

input {
  width: 200px;
  padding: 7px 15px;
  margin-bottom: 16px;

  font-size: 0.9em;
  border: 1.5px solid #b6b6b6;
  border-radius: 2px;
  outline: none;

  transition: var(--primary-transition);
}

input::placeholder {
  color: #adadad;
}

input:hover {
  border: 1.5px solid var(--primary-color);
}

input:focus {
  border: 1.5px solid var(--primary-color);
  box-shadow: 0 0 0 2px #76ecb770;
}
</style>
