<template>
    <div class="detail-layout">
        <v-header :toHome="true"/>
        <router-view/>
        <v-alert/>
    </div>
</template>

<script>
import vAlert from '@/components/v-alert'
import vHeader from '@/components/v-header'

export default {
  name: 'DetailLayout',
  components: {
    vAlert, vHeader
  }
}
</script>

<style scoped lang="scss">

    @import "../assets/scss/variables.scss";
    @import url("https://fonts.googleapis.com/css2?family=Lato:wght@400;700&family=Varela+Round&display=swap");

    .detail-layout {
        background: $bg;
        width: 100%;
        height: 100%;
        padding: 1rem;
    }

</style>
