<template>
  <section 
    id='banner'
    class="dynamic-banner"
    :style="{'background-image': `url('${getBgImage()}')`}"
  >
    <div class="dynamic-banner__content">
      <slot></slot>
    </div>
  </section>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
  name: 'DynamicBanner',

  methods: {
    getBgImage () {
      if (this.selected === null || this.selected === 'url') return this.url

      return require(`@/assets/img/images/${this.bgImage}`)
    }
  },

  computed: {
    ...mapState({
      selected: state => state.banner.selected,
      url: state => state.banner.url,
    }),
    
    ...mapGetters({
      bgImage: 'getCurrentLocalImage'
    }),
  },
}
</script>

<style lang="scss" scoped>
.dynamic-banner {
  min-height: 500px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  position: relative;
  display: flex;
  align-items: stretch;
  // justify-content: center;
  padding-bottom: 1em;
  position: relative;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,.15);
  }

  &__content {
    color: #fff;
    align-self: center;
    max-width: 400px;
    text-align: left;
    margin-left: 10%;
    position: relative;
    z-index: 10;

    h1 {
      text-align: left;
      color: $secondary;
    }

    h2 {
      font-weight: 700;
      font-size: 2em;
      max-width: 800px;
      margin-left: auto;
      margin-right: auto;
      text-shadow: 0 2px 8px rgba(#000,.25);
    }
  }

  .btn-down {
    color: darken($primary, 5%) !important;
    font-size: 1.25em;
    width: 40px;
    height: 40px;
    border-radius: 100%;
    border: 2px solid $primary;
    position: absolute;
    bottom: 1em;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
    margin-left: auto;
    margin-right: auto;

    i {
      transition: all .2s ease;
      position: relative;
      top: 0;
    }

    &:hover i {
      transform: translateY(2px);
    }
  }
}
</style>