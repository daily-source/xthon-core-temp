<template>
  <section 
    id='banner'
    :class="`dynamic-banner dynamic-banner--2  dynamic-banner--${expanded ? 'expanded' : 'shrinked'}`"
    ref='banner'
  >
    <div 
      class="dynamic-banner__bg-image"
    >
    </div>
    <div 
      class="dynamic-banner__beard-images"
    >
      <img src="@/assets/img/images/grow-one-for-good-1.jpg" alt="" ref='mainImage'>
      <img src="@/assets/img/images/grow-one-for-good-2.jpg" alt="" v-show='expanded' ref='expandedImage'>
    </div>
    <div 
      class="dynamic-banner__show-more"
    >
      <button
        :class='["dynamic-banner__button button", { "is-primary": $version == 1 }, { "is-secondary": $version == 2 }]'
        @click='onExpandClick'
      >
        Show {{ expanded ? 'less' : 'more' }}
      </button>
    </div>
  </section>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import TweenMax from 'gsap'
import Icons from 'Components/general/Icons'

export default {
  name: 'DynamicBanner',

  components: {
    Icons,
  },

  data () {
    return {
      expanded: false,
      currentHeight: 0,
    }
  },

  mounted () {
    this.currentHeight = this.$el.clientHeight

    window.addEventListener('resize', () => {
      if (!this.expanded) {
        this.$el.style.height = `${(this.$refs.mainImage.clientHeight + 16)}px`
      } else {
        this.$el.style.height = `${((this.$refs.mainImage.clientHeight * 2) + 16)}px`
      }
    })
  },

  methods: {
    getBgImage () {
      if (this.selected === null || this.selected === 'url') return this.url

      return require(`@/assets/img/images/${this.bgImage}`)
    },

    onExpandClick () {
      this.expanded = !this.expanded

      if (this.expanded) {
        this.$el.style.height = `${this.$el.clientHeight}px`
  
        this.$el.style.height = `${this.$el.clientHeight + this.$refs.mainImage.clientHeight}px`
      } else {
        const targetHeight = this.$refs.mainImage.clientHeight + 16


        this.$el.style.height = `${targetHeight}px`
      }
    },
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
    $self: &;
    height: 500px;
    position: relative;
    display: flex;
    align-items: stretch;
    // justify-content: center;
    padding-bottom: 1em;
    position: relative;
    transition: height .2s ease;

    &:after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0,0,0,.15);
      z-index: 20;
    }

    &__bg-image {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center;
    }

    &:not(#{ $self }--2) {
      height: 500px !important;
    }

    &--2 {
      background-position: top;
      display: block;
      height: auto;
      transition: height .2s ease;

      #{ $self }__bg-image {
        background: none !important;
      }
    }

    &--expanded {
      height: auto;
    }

    &__show-more {
      position: absolute;
      bottom: -20px;
      left: 0;
      right: 0;
      text-align: center;
      z-index: 21;
    }

    &__beard-images {
      position: relative;
      width: 100%;
      z-index: 20;
      overflow: hidden;
      max-height: 100%;
    }
  }

  .dynamic-banner__content {
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
</style>