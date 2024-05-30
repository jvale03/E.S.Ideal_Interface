<template>
  <div class="clock">
    {{ time }}
  </div>
  <div class="clock">
    {{ date }}
  </div>
</template>
  
  <script>
  export default {
    data() {
      return {
        time: new Date().toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' }),
        date: new Date().toLocaleDateString('pt-PT', { day: '2-digit', month: '2-digit' })
      };
    },
    created() {
      this.timer = setInterval(() => {
        const now = new Date();
        this.time = now.toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' });
        this.date = now.toLocaleDateString('pt-PT', { day: '2-digit', month: '2-digit' });
      }, 1000);
    },
    beforeDestroy() {
      clearInterval(this.timer);
    }
  }
  </script>

<style scoped>
.clock {

font-size: 1.1rem; 
font-weight: 600;
text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
color: white;

}
</style>
