<template>
    <div class="counter-page-creator">
      <form @submit.prevent='handleSubmit' class='counter-page-creator-form'>
        <div class='field counter-page-creator-form__field'>
          <label for='title' class='counter-page-creator-form__label'>Change your title: </label>
          <div class='control counter-page-creator-form__control'>
            <div class='select'>
              <select name='title' id='title'>
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
        <div class='field counter-page-creator-form__field'>
          <label for='nonprofit' class='counter-page-creator-form__label'>Pick a nonprofit your widget will raise money for: </label>
          <div class='control counter-page-creator-form__control'>
            <nonprofit-ajax-search 
              :placeholder='"Type a nonprofit to search..."'              
              @selected='handleNonprofitSelected'
              class='counter-page-creator-form__nonprofit-search'
            />
          </div>
        </div>
        <div class='field counter-page-creator-form__field'>
          <label for='message' class='counter-page-creator-form__label'>Add a custom message (optional): </label>
          <div class='control counter-page-creator-form__control'>
            <input 
              type='text' 
              name='message' 
              id='message' 
              class='input' 
              placeholder='Type a message here'
              :maxlength="55"
              v-model='widget.message'
            >
          </div>
        </div>
        <div class='field counter-page-creator-form__field is-block'>
          <p class='has-text-weight-bold'>Click on the image you want to use: </p>
					<theme-chooser
            :counter-id='widget.counterId'
            type='columns'
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
      themeId: 0,
      widget: {
        nonprofit: null,
				counterId: 1,
        rate: 3,
        message: '',
      },
    }
  },

  methods: {
		async handleSubmit () {
      const {widget, themeId} = this
      const page = await this.createPage({widget, themeId})

      this.$router.push({ name: 'counter-custom-page', params: { pageId: page.id } })
    },

		handleSliderChange (val) {
      this.themeId = val
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
.counter-page-creator-form {
  margin-bottom: 1em;

  &__field {
    display: flex;
    align-items: center;

    &:not(:last-child) {
      padding-bottom: 1em;
    }

    p {
      font-size: 1rem;
    }
  }

  &__label {
    flex-basis: 40%;
    max-width: 40%;
    font-weight: 700;
  }

  &__control {
    flex-grow: 1;

    @include fullhd {
      max-width: 600px;
    }
  }

  &__nonprofit-search {
    padding: 0;
  }

  .select {
    display: block;
  }
}
</style>
