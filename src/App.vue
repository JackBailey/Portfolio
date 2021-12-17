<template>
  <div class="background">
  </div>
  <router-view :dark="dark" :class="dark ? 'main dark' : 'main'"/>
  <div :class="dark ? 'theme dark' : 'theme'" @click="dark = !dark">
    <i class="fas fa-moon"></i>
  </div>
</template>

<script>

export default {
  watch: {
    '$route' (to, from) {
      document.title = to.meta.title + ' | Jack Bailey'
    }
  },
  data(){
    return {
      dark: false
    }
  },
  mounted(){
    // get computer dark mode setting

    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      this.dark = true
    }
    if (localStorage.getItem("dark") != null){
      this.dark = localStorage.getItem("dark") == "true"
    }
  },
  watch:{
    dark(value){
      localStorage.setItem('dark', value)
    }
  }
}
</script>

<style lang="scss">
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css");
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap');
html, body{ 
  margin: 0;
  padding: 0;
  color: black;
  scroll-behavior: smooth;
}
#app {
  font-family: 'Open Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0;
  padding: 0;
}
.background{
  position: fixed;
  top: 0;
  left: 0;
  background: #591296;
  background: -webkit-linear-gradient(top left, #591296, #7F59D8);
  background: -moz-linear-gradient(top left, #591296, #7F59D8);
  background: linear-gradient(to bottom right, #591296, #7F59D8);
  height: 100vh;
  width: 100vw;
  z-index: -1;
}
.main{
  z-index: 2;
  --foreground: black;
  --foreground-light: #444;
  --background: white;
  --accent: #591296;
  ::selection{
    background: var(--accent);
    color: white;
  }
  &.dark{
    --foreground-light: #ccc;
    --foreground: white;
    --background: #1a1e3b;
    --accent: #8362d1;
  }
}
.theme{
  position: fixed;
  bottom: 20px;
  right: 20px;
  color: #591296;
  cursor: pointer;
  font-size: 30px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  &.dark{
    color: white;
  }
}
</style>
