<template>
<div class='income-levels-slider-list'>
	<div 
		class='income-levels-slider-list__list-container'
	>
		<h4>What they can afford: </h4>
		<ul
			class='income-levels-slider-list__list income-levels-slider-list__list--have'	
			v-if='have && have.length > 0'	
		>
			<li
				v-for='(item, index) in have'	
				:key='index'
			>
				{{ item }}
			</li>
		</ul>
		<p v-if='!have || have.length === 0'>Can't afford all in the list</p>
	</div>
	<div 
		class='income-levels-slider-list__list-container income-levels-slider-list__list-container--dont-have'
	>
		<h4 class='has-text-danger'>What they can't afford: </h4>
		<ul
			class='income-levels-slider-list__list income-levels-slider-list__list--dont-have'	
			v-if='dontHave && dontHave.length > 0'	
		>
			<li
				v-for='(item, index) in dontHave'	
				:key='index'
			>
				{{ item }}
			</li>
		</ul>
		<p v-if='!dontHave || dontHave.length === 0' class='has-text-danger'>Can afford all in the list</p>
	</div>
</div>
</template>

<script>
import { TweenMax } from 'gsap'

export default {
	name: 'IncomeLevelsSliderList',

	props: {
		/** 
		 * Income level's have list
		 */
		have: {
			type: Array,
			required: false,
			default: [],
		},

		/** 
		 * Income level's dont have list
		 */
		dontHave: {
			type: Array,
			required: false,
			default: [],
		},

		/** 
		 * Whether the list is expanded or not
		 */
		expanded: {
			type: Boolean,
			required: false,
			default: false,
		},
	},

	data () {
		return {
			targetHeight: 0,
		}
	},

	mounted () {
		this.targetHeight = this.$el.scrollHeight
		if (!this.expanded) {
			this.$el.style.height = 0
		}
	},

	methods: {
		toggleList () {
			const targetHeight = this.expanded ? this.targetHeight + 3 : 0

			TweenMax.to(this.$el, .3, {height: targetHeight})
		}
	},

	watch: {
		expanded ()	{
			this.toggleList()
		},
	}
}
</script>

<style lang='scss' scoped>
.income-levels-slider-list {
	overflow: hidden;
	padding-top: 0;
	padding-left: .25em;
	padding-right: .25em;
	padding-bottom: 0.875em;
	border-bottom: 2px solid $primary;

	@include fullhd {
		padding-left: .5em;
		padding-right: .5em;
	}

	h4 {
		text-align: center;
		font-size: 1rem;
		font-weight: 700;
		color: #23d160;
		margin-bottom: .25rem;
	}

	&__list-container {
		&:first-of-type {
			margin-top: .875em;
		}

		p {
			line-height: 1em;
			text-align: center;
			margin-bottom: 0;
		}

    &--dont-have {
      margin-top: .75rem;
    }
	}

	&__list {
		li {
			margin-bottom: .25rem;
		}

		&--have {
			h4 {
				color: $primary;
			}

			li {
				color: #23d160;
			}
		}

		&--dont-have {
			padding-bottom: 1em;
			
			h4,
			li {
				color: #ff0000;
			}
		}
	}
}
</style>

