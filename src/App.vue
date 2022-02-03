<template>
  <nav-bar />
  <router-view />
</template>

<script>
import NavBar from "@/components/navigation/Nav.vue";

export default {
  components: {
    NavBar,
  },
}
</script>

<style>
:root {
  --primary-color: #42b983;
  --text-color: #2c3e50;
  --nav-width: 20%;
}

body {
  padding: 0;
  margin: 0;

  font-size: 16px;
  overflow: hidden;
}

#app {
  display: flex;
  flex-direction: row;
  font-family: 'Segoe UI', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--text-color);
}
</style>
