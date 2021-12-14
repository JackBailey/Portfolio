<template>
    <div class="about" id="about">
        <div class="left">
            <h1>Hi! I’m Jack Bailey - Welcome to my portfolio</h1>
            <p>I’m a frontend website developer from the UK.</p>
            <p>I’ve been developing various projects in a variety of languages such as Python, JavaScript and C# for many years but over the past year I’ve discovered my passion for website development and have quickly built up my skillset and developed websites for a variety of individual people and businesses. </p>
            <p>Currently I’m mostly doing frontend website development and design but I also develop backends in Flask and integrations in Python.</p>
        </div>
        <div class="right">
            <img src="https://cdn.jackbailey.dev/logos/jb/blue.svg" alt="">
        </div>
    </div>
</template>


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