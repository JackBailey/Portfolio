<template>
    <div class="intro" id="intro">
        <h1>Hi, I'm Jack Bailey</h1>
        <p class="subtitle">I design & develop attractive, functional websites.</p>
        <nav>
            <a href="#about">About</a>
            <span>&#8226;</span>
            <a href="#projects">Projects</a>
            <span>&#8226;</span>
            <a href="#contact">Contact</a>
            <span>&#8226;</span>
            <router-link to="/credits">Credits</router-link>
        </nav>
        <a href="#about" class="downArrow">
            <p>Explore More</p>
            <i class="fas fa-chevron-down"></i>
        </a>
    </div>
</template>

<style lang="scss" scoped>
    .intro{
        height: 100vh;
        color: white;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 0 10%;
        h1{
            margin: 0;
            font-size: 60px;
        }
        .subtitle{
            margin: 0;
            font-size: 30px;
            font-weight: 300;
            font-style: italic;
        }
        nav{
            margin-top: 20px;
            a{
                margin: 0 10px;
                text-decoration: none;
                color: white;
                position: relative;
                &::after{
                    content: "";
                    display: block;
                    position: absolute;
                    bottom: -10px;
                    left: auto;
                    right: 0;
                    width: 0%;
                    height: 2px;
                    background: white;
                    margin: 10px 0;
                    transition: all .3s ease-in-out;
                }
                &:hover::after{
                    left: 0;
                    right: auto;
                    width: 100%;
                }
            }
        }
        .downArrow{
            text-decoration: none;
            color: white;
            position: absolute;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            p{
                margin: 5px 0;
            }
            > i{
                width: 100%;
                text-align: center;
                font-size: 30px;
            }
        }
    }
    @media screen and (max-width: 800px){
        .intro{
            padding: 0 5%;
            h1{
                font-size: 50px;
            }
            .subtitle{
                font-size: 25px;
            }
            nav{
                margin-top: 10px;
            }
        }
    }
</style>