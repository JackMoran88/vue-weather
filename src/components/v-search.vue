<template>
    <form class="v-search input is-xs" v-on:submit.prevent="click">
        <input type="text" v-model="value" placeholder="Поиск">
        <v-button
            type="submit"
            icon="plus"
        />
    </form>
</template>

<script>
    import { mapActions} from "vuex";
    import vButton from '@/components/elements/buttons/v-button'

    export default {
        name: "v-search",
        components:{
            vButton,
        },
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
        padding: .3rem .6rem;
        border-radius: 50px;

        background: transparent;
        color: $card__text;
        box-shadow: $shadow-main;

        input {
            width: 100%;
            padding: 0 1rem;

            border: none;
            background: transparent;

            font-size: 20px;

            &:focus {
                border: none;
                outline: none;
            }
        }

    }

</style>
