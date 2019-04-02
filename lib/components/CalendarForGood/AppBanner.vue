<template>
    <div id="banner" :style=" { 'background-image': `url('${ imagePath('banner-img-cropped.jpg') }')` }" class='banner'>
      <div class="container">
        <div class="banner__content" slot="banner">
          <p> 
            We offer fundraisers for all seasons and major holidays that nonprofits and their supporters can use to raise money for their causes. Nonprofits: you can share upcoming options with your supporters via email, newsletters and social media, or with our widget that displays upcoming fundraisers on your website. 
          </p>
          <div class="banner__btn-container">
            <router-link to="/about" class="button is-large is-secondary banner__button"> Learn More </router-link>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'AppBanner',
  props: ['backgroundImage'],
  computed: {
    ...mapState({
      currentBg: state => state.banner.current,
    })
  },
  methods: {
    imagePath( imgName ) {
      return require('@/assets/img/' + imgName )
    },
    getBgImage() {
      if( this.currentBg  ) {
        if( this.currentBg.type == 'local' ) {
          return this.imagePath( this.currentBg.imgName )
        } else {
          return this.currentBg.imgUrl
        }
      } else {
        return this.imagePath( 'banner-img-cropped.jpg' );
      }
    },
  
  } 
}
</script>

<style lang="scss">
.home #banner { height: 400px; }
#banner {
  background-size: cover;
  background-position: center;
  height: 150x;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  @include tablet {
    height: 200px
  }

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(#d7cec5, .4);
  }

  .container {
    z-index: 10;
    position: relative;
  }

  p {
    margin-right: auto;
    color: #fff;
    text-shadow: 0 2px 42px rgba(0,0,0,.4);

    @include tablet {
      max-width: 49%;
      letter-spacing: .8px;
    }
  }

  h1 {
    font-size: 2em;
    text-transform: uppercase;
    letter-spacing: 1px;
    text-shadow: 0 2px 9px rgba(0,0,0,.7);

    @include tablet {
      font-size: 3em;
    }
  }

  .banner__button {
    border-radius: 25px;
    font-size: .875em;
    padding-left: 2rem !important;
    padding-right: 2rem !important;
  }
}
</style>
