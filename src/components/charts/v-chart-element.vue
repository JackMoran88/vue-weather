<template>
    <div class="v-chart__element"
         :class="{'coldly': hour.text <= 0, 'warmly': hour.text > 0}"
         :style="{'left': hour.number * offset + 10 + 'px', 'bottom': hour.y +'px'}"
         :title="hour.time"
    >
        <span>{{hour.text}}</span>
    </div>
</template>

<script>
export default {
  name: 'v-chart-element',
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

    .v-chart__element {
        display: flex;
        justify-content: center;
        align-items: center;

        width: 50px;

        span{
            width: 40px;
            border-radius: 25px;

            text-align: center;
            box-shadow: $shadow-main;
        }

        position: absolute;

        font-size: 14px;

        color: $card__text;

        &.coldly {
            color: cornflowerblue;
        }

        &.warmly {
            color: coral;
        }
    }

</style>
