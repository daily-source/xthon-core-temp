<template>
    <div class="counter-page-creator">
      <form @submit.prevent='handleSubmit'>
        <div class="columns counter-page-creator__columns">
          <div class="column is-7">
            Choose a non-profit for your widget to donate towards:
          </div>
          <nonprofit-ajax-search 
            placeholder='Search...'
            @selected='handleNonprofitSelected'
          />
        </div>
        <div class="columns counter-page-creator__columns">
          <div class="column is-7">
            Customize your title:
          </div>
          <div class="column">
            <div class="select">
              <select 
                name="title"   
                class="select is-block"
                v-model='widget.counterId'
              >
                <option 
                  v-for='(counter, index) in counters' 
                  :key='index' 
                  :value='counter.id'
                >
                  {{ counter.title }}
                </option>
              </select>
            </div>
          </div>
				</div>
        <div class="counter-page-creator__ft-img-chooser counter-page-creator__columns">
					<p class='has-text-weight-bold has-text-centered'>Choose an image to use as a background <br> <small class='has-text-weight-normal'>Select an image by clicking on the next and previous arrows. The image on the center is selected.</small></p>
					<theme-chooser
            :counter-id='widget.counterId'
            type='slider'
						@change='handleSliderChange'
          />
        </div>
        <div class="btn-container has-text-right counter-page-creator__columns">
          <button type='submit' class='button is-primary has-text-weight-bold is-uppercase is-large'>
            Create
          </button>
        </div>
      </form>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import imageSrc from 'Core/util/imageSrc'
import NonprofitAjaxSearch from 'Components/general/NonprofitAjaxSearch'

import ThemeChooser from 'Components/CountersForThePoor/ThemeChooser'
import Flickity from 'Components/plugins/Flickity'

export default {
  name: 'CounterPageCreator',

  components: {
    NonprofitAjaxSearch,
    ThemeChooser,
    Flickity,
  },

  mixins: [imageSrc],

  data () {
    return {
      widget: {
        nonprofit: null,
        featuredImg: 0,
				counterId: 1,
        rate: 3,
        themeId: 0,
      },
    }
  },

  methods: {
		async handleSubmit () {
      const page = await this.createPage(this.widget)

      this.$router.push({ name: 'page', params: { id: page.id } })
    },

		handleSliderChange (val, index) {
      this.widget.themeId = index
    },
    
    handleNonprofitSelected (val) {
      this.widget.nonprofit = val
    },

    ...mapActions({
      createPage: 'counterwidgets/createPage'
    }),
  },

  computed: {
    ...mapState({
      counters: state => state.counterwidgets.counters
    })
  }
}
</script>

<style lang="scss" scoped>
  .counter-page-creator {
    margin-top: 2rem;
  }

  .counter-page-creator__columns {
    max-width: 80%;
    margin-left: auto;
    margin-right: auto;
    align-items: center;
  }

  .counter-page-creator__img {
    width: 100%;
    cursor: pointer;
    filter: brightness(.7);
    border-radius: 4px;
    transition: filter .2s ease;

    &--selected,
    &:hover {
      filter: brightness(1);
    }
  }

	.btn-container {
		margin-top: 1em;
	}
</style>
