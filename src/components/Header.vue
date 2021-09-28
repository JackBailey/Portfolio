<template>
    <nav>
        <h1>
            <router-link id = "headerTitle" to ="/#main">
                <p>Jack Bailey</p>
                <img src = "../assets/blue-jb.svg"/>
            </router-link>
        </h1>
        <div id = "nav">
            <router-link @click="toggleNav()" to="/">Home<hr/></router-link>
            <router-link @click="toggleNav()" to="/contact">Contact<hr/></router-link>
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
        toggleNav(){
          nav.classList.toggle("active");
          hamburger.classList.toggle("active");
        }
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