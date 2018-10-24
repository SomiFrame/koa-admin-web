<template>
  <div id="app">
    <router-view/>
    <vue-particles color="#331994"></vue-particles>
  </div>
</template>

<style lang="scss">
* {
    box-sizing: border-box;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#particles-js {
    position: fixed;
    width: 100vw;
    height: 100vh;
    z-index: -1;
    left: 0;
    top: 0;
}
</style>
