<template>
	<section 
		id="banner" 
		class='section banner banner-v2'
		:style='{
			backgroundImage: `url("${backgroundImage}")`
		}'		
	>
		<div class="banner__contents">
			<counter-widget 
				:id="widgetId"
			/>
		</div>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import imageSrc from 'Core/util/imageSrc'

import CounterWidget from 'Components/CountersForThePoor/v2/CounterWidget'

export default {
	name: 'AppBanner',

	mixins: [imageSrc],

  props: {
    widgetId: {
      type: Number,
			default: 1,
    }
  },

  components: {
    CounterWidget,
	},

	data () {
		return {
			imgFolderName: 'widget-imgs/'
		}
	},

	computed: {
		backgroundImage () {
			const { featuredImg } = this.widget

			if (featuredImg !== null) {
				const img = this.backgroundImages[featuredImg]

				return this.getImageSrc(img)
			}

			return
		},
		
		...mapState({
			widget (state) {
				return state.counterwidgets.widgets.find(widget => widget.id === parseInt(this.widgetId))
			},

			counter (state) {
				return state.counterwidgets.counters.find(counter => counter.id === parseInt(this.widget.counterId))
			},

			backgroundImages: state => state.counterwidgets.backgroundImages
		})
	},
}
</script>

<style lang='scss'>
  .banner-v2 {
    position: relative;
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
    height: 95vh;
    margin-bottom: 2rem;
    .banner__img {
      display: block;
    }

    .banner__contents {
      position: absolute;
      left: 4em;
      bottom: 30px;

      .counter-widget {
        max-width: 600px;
        padding:  1.5rem 2rem;
        // background-color: rgba(#030000, .28);
        // border: 2px solid $primary;
        border-radius: 4px;
        margin-left: 0;
      }
    }
  }
</style>
