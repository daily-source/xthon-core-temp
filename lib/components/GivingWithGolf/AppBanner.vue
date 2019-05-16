<template>
  <div class="banner">
    <flickity
      class='banner__slider'
      ref='mainSlder'
      :options='sliderOptions'
    >
      <div 
        class="banner__slide" 
        v-for='(slide, index) in slides'
        :key='index'
      >
        <img 
          :src="require(`@/assets/img/images/${slide.img}`)"
          :alt="`Banner Image ${index}`"
          :class='`banner__img banner__img--${index}`'
        >
      </div>
    </flickity>
  </div>
</template>

<script>
import Flickity from 'Components/plugins/Flickity'

export default {
  name: 'AppBanner',

  components: {
    Flickity,
  },

  methods: {
    onMainSliderReady (slider) {
      slider.on('change', (index) => {
        this.$refs.captionSlider.select(index)
      })
    },

    onCaptionSliderReady (slider) {
      slider.on('change', (index) => {
        this.$refs.mainSlider.select(index)
      })
    },
  }, 

  data () {
    return {
      slides: [
        {
          img: 'banner-img-1.jpg',
        },
        {
          img: 'banner-img-2.jpg',
        },
        {
          img: 'banner-img-3.jpg',
        },
        {
          img: 'banner-img-4.jpg',
        },
        {
          img: 'banner-img-5.jpg',
        },
      ],
      sliderOptions: {
        cellAlign: 'left',
        autoPlay: 3000,
        wrapAround: true,
      },
    }
  },
}
</script>

<style lang='scss' scoped>
.banner {

  &__slider {
    height: 600px;
  }

  &__slide {
    width: 100%;
    height: 100%;
  }

  &__img {
    width: 100%;
    height: 600px;
    object-fit: cover;
    object-position: 0 19%;
  }

  &__captions-slider {
    height: 33px;
    margin-top: 1em;
  }

  &__captions-slide {
    width: 100%;

    h2 {
      font-size: 24px;
      color: #000;
    }
  }

}
</style>

<style lang='scss'>
.banner {
  .flickity-page-dots {
    bottom: 25px;
  }

  .flickity-button,
  .flickity-page-dots {
    opacity: 0;
    transition: opacity .2s ease;
  }

  &:hover {
    .flickity-button,
    .flickity-page-dots {
      opacity: 1;
    }
  }
}
</style>
