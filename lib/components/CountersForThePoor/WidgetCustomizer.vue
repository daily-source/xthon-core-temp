<template>
  <div class="widget-customizer">
    <div class="widget-customizer__widget-container">
      <counter-widget-jumbotron 
        :widget-id='widgetId'
        :bg-image='backgroundImg'
        :widget-position='["bottom", "left"]'
        :size='size'
        :widget-data='widgetData'
        :show-logo='true'
        :edit='true'
        :color-id='selectedTheme.colorId'
        :logo-position='selectedTheme.logoPosition'
        :class='`widget-customizer__counter-widget ${themeClassName}`'
      />
    </div>
    <div class="widget-customizer__images">
      <div class="columns is-mobile">
        <div class="widget-customizer__fields column">
          <!-- TODO: Handle form submit. -->
          <form @submit.prevent='() => false'>
            <div class="field">
              <label class='widget-customizer__fields-label' for="size"> Choose the size of your widget: </label>
              <div class="control field-input">
                <select-size 
                  v-model='size'
                />
              </div>
            </div>
            <div class="field">
              <label class='widget-customizer__fields-label'>Change your title: </label>
              <div class='field-input'>
                <counter-select 
                  :counter-id='widget.counterId'
                  v-model='counterId'
                />
              </div>
            </div>
            <div class='field'>
              <label class='widget-customizer__fields-label' for='message'>Add a custom message (optional):</label>
              <div class='field-input'>
                <input 
                  type='text' 
                  class='input'
                  placeholder='Type a message here and it will show in the widget'
                  id='message'
                  :maxlength="55"
                  v-model='message'
                >
              </div>
            </div>
            <div class="field">
              <label class='widget-customizer__fields-label'>Pick a nonprofit your widget will raise money for: </label>
              <div class='field-input'>
                <nonprofit-ajax-search
                  :default-value='widget.nonprofit' 
                  :placeholder='"Type a nonprofit to search..."'
                  @selected='setNonprofit'
                />                
              </div>
            </div>
            <div class="widget-customizer__featured-images-wrapper">
              <p class='has-text-weight-bold'>Click on the image you want to use: </p>
              <theme-chooser 
                @change='setSelectedThemeIndex'
              />
            </div>
            <div class="button-container has-text-right">
              <button class='button is-primary is-large is-uppercase has-text-weight-bold' type='submit'>Create</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import imageSrc from 'Core/util/imageSrc'

import CounterWidgetJumbotron from 'Components/CountersForThePoor/CounterWidgetJumbotron'
import CounterSelect from 'Components/CountersForThePoor/CounterSelect'
import SelectSize from 'Components/CountersForThePoor/SelectSize'
import ThemeChooser from 'Components/CountersForThePoor/ThemeChooser'
import NonprofitAjaxSearch from 'Components/general/NonprofitAjaxSearch'


export default {
  name: 'WidgetCustomizer',

  components: {
    CounterSelect,
    SelectSize,
    ThemeChooser,
    NonprofitAjaxSearch,
    CounterWidgetJumbotron,
  },

  mixins: [imageSrc],

  props: {
    widgetId: {
      type: Number,
      required: true,
    },
  },

  data () {
    return {
      noImage: false,   
      size: {
				name: 'large',
        label: 'Large',
        width: '800px',
				className: 'large',
      },
      imgFolderName: 'widget-imgs/',
      color: 'black-and-white',
      nonprofit: null,
      counterId: null,
      message: '',
      chooserSelectedTheme: null,
    }
  },

  methods: {
    setSelectedThemeIndex (index, theme) {
      this.chooserSelectedTheme = theme
    },

    setNonprofit (value) {
      this.nonprofit = value
    }
  },

  computed: {
    widgetData () {
      const { counterId, message, nonprofit } = this
      return {
        counterId,
        message,
        nonprofit,
      }
    },

    /**
     * Theme class name
     */
    themeClassName () {
      const { name } = this.selectedTheme

      if (name) {
        return `counter-widget-jumbotron--${name}`
      }

      return 'counter-widget-jumbotron--default'
    },

    ...mapState({
      widget (state) {
        return state.counterwidgets.widgets.find(widget => widget.id == this.widgetId)
      },

      counter (state) {
        const id = this.counterId !== null ? this.counterId : this.widget.counterId

        return state.counterwidgets.counters.find(counter => counter.id == id)
      },

      selectedTheme (state) {
        if (this.chooserSelectedTheme) {
          return this.chooserSelectedTheme
        }

        return state.counterwidgets.themes.find(theme => theme.id == this.widget.themeId)
      },

      backgroundImg (state) {
        const { backgroundImageId } = this.selectedTheme

        if (backgroundImageId || backgroundImageId === 0) {
          return this.getImageSrc(state.counterwidgets.backgroundImages[backgroundImageId])
        }

        return null
      },
    }),
  },
}
</script>

<style scoped lang='scss'>
.widget-customizer {
  &__widget-container {
    display: none;

    // TODO: Maybe add another breakpoint for largest widget size and make use of Bulma's breakpoint mixin?
    @media (min-width: 800px)  {
      display: block;
    }
  }

  &__counter-widget {
    margin-left: auto;
    margin-right: auto;
  }

  &__images {
    margin-top: 1em;
  }

  &__featured-images-wrapper {
    margin-top: 1em;
    margin-bottom: 1em;

    p {
      font-size: 1rem;
    }
  }

  &__fields {
    display: flex;
    flex-wrap: wrap;

    form {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
    }

    .field {
      width: 100%;

      @include tablet {
        margin-top: 1em;
        display: flex;
        align-items: center;
      }
    }

    &-label {
      display: inline-block;
      min-width: 40%;
      font-weight: 700 !important;
      margin-bottom: .5em;

      @include tablet {
        margin-bottom: 0;
      }
    }

    .field-input {
      max-width: 600px;
      flex-grow: 1;
      flex-shrink: 1;
    }

    .control,
    .counters-select__wrap {
      flex-grow: 1;
      flex-shrink: 1;
    }

    .button-container {
      width: 100%;
      margin-top: auto;
    }

    .select {
      display: block;
      max-width: 100%;
    }
  }

  .nonprofit-search-field-wrapper {
    margin-left: -.75rem;
    margin-right: -.75rem;
    padding-top: 0;
    padding-bottom: 0;
  }

  .counter-widget {
    color: #333;
    background-color: #fff;
    box-shadow: 0 2px 8px 2px rgba(0,0,0,.3);
    padding: 1.5rem;
    border: 2px solid $color-gray;
    border-radius: $border-radius;
  }

  .widget {
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 3rem;
  }
}
</style>
