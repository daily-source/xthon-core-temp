<template>
<div class='income-levels-slider-level-images'>
	<img
		v-for='(image, index) in images'
		class='income-levels-slider-level-images__image' 
		:key='index'
		:src='require(`@/assets/img/images/${image}`)' 
		alt=''
	>
</div>
</template>

<script>
import { TimelineMax, Power2 } from 'gsap'

export default {
	name: 'IncomeLevelsSliderImages',

	props: {
		/**
		 * Images to display.
		 */
		images: {
			type: Array,
			required: false,
			default: [],
		},
	},

	mounted () {
		const tl = new TimelineMax({ repeat: -1})

		const headings = this.$el.getElementsByClassName('income-levels-slider-level-images__image')

		Array.from(headings).forEach(heading => {
			tl.to(heading, 1, {opacity: 1})
				.to(heading, 2, {opacity: 1})
				.to(heading, 1, {opacity: 0, ease: Power2.easeIn}, "+=1")
		});
	},
}
</script>

<style lang='scss' scoped>
.income-levels-slider-level-images {
	max-height: 140px;
	min-height: 140px;
	position: relative;
	overflow: hidden;

	@include fullhd {
		max-height: 180px;
		min-height: 180px;
	}

	&__image {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		opacity: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center;
	}
}
</style>

