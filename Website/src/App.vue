<template>
  <Header/>
  <Background/>
  <router-view/>
</template>

<script>
import Header from './components/Header'
import Background from './components/Background'
export default{
  components: {
    Header,
    Background
  },
  watch: {
    '$route' (to, from) {
      document.title = to.meta.title + ' | Jack Bailey'
    }
  },

}

</script>



<style>
@import url('https://fonts.googleapis.com/css2?family=Work+Sans:wght@400;600;800&display=swap');

*{
  padding: 0;
  margin: 0;
  font-family: 'WOrk', sans-serif;
  --accentColor: rgb(77, 75, 199);
  color: white;
}

</style>
