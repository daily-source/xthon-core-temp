<template>
	<section 
		id="banner" 
		class='section banner'
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

import CounterWidget from 'Components/CountersForThePoor/CounterWidget'

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
  .banner {
    position: relative;
    background-size: cover;
    background-position: right;
    background-attachment: fixed;
    height: 95vh;
		margin-bottom: 2rem;

		@include tablet {
			background-position: center;
		}
  }

  .banner__img {
    display: block;
  }

  .banner__contents {
    position: absolute;
		bottom: 30px;
		left: 0;

		@include tablet {			
			left: 6%;
		}

		@include fullhd {
			left: 9%;
		}

    .counter-widget {
      padding:  1.5rem 2rem;
      // background-color: rgba(#030000, .28);
      // border: 2px solid $primary;
      border-radius: 4px;
			margin-left: 0;
    }
  }
</style>
