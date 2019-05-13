<template>
  <div class="banner">
    <flickity
      class='banner__slider'
      :options='sliderOptions'
    >
      <div 
        class="banner__slide" 
        v-for='(img, index) in imgs'
        :key='index'
      >
        <img 
          :src="require(`@/assets/img/images/${img}`)"
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

  data () {
    return {
      imgs: [
        'banner-img-1.jpg',
        'banner-img-2.jpg',
        'banner-img-3.jpg',
        'banner-img-4.jpg',
        'banner-img-5.jpg',
        'banner-img-6.jpg',
      ],
      sliderOptions: {
        cellAlign: 'left',
        autoPlay: 4000,
        wrapAround: true,
      },
    }
  },
}
</script>

<style lang='scss' scoped>
.banner {
  height: 600px;

  &__slider {
    height: 100%;
  }

  &__slide {
    width: 100%;
    height: 100%;
  }

  &__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
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
