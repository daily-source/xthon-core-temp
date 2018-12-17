<template>
  <div>
    <div id="banner" :style="{'background-image': `url('${getBgImage()}')`}" v-if="!disableHero">
      <div class="container banner-content-container">
        <div class="banner-content w-100">
          <h3 :class="`version_${version}`">By riding your bike, you can really help worthy causes.</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Icons from "Components/general/Icons.vue"
import { mapState } from 'vuex'

export default {
  name: 'AppBanner',

  components: {
    Icons
  },

  props: ["disableHero"],

  computed: {
    ...mapState({
      currentBg: state => state.bannerSwitcher ? state.bannerSwitcher.current : '',
    }),
    version () {
      return this.$route.query.version
    }
  },

  methods: {
    imagePath( imgName ) {
      return require(`@/assets/img/images/${imgName}`);
    },

    getBgImage() {
      if (this.disableHero) {
        return
      }
      if( this.currentBg ) {
        if( this.currentBg.type == 'local' ) {
          return this.imagePath( this.currentBg.imgName )
        } else {
          return this.currentBg.imgUrl
        }
      } else {
        return this.imagePath( 'banner-img-1.jpg' );
      }
    },
  },
}
</script>

<style lang="scss">
  #banner {
    height: 100vh;
    position: relative;
    background-size: cover;
    background-position: center;

    @include breakpoint($tablet) {
      height: 450px;
    }

    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 100%;
      background-color: rgba(#000, .35)
    }

    .banner-content-container {
      position: absolute;
      top: 27%;
      left: 0;
      right: 0;
    }

    .banner-content {
      position: relative;
      z-index: 10;
      color: #fff;

      @include breakpoint($tablet) {
        max-width: 55%;
      }

      h3 {
        font-family: 'Poppins';
        font-weight: 700;
        line-height: 1.4;
        font-size: 40px;
        color: $color-emphasis-alt;
        padding: 15px;
        @include breakpoint($tablet) {
          max-width: 400px;
        }
        &.version_undefined {
          background: rgba($color-text, 0.3);
        }

        &.version_1 {
          background: rgba($color-text, 0.6);
        }

        &.version_2 {
          color: $white;
          background: rgba($color-text, 0.6);
        }

      }

      ol {
        list-style: none;
        counter-reset: counter;

        li {
          font-size: 1.25rem;
          counter-increment: counter;
          font-weight: 700;
          margin-bottom: .25em;

          &:last-child {
            margin-bottom: 0;
          }

          &:before {
            content: counter(counter) ") ";
            display: inline-block;
            font-weight: 500;
            width: 25px;
          }
        }
      }
    }
  }
</style>