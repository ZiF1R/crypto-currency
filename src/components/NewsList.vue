<template>
  <div class="container">
    <loader-component v-if="isLoading" />
    <div v-else class="news">
      <news-list-item
        :article="article"
        v-for="(article, index) in news"
        :key="index"
      />
    </div>
  </div>
</template>

<script>
import NewsListItem from "@/components/NewsListItem.vue";
import LoaderComponent from "@/components/Loader.vue";
import { getNews } from "@/data/cryptoNews.js";

export default {
  name: "NewsList",

  components: {
    NewsListItem,
    LoaderComponent,
  },

  props: {
    count: {
      type: Number,
      required: true,
      validator: value => {
        return value > 0
      }
    },
    query: {
      type: String,
      required: false,
    },
  },

  data() {
    return {
      isLoading: true,
      news: null,
    };
  },

  async created() {
    await this.getCryptoNews();
  },

  methods: {
    async getCryptoNews(category) {
      category = this.query === '' ? null : this.query;
      await getNews(this.count, category).then(response => {
        this.news = response.value;
        this.isLoading = false;
      });
    },
  },

  watch: {
    async query(newCategory) {
      this.isLoading = true;
      await this.getCryptoNews(newCategory);
      this.isLoading = false;
    }
  },
}
</script>

<style scoped>
.news {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  margin-left: -16px;
  margin-right: -16px;
  row-gap: 32px;
}
</style>
