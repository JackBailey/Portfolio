<template>
    <div id="giscus" @theme-change="changeTheme">
        <Giscus
            repo="jackbailey/portfolio"
            repo-id="MDEwOlJlcG9zaXRvcnkzOTE2NzMzODI="
            category="Blog Comments"
            category-id="DIC_kwDOF1h2Js4CeLWz"
            mapping="pathname"
            emit-metadata="0"
            reactions-enabled="0"
            input-position="top"
            :theme="dark ? 'dark_dimmed' : 'light'"
            lang="en"
        />
    </div>
</template>

<script>
import Giscus from "@giscus/vue";
export default {
    components: {
        Giscus,
    },
    data() {
        return {
            dark: false,
        }
    },
    methods: {
        changeTheme(event) {
            this.dark = event.detail.dark;
        }
    },
    mounted() {
        if (localStorage.getItem("dark") !== null) {
            this.dark = localStorage.getItem("dark") === "true";
        } else {
            this.dark = (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) || false;
        }
    }
}
</script>