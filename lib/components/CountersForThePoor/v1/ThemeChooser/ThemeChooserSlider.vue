<template>
	<div class='theme-chooser--slider'>
		<flickity
			class='theme-chooser__slider'
			:options='sliderOptions'
			@init='flickityInitialized'
		>
			<div 
				class="theme-chooser__slide"
				v-for='(theme, index) in imageOpts'
				@click='selectSlide(index, theme)'
				:key='theme.id'
			>
				<img 
					:src="theme.imageSrc"
					class='theme-chooser__img'
					alt="Featured Image Chooser"
				>
			</div>
			<div 
				class='theme-chooser__slide theme-chooser__slide--no-img'
				v-for='(theme, index) in noImageOpts'
				@click='selectNoImageSlide(index, theme)'
				:key='theme.id'
			>
				<p class='theme-chooser__no-img-text'>No image</p>
			</div>
		</flickity>
	</div>
</template>

<script>
import themeChooser from 'Core/util/themeChooser'

import Flickity from 'Components/plugins/Flickity'

export default {
  name: 'ThemeChooserSlider',

	mixins: [themeChooser],

  components: {
    Flickity,
  },

	data () {
		return {
			flickity: null,
		}
	},

  methods: {
		/**
		 * Triggers when Flickity has been successfully initialized/
		 */
  	flickityInitialized (flickity) {
			if (flickity) {
				this.flickity = flickity
			}
		},
		
		/**
		 * Triggers when slider has changed/settled
		 */
		sliderChanged (index, theme) {
			this.selected = index
			this.$emit('sliderChanged', index, this.flickity)
		},

		/**
		 * Select a slide using Flickity's API
		 */
		selectSlide (index, theme) {
			if (this.flickity) {
				this.setSelectedIndex(theme.id)
				this.flickity.select(index)
			}
		},

		/**
		 * Select a No Image slide using Flickity's API
		 */
		selectNoImageSlide (index, theme) {
			const slideIndex = this.noImageStartIndex + index

			this.selectSlide(slideIndex, theme)
		},
	},

  computed: {
    sliderOptions () {
      return {
        wrapAround: true,
        cellAlign: 'center',
				draggable: false,
      }
		},

		/**
		 * Start index of No Image slides.
		 * 
		 * Since we push our No Image Slides after the Image Slides,
		 * we compute the start index of our No Image slides to the length of 
		 * our image slides.
		 */
		noImageStartIndex () {
			return this.imageOpts.length
		},
  },
}
</script>

<style lang="scss" scoped>
  .theme-chooser {
    margin-left: auto;
    margin-right: auto;

    &__slide {
      height: 400px;
      width: 66%;
      margin-right: 10px;
      display: flex;
			align-items: center;
			border-radius: $border-radius;
			overflow: hidden;

			&--no-img {
				background-color: #ddd;
				display: flex;
				align-items: center;
				justify-content: center;
			}
			
			&:hover {
				cursor: pointer;
			}

			&.is-selected {
				border: 2px solid $primary;
         .theme-chooser__img {
           filter: brightness(1);
         }

				 &:hover {
					.theme-chooser__slide-overlay {
						opacity: 1;	
					} 
				}
      }
    }

    &__img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      filter: brightness(.5);
      transition: all .2s ease;
    }

		&__slide-overlay {
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			width: 100%;
			height: 100%;
			z-index: 10;
			display: flex;
			align-items: center;
			justify-content: center;
			background-color: rgba(0,0,0,.6);
			opacity: 0;
			transition: opacity .5s ease;
		}

		&__no-img-text {
			font-size: 2rem;
		}

		.flickity-prev-next-button {
			&.next {
				right: -3.25em;
			}

			&.previous {
				left: -3.25em;
			}
		}

		.flickity-button-icon {
			fill: #000;
		}
	}
</style>
