<template>
  <div class="container">
    <span class="loader"></span>
  </div>
</template>

<script>
export default {
  name: "LoaderComponent",
}
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  background: #f0f5f2;
  height: 100vh;
  width: 100%;
  color: var(--primary-color);
  user-select: none;
}

.loader {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: var(--primary-color);
  box-shadow: 32px 0 var(--primary-color), -32px 0 var(--primary-color);
  position: relative;
  animation: flash 0.5s ease-out infinite alternate;
}

@keyframes flash {
  0% {
    --opacity-color: #affcd99a;
    background-color: var(--opacity-color);
    box-shadow: 32px 0 var(--opacity-color), -32px 0 var(--primary-color);
  }
  50% {
    --opacity-color: #affcd99a;
    background-color: var(--primary-color);
    box-shadow: 32px 0 var(--opacity-color), -32px 0 var(--opacity-color);
  }
  100% {
    --opacity-color: #affcd99a;
    background-color: var(--opacity-color);
    box-shadow: 32px 0 var(--primary-color), -32px 0 var(--opacity-color);
  }
}
</style>
