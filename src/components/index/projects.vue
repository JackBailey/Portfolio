<template>
    <div class="projects" id="projects">
        <h1>My Projects</h1>
        <div class="projectsInner">
            <div class="project" v-for="project in projects" :key="project">
                <div class="projectTitle">
                    <h1>{{project.name}}</h1>
                    <span v-if="['contracted','commisioned'].includes(project.type)" :title="'This project is ' + project.type">
                        <i class="fas fa-hand-holding-usd"></i>
                    </span>
                </div>
                <p class="role">{{project.role}}</p>
                <p class="date">{{project.started}}{{!project.ended ? ' - Present' : project.ended != project.started ? ' - ' + project.ended : ''}}</p>
                <a :href="link.url" v-for="link in project.links" :key="link.name">{{link.name}}</a>
                <span :title="language.name" class="language" v-for="language in project.languages" :key="language.name">
                    <img :src="language.logo"/>                        
                </span>
            </div>
        </div>
    </div>
</template>

<script>
export default{
    data(){
        return{
            projects: [],
            loading: true
        }
    },
    mounted() {
        this.getProjects()
    },
    methods: {
        async getProjects(){
            var response =  await fetch("https://api.jackbailey.uk/projects")
            var data = await response.json()

            var projects = []
            function convertDate(date){
                if (!date){
                    return date
                }else{
                    var date = new Date(date)
                    var year = date.getFullYear()
                    var month = date.toLocaleString('default', { month: 'long' }, { year : "long"})
                    return `${month} ${year}`
                }
            }


            data = data.sort((a,b) => {
                if (!a.ended){
                    return false
                }else if (a.ended > b.ended){
                    return false
                }else{
                    return true
                }
            })

            data.forEach(project => {
                project.started = convertDate(project.started)
                project.ended = convertDate(project.ended)
                projects.push(project)
            })
            
            this.projects = projects
        }
    }
                
}
</script>

<style lang="scss" scoped>
.projects{
    background: var(--background);
    padding: 5% 10%;
    > h1{
        text-align: center;
        margin: 0;
        color: var(--foreground);
        margin-bottom: 30px;
    }
    .projectsInner{
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        .project{
            .projectTitle{
                display: flex;
                align-items: center;
                h1{
                    font-size: 24px;
                    font-weight: bold;
                    color: var(--foreground);
                    margin: 2px 0;
                }
                i{
                    margin-left: 5px;
                    color: var(--accent);
                }
            }
            p{
                color: var(--foreground-light);
                padding: 3px 0;
                margin: 0;
                &.role{
                    color: var(--foreground-light);
                    font-weight: 500;
                }
            }
            a{
                text-decoration: none;
                color: var(--accent);
                display: block;
                font-weight: bold;
            }
            .language{
                display: inline-block;
                margin: 5px;
                img{
                    width: 40px;
                    height: 40px;
                }
            }
        }
    }
}
@media screen and (max-width: 800px){
    .projects{
        padding: 5% 5%;
        .projectsInner{
            .project{
                margin: 10px 0;
                text-align: center;
                .projectTitle{
                    justify-content: center;
                }
            }
        }
    }
}
</style>