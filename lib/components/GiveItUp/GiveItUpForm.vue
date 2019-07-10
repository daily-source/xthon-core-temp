<template>
  <div :class="`version_${version}`">
    <section id="choices" class="section" >
      <div class="container">
        <h3 class="has-text-centered has-text-primary">Pick what to give up or use less of:</h3>

        <div class="choices__input-container">
          <div class="columns is-multiline is-mobile" v-if="choices && choices.length > 0">
            <div class="column is-half-tablet is-one-quarter-desktop is-full-mobile" v-for="(choice, index) in choices" :key="index" v-if="displayCheckbox(index)">
              <choice-checkbox 
                :choice="choice" 
                @choiceChanged="inputHandler"
                v-if="!choice.customChoice"
              />
              <custom-choice 
                :index="`custom-choice-${index}`"
                v-else
              />
            </div>
          </div>
        </div>

        <div class="expand-container">
          <a href="#" @click.stop.prevent="toggleExpanded"> {{ expand ? 'Show less ideas' : 'Show more ideas' }} </a>
        </div>
        <div class="btn-container has-text-centered">
          <button class="button is-primary is-uppercase has-text-weight-bold" @click="showNext">
            {{ version ? 'Next: choose how much' : 'Next: choose how long' }}
          </button>
          <p class="has-text-danger is-block mt-3" v-if="showError">*You must choose at least one item before you can do the next step. To choose an item, click the checkbox to the left of the item</p>
        </div>
      </div>
    </section>
    <section id="how-much" v-if="nextStep">
      <div class="container">
        <p>You can add another item by checking off its box above. You can remove an item by unchecking it.</p>
        <how-much-input 
          v-for="(input, index) in selected" 
          :key="index"
          :input="input"
          @inputChanged="computeTotal"
        />
        <div class="total-container has-text-primary">
          <div class="total-rate-container is-flex align-items-center">
            Do this for
            <input 
              v-model="totalInput"
              type="number" 
              class="input total-number-input" 
            >
            <div class="select total-select-input">
              <select 
                v-model="totalRate"
              >
                <option value="day">days</option>
                <option value="week">weeks</option>
                <option value="month" selected>months</option>
                <option value="year">years</option>
              </select>
            </div>
          </div>
          <div class="total-raised-container my-3">
            You will raise:
            <span class="total has-text-success align-middle">
              {{ (total ? total : 0) | currencyFormat }}
            </span>
          </div>
          <div class="nonprofit-select-container is-flex align-items-center">
            The money will go to: 
            <div class="form-group mb-0" v-if="version != 2">
              <label for="nonprofit" class="is-sr-only">Nonprofit</label>
              <nonprofit-ajax-search 
                :standalone="false"
                v-if="canRender"
              />
            </div>
            <span v-else>
              <span class="nonprofit-name text-success" v-html="nonprofitName"></span>
            </span>
          </div>
        </div>
      </div>
      <div class="has-text-centered button-continue-container mt-5">
        <button class="button is-primary is-uppercase has-text-weight-bold" @click="lastFormStep()">Continue</button>
      </div>
    </section>
    <section id="last-last-step" class="py-4" v-if="moreForm">
      <div class="container total-container text-primary" >
        <div class="columns">
          <div class="column is-4 total-raised-container">
            Title
            <p class="small">This shows at the top of your "Give It Up For Good" page.</p>
          </div>
          <div class="column is-8">
            <input 
              v-model="fundraiser.title"
              type="text" 
              class="form-control" 
            >
          </div>
        </div>
        <div class="columns">
          <div class="column is-4 total-raised-container">
            Description
            <p class="small">Share what you're doing, why you're doing it and/or what's the mission of the nonprofit.</p>
          </div>
          <div class="column is-8">
            <textarea 
              v-model="fundraiser.description"
              type="text" 
              class="form-control" 
              rows="5"
            ></textarea>
          </div>
        </div>
        <div class="columns">
          <div class="column is-4 total-raised-container">
            Banner photo
            <p class="small">Upload up to 10 photos related to your Give It Up for Good effort and/or the nonprofit it helps</p>
          </div>
          <div class="column is-8">
            <button class="button is-warning">Browse files</button>
          </div>
        </div>
        <div class="columns">
          <div class="column is-4 total-raised-container">
            Your photo (optional)
          </div>
          <div class="column is-8">
            <button class="button is-warning">Browse files</button>
          </div>
        </div>
      </div>
      <div class="text-center mt-5">
        <button class="btn btn-primary btn-lg" :disabled="!canPublish">Publish fundraiser</button>
      </div>
    </section>
  </div>
</template>

<script>
import ChoiceCheckbox from 'LocalComponents/GiveItUp/ChoiceCheckbox.vue'
import HowMuchInput from 'LocalComponents/GiveItUp/HowMuchInput.vue'
import CustomChoice from 'LocalComponents/GiveItUp/CustomChoice.vue'

import { mapState, mapActions } from 'vuex'

export default {
  name: 'home',

  components: {
    ChoiceCheckbox,
    HowMuchInput,
    CustomChoice,
    NonprofitAjaxSearch: () => import('Components/GiveItUp/NonprofitAjaxSearch.vue'),
  },

  data() {
    return {
      canRender: false,
      nextStep: false,
      moreForm: false,
      total: null,
      totalInput: null,
      totalRate: 'month',
      customChoiceNum: 3,
      itemsToShow: 13,
      showError: false,
      fundraiser: {}
    }
  },

  computed: {
    ...mapState({
      choices (state) {
        if (!state.selections) {
          return
        }
        // Store choice for later use
        const choices = state.selections.data
        let ctr = 0

        // We make a new array that has the length of the selections plus the defined custom choices.
        // Map the newly created Array and then check if the index is on the range of itemsToShow
        // If it is, return an object with customChoice set to true,
        // else, return the choice at the ctr-th element.
        const newChoices = Array(choices.length + this.customChoiceNum).fill().map((_, i) => {
          if (i >= (this.itemsToShow) && i <= (this.customChoiceNum + this.itemsToShow -1)) {
            _ = { customChoice: true }
          } else {
            _ = choices[ctr]
            ctr++
          }
          
          return _
        })

        return newChoices
      },
      expand: state => state.selections ? state.selections.expanded : {},
      selected: state=> state.selections ? state.selections.selected : {}
    }),
    version () {
      return this.$route.query.version
    },
    nonprofitName () {
      return this.$store.state.nonprofit.data.name || this.$store.state.nonprofit.NAME
    },
    canPublish () {
      return this.fundraiser.title && this.fundraiser.description
    }

  },

  mounted () {
    this.canRender = true
  },

  methods: {
    computeTotal () {
      let multiplier

      // Calculate the total by array.reduce
      let total = this.selected.reduce((previous, current) => {
        return previous + ( current.perMonthValue ? current.perMonthValue : 0 )
      }, 0)

      // Calculate the multiplier according to "rate" seleced
      switch(this.totalRate) {
        case 'week':
          multiplier = this.totalInput / 4
          break
        case 'day':
          multiplier = this.totalInput / 3
          break
        case 'year':
          multiplier = this.totalInput * 12
          break
        
        default:
          multiplier = this.totalInput
      }

      this.total = total * multiplier
    },

    displayCheckbox(index) {
      return this.expand ? true : index < this.itemsToShow + this.customChoiceNum
    },

    inputHandler ({checked, choice, customLabel}) {
      if (checked) {
        return this.addSelected({ choice, customLabel })
      }

      return this.removeSelected({ choice })
    },

    customChoiceClickedHandler (choice) {
      if(!choice.label) {
        choice.selected = false
        return
      }

      choice.selected = !choice.selected
    },  

    showNext () {
      if (this.selected.length <= 0) {
        this.showError = true
        return
      } 

      this.showError = false
      this.nextStep = true

      // Smoothscroll on next tick to make sure the how-much section is loaded before we scroll
      var that = this
      this.$nextTick(() => {
        that.smoothScroll('choices')
      })

    },
    lastFormStep () {
      if (this.selected.length <= 0) {
        this.showError = true
        return
      } 

      this.showError = false
      this.moreForm = true

      // Smoothscroll on next tick to make sure the how-much section is loaded before we scroll
      var that = this
      this.$nextTick(() => {
        that.smoothScroll('last-last-step')
      })

    },

    ...mapActions({
      toggleExpanded: 'selections/toggleExpanded',
      addSelected: 'selections/pushSelected',
      removeSelected: 'selections/removeSelected'
    }),
  },

  watch: {
    totalInput() {
      this.computeTotal()
    },

    totalRate() {
      this.computeTotal()
    },

  },
}
</script>

<style lang="scss" scoped>
  .total-number-input,
  .total-select-input {
    max-width: 100%;
		display: block;
		width: 100%;
		margin-top: .5em;
		margin-bottom: .5em;

		@include tablet {
			max-width: 130px;
			display: inline-block;
			margin-top: 0;
			margin-bottom: 0;
			margin-right: 5px;
			margin-left: 10px;
		}
  }

  .total-container {
    font-size: 1.25rem;    
    font-weight: 900;
    font-family: 'Montserrat';
    padding-top: 1.5rem;
    border-top: 1px solid #ddd;

		@include tablet {
      font-size: 1.5rem;
		}
  }

  .total {
    font-size: 2.025rem;
    margin-left: 5px;
    margin-right: 5px;
  }

  .nonprofit-name {
    font-size: 2.625rem;
    margin-left: 10px;
    margin-right: 5px;
  }

  #choices h3 {
    font-family: "Poppins";
    font-weight: 700;
    margin-left: -2px;
    color: $secondary;
    font-size: 1.5rem;

		@include tablet {
      font-size: 2rem;
		}

    span {
      font-size: 0.933em;
    }
  }

  #nonprofit {
    width: 270px;
    margin-left: 8px;
    margin-right: 8px;
  }

  .version_2 {
    .mb-2 {
      margin-bottom: 2rem !important;
    }
  }

  .small {
    font-size: 17px;
  }

  .expand-container {
    text-align: left;
    margin-bottom: 1em;

		@include tablet {
      margin-top: 1em;
      text-align: right;
      margin-bottom: 0;
		}
  }

  .choices__input-container {
    margin-top: 1em;
  }

  .total-raised-container {
    margin-bottom: 1rem;
  }

  .total-rate-container  {
    margin-bottom: 1rem;
    align-items: center;
    flex-wrap: wrap;

		@include tablet {
			flex-wrap: nowrap;
		}
  }

  .total-container {
    .select { 
      height: auto;
      display: block;
			width: 100%;      

			@include tablet {
				display: inline-block;
			}
    }

    select {
      font-size: 1rem;
    }
  }

  .button-continue-container  {
    margin-top: 2em;
    margin-bottom: 2em;
  }

	.nonprofit-select-container {
    max-width: 100%;
    flex-wrap: wrap;

		.form-group {
      width: 100%;
      margin-top: .5em;

			@include tablet {
        margin-top: 0;
        max-width: 400px;
			}
    }
    
    .nonprofit-search-field-wrapper {
      padding: 0;
      margin-left: 0;
      max-width: 100%;
      width: 100%;

      @include tablet {
        margin-left: .25em;
        display: inline-flex;
        max-width: 400px;
        width: 400px;
      }
    }
	}
</style>
