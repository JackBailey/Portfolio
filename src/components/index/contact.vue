<template>
    <div :class="page != null ? 'contact ' + page : 'contact'" id="contact">
        <router-link class="homeLink" to="/" v-if="page == null">Go Home</router-link>
        <h1>Contact Me</h1>
        <form action="https://api.jackbailey.uk/emailform" method="POST" v-if="!sent">
            <input placeholder="Your Name" type="text" name="name"/>
            <input placeholder="Your Email" type="email" name="email"/>
            <textarea placeholder="Your Message" type="text" name="emailBody"></textarea>
            <button :disabled="sent">Send</button>
            
        </form>
        <div class="response" v-if="sent">
            <p>{{success ? 'Thank you for getting in touch' : 'Error - your message was not sent - DM me on twitter if this issue persists'}}</p>
            <button @click="sent=false">{{success ? 'Send Another' : 'Try again'}}</button>
        </div>
        <div class="socials">
            <a href="https://github.com/Jack-Bailey/" target="_blank">
                <i class="fab fa-github"></i>
            </a>
            <a href="https://twitter.com/jackba_" target="_blank">
                <i class="fab fa-twitter"></i>
            </a>
            <a href="https://instagram.com/JackBailey.1/" target="_blank">
                <i class="fab fa-instagram"></i>
            </a>
            <router-link to="/discord">
                <i class="fab fa-discord"></i>
            </router-link>
        </div>

    </div>
</template>

<script>
export default{
    props: ["page"],
    data(){
        return {
            sent: false,
            success: false,
        }
    },
    mounted(){
        this.sent = this.$route.query.sent != null;
        this.success = this.$route.query.success == 'true';
    }
}
</script>

<style lang="scss" scoped>
    .contact {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;
        &.home{
            height: 80vh;
        }
        .homeLink{
            width: 300px;
            text-decoration: none;
            text-align: center;
            color: white;
        }
        h1{
            margin: 0;
            color: white;
        }
        form{
            margin-top: 20px;
            display: flex;
            flex-direction: column;
            width: 300px;
  
            input,
            textarea{
                width: 100%;
                background: var(--background);
                
                border: none;
                font: inherit;
                padding: 10px 15px;
                box-sizing: border-box;
                border: none;
                color: var(--foreground-light);
                margin: 3px 0;
                border-radius: 5px;
                box-shadow: 5px 5px 15px rgba(0,0,0,0.3);
                resize: none;
                &::placeholder{
                    opacity: 1;
                    color: var(--foreground-light);
                }
                &:focus{
                    outline: none;
                }
            }
            textarea{
                height: 150px;
            }   
        }
        button{
            padding: 10px 15px;
            box-sizing: border-box;
            border: 1px solid transparent;
            color: var(--foreground);
            width: 100%;
            background: var(--background);
            margin: 5px 0;
            border-radius: 5px;
            font-size: 16px;
            box-shadow: 2px 2px 10px rgba(0,0,0,0.2);
            transition: transform 200ms ease-in-out;
            cursor: pointer;
            font-weight: normal;
            &:hover{
                transform: scale(1.05);
            }
            &:disabled{
                background: #aaa;
                cursor: not-allowed;
            }
        }
        .response{
            display: flex;
            flex-direction: column;
            align-items: center;
            color: white;
            
            button{
                width: 300px;
                margin: 0 auto;
                background: var(--background);
                padding: 10px 15px;
                box-sizing: border-box;
                color: white;
                margin: 3px auto;
                border-radius: 10px;
                box-shadow: 5px 5px 10px rgba(0,0,0,0.3);
            }
        }
        .socials{
            width: 300px;
            display: flex;
            justify-content: space-around;
            a{
                text-decoration: none;
                margin: 5px 2px;
                padding: 4px;
                background: var(--background);
                flex-grow: 1;
                display: grid;
                place-items: center;
                border-radius: 2px;
                transition: transform 250ms ease-in-out;
                &:hover{
                    transform: translateY(-3px);
                }
                i{
                    color: var(--accent);
                }
            }
        }

    }
</style>
