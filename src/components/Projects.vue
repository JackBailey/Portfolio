
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
            <div class = "project" v-for="project in projects" :key = "project.id" v-show="!project.fork && !excluded.includes(project.name)">
                <div class = "projectInner">
                    <div class = "projectHeader">
                        <h1>
                            <a id = "projectLink" :href = "project.html_url">{{project.name}}</a>
                            <a v-show="project.homepage != null && project.homepage != ''" :href = "project.homepage">
                                <i class="fas fa-external-link-alt fa-sm"></i>
                            </a>
                            
                            </h1>
                        <div class = "languages">
                            <span :title = "getLangs(language)['name']" v-for="language in project.languages" >
                                <a v-if = "getLangs(language)" :href = "getLangs(language)['url']">
                                    <img :src = "getLangs(language)['logo']"/>
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
        projects: Array,
        langs: Array
    },
    methods: {
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
            
        },
        getLangs(specifiedLang) {
            var result = false
            this.$props.langs.forEach(function(lang){
                if (lang.name === specifiedLang){
                    result = {
                        "name": lang.displayname != null ? lang.displayname : lang.name,
                        "url": lang.url,
                        "logo": require("../assets/languages/"+lang.logo)
                    }
                }
            })
            if (!result){
                console.log(specifiedLang + " does not have an image or url - omitting")
            }
            return result
        }
    },
    data () {
        return {
            excluded: ["jack-bailey"]
        }
    }
}
</script>

<style>

@import "../styles/Projects.css"
</style>