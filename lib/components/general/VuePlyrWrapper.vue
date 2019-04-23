<template>
  <div v-if="canRender">
    <slot/>
  </div>
</template>

<script>
import Vue from 'vue'
import VuePlayer from 'vue-plyr'

Vue.use(VuePlayer)

export default {
  data () {
    return {
      canRender: false
    }
  },
  mounted () {
    this.canRender = true
  }
}
</script>

<style lang="scss">
@import 'plyr/src/sass/plyr.scss';

</style>
