<template>
  <div class="mainPage">
    <Intro class="item"/>
    <img class="wavyDivider" :src="dark ? getImg('waves-dark.svg') : getImg('waves-white.svg')">
    <About class="item"/>
    <Projects class="item"/>
    <img class="straightDivider" :src="dark ? getImg('tilt-dark.svg') : getImg('tilt-white.svg')">
    <Contact :page="'home'" class="item"/>
  </div>
</template>

<script>
import Intro from "@/components/index/intro.vue"
import About from "@/components/index/about.vue"
import Projects from "@/components/index/projects.vue"
import Contact from "@/components/index/contact.vue"
export default{
  props: ["dark"],
  components: {
    Intro,
    About,
    Projects,
    Contact
  },
  methods: {
    getImg(image){
      return require(`@/assets/${image}`)
    }
  },
  mounted(){
    var observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        function toTitleCase(str) {
          return str.replace(
            /\w\S*/g,
            function(txt) {
              return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            }
          );
        }
        if (entry.isIntersecting) {      
          if (entry.target.id !== "intro"){
            document.title = toTitleCase(entry.target.id) + " | Jack Bailey"
          }else{
            document.title = "Jack Bailey"
          }
        }
      });
    });

    var elements = this.$el.querySelectorAll('.item');

    elements.forEach(element => {
      observer.observe(element);
    })
  }
}
</script>

<style lang="scss" scoped>
.mainPage{
  overflow-x: hidden;
}
.straightDivider {
  vertical-align: bottom
}
.wavyDivider{
  vertical-align: bottom;
  width: 100vw;
}
</style>