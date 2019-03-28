<template>
  <div class="nonprofit-form-step-two">
    <div class="nonprofit-form__container">
      <h2 class="nonprofit-form__title">
        ENTER YOUR DECISIONS BELOW
      </h2>
      <p class='instructions'>As ruler of the world, you get to decide: when the richest two groups make donations, what percentage of the donations on average should go to the following groups:</p>
      <form @submit.prevent='onFormSubmit'>
        <div class="columns">
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
                      :value='formData.veryRich'
                    />
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
                      :value='formData.rich'
                    />
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
                      :value='formData.middleClass'
                    />
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
                      :value='formData.poor'
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="nonprofit-form__field">
              <div class="field-label nonprofit-form__label">
                <label for="very-poor">Very Poor</label>
              </div>
              <div class="field-body nonprofit__body">
                <div class="field">
                  <div class="control">
                    <data-input 
                      id='very-poor'
                      v-model='formData.veryPoor'
                      :value='formData.veryPoor'
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="nonprofit-form__field">
              <div class="nonprofit-form-step-two__state has-text-right">
                Remaining: {{ remaining }}%
              </div>
            </div>
            <div class="nonprofit-form-step-two__btn-container">
              <button 
                class="button is-rounded is-primary has-text-weight-bold is-uppercase"
                type='submit'
                :disabled='placed !== 100'
              >
                  Next
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import DataInput from 'LocalComponents/Input/DataInput'

export default {
  name: 'NonprofitFormStepTwo',

  components: {
    DataInput,
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
    }
  },

  methods: {
    onFormSubmit () {
      Object.keys(this.formData).forEach(key => {
        this.setDonationAmount(
          {
            key: key, 
            donationAmount: this.formData[key]
          }
        )
      });
      
      this.$emit('form:submit')
    },

    ...mapActions({
      setDonationAmount: 'form/setDonationAmount',
    })
  },

  computed: {
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
  }
}
</script>

<style lang="scss" scoped>
.nonprofit-form-step-two {
  &__state {
    width: 100%;
  }
}
.instructions {
  font-size: 1.125rem;
}
</style>

