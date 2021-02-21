<template>
    <div class="v-chart container" v-if="data && data.x.length > 1">
        <div class="v-chart__header">
            <h5> График температуры за {{data.len}} часов</h5>
        </div>
        <div class="v-chart__body"
             :style="{height:`${this.data.height}px`}"
        >
            <v-chart-element
                    v-for="hour in hours"
                    :key="hour.index"
                    :hour="hour"
                    :offset="data.offset"
            />

            <v-chart-time
                    v-for="hour in hours"
                    :key="hour.index"
                    :hour="hour"
                    :offset="data.offset"
            />

        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import vChartElement from '@/components/charts/v-chart-element'
import vChartTime from '@/components/charts/v-chart-time'

export default {
  name: 'v-chart',
  components: {
    vChartElement, vChartTime
  },
  data () {
    return {
      data: {
        x: [],
        y: [],
        tempMin: 0,
        tempMax: 0,
        offset: 48
      },
      hours: []
    }
  },
  methods: {
    load () {
      this.DETAILED_WEATHER.list.forEach((value, index) => {
        this.$set(this.data.x, index, (new Date(value.dt * 1000).getHours()))
        this.$set(this.data.y, index, value.main.temp)
      })
      this.loadChart()
    },
    loadChart () {
      // Минимальная температура
      this.$set(this.data, 'tempMin', Math.min(...this.data.y))
      // Максимальная температура
      this.$set(this.data, 'tempMax', Math.max(...this.data.y))
      // Длина выборки
      this.$set(this.data, 'len', this.DETAILED_WEATHER.list.length)
      // Вычисление высоты графика
      this.data.height = Math.abs(Math.max(...this.data.y.map((value) => {
        return (value - this.data.tempMin) * 10 + 50
      }))) + 50
      // Заполнение данных для графика
      for (let index = 0; index < 40; index++) {
        const hour = {
          number: index,
          y: (this.data.y[index] - this.data.tempMin) * 10 + 50,
          text: Math.round(this.data.y[index]),
          time: `${this.data.x[index]}:00`
        }
        this.$set(this.hours, index, hour)
      }
    }
  },
  computed: {
    ...mapGetters(['DETAILED_WEATHER'])
  },
  mounted () {
    this.load()
  },
  watch: {
    'DETAILED_WEATHER' () {
      this.load()
    }
  }
}
</script>

<style scoped lang="scss">

    .v-chart {
        overflow: auto;
        width: 100%;
        border-radius: 16px !important;

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

            overflow: auto;

        }

    }

</style>
