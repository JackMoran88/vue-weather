<template>
    <div class="v-chart__element"
         :class="{'coldly': hour.text <= 0, 'warmly': hour.text > 0}"
         :style="{'left': hour.number * offset + 'px', 'bottom': hour.y +'px'}"
         :title="hour.time"
    >
        {{hour.text}}
    </div>
</template>

<script>
    export default {
        name: "v-chart-element",
        props: {
            offset: {
                type: Number,
            },
            hour:{
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

        width: 10px;
        height: 10px;
        padding: .5rem 1.2rem;

        border-radius: 25px;
        box-shadow: $shadow-main;

        position: absolute;

        font-size: 14px;

        color: $card__text;

        &.coldly {
            /*border: 1px solid rgba(blue, .2);*/
            color: cornflowerblue;
        }


        &.warmly {
            /*border: 1px solid rgba(orange, .2);*/
            color: coral;
        }
    }

</style>
