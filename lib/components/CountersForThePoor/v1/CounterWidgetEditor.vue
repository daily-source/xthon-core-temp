<template>
  <div class='counter-widget-edit' :style='{width: `${size}px`}'>
    <counter-widget-jumbotron 
      :widget-id='widgetId'
      :bg-image='backgroundImg'
      :widget-position='["bottom", "left"]'
      :logo-position='theme.logoPosition'
      :show-logo='true'
      :colorId='theme.colorId'
      :widget-data='widgetData'
      :edit='true'
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import imageSrc from 'Core/util/imageSrc'

import CounterWidgetJumbotron from 'Components/CountersForThePoor/v1/CounterWidgetJumbotron'

export default {
  name: 'CounterWidgetEditor',

  components: {
    CounterWidgetJumbotron,
  },

  mixins: [imageSrc],

  data () {
    return {
      imgFolderName: 'widget-imgs/'
    }
  },

  props: {
    size: {
      type: [Number, String],
      required: false,
      default: 'large',
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

  computed: {
    backgroundImg () {
      const { backgroundImageId } = this.theme

      if (backgroundImageId || backgroundImageId === 0) {
        return this.getImageSrc(this.backgroundImages[backgroundImageId])
      }

      return null
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
    transform: scale(0.7);
    transform-origin: 0% 100%;
    background-color: transparent !important;
    border-color: transparent !important;
  }

  .counter-widget-jumbotron {
    &__logo-container {
      max-width: 200px;
      margin-left: auto;
      margin-right: auto;
    }

    &__img-container {
      height: 100%;

      img {
        width: 100%;
        height: 505px;
        object-fit: cover;
        object-position: right center;
      }
    }

		&--no-img {
			.counter-widget-jumbotron__logo-container {
				max-width: 300px;
			}
		}
  }
}
</style>
