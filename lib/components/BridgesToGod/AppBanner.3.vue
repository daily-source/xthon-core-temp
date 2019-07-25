<template>
  <dynamic-banner
    class='dynamic-banner-v3'
  >
    <h1>
      Get closer to divine love, <br /> peace and goodness
    </h1>
  </dynamic-banner>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'AppBanner',

  methods: {
    selectBannerImage () {
      this.switchBannerImage(2)
    },

    ...mapActions({
      switchBannerImage: 'switchBannerImage'
    }),
  },

  watch: {
    $version: {
      immediate: true,
      handler: 'selectBannerImage'
    },
  },
}
</script>

<style lang='scss' scoped>
.dynamic-banner-v3 {
  align-items: stretch !important;
  justify-content: center;

  h1 {
    text-align: center;
    margin-top: 13px;
  }
}
</style>

<style lang='scss'>
.dynamic-banner-v3 {
  .dynamic-banner {
    &__content {
      max-width: 600px;
      margin-left: 0;
      margin-right: 0;
      align-self: flex-start;
    }
  }
}
</style>
