<template>
    <div class="projectsContainer">
        <h1>Projects</h1>
        <div class = "projects">
            <div class = "project" v-for="project in projects" :key = "project.id">
                <div class = "projectInner">
                    <div class = "projectHeader">
                        <h1><a :href = "project.html_url">{{project.name}}</a></h1>
                        <div class = "languages">
                            <span :title = "language.name" v-for="language in project.languages">
                                <a :href = "languageInfo[language]['url']">
                                    <img :src = "getImgUrl(languageInfo[language]['logo'])"/>
                                </a>
                            </span>
                        </div>
                    </div>
                    <p>{{project.description}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Projects",
    props: {
        projects: Array
    },
    data () {
        return{
            languageInfo: {
                "JavaScript":{
                    "logo":"languages/javascript.svg",
                    "url":"https://www.javascript.com/"
                },
                "CSS":{
                    "logo":"languages/css3.svg",
                    "url":"http://css3.com"
                },
                "Batchfile":{
                    "logo":"languages/windows.svg",
                    "url":"https://wikipedia.org/wiki/Batch_file"
                },
                "PHP":{
                    "logo":"languages/php.svg",
                    "url":"https://www.php.net/"
                },
                "C#":{
                    "logo":"languages/csharp.svg",
                    "url":"https://docs.microsoft.com/en-us/dotnet/csharp/"
                },
                "Python":{
                    "logo":"languages/python.svg",
                    "url":"https://www.python.org/"
                },
                "HTML":{
                    "logo":"languages/html.svg",
                    "url":"https://html.com/"
                },
                "VBScript":{
                    "logo":"languages/vba.svg",
                    "url":"https://docs.microsoft.com/en-us/office/vba/library-reference/concepts/getting-started-with-vba-in-office"
                },
                "Vue":{
                    "logo":"languages/vue.svg",
                    "url":"https://v3.vuejs.org/"
                }
            }
        }
    },
    methods: {
        getImgUrl(pic) {
            return require('../assets/'+pic)
        }
    }
}
</script>

<style>
@import "../styles/Projects.css"
</style>