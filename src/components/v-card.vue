<template>
    <article class="card container" @click="toggle" :class="{'detail': isOpen}">
        <div class="card__state" :class="data.state"></div>

        <v-weather-snow v-if="data.state === 'Snow'"/>
        <v-weather-rain v-if="data.state === 'Rain'"/>

        <div class="card__item card__item__center title">
            <span :title="weather.name">{{weather.name}}</span>
        </div>

        <div class="card__item main">
            <div class="temp">
                {{parseInt(weather.main.temp)}}<span>&#176;C</span>
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
            {{parseInt(weather.main.feels_like)}}&#176;
        </div>

        <transition name="translateY" mode="out-in">
            <ul class="card__item list" v-if="isOpen || !buttons" :key="1">

                <li>
                    <span class="label">Ветер:</span>
                    <span class="text">{{weather.wind.speed}}м\с </span>
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
            <div class="card__buttons card__item__bottom" v-if="!isOpen && buttons" :key="0">
                <v-button @click.native.stop="REMOVE_CITY(weather.id)"
                          icon="trash-alt"
                />

                <router-link
                        :to="{name: 'Detail', params:{id: weather.id}}"
                >
                    <v-button
                            class="MORE"
                            text="Подробнее"
                    />
                </router-link>

                <v-button
                        icon="redo-alt"
                        @click.native.stop="GET_WEATHER(weather.id)"
                />
            </div>
        </transition>

    </article>
</template>

<script>
import toCapitalize from '@/filters/toCapitalize'
import { mapMutations, mapActions, mapGetters } from 'vuex'
import vWeatherSnow from '@/components/weathers/v-weather-snow'
import vWeatherRain from '@/components/weathers/v-weather-rain'
import vButton from '@/components/elements/buttons/v-button'

export default {
  name: 'v-card',
  components: {
    vWeatherSnow, vWeatherRain, vButton
  },
  props: {
    weather: {
      type: Object
    },
    buttons: {
      type: Boolean,
      default: true
    }
  },
  filters: {
    toCapitalize
  },
  data () {
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
          deg: ''
        },

        state: ''
      }
    }
  },
  methods: {
    load () {
      this.data.state = this.weather.weather[0].main
    },

    toggle () {
      if (!this.buttons) {
        return
      }
      this.isOpen = !this.isOpen
    },
    ...mapActions(['GET_WEATHER']),
    ...mapMutations(['REMOVE_CITY'])
  },
  mounted () {
    this.load()
  },
  computed: {
    ...mapGetters(['WEATHER'])
  },
  watch: {
    'WEATHER' () {
      this.load()
    }
  }
}
</script>

<style scoped lang="scss">
    @import "../assets/scss/variables.scss";

    .card {
        width: $card__width;
        height: 275px;
        padding: 2rem;
        border-radius: 65px;

        display: flex;
        flex-direction: column;
        cursor: pointer;

        &:hover {
            box-shadow: $shadow-main;
            transform: scale(1.02);
        }

        /* Состояния погоды */
        &__state {
            position: absolute;
            height: 100%;
            width: 100%;
            top: 0;
            left: 0;

            &.Clear {
                box-shadow: inset 120px 120px 100px -120px rgba(255, 166, 0, 0.2) !important;
            }

            &.Clouds {
                box-shadow: inset 120px 120px 100px -120px rgba(211, 211, 211, .5);
            }

            &.Snow {
                box-shadow: inset 120px 120px 100px -120px rgba(248, 248, 255, 1);
            }

            &.Rain {
                box-shadow: inset 120px 120px 100px -120px rgba(196, 211, 239, .5);
            }
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
                margin-top: auto;
            }

            span.sub {
                font-size: 12px;
            }

        }

        .card__item {
            &.title {
                font-size: 24px;
                font-weight: 500;
                line-height: 32px;
                white-space: nowrap;
                span{
                    overflow-x: hidden;
                    text-overflow: ellipsis;
                }
            }

            &.main {
                .temp {
                    display: flex;

                    font-size: 48px;
                    font-weight: 500;

                    width: 50%;

                    > span{
                        padding: .5rem 0;
                        font-size: 22px;
                    }
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
                    margin: .25rem 0;

                    span {
                        font-size: 14px;
                    }

                    span.label {
                        padding: .25rem .3rem;
                        padding-left: 0;

                        font-weight: 500;
                        background: transparent;

                        box-shadow: none;
                    }

                    span.text {
                        padding-left: .5rem;
                    }
                }
            }
        }

    }

    /* Капли под контентом */
    .card {
        /* Капли в карточке */
        position: relative;

        .card__item, .card__buttons {
            position: relative;
            z-index: 999999;
        }
    }

    .card__buttons {
        * > {
            margin: 0 .5rem !important;
        }

        display: flex;
        justify-content: space-between;

        .button {
            border-radius: 25px;
            padding: .75rem;
            min-width: 44px;

            background: $bg;
            box-shadow: $shadow-second;

            &:hover {
                box-shadow: $shadow-main;
            }
        }

    }

</style>
