<template>
    <div class="discord">
        <h3 v-if="error == ''">Add me on discord</h3>
        <img v-if="error == ''" :src="avatar">
        <p v-if="error == ''">{{user.username}}<span>#{{user.discriminator}}</span></p>
        <p>{{error}}</p>
        <a href="https://discord.gg/lanyard" v-if="code == 'user_not_monitored'">Join the server to fix this</a>
        <router-link to="/">Go Home</router-link>
    </div>
</template>

<script>
export default{
    mounted(){
        this.getDiscord()
    },
    data(){
        return{
            user: {},
            avatar: "",
            error: "",
            code: ""
        }
    },
    methods: {
        async getDiscord(){
            
            // get params
            var params = new URLSearchParams(window.location.search)
            var user = params.get('user')
            console.log(user)
            if (!user){
                user = "154608413412818944"
            }


            var response =  await fetch(`https://api.lanyard.rest/v1/users/${user}`)
            var data = await response.json()
            if (data.success){
                var user = this.user = data.data.discord_user
                this.avatar = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.webp?size=256`
            }else{
                this.error = data.error.message
                this.code = data.error.code
            }
            
        }
    }
}
</script>

<style lang="scss" scoped>
.discord{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    h3{
        margin: 0;
        color: white;
        font-size: 25px;
    }
    img{
        margin: 10px 0;
        width: 128px;
        height: 128px;
        border-radius: 50%;
    }
    p{
        margin: 0;
        color: white;
        font-size: 60px;
        font-weight: bold;
        span{
            color: #591296;
            font-size: 40px;
        }
    }
    a{
        margin: 10px 0;
        color: white;
        text-decoration: none;
        font-weight: bold;
        background: #1a1e3b;
        padding: 10px;
        border-radius: 10px;
    }
}
</style>