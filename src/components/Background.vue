<template>
    <div>
        <img class = "bottomLeft" src="../assets/bottomLeft.webp"/>
        <img class = "topRight" src="../assets/topRight.webp"/>
    </div>
</template>

<style scoped>
div{
    height: 100vh;
    background: rgb(15, 15, 37);
    position: fixed;
    width: 100%;
    z-index: -10;
}
div img{
    width: 450px;
    height: auto;
    position: absolute;
}

div img.bottomLeft{
    left: 0;
    bottom: 0;
}

div img.topRight{
    top: 0;
    right: 0;
}
</style>