<template>
  <div class='card-slider card'>
    <div class='card-slider__slider-wrapper'>
      <flickity 
        class='card-slider__slider'
        :options='{
          wrapAround: true,
          autoPlay: true,
          pageDots: false,
        }'  
      >
        <div 
          class='card-slider__slide'
          v-for='(photo, index) in incomeLevel.photos'
          :key='index'
        >
          <img 
            :src='require(`@/assets/img/images/${photo}`)'
            class='card-slider__img'
          >
        </div>
      </flickity>
    </div>
    <div class='card-slider__body'>
      <div class='card-slider__details-block'>
        <h4 class='has-text-weight-bold card-slider__heading'>Who They Are: </h4>
        <ul class='card-slider__list'>
          <li
            v-for='(description, index) in incomeLevel.descriptionList'
            :key='index'
          >
            {{ description }}    
          </li>
        </ul>
      </div>
      <button 
        class='card-slider__button button is-block is-secondary'
        @click='toggleExpandedContent'
      >
        {{ showExpandedContent ?  'Hide what they have' : 'Click to see what they have' }}
      </button>
    </div>
    <div 
      class='card-slider__expanded-content'
      v-show='showExpandedContent'
    >
      <div class='card-slider__lists'>
        <div class='card-slider__list-contents'>
          <h4>What they have:</h4>
          <ul v-if='incomeLevel.have.length'>
            <li
              v-for='(have, index) in incomeLevel.have'
              :key='index'
            >
              {{ have }}    
            </li>
          </ul>
          <p class='has-text-centered' v-if='!incomeLevel.have.length'> - </p>
        </div>
        <div class='card-slider__list-contents'>
          <h4>What they don't have:</h4>
          <ul v-if='incomeLevel.dontHave.length'>
            <li
              v-for='(dontHave, index) in incomeLevel.dontHave'
              :key='index'
            >
              {{ dontHave }}    
            </li>
          </ul>
          <p class='has-text-centered' v-if='!incomeLevel.dontHave.length'> - </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Flickity from 'Components/plugins/Flickity'

export default {
  name: 'CardSlider',

  props: {
    incomeLevel: {
      type: Object,
      required: true,
    }
  },

  components: {
    Flickity,
  },

  data () {
    return {
      showExpandedContent: false,
    }
  },

  methods: {
    /**
     * Toggles `showExpandedContent`
     */
    toggleExpandedContent () {
      this.showExpandedContent = !this.showExpandedContent

    },
  }
}
</script>

<style scoped lang="scss">
.card-slider {
  display: flex;
  flex-direction: column;
  margin-left: auto;
  margin-right: auto;
  border: none;
  align-items: stretch;

  @media (min-width: 576px) {
    max-width: 80%;
  } 

  @include tablet {
    flex-direction: row;
    flex-wrap: wrap;
    overflow: hidden;
    max-width: 1000px;
  }

  &__slide,
  &__slider {
    width: 100%;
    height: 100%;
  }

  &__slider-wrapper {
    height: 250px;
    max-height: 250px;
    overflow: hidden;
  }

  &__slider-wrapper,
  &__body {
    @include tablet {
      flex-grow: 0;
      flex-shrink: 0;
      max-width: 50%;
      height: 380px;
      max-height: 380px;
      flex-basis: 50%;
    }
  }

  &__img {
    display: block;
    max-width: 100%;
    height: 100%;
    width: 100%;
    object-fit: cover;
  }

  &__body {
    padding: .875em;
    background-color: #F1F9FF;
    display: flex;
    flex-direction: column;
  }

  &__details-block {
    margin-top: auto;
    margin-bottom: auto;
  }

  &__heading {
    color: $primary;
    text-align: center;
    font-size: 1.125em;
    margin-bottom: .5em;

    @include tablet {
      text-align: left;
      font-size: 1.5em;
    }
  }

  &__list {
    font-size: .75em;
    max-width: 70%;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 1em;
    list-style: disc;

    @include tablet {
      font-size: 1em;
      max-width: 100%;
      margin-top: .5em;
      margin-left: 2em;
    }
  }

  &__button {
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    font-size: 0.625em;

    @include tablet {
      font-size: 1em;
    }
  }

  &__expanded-content {
    padding-top: 0;
    padding-bottom: 1em;
    background-color: #F1F9FF;
    width: 100%;
    flex-grow: 1;
    flex-shrink: 1;

    @include tablet {
      padding-top: 1.5em;
      padding-bottom: 1.5em;
    }
  }

  &__lists {
    display: flex;
    flex-direction: column;
    padding-left: 1em;
    padding-right: 1em;

    @include tablet {
      flex-direction: row;
      padding-left: 2em;
      padding-right: 2em;
    }

    h4 {
      font-size: 1em;
      font-weight: 700;
      margin-bottom: .5em;
      color: $primary;

      @include tablet {
        font-size: 1.5em;
      }
    }
  }

  &__list-contents {
    margin-bottom: 1em;

    @include tablet {
      flex-basis: 50%;
      max-width: 50%;
    }

    ul {
      margin-top: 0;
      list-style: disc;
      margin-left: 2em;

      @include tablet {
        columns: 2;
      }

      li {
        font-size: 0.875em;

        @include tablet {
          font-size: 1em;
        }
      }
    }
  }
}
</style>
