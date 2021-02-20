<template>
    <div class="flex-container">
        <h3 v-if="WEATHER.length <= 0">Чтобы добавить город, введить название в строке поиска</h3>
        <v-card
                v-else
                v-for="city in WEATHER"
                :weather="city"
        />
    </div>
</template>

<script>
    import {mapActions, mapGetters, mapMutations} from "vuex";
    import vCard from '@/components/v-card'
    export default {
        name: "v-card-board",
        components:{
            vCard,
        },
        methods: {
            load(){
                this.loadWeather()
            },
            loadWeather(){
                for (let city of this.SELECTED) {
                    this.GET_WEATHER(city)
                }
            },

            ...mapActions(['GET_WEATHER']),
            ...mapMutations(['REMOVE_CITY']),
        },
        computed: {
            ...mapGetters(['WEATHER', 'SELECTED'])
        },
        mounted() {
            console.log(document.cookie)
            this.load()
        },
    }
</script>

<style scoped lang="scss">
    @import "../assets/scss/variables.scss";

    .flex-container {
        display: flex;
        flex-wrap: wrap;

        justify-content: center;

        > * {
            margin: 1rem;
        }

    }


</style>


