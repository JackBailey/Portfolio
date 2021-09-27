<template>
    <nav>
        <h1>
            <router-link id = "headerTitle" to ="/">
                <p>Jack Bailey</p>
                <img src = "../assets/blue-jb.svg"/>
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
        getImgUrl(pic) {
            return require('../assets/'+pic)
        },
    },
    data () {
        return{
            nav: document.getElementById("nav"),
            hamburger: document.getElementById("hamburger")
        }      
    },
    
}
</script>

<style scoped>
@import "../styles/Header.css";
</style>