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
      <flickity
        :options='flickityOptions'
        :class='`income-levels-slider__slider income-levels-slider__slider--${listExpanded ? "expanded" : "minimized"}`'
        id='income-levels-slider'
        ref='slider'
      >
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
              @toggled='onListToggled'
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
              @toggled='onListToggled'
            />
          </div>
        </div>
      </flickity>
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
import { TimelineMax, Power2, TweenMax } from 'gsap'

import Icon from 'Components/general/Icons'
import Flickity from 'Components/plugins/Flickity'


export default {
	name: 'IncomeLevelSlider',

	components: {
		IncomeLevelsSliderImages: () => import('Components/0to100/IncomeLevelsSliderImages.5'),
    IncomeLevelsSliderList: () => import('Components/0to100/IncomeLevelsSliderList.5'),
    Flickity,
		Icon,
	},

	mounted () {
		const tl = new TimelineMax({ repeat: -1 })

		const headings = this.$el.getElementsByClassName('income-levels-slider__heading')

		Array.from(headings).forEach(heading => {
			tl.to(heading, 1, {opacity: 1})
				.to(heading, 5, {opacity: 1})
				.to(heading, 1, {opacity: 0, ease: Power2.easeIn}, "+=1")
    });
    

    window.addEventListener('resize', () => {
      this.targetHeight = null
    })
	},

	data () {
		return {
      listExpanded: false,
      flickityOptions: {
        pageDots: false,
        cellAlign: 'left',
        contain: true,
        watchCSS: true,
        groupCells: true,
        setGallerySize: false,
      },
      targetHeight: null,
		}
	},

	methods: {
		/** 
		 * Toggles the `listExpanded` data
		 */
		toggleListExpanded () {
			this.listExpanded = !this.listExpanded
    },
    
    toggleSlider (el) {
    },

    onListToggled (height) {

      let slider = this.$refs.slider.$el
      if (!this.targetHeight || this.targetheight < height) {
        this.targetHeight = height
      }

      if (this.listExpanded) {
  
        TweenMax.to(slider, .3, {height: this.targetHeight + 220})
      } else {
        const top = slider.getBoundingClientRect().top + window.scrollY - 100
        window.scrollTo({
          top,
        })
        TweenMax.to(slider, .3, {height: 220})  
      }
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
	padding-bottom: 1.5em;
	padding-top: 1em;
  background-color: #eee;
  overflow: hidden;

  @include tablet {
    padding-top: 2.25em;
    padding-bottom: 2.25em;
  }
  
	&__heading-container {
    height: 34px;
    position: relative;
    margin-bottom: 1em;
    
    @include tablet {
      height: 50px;
      padding-bottom: 0;
      margin-bottom: 2.25em;
    }
	}

	&__heading {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		opacity: 0;
		color: $primary;
    font-weight: 700;
    font-size: 1.125em;

    @media (min-width: 576px) {
      font-size: 1.5em;
    }
    
    @include tablet {
      font-size: 2.125em;
    }
	}

	&__btn-container {
		text-align: center;
    margin-top: 1em;
    max-width: 100%;
    
    .button {
      white-space: normal;
      height: auto;
    }
	}

	&__levels-container {
		margin-left: -.25em;
    margin-right: -.25em;
    margin-bottom: 1.5em;
		display: flex;
    justify-content: space-between;
    
    @include tablet {
      margin-bottom: 2.25em;
    }
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
  
  &__slider {
    width: 100%;
    height: 226px;
    transition: max-height .4s ease;
    position: relative;
    display: block;

    @include desktop {
      display: flex;
      height: auto;
    }

    &:after {
      content: 'flickity';
      display: none;

      @include desktop {
        content: '';
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
  width: 90%;

  @media (min-width: 600px) {
    width: 48%;
  }

  @include tablet {
    width: 32%;
  }

  @include desktop {
    width: 16%;
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

  .flickity-button {
    @include desktop {
      display: none;
    }
  }
}
</style>

