<template>
    <div class="v-chart snippeter" v-if="data && data.x.length > 1">
        <div class="v-chart__header">
            <h5> График температуры за {{hours.len}} часов</h5>
        </div>

        <div class="v-chart__body"
             :style="{width: `${this.hours.len * this.hours.offset}px`, height:`${Math.max(...this.hours.y) + 100}px`}"
        >
            <v-chart-element
                    v-for="index in 40" :key="index"

                    :text="`${hours.text[index-1]}`"
                    :number="index-1"
                    :y="hours.y[index-1]"
                    :offset="hours.offset"
            />
        </div>
    </div>
</template>

<script>
    import {mapGetters} from "vuex";
    import vChartElement from '@/components/charts/v-chart-element'

    export default {
        name: "v-chart",
        components: {
            vChartElement,
        },
        data() {
            return {
                data: {
                    x: [],
                    y: [],
                    tempMin: 0,
                },

                hours: {
                    text: [],
                    y: [],
                    offset: 32,
                    len: 40,
                }
            }
        },
        methods: {
            load() {
                this.DETAILED_WEATHER.list.forEach((value, index) => {
                    this.$set(this.data.x, index, (new Date(value.dt * 1000).getHours()))
                    this.$set(this.data.y, index, value.main.temp)
                })
                this.loadChart()
            },
            loadChart() {
                //Минимальная температура
                this.$set(this.data, 'tempMin', Math.min(...this.data.y))
                //Длина выборки
                this.$set(this.hours, 'len', this.DETAILED_WEATHER.list.length)
                //Координаты по y
                this.$set(this.hours, 'y', this.data.y.map((value) => {
                    return value / this.data.tempMin * 200
                }))

                //Округленная температура
                this.$set(this.hours, 'text', this.data.y.map((value) => {
                    return Math.round(value)
                }))
            }
        },
        computed: {
            ...mapGetters(['DETAILED_WEATHER'])
        },
        mounted() {
            this.load()
        },
        watch: {
            'DETAILED_WEATHER'() {
                this.load()
            }
        }
    }
</script>

<style scoped lang="scss">

    .v-chart {
        overflow-x: auto;
        overflow-y: hidden;
        width: 100%;

        display: flex;
        flex-direction: column;

        &__header {
            padding: 1rem;
            text-align: center;
        }

        &__body {
            position: relative;
            width: 100%;
            height: 100%;

            margin: 0 auto;
        }

    }


</style>
