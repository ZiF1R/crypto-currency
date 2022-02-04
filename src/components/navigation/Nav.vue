<template>
  <div class="nav__container">
    <div class="nav__logo">
      <img draggable="false" src="@/assets/cryptocurrency.png" alt="logo" />
      <router-link to="/">
        <h1>Cryptoverse</h1>
      </router-link>
    </div>
    <div class="nav__links">
      <nav-link
        @click="activeLink = link"
        :class="{ link_active: activeLink === link }"
        v-for="(link, index) in links"
        :key="index"
        :icon="link.icon"
        :path="link.path"
      >
        {{ link.text }}
      </nav-link>
    </div>
  </div>
</template>

<script>
import NavLink from "@/components/navigation/NavLink.vue";

export default {
  name: "NavBar",

  components: {
    NavLink,
  },

  data() {
    return {
      activeLink: null,
      links: [
        {
          text: "Home",
          path: "/",
          icon: `<path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4H2.5z"/>`,
        },
        {
          text: "Cryptocurrencies",
          path: "/cryptocurrencies",
          icon: `<path fill-rule="evenodd" d="M0 0h1v15h15v1H0V0Zm14.817 3.113a.5.5 0 0 1 .07.704l-4.5 5.5a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61 4.15-5.073a.5.5 0 0 1 .704-.07Z"/>`,
        },
        {
          text: "Exchanges",
          path: "/exchanges",
          icon: `<path d="M0 5a5.002 5.002 0 0 0 4.027 4.905 6.46 6.46 0 0 1 .544-2.073C3.695 7.536 3.132 6.864 3 5.91h-.5v-.426h.466V5.05c0-.046 0-.093.004-.135H2.5v-.427h.511C3.236 3.24 4.213 2.5 5.681 2.5c.316 0 .59.031.819.085v.733a3.46 3.46 0 0 0-.815-.082c-.919 0-1.538.466-1.734 1.252h1.917v.427h-1.98c-.003.046-.003.097-.003.147v.422h1.983v.427H3.93c.118.602.468 1.03 1.005 1.229a6.5 6.5 0 0 1 4.97-3.113A5.002 5.002 0 0 0 0 5zm16 5.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0zm-7.75 1.322c.069.835.746 1.485 1.964 1.562V14h.54v-.62c1.259-.086 1.996-.74 1.996-1.69 0-.865-.563-1.31-1.57-1.54l-.426-.1V8.374c.54.06.884.347.966.745h.948c-.07-.804-.779-1.433-1.914-1.502V7h-.54v.629c-1.076.103-1.808.732-1.808 1.622 0 .787.544 1.288 1.45 1.493l.358.085v1.78c-.554-.08-.92-.376-1.003-.787H8.25zm1.96-1.895c-.532-.12-.82-.364-.82-.732 0-.41.311-.719.824-.809v1.54h-.005zm.622 1.044c.645.145.943.38.943.796 0 .474-.37.8-1.02.86v-1.674l.077.018z"/>`
        },
        {
          text: "News",
          path: "/news",
          icon: `<path d="M0 2.5A1.5 1.5 0 0 1 1.5 1h11A1.5 1.5 0 0 1 14 2.5v10.528c0 .3-.05.654-.238.972h.738a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 1 1 0v9a1.5 1.5 0 0 1-1.5 1.5H1.497A1.497 1.497 0 0 1 0 13.5v-11zM12 14c.37 0 .654-.211.853-.441.092-.106.147-.279.147-.531V2.5a.5.5 0 0 0-.5-.5h-11a.5.5 0 0 0-.5.5v11c0 .278.223.5.497.5H12z"/>
            <path d="M2 3h10v2H2V3zm0 3h4v3H2V6zm0 4h4v1H2v-1zm0 2h4v1H2v-1zm5-6h2v1H7V6zm3 0h2v1h-2V6zM7 8h2v1H7V8zm3 0h2v1h-2V8zm-3 2h2v1H7v-1zm3 0h2v1h-2v-1zm-3 2h2v1H7v-1zm3 0h2v1h-2v-1z"/>`,
        },
      ],
    };
  },

  created() {
    // set default active menu link
    if (this.activeLink === null)
      this.activeLink = this.links[0];
  }
}
</script>

<style scoped>
.nav__container {
  top: 0%;
  position: sticky;
  width: calc(20% - 40px);
  min-width: 250px;
  height: calc(100vh - 50px);
  background: #072125;

  padding: 25px 40px 25px 0;
}

.nav__logo {
  display: flex;
  align-items: center;
  user-select: none;
  padding-left: 25px;
  margin-bottom: 35px;
}

.nav__logo > img {
  margin-right: 15px;
  width: 40px;
  height: 40px;
}

a {
  text-decoration: none;
}

h1 {
  font-weight: 600;
  font-size: 1.8em;
  color: #42b983;
  margin: 0;

  transition: color .21s ease;
  cursor: pointer;
}

h1:hover {
  color: #2b9968;
}

.nav__links {
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
}

.link_active {
  background: var(--primary-color);
}
</style>
