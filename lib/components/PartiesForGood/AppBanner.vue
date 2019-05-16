<template>
  <div class="banner">
    <flickity
      class='banner__slider'
      ref='mainSlder'
      :options='sliderOptions'
      @init='onMainSliderReady'
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
    <flickity
      class='banner__captions-slider'
      ref='captionSlider'
      :options='{
        ...sliderOptions,
        pageDots: false,
        prevNextButtons: false,
        autoPlay: false,
        draggable: false,
      }'
      @init='onCaptionSliderReady'
    >
      <div 
        class="banner__captions-slide"
        v-for='(slide, index) in slides'
        :key='index'
      >
        <h2 class='is-marginless has-text-centered'>{{ slide.caption }} </h2>
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
    }
  }, 

  data () {
    return {
      slides: [
        {
          img: 'banner-img-1.jpg',
          caption: 'Classic cookout party',
        },
        {
          img: 'banner-img-4.jpg',
          caption: '80s outfits party',
        },
        {
          img: 'banner-img-5.jpg',
          caption: 'Back to the 60s party',
        },
        {
          img: 'banner-img-6.jpg',
          caption: '90s costume party',
        },
        {
          img: 'banner-img-7.jpg',
          caption: 'Family pool party',
        },
        {
          img: 'banner-img-8.jpg',
          caption: 'Grown-ups pool party',
        },
        {
          img: 'banner-img-9.jpg',
          caption: 'Sunset Beach Party',
        },
        {
          img: 'banner-img-10.jpg',
          caption: 'Beach party',
        },
        {
          img: 'banner-img-11.jpg',
          caption: 'Home karaoke party',
        },
      ],
      sliderOptions: {
        cellAlign: 'left',
        autoPlay: 5000,
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
