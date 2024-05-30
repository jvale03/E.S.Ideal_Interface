<script>
import Clock from './components/Clock.vue';
import NavBar from './components/Navbar.vue';

export default {
  components: {
    Clock,
    NavBar
  }
}
</script>

<template>
  <div class="background">
    <router-view></router-view>
    <NavBar />
  </div>
</template>

<style scoped>
.background {
  background-image: url('../../imgs/background.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  height: 100vh;
  width: 100vw;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.imagem {
  max-width: 100%; 
  max-height: 100%; 
}
</style>
