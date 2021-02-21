<template>
    <div class="v-header">
        <router-link :to="{name: 'Home'}" v-if="toHome">
            <v-button
                icon="chevron-left"
                style="height: 50px; width: 50px"
            />
        </router-link>
        <v-search v-if="search"/>
    </div>
</template>

<script>
    import vSearch from '@/components/v-search'
    import vButton from '@/components/elements/buttons/v-button'

    export default {
        name: "v-header",
        components: {
            vSearch,vButton
        },
        props:{
            toHome:{
                type: Boolean,
                default: false,
            },
            search:{
                type: Boolean,
                default: false,
            },
        }
    }
</script>

<style scoped lang="scss">

    .v-header {
        height: 50px;
        margin-bottom: 2rem;

        display: flex;
        align-items: center;
        > * {
            margin: 0 .5rem;
        }
    }

</style>
