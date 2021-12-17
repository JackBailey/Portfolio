<template>
    <div class="credits">
        <div class="creditsInner">
            <h1>Credits</h1>
            <h2>I'm self-taught via (mostly) free online resources, these are the people/things that helped get me where I am now</h2>
            <ul>
                <li>
                    Wordpress - Made me realise I loved making websites - but wordpress is not the way I like to do it
                </li>
                <li>
                    <a href="https://www.youtube.com/channel/UCFbNIlppjAuEX4znoulh0Cw">Web Dev Simplified</a>
                    and <a href="https://www.youtube.com/user/KepowOb">Kevin Powell</a> for creating interesting, helpful videos that helped me a lot.        
                </li>
                <li>
                    <a href="https://oxide.host">My server host</a> for providing great VPS and Email hosting.
                </li>
                <li>
                    Google and Stack Overflow for providing great resources and answers to my questions.
                </li>
                <li>
                    <a href="https://github.com/phineas/lanyard">Phineas</a> for creating Lanyard which I use for my online and spotify status.
                </li>
                <li>
                    <a href="https://code.visualstudio.com">VSCode</a> for being my main IDE for development - as well as my many, many extensions.
                </li>
                <li>
                    <a href="https://script-ware.com">AzuLX</a> for encouraging me to learn Vue for ScriptWare.
                </li>
                <li>
                    <a href="https://youtube.com/codcrafted">CodCrafted</a> for providing free penetration testing.
                </li>
            </ul>
            <router-link to="/">Go Home</router-link>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.credits{
    height: 100vh;
    width: 100vw;
    display: grid;
    place-items: center;
    .creditsInner{
        text-align: center;
        background: var(--background);
        color: var(--foreground);
        padding: 20px;
        border-radius: 10px;
        box-shadow: 3px 3px 10px 3px rgba(0,0,0,0.5);
        h1, h2{
            margin: 0;
        }
        h2{
            font-weight: normal;
            font-size: 20px;
            margin: 10px 0;
        }
        ul{
            text-align: left;
            li{
                margin: 5px 0;
                list-style-type: "- ";
                a{
                    color: var(--accent);
                    text-decoration: none;
                }
            }
        }
        > a{
            margin: 10px 0;
            color: var(--accent);
            text-decoration: none;
            font-weight: bold;
        }
    }
}
@media screen and (max-width: 800px){
    .credits{
        .creditsInner{
            width: 80%;
            max-height: 90vh;
            overflow-y: scroll;
            h1{
                font-size: 30px;
            }
            h2{
                font-size: 20px;
            }
            ul{
                li{
                    font-size: 15px;
                    margin: 5px 0;
                }
            }
        }
    }
}
</style>