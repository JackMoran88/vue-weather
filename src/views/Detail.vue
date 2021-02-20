<template>
    <div class="detail" v-if="DETAILED_WEATHER.city">



    </div>
</template>

<script>
    import {mapActions, mapGetters, mapMutations} from "vuex";

    export default {
        name: "Detail",
        components: {},
        props: {
            id: {
                type: Number
            }
        },
        data() {
            return {}
        },
        methods: {
            load() {
                if (!this.id) {
                    console.log('id not found')
                    return
                }
                this.loadInfo()
            },
            loadInfo() {
                this.GET_DETAILED_WEATHER(this.id)
            },
            ...mapActions(['GET_DETAILED_WEATHER'])
        },
        computed: {
            ...mapGetters(['DETAILED_WEATHER'])
        },
        mounted() {
            this.load()
        },

    }
</script>

<style scoped lang="scss">

</style>
