<template>
    <button class="button" :type="type">
        <font-awesome-icon
                v-if="icon"
                :icon="['fas', icon]"/>
        <span
                v-if="text"
        >{{text}}</span>
    </button>
</template>

<script>
export default {
  name: 'v-button',
  props: {
    type: {
      type: String,
      default: 'button'
    },
    icon: {
      type: String
    },
    text: {
      type: String
    }
  }

}
</script>

<style scoped lang="scss">
    @import "@/assets/scss/variables.scss";

    button {
        min-width: 40px;
        height: 40px;
        border-radius: 50px;

        padding: .6rem;

        background: transparent;
        box-shadow: $shadow-main;

        &:hover {
            box-shadow: $shadow-second;
        }
    }
</style>
