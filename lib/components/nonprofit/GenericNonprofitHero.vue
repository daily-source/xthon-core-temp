<template>
  <div class='generic-nonprofit-hero'>
    <flickity 
      ref='slider'
      class='generic-nonprofit-hero__slider'
      :options='sliderOptions'
    >
      <div 
        class='generic-nonprofit-hero__slide'
        v-for='(photo, index) in bannerPhotos'
        :key='index'
      >
        <img 
          :src='photo' 
          :alt='`Generic Banner Photo #${index + 1}`'
          :class='`generic-nonprofit-hero__photo-${index}`'
        >
      </div>
    </flickity>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { sortBy } from 'lodash'
import Flickity from 'Components/plugins/Flickity'
import naturalSort from 'javascript-natural-sort'

function importAll (r) {
  return r.keys().map(r)
}

export default {
  name: 'GenericNonprofitHero',

  components: {
    Flickity,
  },

  data () {
    const images = importAll(require.context('@/assets/img/generic-banner', false, /\.(jpe?g)$/));

    const bannerPhotos = images.sort(naturalSort)

    return {
      sliderOptions: {
        cellAlign: 'left',
        wrapAround: true,
      },
      bannerPhotos,
    }
  },
}
</script>

<style lang='scss' scoped>
.generic-nonprofit-hero {
  width: 100%;
  height: 390px;

  &__slider {
    width: 100%;
    height: 390px;
  }

  &__slide {
    width: 100%;
    height: 390px;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__photo {
    &-34 {
      object-position: center;
    }
  }
}
</style>

<style lang='scss'>
.generic-nonprofit-hero {
  &__slider {
    .flickity-page-dots {
      bottom: 25px;
      transition: all .2s ease;
    }
    
    .flickity-button,
    .flickity-page-dots {
      opacity: 0;
      transition: all .2s ease;
    }

    &:hover {
      .flickity-button,
      .flickity-page-dots {
        opacity: 1;
      }
    }    
  }
}
</style>

