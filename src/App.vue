<template>
  <div id="app">
    <MainView/>
  </div>
</template>

<script>
import MainView from './views/MainView.vue'
export default {
  components: { MainView },
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background-color: #f4f2f0;
}
</style>
