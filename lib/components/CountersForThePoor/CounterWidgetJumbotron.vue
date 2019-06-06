<template>
	<div 
		:class='[
			"counter-widget-jumbotron",  
			{ "counter-widget-jumbotron--no-img": !bgImage },
			`counter-widget-jumbotron--${size.className}`,
		]'
		:style='{width: `${size.width}`, height: `${height}${heightUnit}`}'
	>
		<div 
			:class='["counter-widget-jumbotron__logo-container", logoPositionClass]' 
			v-if='showLogo'
		>
			<img :src='logo' alt='Counters for the Poor Logo'>
		</div>
		<div 
			:class='["counter-widget-jumbotron__widget", ...widgetPosition]'
		>
			<counter-widget 
				:id='widgetId'
				:class='`counter-widget--${color}`'
				:widget-data='widgetData'
				:edit='edit'
				:size='size'
			/>
		</div>
		<div class='counter-widget-jumbotron__img-container' v-if='bgImage'>
			<img :src='bgImage' class='counter-widget-jumbotron__img' alt='Counter Widget Banner Image'>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import { difference } from 'lodash'

import CounterWidget from 'Components/CountersForThePoor/CounterWidget'

export default {
	name: 'CounterWidgetJumbotron',

	components: {
		CounterWidget,
	},

	props: {		
		widgetId: {
			type: Number,
			required: true,
		},

		bgImage: {
			type: String,
			required: false,
		},

		widgetPosition: {
			type: Array,
			validator: (value) => {
				const choices = [	
					'top',
					'left',
					'center-x',
					'center-y',
					'center',
					'bottom',
					'right',
				]
				return difference(value, choices).length === 0
			},
			default: () => {
				return ['top', 'left']
			},
		},

		showLogo: {
			type: Boolean,
			default: false,
		},

		logoPosition: {
			type: String,
			required: false,
			default: 'center',
			validator: (value) => {
				const choices = [
					'top',
					'center',
					'right',
				]

				return choices.indexOf(value) !== -1
			}
		},

		colorId: {
			type: Number,
			default: 0,
		},

		size: {
			type: Object,
			required: false,
			default: () => {
				return {
					name: 'full',
					label: 'Full',
					width: '100%',
					className: 'full',
				}
			}
		},

		widgetData: {
			type: Object,
			required: false,
		},

		edit: {
			type: Boolean,
			required: false,
			default: false,
		},
	},

	data () {
		return {
			widthHeightRatio: 1.58,
		}
	},

	computed: {
		logo () {
			if (this.color === 'primary') {
				return require('@/assets/img/counters-for-the-poor-gold.png')
			}

			return require('@/assets/img/counters-for-the-poor-blue.png')
		},

		logoPositionClass () {
			const position = this.logoPosition
			if (position) {
				return `counter-widget-jumbotron__logo-container--${position}`
			}
		},
		
    /**
     * Widget height is calculated by the defined width divided 
		 * by the defined widthHeightRatio except for 300px size.
     */
    height () {			
      if (this.size.name === 'small' || this.size.name === 'full') {
        return '100%'
			}
			
			const unitlessWidth = parseInt(this.size.width)

      return unitlessWidth / this.widthHeightRatio
		},
		
		/**
		 * The measurement unit that was used in the width. This returns an empty
		 * string when the size is small or full
		 */
		heightUnit () {
			if (this.size.name === 'small' || this.size.name === 'full') {
        return ''
			}

			// Gets the unit that was used for the width.
			const stringLength = this.size.width.length
			const unit = this.size.width.substr(stringLength - 2, stringLength);

			return unit
		},

		...mapState({
			color (state) {
				return state.counterwidgets.colors.find((color, index) => index == this.colorId)
			}
		}),
	}
}
</script>

<style scoped lang='scss'>
.counter-widget-jumbotron {
	$self: &;
	position: relative;
	min-height: 360px;

	&--no-img {
		display: flex;
		align-items: center;
		flex-direction: column;
		
		#{ $self }__widget {
			background-color: transparent;
		}
	}

	&__img-container {
		margin-left: -1.5rem;
		margin-right: -1.5rem;
		overflow: hidden;
		height: 100%;
		position: absolute;

		@include tablet {
			position: static;
		}

		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
			display: block;
			max-width: initial;
			object-position: right center;
		}
	}

	&__widget {
		position: absolute;
		z-index: 10;
		top: 50%;
		transform: translate(0, -50%);
		height: 100%;
		display: flex;
		align-items: center;

		@include tablet {
			display: block;
			top: unset;
			transform: none;
			height: auto; 

			&.top,
			&.center,
			&.center-y {
				top: 2em;	
			}
	
			&.left, 
			&.center {
				left: 1em;
			}
	
			&.right,
			&.center{
				right: 1em;
			}
	
			&.center {
				height: 100%;
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
	
				.counter-widget {
					margin-left: auto;
					margin-right: auto;
				}
			}
	
			&.center-y {
				display: flex;
				height: 100%;
				align-items: center;
			}
	
			&.bottom {
				bottom: 2em;
			}
		}
	}

	.counter-widget {
		padding: 1em;
		padding: 1rem;
		border-radius: 4px;

		@include tablet {
			padding: 1.5rem 2rem;
		}
		// background-color: rgba(3, 0, 0, 0.28);
		// border: 2px solid $primary;

		// &--primary {
		// 	border-color: $primary;
		// }

		// &--secondary {
		// 	border-color: $secondary;
		// }
	}
}
</style>
