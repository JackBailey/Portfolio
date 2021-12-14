<template>
    <div class="about" id="about">
        <div class="left">
            <h1>Hi! I’m Jack Bailey - Welcome to my portfolio</h1>
            <p>I’m a frontend website developer from the UK.</p>
            <p>I’ve been developing various projects in a variety of languages such as Python, JavaScript and C# for many years but over the past year I’ve discovered my passion for website development and have quickly built up my skillset and developed websites for a variety of individual people and businesses. </p>
            <p>Currently I’m mostly doing frontend website development and design but I also develop backends in Flask and integrations in Python.</p>
            <div class="status">
                <p>I'm currently
                    <span>{{status != "offline" ? 'online' : 'offline'}}</span>
                </p>
                <div class="blobContainer">
                    <span :title="{
                        'dnd': 'Do Not Disturb',
                        'online': 'Online',
                        'offline': 'Offline',
                        'idle': 'Idle'
                    }[status]" :class="'blob ' + status"></span>
                </div>
            </div>
        </div>
        <div class="right">
            <img src="https://cdn.jackbailey.dev/logos/jb/blue.svg" alt="">
        </div>
    </div>
</template>

<script>
export default{
    data(){
        return{
            status: ""
        }
    },
    mounted(){
        this.loop()
    },
    methods: {
        async getStatus(){
            var response = await fetch("https://api.lanyard.rest/v1/users/154608413412818944")
            var data = await response.json()
            this.status = data.data.discord_status
        },
        loop(){
            this.getStatus()
            setTimeout(() => {
                this.loop()
            }, 5000)
        }
    }
}
</script>

<style lang="scss" scoped>
.about{
    background: var(--background);
    display: grid;
    padding: 5% 10%;
    grid-template-columns: 1fr 1fr;
    .left{
        h1{
            color: var(--foreground);
        }
        p{
            color: var(--foreground-light);
        }
        .status{
            display: flex;
            .blobContainer{
                display: inline-grid;
                place-items: center;
            }
            .blob {
                display: inline-block;
                border-radius: 50%;
                box-shadow: 0 0 0 0 rgba(0, 0, 0, 1);
                margin: 10px;
                height: 20px;
                width: 20px;
                transform: scale(1);
                animation: pulse-black 2s infinite;
                --statusColor: 0, 255, 0;
               
                &.dnd{
                    --statusColor: 255, 0, 0;
                }
                &.online{
                    --statusColor: 0, 255, 0;
                }
                &.offline{
                    --statusColor: 100, 100, 100;
                }
                &.idle{
                    --statusColor: 255, 180, 0;
                }

                background: rgb(var(--statusColor));
            }

            @keyframes pulse-black {
                0% {
                    transform: scale(0.95);
                    box-shadow: 0 0 0 0 rgba(var(--statusColor), 0.7);
                }
                70% {
                    transform: scale(1);
                    box-shadow: 0 0 0 10px rgba(var(--statusColor), 0);
                }
                
                100% {
                    transform: scale(0.95);
                    box-shadow: 0 0 0 0 rgba(var(--statusColor), 0);
                }
            }
        }
    }
    .right{
        display: grid;
        place-items: center;
        img{
            height: 256px;
        }
    }
}
@media screen and (max-width: 800px){
    .about{
        padding: 5% 5%;
        display: block;
        .left{
            h1{
                font-size: 25px;
            }
            p{
                font-size: 16px;
            }
        }
        .right{
            display: none;
        }
    }
}
</style>