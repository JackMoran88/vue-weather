<template>
    <div class="v-chart__time"
         :style="{'left': hour.number * offset + 10 + 'px', 'bottom': 5 +'px'}"
         :title="hour.time"
    >
        {{hour.time}}
    </div>
</template>

<script>
export default {
  name: 'v-chart-time',
  props: {
    offset: {
      type: Number
    },
    hour: {
      type: Object
    }
  }

}
</script>

<style scoped lang="scss">
    @import "@/assets/scss/variables.scss";

    .v-chart__time {
        display: flex;
        justify-content: center;
        align-items: center;

        width: 10px;
        height: 10px;
        padding: .5rem 1.5rem;

        position: absolute;

        font-size: 14px;

        color: $card__text;

        &{
            border-left: 1px solid $card__text;
            &:first-child{
                border-right: 1px solid $card__text;
            }
        }
    }

</style>
