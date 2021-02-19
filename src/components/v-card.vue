<template>
    <article class="card snippeter" @click="toggle" :class="{'detail': isOpen}">

        <div class="card__item card__item__center title">
            {{weather.name}}
            <span class="sub">{{weather.sys.country}}</span>
        </div>

        <div class="card__item main">
            <div class="temp">
                {{parseInt(weather.main.temp)}}<span>&#176</span>
            </div>
            <div class="description">
                <img :src="`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`"
                     :alt="weather.weather[0].main"
                     :title="weather.weather[0].main"
                >
            </div>
        </div>

        <div class="card__item feels">
            Ощущается как
            {{parseInt(weather.main.feels_like)}}&#176
        </div>

        <transition name="zoom" >
            <ul class="card__item list" v-show="isOpen">

                <li>
                    <span class="label">Ветер:</span>
                    <span class="text">{{weather.wind.speed}}м\с {{calcDeg(weather.wind.deg)}}</span>
                </li>
                <li>
                    <span class="label">Давление:</span>
                    <span class="text">{{weather.main.pressure}}мбар</span>
                </li>
                <li>
                    <span class="label">Влажность:</span>
                    <span class="text">{{weather.main.humidity}}%</span>
                </li>
            </ul>
        </transition>

        <transition name="zoom">
            <div class="buttons card__item__bottom" v-show="!isOpen">
                <button class="button" @click.stop="REMOVE_CITY(weather.id)">
                    <font-awesome-icon :icon="['fas', 'trash-alt']"/>
                </button>

                <button class="button MORE" @click.stop="">Подробнее</button>

                <button class="button" @click.stop="GET_WEATHER(weather.id)">
                    <font-awesome-icon :icon="['fas', 'redo-alt']"/>
                </button>
            </div>
        </transition>


    </article>
</template>

<script>
    import toCapitalize from '@/filters/toCapitalize'
    import {mapMutations, mapActions} from "vuex";

    export default {
        name: "v-card",
        props: {
            weather: {
                type: Object,
            }
        },
        filters: {
            toCapitalize
        },
        data() {
            return {
                isOpen: false,
                data: {
                    name: '',
                    country: '',
                    temp: '',
                    feels_like: '',
                    description: '',
                    icon: '',

                    wind: {
                        speed: '',
                        deg: '',
                    }
                }
            }
        },
        methods: {
            load() {
            },

            toggle() {
                this.isOpen = !this.isOpen
            },

            calcDeg(degree) {
                let compassSector = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW", "N"];

                this.data.wind.deg = compassSector[(degree / 22.5).toFixed(0)];


            },

            ...mapActions(['GET_WEATHER']),
            ...mapMutations(['REMOVE_CITY']),
        },
        mounted() {
            this.load()
        },
        watch:{
            'weather'(){
                this.load()
            }
        }
    }
</script>


<style scoped lang="scss">
    @import "../assets/scss/variables.scss";

    .card {
        width: $card__widht;
        height: 275px;
        padding: 2rem;
        border-radius: 65px;


        display: flex;
        flex-direction: column;
        cursor: pointer;

        &:hover {
            box-shadow: -2px -2px 4px rgba(56, 53, 45, .3), 2px 4px 4px hsla(0, 0%, 100%, .5), inset 1px 1px 1px rgba(224, 234, 249, .5);
            transform: scale(1.04);
        }

        .card__item {
            display: flex;
            padding: .25rem;
            width: 100%;

            &__center {
                align-self: center;
            }

            &__left {
                align-self: start;
            }

            &__right {
                align-self: end;
            }

            &__bottom {
                margin-top: auto !important;
            }

            span.sub {
                font-size: 12px;
            }

        }

        .card__item {
            &.title {
                font-size: 24px;
                font-weight: 500;
            }

            &.main {
                .temp {
                    font-size: 48px;
                    font-weight: 500;

                    width: 50%;
                }

                .description {
                    display: flex;
                    align-items: center;
                    justify-content: flex-end;
                    width: 50%;
                }
            }

            &.feels {
                font-size: 14px;
                font-weight: 500;
            }


            &.list {
                margin: 0;
                flex-direction: column;

                li {
                    list-style: none;
                    padding-bottom: 2px;

                    display: inline-flex;
                    align-items: center;

                    span {
                        font-size: 14px;
                    }

                    span.label {
                        padding: .25rem .3rem;
                        font-weight: 500;
                    }

                    span.text {
                        padding-left: .5rem;
                    }
                }
            }
        }

        button{
            background: transparent;
        }

    }


</style>

