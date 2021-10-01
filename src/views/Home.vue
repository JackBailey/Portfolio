<template>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" integrity="sha512-1ycn6IcaQQ40/MKBW2W4Rhis/DbILU74C1vSrLJxCq57o941Ym01SwNsOMqvEBFlcgUa6xLiPY/NS5R+E6ztJQ==" crossorigin="anonymous" referrerpolicy="no-referrer" />   
  <div class = "intro" id = "main">
  <div class = "main" >
    <img src = "../assets/white-outline.webp"/>
    <div class = "mainHeader">
        <h1>Hi! I'm Jack Bailey<span id = "statusText"><div id = "status" class = "status"></div></span></h1>
        <h3>I'm a Developer</h3>
        <p id = "desc" class = "desc">I'm a Student Full Stack Developer from the UK and this is my website. Here you can get in contact with me, read about my projects and get a general feel of who I am.</p>
        <div class = "socials">
            <a href = "https://jackb.link/github"><i class="fab fa-github"></i></a>
            <a href = "https://jackb.link/twitter"><i class="fab fa-twitter"></i></a>
            <a href = "https://jackb.link/insta"><i class="fab fa-instagram"></i></a>
            <a href = "https://jackb.link/donate"><i class="fas fa-mug-hot"></i></a>
            <a href = "https://glymps.xyz/discord"><i class="fab fa-discord"></i></a>
            <router-link to = "/contact"><i class="far fa-envelope"></i></router-link>
        </div>
        <sub>(Hover on me)</sub>
      </div> 
    </div>
  </div>
  <Skills :langs = "langs"/>
  <Projects :projects = "projects" :langs = "langs"/>
</template>

<script>
import Projects from '../components/Projects'
import Skills from '../components/Skills'

export default {
  name: 'Home',
  components: {
    Projects,
    Skills
  },
  methods: {
      async fetchProjects(){
        const res = await (await fetch("https://api.jackbailey.uk/github/lite-repos")).json()

        return res.sort(function(a,b) {
            return a.updated_at < b.updated_at;
        })

      },
      getLangs(){
          var langs = [
            {
                "name":"Windows",
                "logo":"windows.svg",
                "skill":100,
                "id":0,
                "url":"https://windows.com"
            },
            {
                "name":"Python",
                "logo":"python.svg",
                "skill":90,
                "id":1,
                "url":"https://www.python.org/"
            },
            {
                "name":"Linux",
                "logo":"linux.svg",
                "skill":80,
                "id":2,
                "url":"https://www.linux.org/"
            },
            {
                "name":"HTML",
                "logo":"html.svg",
                "skill":75,
                "id":3,
                "url":"https://html.com/"
            },
            {
                "name":"CSS",
                "logo":"css3.svg",
                "skill":70,
                "id":4,
                "url":"http://css3.com"
            },
            {
                "name":"JavaScript",
                "logo":"javascript.svg",
                "skill":60,
                "id":5,
                "url":"https://www.javascript.com/"
            },
            {
                "name":"C#",
                "logo":"csharp.svg",
                "skill":20,
                "id":6,
                "url":"https://docs.microsoft.com/en-us/dotnet/csharp/"
            },
            {
                "name":"Vue",
                "displayname":"VueJS",
                "logo":"vue.svg",
                "skill":30,
                "id":7,
                "url":"https://v3.vuejs.org/"
            },
            {
                "name":"Batchfile",
                "logo":"windows.svg",
                "skill":35,
                "id":8,
                "url":"https://wikipedia.org/wiki/Batch_file"
            },
            {
                "name":"PHP",
                "logo":"php.svg",
                "skill":15,
                "id":9,
                "url":"https://www.php.net/"
            },
            {
                "name":"VBScript",
                "logo":"vba.svg",
                "skill":10,
                "id":10,
                "url":"https://docs.microsoft.com/en-us/office/vba/library-reference/concepts/getting-started-with-vba-in-office"
            }
        ]

        langs.sort(function(a,b) {
            return a.skill < b.skill;
        })

        return langs
    }
  },
  data () {
        return{
            projects: [],
            langs: [],
        }
  },
  async created(){
      this.projects = await this.fetchProjects()
      this.langs = this.getLangs()
    }
}  
</script>

<style scoped>
 @import "../styles/Home.css"
</style>

