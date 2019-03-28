<template>
  <div class="nonprofit-form-step-one">
    <h2 class="nonprofit-form__title">
      ENTER YOUR DECISIONS BELOW
    </h2>
    <form @submit.prevent='formSubmit'>
      <div class="nonprofit-form__container">
        <div class="nonprofit-form-step">
          <div class="columns is-multiline nonprofit-form-step-one__columns">
            <div class="column is-5">
              <div class="nonprofit-form__field">
                <div class="field-label nonprofit-form__label">
                  <label for="very-rich">Very Rich</label>
                </div>
                <div class="field-body nonprofit__body">
                  <div class="field">
                    <div class="control">
                      <data-input 
                        id='very-rich'
                        v-model='formData.veryRich'
                        :error='veryRichAndRichTotalError'
                      />
                    </div>
                    <div 
                      class="nonprofit-form-step-one__error" 
                    >
                      <small 
                        class="is-block has-text-danger"
                        v-if='veryRichAndRichTotalError'
                      >
                        *Very Rich and Rich must total to 49%
                      </small>
                    </div>
                  </div>
                </div>
              </div>
              <div class="nonprofit-form__field">
                <div class="field-label nonprofit-form__label">
                  <label for="rich">Rich</label>
                </div>
                <div class="field-body nonprofit__body">
                  <div class="field">
                    <div class="control">
                      <data-input 
                        id='rich'
                        v-model='formData.rich'
                        :error='veryRichAndRichTotalError'
                      />
                    </div>
                    <div 
                      class="nonprofit-form-step-one__error" 
                    >
                      <small 
                        class="is-block has-text-danger"
                        v-if='veryRichAndRichTotalError'
                      >
                        *Very Rich and Rich must total to 49%
                      </small>
                    </div>
                  </div>
                </div>
              </div>
              <div class="nonprofit-form__field">
                <div class="field-label nonprofit-form__label">
                  <label for="middle-class">Middle Class</label>
                </div>
                <div class="field-body nonprofit__body">
                  <div class="field">
                    <div class="control">
                      <data-input 
                        id='middle-class'
                        v-model='formData.middleClass'
                        :error='veryRichAndRichTotalError || veryPoorAndPoorTotalError'
                      />
                    </div>
                    <div 
                      class="nonprofit-form-step-one__error" 
                    >
                      <small 
                        class="is-block has-text-danger"
                        v-if='veryRichAndRichTotalError || veryPoorAndPoorTotalError'
                      >
                        *The average person not be placed lower or higher than middle class. So a maximum of 49% can be in the rich levels and 49% in the poor levels.
                      </small>
                    </div>
                  </div>
                </div>
              </div>
              <div class="nonprofit-form__field">
                <div class="field-label nonprofit-form__label">
                  <label for="poor">Poor</label>
                </div>
                <div class="field-body nonprofit__body">
                  <div class="field">
                    <div class="control">
                      <data-input 
                        id='poor'
                        v-model='formData.poor'
                        :error='veryPoorAndPoorTotalError'
                      />
                    </div>
                    <div 
                      class="nonprofit-form-step-one__error" 
                    >
                      <small 
                        class="is-block has-text-danger"
                        v-if='veryPoorAndPoorTotalError'
                      >
                        *Very Poor and Poor must total to 49%
                      </small>
                    </div>
                  </div>
                </div>
              </div>
              <div class="nonprofit-form__field">
                <div class="field-label nonprofit-form__label">
                  <label for="poor">Very Poor</label>
                </div>
                <div class="field-body nonprofit__body">
                  <div class="field">
                    <div class="control">
                      <data-input 
                        id='very-poor'
                        v-model='formData.veryPoor'
                        :error='veryPoorAndPoorTotalError'
                      />
                    </div>
                    <div 
                      class="nonprofit-form-step-one__error" 
                    >
                      <small 
                        class="is-block has-text-danger"
                        v-if='veryPoorAndPoorTotalError'
                      >
                        *Very Poor and Poor must total to 49%
                      </small>
                    </div>
                  </div>
                </div>
              </div>
              <div class="nonprofit-form-step-one__state">
                <div class="columns">
                  <div class="column">
                    Placed: {{ placed }}% / 100%
                  </div>
                  <div class="column">
                    Remaining: {{ remaining }}% / 100%
                  </div>
                </div>
              </div>
              <div class="nonprofit-form-step-one__buttons field is-grouped">
                <p class="control">
                  <button class='button is-rounded is-primary is-uppercase has-text-weight-bold'>
                    Reset
                  </button>
                </p>
                <p class="control">
                  <button 
                    class='button is-rounded is-secondary is-uppercase has-text-weight-bold'
                    type='submit'
                  >
                    Submit
                  </button>
                </p>
              </div>
            </div>
            <div class="column is-7">
              <div class="nonprofit-form-step-one__chart">
                <pie-chart 
                  :series-data='chartData'
                  ref="pieChart"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="nonprofit-form-step-one__percentiles">
          <percentile-table />
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { startCase } from 'lodash'
import { mapActions } from 'vuex'

import DataInput from 'LocalComponents/Input/DataInput'
import PieChart from 'Components/RuleYourWorld/PieChart'
import PercentileTable from 'Components/RuleYourWorld/PercentileTable'

export default {
  name: 'NonprofitFormStepOne',

  components: {
    PieChart,
    DataInput,
    PercentileTable,
  },

  data () {
    return {
      formData: {
        veryRich: 0,
        rich: 0,
        middleClass: 0,
        poor: 0,
        veryPoor: 0,
      },
      colors: {
        veryRich: '#2f4554',
        rich: '#61a0a8',
        middleClass: '#d48265',
        poor: '#91c7ae',
        veryPoor: '#749f83',
      }
    }
  },

  methods: {
    formSubmit() {
      Object.keys(this.formData).forEach(key => {
        this.setPercentage(
          {
            key: key, 
            percentage: this.formData[key]
          }
        )
      })

      this.$emit('form:submit')
    },

    ...mapActions({
      setPercentage: 'form/setPercentage',
    }),
  },

  computed: {
    chartData () {
      return Object.keys(this.formData).map(key => {
        return {
          name: startCase(key),
          value: this.formData[key],
          itemStyle: {
            color: this.colors[key],
          },
        }
      })
    },

    placed () {
      return Object.keys(this.formData).reduce((acc, curr, idx) => {
        if (this.formData[curr]) {
          return acc + parseInt(this.formData[curr])
        }

        return acc
      }, 0)
    },

    remaining () { 
      return 100 - this.placed ;
    },

    veryRichAndRichTotalError () {
      return parseInt(this.formData.veryRich) + parseInt(this.formData.rich) > 49
    },

    veryPoorAndPoorTotalError () {
      return parseInt(this.formData.veryPoor) + parseInt(this.formData.poor) > 49
    },
  },
}
</script>

<style lang="scss" scoped>
.nonprofit-form-step-one {
  &__columns {
    align-items: center;
  }

  &__chart {
    height: 450px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__state {
    margin-bottom: 1em;
  }

  &__buttons {
    justify-content: flex-end;
  }

  &__percentiles {
    margin-top: 4rem;
    max-width: 730px;
    margin-left: auto;
    margin-right: auto;
  }
}
</style>
