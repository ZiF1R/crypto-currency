<template>
  <router-link :to="path" class="navLink">
    <svg v-html="icon" draggable="false" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#bbb" viewBox="0 0 16 16"></svg>
    <span>
      <slot></slot>
    </span>
  </router-link>
</template>

<script>
export default {
  props: {
    path: {
      type: String,
      required: true,
      default: "/",
    },
    icon: {
      type: String,
      required: true,
    }
  }
}
</script>

<style scoped>
.navLink {
  width: calc(100% - 15px);
  padding: 9px 0;
  padding-left: 15px;
  margin-bottom: 6px;
  text-decoration: none;
  color: #bbb;
  transition: var(--primary-transition);
  user-select: none;
}

span {
  font-size: 0.9em;
  font-weight: 400;
  margin-left: 10px;
  transition: color .21s ease;
}

.navLink:hover span{
  color: #2b9968;
}

svg {
  transition: fill .21s ease;
}

.navLink:hover svg{
  fill: #fff;
}

.link_active span {
  color: #fff;
}

.link_active:hover span {
  color: #ddd;
}

.link_active svg{
  fill: #fff;
}
</style>
