<template>
    <form class="v-search input is-xs" v-on:submit.prevent="click">
        <input type="text" v-model="value" placeholder="Поиск">
        <button class="button" type="submit">
            <font-awesome-icon :icon="['fas', 'plus']"/>
        </button>
    </form>
</template>

<script>
    import {mapMutations, mapActions} from "vuex";

    export default {
        name: "v-search",
        data() {
            return {
                value: '',
            }
        },
        methods: {
            click() {
                if (this.value) {
                    this.SEARCH_CITY_BY_NAME(this.value)
                    this.value = ''
                }
            },
            ...mapActions(['SEARCH_CITY_BY_NAME']),
        }
    }
</script>

<style scoped lang="scss">
    @import "../assets/scss/variables.scss";

    .v-search {
        display: flex;
        background: $card__bg;
        color: $card__text;

        input {
            width: 100%;
            border: none;
            background: transparent;
            font-size: 20px;
            margin: 0;

            &:focus {
                border: none;
                outline: none;
            }
        }
    }

</style>
