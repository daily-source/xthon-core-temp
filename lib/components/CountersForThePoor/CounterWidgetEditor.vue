<template>
  <div 
		:class='["counter-widget-edit", `counter-widget-edit--${size.className}`]' 
		:style='{width: `${size.width}px`, height: `${height}px`}'
	>
    <counter-widget-jumbotron 
      :widget-id='widgetId'
      :bg-image='backgroundImg'
      :widget-position='["top", "left"]'
      :logo-position='theme.logoPosition'
      :show-logo='true'
      :colorId='theme.colorId'
      :widget-data='widgetData'
      :edit='true'
      :class='themeClassName'
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import imageSrc from 'Core/util/imageSrc'

import CounterWidgetJumbotron from 'Components/CountersForThePoor/CounterWidgetJumbotron'

export default {
  name: 'CounterWidgetEditor',

  components: {
    CounterWidgetJumbotron,
  },

  mixins: [imageSrc],

  props: {
		/**
		 * The size of the widget as a prop.
		 */
    size: {
      type: Object,
      required: false,
			default: () => {
				return {
					width: 800,
					label: 'Large',
					className: 'large',
				}	
			},
    },

    // TODO: Make required, remove default
    widgetId: {
      type: Number,
      required: false,       
      default: 1,
    },

    theme: {
      type: Object,
      required: false,
      default: () => {
        return {
          backgroundImageId: null,
          colorId: 0,
        }
      },
    },

    widgetData: {
      type: Object,
      required: false,
    },
  },

  data () {
    return {
      imgFolderName: 'widget-imgs/',
			widthHeightRatio: 1.58,
    }
  },

  computed: {
    backgroundImg () {
     const { backgroundImageId } = this.theme

      if (backgroundImageId || backgroundImageId === 0) {
        return this.getImageSrc(this.backgroundImages[backgroundImageId])
      }

      return null
    },

    /**
     * Widget height is calculated by the defined width divided 
		 * by the defined widthHeightRatio.
     */
    height () {
      return this.size.width / this.widthHeightRatio
		},
    /**
     * Theme class name
     */
    themeClassName () {
      const { name } = this.theme

      if (name) {
        return `counter-widget-jumbotron--${name}`
      }

      return 'counter-widget-jumbotron--default'
    },

    ...mapState({
      widget (state) {
        return state.counterwidgets.widgets.find(widget => widget.id === this.widgetId)
      },

      counter (state) {
        return state.counterwidgets.counters.find(counter => counter.id === this.widget.counterId)
      },

			widgetSize (state) {
				return state.counterwidgets.sizes[this.size].width
			},

      backgroundImages: state => state.counterwidgets.backgroundImages,
    }),
  },
}
</script>

<style lang="scss">
.counter-widget-edit {
  margin-right: auto;
  margin-left: auto;
  overflow: hidden;

  .counter-widget {
    background-color: transparent !important;
    border-color: transparent !important;
  }

  .counter-widget-jumbotron {
    overflow: hidden;
		height: 100%;
    
    &__widget {
      margin-top: 18%;
    }

    &__logo-container {
      max-width: 200px;
      margin-left: auto;
      margin-right: auto;
    }

    &__img-container {
      height: 100%;

      img {
        width: 100%;
				height: 100%;
        object-fit: cover;
        object-position: right center;
      }
    }

		&--no-img {
      .counter-widget-jumbotron__widget {
        margin-top: 0;
      }

			.counter-widget-jumbotron__logo-container {
				max-width: 300px;
			}

      
      .counter-widget {
        &__counters {
          font-size: 1.25rem;
        }   
      }
		}
  }
}
</style>
