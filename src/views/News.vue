<template>
  <div class="container">
    <loader-component v-if="isLoading" />
    <div v-else class="news">
      <h2>Latest Cryto News</h2>
      <div style="display: flex">
        <div class="cryptocurrency-select" @mouseleave="showOptions = false">
          <div class="select__active-item" @mouseenter="showOptions = true">
            {{ activeCryptocurrency || "Select cryptocurrency" }}
          </div>
          <div v-if="showOptions" class="select__items">
            <span
              @click.left="selectOption(cryptocurrency)"
              class="select__item"
              :class="{ 'item__active': activeCryptocurrency === cryptocurrency }"
              v-for="(cryptocurrency, index) in cryptocurrencies"
              :key="index"
            >
              {{ cryptocurrency }}
            </span>
          </div>
        <span class="select__reset" @click="activeCryptocurrency = ''">✖</span>
        </div>
      </div>
      <news-list :query="activeCryptocurrency" :count="30" />
    </div>
    <footer-component />
  </div>
</template>

<script>
import NewsList from "@/components/NewsList.vue";
import FooterComponent from "@/components/FooterComponent.vue";
import LoaderComponent from "@/components/Loader.vue";
import { getCoins } from "@/data/cryptocurrencies.js";

export default {
  name: "NewsPage",

  components: {
    FooterComponent,
    NewsList,
    LoaderComponent,
  },

  data() {
    return {
      isLoading: true,
      showOptions: false,
      activeCryptocurrency: null,
      cryptocurrencies: [],
    };
  },

  async created() {
    let answers = await getCoins(50);
    for (let i = 0; i < answers.data.coins.length; i++)
      this.cryptocurrencies.push(answers.data.coins[i].name);
    this.isLoading = false;
  },

  methods: {
    selectOption(cryptocurrency) {
      this.activeCryptocurrency = cryptocurrency;
      this.showOptions = false;
    },
  },
}
</script>

<style scoped>
.news {
  padding: 35px 60px 0;
  margin-bottom: 170px;
}

h2 {
  margin-top: 0;
  margin-bottom: 30px;
}

.cryptocurrency-select {
  position: relative;
  user-select: none;
  z-index: 10;
  transition: var(--primary-transition);

  margin-bottom: 15px;
}

.cryptocurrency-select:hover .select__active-item {
  border: 1px solid var(--primary-color);
  box-shadow: 0 0 0 2px #76ecb770;
}

.select__active-item {
  position: relative;
  padding: 5px 15px;
  color: var(--text-color);
  font-size: 1em;
  border: none;
  outline: none;
  border: 1px solid #ddd;
  cursor: pointer;
  background: #fff;
  transition: var(--primary-transition);
  width: 200px;
}

.select__items {
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 10px;
  transform: translateY(1em);
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.09);
  padding: 5px 0;
  background: #fff;
  width: 200px;
  height: 40vh;
  overflow-y: scroll;
}

.select__item {
  padding: 7px 15px;
  cursor: pointer;

  transition: var(--primary-transition);
}

.select__item:hover {
  background: #c4c4c431;
}

.item__active {
  background: #42b98331;
}

.item__active:hover {
  background: #42b98338;
}

.select__reset {
  padding: 5px 7px;
  background: #fff;
  border: 1px solid #ddd;
  cursor: pointer;
  position: absolute;
  top: 0;
  right: -40px;
}

.select__reset:hover {
  border: 1px solid var(--primary-color);
}
</style>
