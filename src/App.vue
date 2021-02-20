<template>
    <div id="app">
        <component :is="layout">
            <router-view/>
        </component>
    </div>
</template>

<script>
    import MainLayout from "@/layouts/MainLayout";
    import DetailLayout from "@/layouts/DetailLayout";

    export default {
        components: {
            MainLayout, DetailLayout,
        },
        computed: {
            layout() {
                return this.$route.meta.layout || 'MainLayout'
            }
        },
    }
</script>

<style>
    @import "https://unpkg.com/neomorphism@0.0.2/dist/neomorphism.css";
</style>

<style lang="scss">
    @import "assets/scss/variables.scss";

    html {
        min-height: 100%;
        height: 100%;
    }

    body {
        width: 100%;
        margin: 0;
    }

    body {
        &, & #app, & #app > * {
            min-height: 100vh;
        }
    }

    #app {
        width: 100%;
    }


    * {
        box-sizing: border-box;
    }


</style>
