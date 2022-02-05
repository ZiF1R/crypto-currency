<template>
  <footer>
    <span>Copyright © 2022 <router-link to="/">Cryptoverse Inc.</router-link></span>
    <span>All Rights Reserved</span>
    <div class="links">
      <router-link to="/">Home</router-link>
      <router-link to="/exchanges">Exchanges</router-link>
      <router-link to="/news">News</router-link>
    </div>
  </footer>
</template>

<script>
export default {
  name: "FooterComponent",
}
</script>

<style scoped>
footer {
  display: flex;
  position: absolute;
  flex-direction: column;
  align-items: center;

  padding: 25px;
  width: calc(100% - 50px);
  bottom: 0;

  background: var(--primary-background);
  color: #ffffff;
  font-size: 0.9em;
  font-weight: 400;
}

a {
  text-decoration: none;
  color: var(--primary-color);
  transition: var(--primary-transition);
}

a:hover {
  color: var(--primary-color-hover);
}

.links {
  margin-top: 10px;
}

.links > a {
  margin-right: 10px;
  font-size: 1em;
}
</style>
