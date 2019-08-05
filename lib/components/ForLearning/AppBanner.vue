<template>
  <section 
    id="banner" 
    class='banner'
    :style="{backgroundImage: `url('${backgroundImage}')`}"
  >
    <div class="container">
      <div class="banner__content has-text-centered">
        <transition
          appear
          @before-enter='contentBeforeEnter'
          @enter='contentEnter'
          v-bind:css="false"
          mode='out-in'
        >
          <h4 class="banner__heading" v-show='play'>Here is a sampling of our websites for learning about important topics.</h4>
        </transition>
        <transition
          @before-enter='contentBeforeEnter'
          @enter='contentEnter'
          v-bind:css="false"
          mode='out-in'
        >
          <router-link to='about' class='is-primary button' v-show='playButton'>Get Started</router-link>
        </transition>
      </div>
    </div>
    <button class='button__down' @click="scrollToContent()">
      <icon 
        iconheight='1.5rem'
        iconwidth='1.5rem'
        icon='chevron-down'
        color='#fff'
      />
    </button>
  </section>
</template>

<script>
// import Velocity from 'velocity-animate'
import { TweenLite, Power2 } from 'gsap'

export default {
  name: 'AppBanner',

  components: {
    Icon: () => import('Components/general/Icons')
  },
  data() {
    return {
      play: false,
      playButton: false,
    }
  },
  mounted () {
    setTimeout(() => {
      this.play = true
    }, 800)
  },
  methods: {
    contentBeforeEnter (el) {
      el.style.opacity = 0
      el.style.top = '15px'
    },
    contentEnter (el, done) {
      TweenLite.to(
        el,
        .500,
        {
          opacity: 1,
          top: '0px',
          ease: Power2.easeInOut,
          onComplete: () => {
            this.startButtonAnimation()
            done()
          }
        },
      )
    },
    startButtonAnimation () {
      setTimeout(() => {
        this.playButton = true
      }, 200)
    },
    scrollToContent () {
      this.smoothScroll('site-content')
    }
  },

  computed: {
    backgroundImage () {
      return require(`@/assets/img/banner-img-${this.$version}.jpg`)
    },
  },
}
</script>

<style lang="scss" scoped>
.banner {
  display: flex;
  height: calc(100vh - 120px);
  position: relative;
  background-size: cover;
  background-position: top center;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(#000, .6);
    z-index: 10;
  }

  &__heading,
  .button {
    opacity: 0;
  }

    &__heading {
    margin-left: auto;
    margin-right: auto;
    font-size: 1.25em;
    font-weight: 700 !important;
    color: #fff !important;
    position: relative;
    display: block !important;

    @include desktop {
      font-size: 2em;
      max-width: 650px;
    }
  }

  &__content {
    position: relative;
    z-index: 11;

    .button {
      display: inline-block !important;
    }
  }

  .button__down {
    cursor: pointer;
    position: absolute;
    bottom: 5%;
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
    width: 2rem;
    height: 2rem;
    font-size: 1.25em;
    border-radius: 100%;
    border: 2px solid #fff;
    background-color: transparent;
    z-index: 20;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: bottom .2s ease;
    &:hover {
      bottom: 4.5%;
    }
  }
}
</style>
