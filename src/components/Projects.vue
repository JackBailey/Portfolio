<template>
    <div class="projectsContainer">
        <h1>Projects</h1>
        <div class = "filters">
            <select name = "sort" id = "sort" @change="sortValues()">
                <option value = "updated">Updated</option>
                <option value = "created">Created</option>
                <option value = "alphabetical">Alphabetical</option>
            </select>
            <div id = "type" @click="toggleSort()" data-value = "descending"> 
                &darr;
            </div>
        </div>
        <div class = "projects">
            <div class = "project" v-for="project in projects" :key = "project.id">
                <div class = "projectInner">
                    <div class = "projectHeader">
                        <h1>
                            <a id = "projectLink" :href = "project.html_url">{{project.name}}</a>
                            <a v-show="project.homepage != null && project.homepage != ''" :href = "project.homepage">
                                <i class="fas fa-external-link-alt fa-sm"></i>
                            </a>
                            
                            </h1>
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
    methods: {
        getImgUrl(pic) {
            return require('../assets/'+pic)
        },
        toggleSort(){
            var type = document.getElementById("type");
            if (type.dataset.value == "ascending"){
                type.innerHTML = "&darr;";
                type.dataset.value = "descending";
            }else{
                type.dataset.value = "ascending";
                type.innerHTML = "&uarr;";
            }

            this.sortValues()
        },
        sortValues(){
            var sort = document.getElementById("sort");
            var type = document.getElementById("type").dataset;
            switch (sort.value){
                case "updated":
                    this.projects.sort(function(a,b) {
                        return a.updated_at < b.updated_at;
                    })
                    break;
                case "created":
                    this.projects.sort(function(a,b) {
                        return a.created_at < b.created_at;
                    })
                    break;

                case "alphabetical":
                    this.projects.sort(function(a,b) {
                        return a.name < b.name;
                    })
                    break;
            }
            if (type.value != "descending"){
                this.projects.reverse()
            }
            
        }
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
}
</script>

<style>
@import "../styles/Projects.css"
</style>