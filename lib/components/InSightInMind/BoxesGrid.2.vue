<template>
  <main class='site-content'>
    <section class="section box-section">
      <div class="container">
        <div class="columns is-multiline is-mobile slider-columns">
          <div 
            class="column is-4-desktop is-6-tablet is-full-mobile slider-columns__column" 
            v-for='box in boxes' 
            :key='`${$options.filters.slugify(box.title)}-box`'
          >
            <box-slider 
              :title='box.title'
              :message='box.message'
              :cost='box.cost'
              :deathsPerSecond='box.deathsPerSecond'
              :images='box.images'
            />
          </div>
        </div>
        <h4 class='has-text-grey has-text-weight-bold has-text-centered'>Hover your mouse over a cause for more information.</h4>
        <p class='has-text-centered'>
          <a href="#" class='more__link'>For links to information in this graphic, click here.</a>
        </p>
        <p class='has-text-centered is-marginless'>
          <a href="#" class='button help-now-button is-large is-secondary has-text-weight-bold is-uppercase'>Help Now</a>
        </p>
      </div>
    </section>
  </main>
</template>

<script>
import BoxSlider from './BoxSlider.2'

export default {
  name: 'AppContent',

  data () {
    return {
      boxes: [
        {
          title: 'Terrorism Worldwide',
          cost: 4000000,
          deathsPerSecond: 33729,
          message: 'All terrorism in the world combined',
          images: [
            {
              name: 'terrorism-1.png',
              alt: 'Terrorism #1',
            }
          ]
        },
        {
          message: 'Accidental deaths in the U.S.',
          cost: 500000,
          deathsPerSecond: 257,
          title: 'ACCIDENTAL DEATHS IN THE U.S.',
          images: [
            {
              name: 'accidental-1.png',
              alt: 'Accidental #1',
            }
          ]
        },
        {
          message: 'Malnutrition and unclean water.',
          cost: 140,
          deathsPerSecond: 3,
          title: 'MALNUTRITION AND UNCLEAN WATER',
          images: [
            {
              name: 'nutrition-1.png',
              alt: 'Nutrition #1',
            },
            {
              name: 'nutrition-2.png',
              alt: 'Nutrition #2',
            },
            {
              name: 'nutrition-3.png',
              alt: 'Nutrition #3',
            },
            {
              name: 'nutrition-4.png',
              alt: 'Nutrition #4',
            },
          ]
        },
        {
          message: 'Malnutrition and unclean water in the U.S.',
          cost: 5000,
          deathsPerSecond: 6308,
          title: 'MALNUTRITION AND UNCLEAN WATER IN THE U.S.',
          images: [
            {
              name: 'nutrition-us-1.png',
              alt: 'Malnutrition In The U.S. #1',
            }
          ]
        },
        {
          message: 'Malnutrition and unclean water killing a child',
          cost: 110,
          deathsPerSecond: 9,
          title: 'MALNUTRITION AND UNCLEAN WATER KILLING A CHILD.',
          images: [
            {
              name: 'nutrition-child-1.png',
              alt: 'Malnutrition killing a child #1',
            },
            {
              name: 'nutrition-child-2.png',
              alt: 'Malnutrition killing a child #2',
            },
            {
              name: 'nutrition-child-3.png',
              alt: 'Malnutrition killing a child #3',
            },
            {
              name: 'nutrition-child-4.png',
              alt: 'Malnutrition killing a child #4',
            },
          ]
        },
        {
          message: 'Motor Vehicle Accidents in the U.S.',
          title: 'MOTOR VEHICLE ACCIDENTS IN THE U.S.',
          cost: 300000,
          deathsPerSecond: 717,
          images: [
            {
              name: 'car-1.png',
              alt: 'Vehicle accidents #1',
            }
          ]
        },
        {
          message: 'All murders in the U.S.',
          title: 'ALL MURDERS IN THE U.S.',
          cost: 200000,
          deathsPerSecond: 1752,
          images: [
            {
              name: 'murder-1.png',
              alt: 'Crime Scene',
            }
          ]
        },
        {
          message: 'Natural Disasters Worldwide',
          title: 'NATURAL DISASTERS WORLDWIDE.',
          cost: 450,
          deathsPerSecond: 421,
          images: [
            {
              name: 'disasters-1.png',
              alt: 'Natural Disaters',
            }
          ]
        },
        {
          message: 'Terrorism against someone from the U.S',
          title: 'TERRORISM AGAINST SOMEONE FROM THE U.S.',
          cost: 4000000,
          deathsPerSecond: 1700000,
          images: [
            {
              name: 'terrorism-us-1.png',
              alt: '9/11 Post Attack #1',
            }
          ]
        },
      ]
    }
  },

  components: {
    BoxSlider,
  },
}
</script>

<style scoped lang='scss'>
  .site-content {
    padding-top: 1em;
    padding-bottom: 1em;

    .section:first-of-type {
      padding-top: 0;
    }

    h4 {
      margin-bottom: 12px;
      text-transform: underline;
    }

    .more__link {
      text-decoration: underline;
      display: inline-block;
      color: $color-gray;
    }
  }

  .slider-columns {
		justify-content: center;

    &__column {
      padding: .375rem;
    }
  }

	.box-section {
		padding-bottom: 0 !important;

		@include mobile {
			padding-left: .5rem;
			padding-right: .5rem;
		}

		h4,
		.more__link{
			@include mobile {
				font-size: 1rem;
			}
		}

		.help-now-button {
			@include mobile {
				font-size: 1rem;
			}
		}
	} 
</style>
