<template>
	<div :class='["counter-widget-jumbotron",  { "counter-widget-jumbotron--no-img": !bgImage }]'>
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
import CounterWidget from 'Components/CountersForThePoor/v2/CounterWidget'

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
		return {}
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
	position: relative;

	&--no-img {
		display: flex;
		align-items: center;
		flex-direction: column;
		
		.counter-widget-jumbotron__widget {
			background-color: transparent;
		}
	}

	&__logo-container {
		position: absolute;
		top: .25em;
		max-width: 300px;
		left: 0;
		right: 0;
		margin-left: auto;
		margin-right: auto;

		&--right {
			margin-right: 0 !important;
		}

		&--left {
			margin-left: 0 !important;
		}
	}

	&__img-container {
		margin-left: -1.5rem;
		margin-right: -1.5rem;

		img {
			width: 100%;
			display: block;
			max-width: initial;
			object-position: right center;
		}
	}

	&__widget {
		position: absolute;
		z-index: 10;

		&.top,
		&.center,
		&.center-y {
			top: 2em;	
		}

		&.left, 
		&.center {
			left: 2em;
		}

		&.right,
		&.center{
			right: 2em;
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

	.counter-widget {
		padding: 1em;
		padding: 1.5rem 2rem;
		// background-color: rgba(3, 0, 0, 0.28);
		// border: 2px solid $primary;
		border-radius: 4px;
		max-width: 600px;

		// &--primary {
		// 	border-color: $primary;
		// }

		// &--secondary {
		// 	border-color: $secondary;
		// }
	}
}
</style>

<style lang="scss">
.counter-widget-jumbotron--no-img {
	padding: 1.5em;

	.counter-widget-edit & {
		border-radius: $border-radius;
		border: 2px solid #3a3a3a;
		box-shadow: 0 2px 18px 0 rgba(0,0,0,.2);
	}

	.counter-widget-jumbotron__widget {
		position: static !important;
		max-width: 100%;
	}

	.counter-widget {
		color: #000;
		position: static !important;
		transform: scale(1) !important;
		max-width: 100% !important;
		margin-left: auto;
		margin-right: auto;
		padding-left: 0 !important;
		padding-right: 0 !important;
		padding-top: 1em !important;
		padding-bottom: 0 !important;

		&__counters {
			margin-bottom: .625em;
		} 

		&__counter {
			margin-bottom: .625em;
		}
	}

	.counter-widget__title {
		text-align: center;
		margin-left: auto;
		margin-right: auto;
		max-width: 80% !important;
		margin-bottom: .625rem;
	}

	.counter-widget__details {
		flex-direction: column;
		align-items: center;
	}

	.counter-widget-jumbotron__logo-container {
		position: static !important;
		max-width: 270px !important;
	}
	
	.counter-widget__counters,
	.counter-widget__message-container,
	.counter-widget__additional-details {
		width: 90%;
		margin-right: auto;
		margin-left: auto;
	}

	.counter-widget__message-container,
	.counter-widget__additional-details {
		max-width: 95%;
		margin-left: auto;
		margin-right: auto;

		p {
			margin-bottom: .625rem;
		}
	}

	.button {
		color: #000;
	}
}
</style>
