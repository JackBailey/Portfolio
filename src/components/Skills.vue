<template>
    <div class = "skills">
        <h1>Skills</h1>
        <div class = "langs" >
            <div class = "lang" v-for="lang in enabledLangs.splice(0,10)" :key="lang.id">
                <div class = "langInner">
                    <a :href = "lang.url"><img :src = "getImgUrl(lang.logo)"/></a>
                    <h1 v-text = "lang.displayname != null ? lang.displayname : lang.name"></h1>
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
    data() {
        return {
            langsToUse: [
                "Windows",
                "Python",
                "Linux",
                "HTML",
                "CSS",
                "JavaScript",
                "Vue",
                "C#",
            ]
        }
    },
    methods: {
        getImgUrl(pic) {
            return require('../assets/languages/'+pic)
        }
    },
    computed: {
        enabledLangs() {
            var enabled = this.langs.filter(lang => this.langsToUse.includes(lang.name)).slice(0,8)
            return enabled
        }
    }
}
</script>

<style>
@import "../styles/Skills.css"
</style>