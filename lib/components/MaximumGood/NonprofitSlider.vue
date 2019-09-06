<template>
  <div class="nonprofit-slider">
    <div class="nonprofit-slider__slider-main-wrapper">
      <flickity
        class="nonprofit-slider__slider-main"
        ref='mainSlider'
        :options='sliderOptions'
      >
        <div 
          v-for='(fundraiser, index) in fundraisers'
          :key='index'
          :class="`nonprofit-slider__slider-main-slide nonprofit-slider__slider-main-slide--${generateNonprofitNameSlug(fundraiser.name)}`"
        >
          <div class="nonprofit-slider__slider-main-image-container">
            <div class="nonprofit-slider__slider-main-image-wrapper">
              <img
                :src="`https://maxgood-logos.s3-us-west-2.amazonaws.com/${fundraiser.logo}`"
                :alt="fundraiser.name"
                class='nonprofit-slider__slider-main-image'
              >
            </div>
          </div>
          <div class="nonprofit-slider__slider-main-caption-container">
            <p class='is-marginless nonprofit-slider__slider-main-caption'>
              {{ fundraiser.description }}
            </p>
          </div>
        </div>
      </flickity>
    </div>
    <div class="nonprofit-slider__slider-nav-wrapper">
      <flickity
        :options='sliderNavOptions'
        class='nonprofit-slider__slider-nav'
        ref='navSlider'
      >
        <div
          v-for='(fundraiser, index) in fundraisers'
          :key='index'
          :class="`nonprofit-slider__slider-nav-slide nonprofit-slider__slider-nav-slide--${generateNonprofitNameSlug(fundraiser.name)}`"
        >
          <div 
            class="nonprofit-slider__slider-nav-slide-image-container"
            @click='selectSlide(index)'  
          >
            <div class="nonprofit-slider__slider-nav-slide-image-wrapper">
              <img 
                :src="`https://maxgood-logos.s3-us-west-2.amazonaws.com/${fundraiser.logo}`"                
                :alt="fundraiser.name"
                class='nonprofit-slider__slider-nav-image'
              >
            </div>
          </div>
        </div>
      </flickity>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { kebabCase } from 'lodash' 

import Flickity from 'Components/plugins/Flickity'

export default {
  name: 'NonprofitSlider',

  components: {
    Flickity
  },

  data () {
    return {
      sliderOptions: {
        wrapAround: true,
        pageDots: false,
      },
      sliderNavOptions: {
        cellAlign: 'left',
        pageDots: false,
        wrapAround: true,
      },
    }
  },

  mounted () {
    const { mainSlider, navSlider } = this.$refs

    mainSlider.on('change', (index) => this.onSlideChange(index, 'main'))
    navSlider.on('change', (index) => this.onSlideChange(index, 'nav'))
  },

  methods: {
    generateNonprofitNameSlug (name) {
      return kebabCase(name)
    },

    onSlideChange (index, source) {
      const { mainSlider, navSlider } = this.$refs

      if (source === 'main') {
        navSlider.select(index)
        return
      }
      
      mainSlider.select(index)
    },

    selectSlide (index) {
      const { navSlider } = this.$refs

      navSlider.select(index)
    },
  },

  computed: {
    ...mapState({
      fundraisers: state => state.featuredFundraisers.data,
    }),
  }
}
</script>

<style lang='scss' scoped>
.nonprofit-slider {
  padding: 1em;
  background-image: $gradient-primary-inverted;

  &__slider-main-slide {
    width: 100%;
    height: 250px;
    display: flex;
    align-items: center;
    padding-top: 1em;
    padding-right: 3em;
    padding-bottom: 1em;
    padding-left: 3em;
    background-color: #fff;

    &--volunteerathon,
    &--loseathon,
    &--run-for-good {
      img {
        max-width: 90%;
        margin-left: auto;
        margin-right: auto;
      }
    }
  }

  &__slider-main-image-container {
    flex-grow: 1;
    flex-shrink: 0;
    flex-basis: 480px;
    max-width: 480px;
  }

  &__slider-main-image-wrapper {
    width: 100%;
    max-width: 100%;
    text-align: center;
  }

  &__slider-main-image {
    max-width: 100%;
    display: block;
    width: 100%;
  }

  &__slider-main-caption-container {
    flex-grow: 1;
    flex-shrink: 1;
    padding-left: 1em;
    padding-right: 1em;
  }

  &__slider-main-caption {
    font-size: 1.5em;
    color: #4a4a4a;
  }

  &__slider-nav {
    margin-top: 1em;
    margin-left: -.5em;
    margin-right: -.5em;
  }

  &__slider-nav-slide {
    cursor: pointer;
    width: 20%;
    height: 100px;
    padding-left: 0.5em;
    padding-right: 0.5em;
  
    &--run-for-good,
    &--ride-for-good {
      img {
        max-width: 145px;
        margin-left: auto;
        margin-right: auto;
      }
    }

    &--loseathon {
      img {
        max-width: 160px;
        margin-left: auto;
        margin-right: auto;
      }
    }
  }

  &__slider-nav-slide-image-container {
    padding-left: 1em;
    padding-right: 1em;
    background-color: #fff;
    height: 100%;
    display: flex;
    align-items: center;
    width: 100%;
  }

  &__slider-nav-slide-image-wrapper {
    width: 100%;
    max-width: 100%;
  }

  &__slider-nav-image {
    display: block;
  }
}
</style>

<style lang='scss'>
.nonprofit-slider {
  &__slider-nav {
    &:hover {
      .flickity-button {
        opacity: 1;
      }
    }
  }

  &__slider-main {
    &:hover {
      .flickity-button {
        opacity: 1;
      }
    }
  }

  .flickity-button {
    opacity: 0;
    transition: opacity .2s ease;
  }
}
</style>
