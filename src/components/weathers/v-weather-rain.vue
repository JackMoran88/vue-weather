<template>
    <div class="snowflakes" aria-hidden="true">
        <div class="snowflake">&#127778;</div>
        <div class="snowflake">&#127778;</div>
        <div class="snowflake">&#127778;</div>
        <div class="snowflake">&#127778;</div>
        <div class="snowflake">&#127778;</div>
        <div class="snowflake">&#127778;</div>
        <div class="snowflake">&#127778;</div>
        <div class="snowflake">&#127778;</div>
        <div class="snowflake">&#127778;</div>
        <div class="snowflake">&#127778;</div>
    </div>
</template>

<script>
    export default {
        name: "v-weather-rain",
        props: {
            type: {
                type: String
            }
        }
    }
</script>


<style scoped lang="scss">

    .snowflake {

        width: 100%;
        height: 10px;

        color: #c4d3ef;

        font-size: .75em;
    }

    .snowflake {
        animation-name: snowflakes-fall;
        animation-duration: 4s;
    }


</style>
