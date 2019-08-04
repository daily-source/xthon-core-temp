<template>
<div class='income-levels-slider-list'>
	<div 
		class='income-levels-slider-list__list-container income-levels-slider-list__list-container--have'
	>
		<h4 class='has-text-succcess'>What they can afford:</h4>
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
			class='income-levels-slider-list__list income-levels-slider-list__list--have'	
			v-if='have && have.length === 0'	
		>
			<li>
				Can't afford all in the list
			</li>
		</ul>
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
		<ul
			class='income-levels-slider-list__list income-levels-slider-list__list--dont-have income-levels-slider-list__list--empty'	
			v-if='dontHave && dontHave.length === 0'	
		>
			<li class='has-text-success'>
				Can afford all in the list
			</li>
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
			const targetHeight = this.expanded ? this.targetHeight + 3 : 0

      TweenMax.to(this.$el, .3, {height: targetHeight})
      
      this.$emit('toggled', targetHeight)
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
	padding-bottom: 0.5em;
	border-bottom: 2px solid $primary;

	@include fullhd {
		padding-left: .5em;
		padding-right: .5em;
	}

	h4 {
		font-size: 1rem;
		font-weight: 700;
		margin-bottom: .375rem;
	}

	&__list-container {
		&:first-of-type {
			margin-top: .5em;
		}

		p {
			line-height: 1em;
			text-align: center;
			margin-bottom: 0;
		}

		&--have {
			h4 {
				color: #23d160;
        padding-top: .375em;
			}
		}

		&--dont-have {
      margin-top: .5rem;

			h4 {
				color: #ff0000;
        margin-bottom: .25em;
			}
		}
	}

	&__list {
		list-style: disc;
		margin-left: 1.5em;

		li {
			margin-bottom: .25rem;
		}

		&--have {
			li {
				color: #23d160;
			}
		}

		&--dont-have {
			padding-bottom: 1em;
			
			li {
				color: #ff0000;
			}
		}

		&--empty {
			list-style: none;
			padding-bottom: 0;
			margin-left: 0;

			li {
				margin-bottom: 0;
				line-height: 1;
				color: $success;
			}
		}
	}
}
</style>

