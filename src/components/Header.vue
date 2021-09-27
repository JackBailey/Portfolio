<template>
    <nav>
        <h1>
            <router-link id = "headerTitle" to ="/">
                <p v-if = "!isMobile">Jack Bailey</p>
                <img src = "../assets/blue-jb.svg" v-else/>
            </router-link>
        </h1>
        <div id = "nav">
            <router-link @click="hideNav()" to="/">Home<hr/></router-link>
            <router-link @click="hideNav()" to="/contact">Contact<hr/></router-link>
        </div>
        <a id = "hamburger" class = "hamburger" @click="toggleNav()">
            <hr>
            <hr>
            <hr>
        </a>
    </nav>
    
</template>
<script>
export default {
    methods : {
        hideNav() {
            nav.classList.remove("active")
            hamburger.classList.remove("active")
        },
        toggleNav(){
          nav.classList.toggle("active");
          hamburger.classList.toggle("active");
        },
        onResize() {
            this.windowHeight = screen.width
        },
        getImgUrl(pic) {
            return require('../assets/'+pic)
        },
    },
    data () {
        return{
            nav: document.getElementById("nav"),
            hamburger: document.getElementById("hamburger"),
            mobileWidth: window.innerWidth < 800
        }      
    },
    mounted() {
        window.addEventListener('resize', () => {
            this.mobileWidth = window.innerWidth < 800
        })
    },
    computed: {
        isMobile() {
            return this.mobileWidth
        }
    }
}
</script>

<style scoped>
@import "../styles/Header.css";
</style>