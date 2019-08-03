<template>
  <div 
    class="box-slider"
    @mouseover='toggleHovered'
    @mouseout='toggleHovered'
  >
		<div class="box-slider__slide box-slider__slide--title">
			<h2 class='box-slider-title__heading'>{{ message }}</h2>
		</div>
    <transition name='box-fade'>
			<div 
				class="box-slider__slide box-slider__slide--image" 
				v-if='showImage'
			>
				<img 
					:src='selectedImage.src' 
					:alt="selectedImage.alt"
				>
			</div>
		</transition>
    <transition name='box-fade'>
      <div 
        class='box-slider__slide box-slider__slide--cta'
        v-if='showCta'
      >
        <h2 class='has-text-weight-bold'>Please Help Now</h2> 
      </div>
    </transition>
    <transition name='box-fade'>
      <div 
      class="box-slider__hover-box-wrap"
      v-if='hovered'>
        <div class="box-slider__hover-box">
          <h3 class='has-text-weight-bold'>{{ title }}</h3>
          <p v-if='cost'>
            Approximate cost of saving a life: {{ cost | currencyFormat }}
          </p>
          <p>
            A person dies every {{ (deathsPerSecond || '????') | numberFormat  }} seconds
          </p>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { random } from 'lodash'

export default {
  name: 'BoxSlider',

  props: {
    title: {
      type: String,
      required: true,
    },

    message: {
      type: String,
      required: true,
    },

    cost: {
      type: Number,
    },

    deathsPerSecond: {
      type: Number,
    },
    images: {
      type: Array,
    },

    options: {
      type: Object,
      required: false,
    },

    selected: {
      type: Number,
      required: false,
      default: 0,
    }
  },

  data () {
    return {
      hovered: false,
      dataShown: false,
      imageShowDuration: 1200,
      ctaDuration: 800,
      selectedImageIndex: 1,
      showImage: false,
      showCta: false,
    }
  },

	mounted () {
		this.playSlider()
	},

  methods: {
		playSlider () {
			setTimeout(() => {
        if (!this.showCta && !this.showImage) {
          this.showImage = true
        } else {
          if (this.showCta) {
            this.showCta = false
          }

          if (this.showImage) {
            this.showCta = true
            this.showImage = false
            this.setSelectedImageIndex()
          }
        }

				this.playSlider()
			}, this.timeoutDur)
		},

    toggleHovered () {
      this.hovered = !this.hovered
    },

		setSelectedImageIndex () {
			if (this.selectedImageIndex > this.imagesSrc.length) {
				this.selectedImageIndex = 1

				return
			}

			if (!this.showImage) {
				this.selectedImageIndex += 1
			}
		},

    getImage (imgName) {
      return require(`@/assets/img/images/in-sight-in-mind/${imgName}`)
    },
  },

  computed: {
    imagesCount () {
      return this.images && this.images.length
    },

    imageSlideDelay () {
      return this.deathsPerSecond * 1000
    },

    imagesSrc () {
      const srcArray = []

      this.images.forEach( img => {
        const src = this.getImage(img.name)
        srcArray.push({
          src,
          alt: img.alt
        })
      } )

      return srcArray
    },

		selectedImage () {
			return this.imagesSrc[this.selectedImageIndex - 1]
    },
    
    timeoutDur () {
      let timeoutDur = this.imageSlideDelay - (this.ctaDuration + this.imageShowDuration)

      if (this.showCta) {
        timeoutDur = this.ctaDuration
      }

      if (this.showImage) {
        timeoutDur = this.imageShowDuration
      }

      return timeoutDur
    }
  },
}
</script>

<style lang='scss' scoped>
.box-slider {
  border-radius: $box-slider-border-radius;
  text-align: center;
  height: $box-slider-height;
  position: relative;

  @include mobile {
    height: 250px;
  }
}

.box-slider__slide {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: $box-slider-height;
  border-radius: $box-slider-border-radius;
  overflow: hidden;
  background-image: linear-gradient(135deg, $primary 0%, $color-primary-tint 90%);

  @include mobile {
    height: 250px;	
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  &--image {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 220px;

    @include mobile {
      height: 250px;	
    }		
  }

  &--cta {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    background-color: $danger;
    background-image: none;
    height: 220px;

    h2 {
      color: #fff;
      margin-bottom: 0;
      font-size: 1.5em;
    }

    @include mobile {
      height: 250px;	
    }	
  }
}

.box-slider-title__heading {
  max-width: 70%;
  margin-left: auto;
  margin-right: auto;
  color: #fff;
  font-weight: 700;
  font-size: 1.5em;
  font-family: $font-family-base;
  margin-bottom: 0;

  @include mobile {
    font-size: 1.25em;
  }
}

.box-slider__hover-box {
  width: 100%;
  height: 100%;
  background-color: $secondary;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  display: flex;
  color: #fff;
  padding: .875em;
  border-radius: $box-slider-border-radius;

  h3 {
    font-family: $font-family-base;
    color: #fff;
    font-size: 1.25rem;
  }

  p {
    font-size: 1rem;
    &:last-child {
      margin-bottom: 0;
    }
  }
}

.box-slider__hover-box-wrap {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
}

// Fade animation
.box-fade-enter,
.box-fade-leave-to {
  opacity: 0;
}

.box-fade-enter-active,
.box-fade-leave-active {
  transition: opacity .2s ease-out;
}

.box-fade-enter-to,
.box-fade-enter-leave {
  opacity: 1;
}
</style>
