<template>
    <div class="alerts">
      <transition name="fade">
          <div class="alert is-md" v-for="alert in ALERTS" :key="alert.text">
              <font-awesome-icon :icon="['fas', 'info']"/>
              <span class="alert-content">{{alert.text}}</span>
              <button class="alert-dismiss" @click="REMOVE_ALERT(alert)">
                  <font-awesome-icon :icon="['fas', 'times']"/>
              </button>
          </div>
      </transition>
    </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  name: 'v-alert',
  data () {
    return {}
  },
  methods: {
    remove () {
      this.ALERTS.pop()
    },
    ...mapActions([]),
    ...mapMutations(['ADD_ALERT', 'REMOVE_ALERT'])
  },
  computed: {
    ...mapGetters(['ALERTS'])
  },
  mounted () {

  }
}
</script>

<style scoped lang="scss">

    .alerts {
        position: fixed;
        right: 0;
        bottom: 0;
    }

    .alert {
        > svg {
            margin: .5rem;
        }

        &-content {
            padding-right: 1rem;
        }
    }

</style>
