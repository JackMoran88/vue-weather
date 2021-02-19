<template>
    <div class="main-layout">
        <v-search/>
        <v-card-board/>
        <v-alert/>
    </div>
</template>

<script>
    import {mapActions, mapGetters, mapMutations} from "vuex";
    import vCardBoard from '@/components/v-card-board'
    import vSearch from '@/components/v-search'
    import vAlert from '@/components/v-alert'

    export default {
        name: "MainLayout",
        components: {
            vCardBoard, vSearch, vAlert,
        }
    }
</script>

<style scoped lang="scss">
    @import url("https://fonts.googleapis.com/css2?family=Lato:wght@400;700&family=Varela+Round&display=swap");


    $bg: #e1e7f3;

    .main-layout {
        background: $bg;
        width: 100%;
        height: 100%;
        padding: 1rem;
    }


</style>


<style lang="scss">

    h1, h2, h3, h4, h5, h6 {
        margin: 0;
    }
</style>
