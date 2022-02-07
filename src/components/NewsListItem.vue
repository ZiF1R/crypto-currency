<template>
  <a :href="article.url" target="blank" class="article">
    <div class="header">
      <h2>{{ article.name }}</h2>
      <img :src="icon || defaultIcon" />
    </div>
    <p>{{ article.description }}</p>
    <div class="footer">
      <div class="provider">
        <img :src="providerIcon || defaultIcon" />
        <span>{{ providerName }}</span>
      </div>
      <span class="publishedDate">{{ date }}</span>
    </div>
  </a>
</template>

<script>
import moment from "moment";

export default {
  name: "NewsListItem",

  props: {
    article: {
      type: Object,
      required: true,
    },
  },

  created() {
    this.icon = this?.article?.image?.contentUrl || null;
    this.date = moment(this.article.datePublished).startOf('ss').fromNow();
    this.providerIcon =
      this.article.provider[0]?.image?.thumbnail?.contentUrl || null;
    this.providerName = this.article.provider[0]?.name;
  },

  data() {
    return {
      icon: null,
      defaultIcon: "http://fremontgurdwara.org/wp-content/uploads/2020/06/no-image-icon-2.png",
      date: null,
      providerIcon: null,
      providerName: null,
    };
  },
}
</script>

<style scoped>
.article {
  position: relative;
  width: calc(340px - 40px);
  height: fit-content;
  margin: 0 16px;
  padding: 20px;

  background: #fff;
  color: var(--text-color);
  text-decoration: none;
  transition: var(--primary-transition);

  cursor: pointer;
  user-select: none;
}

.article:hover {
  box-shadow: 0 5px 15px #d4d4d4;
}

.header {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
}

h2 {
  margin: 0;
  margin-right: 10px;
}

img {
  width: 90px;
  height: 90px;
}

.footer {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-size: 0.8em;
}

.provider {
  display: flex;
  align-items: center;
}

.provider img {
  margin-right: 5px;
  width: 40px;
  height: 40px;
}
</style>
