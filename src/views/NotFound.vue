<template>
    <div class="notFound">
        <h1>404</h1>
        <h2>Page not found</h2>
        <p>The page you are looking for does not exist.</p>
        <router-link to="/">Go back to the homepage</router-link>
    </div>
</template>

<style lang="scss" scoped>
    .notFound{
        height: 100vh;
        width: 100vw;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        color: white;
        h1, h2, p, a{
            width: max-content;
        }
        h1{
            font-size: 100px;
            margin: 0;
        }
        h2{
            font-size: 30px;
            margin: 0;
        }
        p{
            font-size: 20px;
            margin: 10px 0;
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