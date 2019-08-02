<template>
<div class='income-levels-slider-list'>
	<div 
		class='income-levels-slider-list__list-container'
	>
		<h4 class='heading--have'>What they can afford: </h4>
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
		<ul
			class='income-levels-slider-list__list income-levels-slider-list__list--have income-levels-slider-list__list--empty'
			v-if='have && have.length === 0'	
		>
			<li>Can afford all in the list</li>
		</ul>
	</div>
	<div 
		class='income-levels-slider-list__list-container'
	>
		<h4 class='heading--dont-have'>What they can't afford: </h4>
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
		<ul
			class='income-levels-slider-list__list income-levels-slider-list__list--dont-have income-levels-slider-list__list--empty'
			v-if='dontHave && dontHave.length === 0'	
		>
			<li>Can afford all in the list</li>
		</ul>
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
			const targetHeight = this.expanded ? this.targetHeight : 0

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
	padding-top: .25em;
	padding-left: .25em;
	padding-right: .25em;
	border-bottom: 2px solid $primary;

	@include fullhd {
		padding-left: .5em;
		padding-right: .5em;
	}

	h4 {
		font-size: 1.125rem;
		font-weight: 700;
		color: #ff0000;
		margin-bottom: .25rem;

		&.heading--have {
			color: #23d160;
      padding-top: .125em;
		}

    &.heading--dont-have {
      margin-bottom: .25em;
    }
	}

	&__list-container {
		p {
			line-height: 1em;
			font-weight: 700;
		}
	}

	&__list {
		list-style: disc;
		margin-left: 1.25em;

		li {
			margin-bottom: .25rem;
		}

		&--have {
			li {
				color: #23d160;
			}
		}

		&--dont-have {
			li {
				color: #ff0000;
			}
		}

		&--empty {
			li {
				color: #000 !important;
			}
		}
	}
}
</style>

