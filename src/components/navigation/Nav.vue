<template>
  <div class="nav__container">
    <div class="nav__logo">
      <img draggable="false" src="@/assets/cryptocurrency.png" alt="logo" />
      <router-link to="/">
        <h1>Cryptoverse</h1>
      </router-link>
    </div>
    <div class="nav__links">
    </div>
  </div>
</template>

<style scoped>
.nav__container {
  width: calc(20% - 40px);
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
