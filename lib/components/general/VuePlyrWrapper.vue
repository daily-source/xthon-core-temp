<template>
  <div v-if="canRender">
    <slot/>
  </div>
</template>

<script>
import "vue-plyr"

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
