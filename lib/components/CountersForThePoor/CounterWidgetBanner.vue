<template>
	<div :class='["counter-widget-jumbotron", { "counter-widget-jumbotron--no-img": !bgImage }]'>
		<div class='counter-widget-jumbotron__img-container'>
			<img :src='bgImage' class='counter-widget-jumbotron__img' alt='Counter Widget Banner Image' v-if='bgImage'>
		</div>
		<div 
			:class='["counter-widget-jumbotron__widget", ...widgetPosition]'
		>
			<counter-widget 
				:id='widgetId'
			/>
		</div>
	</div>
</template>

<script>
import { difference } from 'lodash'
import CounterWidget from '@/components/CountersForThePoor/CounterWidget'

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
	},

	data () {
		return {}
	}
}
</script>

<style scoped lang='scss'>
.counter-widget-jumbotron {
	position: relative;

	&--no-img {
		min-height: 450px;
	}

	&__img-container {
		margin-left: -1.5rem;
		margin-right: -1.5rem;
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
	}

	.counter-widget {
		padding: 1em;
		padding: 1.5rem 2rem;
		// background-color: rgba(3, 0, 0, 0.28);
		// border: 2px solid $primary;
		border-radius: 4px;
		max-width: 570px;
	}
}
</style>
