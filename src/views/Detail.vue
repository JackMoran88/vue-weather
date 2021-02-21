<template>
    <div class="detail" v-if="DETAILED_WEATHER.city">

        <v-card
                :weather="DETAILED_WEATHER.list[0]"
                :buttons="false"
        />

        <div class="tab">

            <div class="buttons tab__header">
                <v-button
                        class="tab__header-button"
                        text="Главное"
                        @click.native="choiceTab(0)"
                        :class="{'active': tab===0}"
                />
                <v-button
                        class="tab__header-button"
                        text="Ветер"
                        @click.native="choiceTab(1)"
                        :class="{'active': tab===1}"
                />
                <v-button
                        class="tab__header-button"
                        text="График"
                        @click.native="choiceTab(2)"
                        :class="{'active': tab===2}"
                />
            </div>

            <div class="tab__body">
                <transition name="translateY" mode="out-in">
                    <div class="tab__body-item" v-if="tab===0" :key="0">
                        <table class="table">
                            <thead>
                            <tr>
                                <th>Cейчас</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>Температура</td>
                                <td>{{DETAILED_WEATHER.list[0].main.temp}}<span>&#176;C</span></td>
                            </tr>
                            <tr>
                                <td>Ощущается как</td>
                                <td>{{DETAILED_WEATHER.list[0].main.feels_like}}<span>&#176;C</span></td>
                            </tr>
                            <tr>
                                <td>Минимальная температура</td>
                                <td>{{DETAILED_WEATHER.list[0].main.temp_min}}<span>&#176;C</span></td>
                            </tr>
                            <tr>
                                <td>Максимальная температура</td>
                                <td>{{DETAILED_WEATHER.list[0].main.temp_max}}<span>&#176;C</span></td>
                            </tr>
                            <tr>
                                <td>Давление</td>
                                <td>{{DETAILED_WEATHER.list[0].main.pressure}} мбар</td>
                            </tr>
                            <tr>
                                <td>Влажность</td>
                                <td>{{DETAILED_WEATHER.list[0].main.humidity}} %</td>
                            </tr>
                            <tr>
                                <td>Ветер</td>

                                <td>
                    <span class="deg">
                        <font-awesome-icon :icon="['fas', 'location-arrow']"
                                           :style="{transform: `rotate(${-45 + DETAILED_WEATHER.list[0].wind.deg}deg)`}"/>
                    </span>
                                    <span>{{DETAILED_WEATHER.list[0].wind.speed}}м\с</span>
                                </td>
                            </tr>
                            <tr>
                                <td>Влажность</td>
                                <td>{{DETAILED_WEATHER.list[0].main.humidity}} %</td>
                            </tr>
                            <tr>
                                <td>Время замера</td>
                                <td>{{new Date(DETAILED_WEATHER.list[0].dt * 1000)}}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="tab__body-item" v-if="tab===1" :key="1">
                        <table class="table wind">
                            <div class="tbody">
                                <tr v-for="hour in DETAILED_WEATHER.list" :key="hour.text">
                                    <td class="deg">
                                        <font-awesome-icon :icon="['fas', 'location-arrow']"
                                                           :style="{transform: `rotate(${-45 + hour.wind.deg}deg)`}"/>
                                    </td>
                                    <td>{{hour.wind.speed}}</td>
                                    <td>{{new Date(hour.dt * 1000).getHours()}}:00</td>
                                </tr>
                            </div>
                        </table>
                    </div>

                    <div class="tab__body-item" v-if="tab===2" :key="2">
                        <v-chart/>
                    </div>
                </transition>

            </div>

        </div>

    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import vChart from '@/components/charts/v-chart'
import vButton from '@/components/elements/buttons/v-button'
import vCard from '@/components/v-card'

export default {
  name: 'Detail',
  components: {
    vChart, vButton, vCard
  },
  props: {
    id: {
      type: Number
    }
  },
  data () {
    return {
      tab: 0
    }
  },
  methods: {
    load () {
      if (!this.id) {
        return
      }

      this.loadInfo()
    },
    loadInfo () {
      this.GET_DETAILED_WEATHER(this.id).then(() => {
        this.$set(this.DETAILED_WEATHER.list[0], 'name', this.DETAILED_WEATHER.city.name)
        this.$set(this.DETAILED_WEATHER.list[0], 'id', this.DETAILED_WEATHER.city.id)
      })
    },

    choiceTab (value) {
      this.tab = value
    },
    ...mapActions(['GET_DETAILED_WEATHER'])
  },
  computed: {
    ...mapGetters(['DETAILED_WEATHER'])
  },
  mounted () {
    this.load()
  }

}
</script>

<style scoped lang="scss">

    @import "@/assets/scss/variables.scss";

    .detail {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;

        > *:last-child{
            max-width: 100%;
            min-width: 0;
        }

        .card {
            min-width: 300px;
            margin: 0 1rem;
        }

    }

    .tab {
        max-width: 840px;
        width: 840px;

        &__header {
            overflow: hidden;
            height: min-content;
            margin: 1rem 0 !important;
            width: 100%;

            &-button {
                flex-grow: 1;
                border-radius: 0;
                border: 1px solid rgba($btn__bg, .1) !important;

                &.active {
                    box-shadow: inset 5px 5px 2px rgba(gray, .2),
                    inset -5px -5px 2px rgba(255, 255, 255, .2);
                }
            }
        }

        &__body {
            width: 100%;
        }
    }

    table {
        margin: 1rem 0;

        box-shadow: $shadow-main;

        * {
            background: transparent !important;
            border-color: rgba($btn__bg, .1);
        }

        .deg {
            padding: .5rem;
            border-radius: 25px;
            box-shadow: $shadow-main;
            width: min-content;
        }

        td, th {
            padding: 1.2rem;
            text-align: left;
            font-weight: 400;

            span {
                margin-right: .5rem;
            }
        }

        thead {
            th {
                font-weight: 500;
            }
        }
    }

    table.wind {
        display: block;

        width: 100%;
        max-width: 100%;

        overflow: hidden;

        .tbody {
            display: flex;
            padding: 1rem 0;
            overflow: auto;
        }

        tr {
            display: flex;
            flex-direction: column;
            align-items: center;
            flex-wrap: wrap;
        }

        td {
            margin: .5rem;

            &:last-child{
                font-weight: 600;
            }
        }
    }

</style>
