<template>
<div class='income-levels-slider'>
	<div class='income-levels-slider__heading-container'>
		<h2 
			class='has-text-centered income-levels-slider__heading'
			v-for='(label, index) in labels'
			:key='index'
		>
			{{ label }}
		</h2>
	</div>
	<div class='income-levels-slider__levels'>
		<div class='income-levels-slider__levels-container'>
			<div
				class='income-levels-slider-level-wrapper'
				v-for='(level, index) in sliderTopIncomeLevels'
				:key='index'
			>
				<div class='income-levels-slider-level'>
					<income-levels-slider-images 
						:images='level.photos'	
					/>
					<div class='income-levels-slider-level__body'>
						<h4>{{ level.sliderPercent }}</h4>
						<p>Above ${{ level.value}}</p>
					</div>
					<income-levels-slider-list 
						:have='level.have'	
						:dont-have='level.dontHave'
						:expanded='listExpanded'
					/>
				</div>
			</div>
			<!-- <div class='income-levels-slider-level-wrapper income-levels-slider-level-wrapper--middle'>
				<p class='has-text-centered'>Scroll down to see all of the levels</p>
				<icon
					icon='chevron-down'
					:iconwidth='46'
					:iconheight='46'
					color='#ff5f00'
				/>
			</div> -->
			<div
				class='income-levels-slider-level-wrapper'
				v-for='(level, index) in sliderBottomIncomeLevels'
				:key='index + sliderTopIncomeLevels.length'
			>
				<div class='income-levels-slider-level'>
					<income-levels-slider-images 
						:images='level.photos'	
					/>
					<div class='income-levels-slider-level__body'>
						<h4>{{ level.sliderPercent }}</h4>
						<p>Below ${{ level.value}}</p>
					</div>
					<income-levels-slider-list 
						:have='level.have'	
						:dont-have='level.dontHave'
						:expanded='listExpanded'
					/>
				</div>
			</div>
		</div>
	</div>
	<div class='income-levels-slider__info'>
		<p>
			All numbers above are annual income levels
		</p>
	</div>
	<div class='income-levels-slider__btn-container'>
		<button 
			class='button is-secondary'
			@click='toggleListExpanded'
		>
			Click here to {{ listExpanded ? 'hide' : 'see' }} what the groups above have
		</button>
	</div>
	<!-- <div class='income-levels-slider__scroll-down'>
		<p class='has-text-centered'>Scroll down to see all of the levels</p>
		<icon
			icon='chevron-down'
			:iconwidth='46'
			:iconheight='46'
			color='#ff5f00'
		/>
	</div> -->
</div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import { TimelineMax, Power2 } from 'gsap'

import IncomeLevelsSliderImages from 'Components/0to100/IncomeLevelsSliderImages'
import IncomeLevelsSliderList from 'Components/0to100/IncomeLevelsSliderList.5'
import Icon from 'Components/general/Icons'


export default {
	name: 'IncomeLevelSlider',

	components: {
		IncomeLevelsSliderImages,
		IncomeLevelsSliderList,
		Icon,
	},

	mounted () {
		const tl = new TimelineMax({ repeat: -1})

		const headings = this.$el.getElementsByClassName('income-levels-slider__heading')

		Array.from(headings).forEach(heading => {
			tl.to(heading, 1, {opacity: 1})
				.to(heading, 5, {opacity: 1})
				.to(heading, 1, {opacity: 0, ease: Power2.easeIn}, "+=1")
		});
	},

	data () {
		return {
			listExpanded: false,
		}
	},

	methods: {
		/** 
		 * Toggles the `listExpanded` data
		 */
		toggleListExpanded () {
			this.listExpanded = !this.listExpanded
		}
	},

	computed: {
		sliderTopIncomeLevels () {
			return this.topIncomeLevels.filter((incomeLevel, index) => index !== 2)
		},

		sliderBottomIncomeLevels () {
			return this.bottomIncomeLevels.filter((incomeLevel, index) => index !== 1)
		},
	

    ...mapGetters({
      topIncomeLevels: 'incomeLevels5/topHalf', 
      bottomIncomeLevels: 'incomeLevels5/bottomHalf', 
		}),

		...mapState({
			labels: state => state.incomeLevels5.labels,	
		})
	}
}
</script>

<style lang='scss' scoped>
.income-levels-slider {
	padding-left: 1em;
	padding-right: 1em;
	padding-bottom: 2.25em;
	padding-top: 2.25em;
	background-color: #eee;
	display: none;

	@include desktop {
		display: block;
	}

	&__heading-container {
		height: 50px;
		position: relative;
		margin-bottom: 2.25em;
	}

	&__heading {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		opacity: 0;
		color: $primary;
		font-weight: 700;
	}

	&__btn-container {
		text-align: center;
		margin-top: 1em;
	}

	&__levels-container {
		margin-left: -.25em;
		margin-right: -.25em;
		margin-bottom: 2.25em;
		display: flex;
		justify-content: space-between;
	}

	&__scroll-down {
		margin-top: 1em;

		p {
			font-size: 1.125em;
			color: $primary;
			margin-bottom: 0;
		}
	}

	&__info {
		p {
			text-align: center;
			color: $secondary;
			font-size: 1.125rem;

			@include desktop {
				font-size: 1.625rem;
			}
		}
	}
}

.income-levels-slider-level-wrapper {
	flex-grow: 1;
	flex-shrink: 1;
	// max-width: calc(16.67% - 33.33px);
	padding-left: .5em;
	padding-right: .5em;
	
	@include fullhd {
		// max-width: calc(16.67% - 41.67px);
	}

	&--middle {
		max-width: 100px;

		@include fullhd {
			max-width: 170px;
		}

		p {
			font-size: 1em;
			color: $primary;
			margin-bottom: .5em;
			padding-top: 60%;
		}
	}
}

.income-levels-slider-level {
	border-radius: 10px;
	box-shadow: 0 8px 8px 2px rgba(0,0,0,.2);
	overflow: hidden;
	background-color: #fff;

	&__body {
		padding-top: 1em;
		text-align: center;

		h4 {
			font-weight: 700;
			color: $primary;
			font-size: 1.375em;
			line-height: 1em;
			margin-bottom: 10px;
		}

		p {
			margin-bottom: 0;
			@include widescreen {
				font-size: 1.25em;
			}
		}
	}
}
</style>

<style lang='scss'>
.income-levels-slider {
	.icon-wrapper {
		text-align: center;
	}
}
</style>

