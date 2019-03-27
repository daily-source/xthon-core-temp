<template>
  <div class="nonprofit-form-step-two">
    <div class="container">
      <p>As ruler of the world, you get to decide: when the richest two groups make donations, what percentage of the donations on average should go to the following groups:</p>
      <form action="">
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
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="nonprofit-form-step-two">
              <button class="button is-rounded is-primary has-text-weight-bold is-uppercase">Next</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
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
  }
}
</script>
