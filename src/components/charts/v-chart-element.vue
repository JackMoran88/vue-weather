<template>
    <div class="v-chart__element"
         :style="{'left': number * offset + 'px', 'top': y + offset*1.5  + 'px'}"
    >
        {{text}}
    </div>
</template>

<script>
    export default {
        name: "v-chart-element",
        props: {
            text: {
                type: String,
            },
            number: {
                type: Number,
            },
            y: {
                type: Number,
                default: 0
            },
            offset: {
                type: Number,
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

        width: 30px;
        height: 15px;
        padding: 1rem;
        border-radius: 25px;

        position: absolute;

        font-size: 12px;

        color: $card__text;


        background: $card__bg;
        box-shadow: $shadow-second;
    }

</style>
