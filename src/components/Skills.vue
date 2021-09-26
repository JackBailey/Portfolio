<template>
    <div class = "skills">
        <h1>Skills</h1>
        <div class = "langs" >
            <div class = "lang" v-for="lang in langs" :key="lang.id">
                <div class = "langInner">
                    <img :src = "getImgUrl(lang.logo)"/>
                    <h1>{{lang.name}}</h1>
                    <div class = "skillLevel">
                        <hr :width="lang.skill+'%'"/>
                    </div>
                </div>        
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Skills",
    props: {
        langs: Array
    },
    methods: {
        getImgUrl(pic) {
            return require('../assets/languages/'+pic)
        }
    }
}
</script>

<style>
@import "../styles/Skills.css"
</style>