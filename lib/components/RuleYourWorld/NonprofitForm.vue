<template>
  <div class="nonprofit-form">
    <transition>
      <div 
        class="nonprofit-form__step"
        ref='formOne'
        v-if='currentStep === 1'
      >
        <nonprofit-form-step-one 
          @form:submit='incrementStep'
        />
      </div>
    </transition>
    <transition>
      <div 
        class="nonprofit-form__step"
        ref='formTwo'
        v-if='currentStep === 2'
      >
        <nonprofit-form-step-two 
          @form:submit='incrementStep'
        />
      </div>
    </transition>
    <transition>
      <div 
        class="nonprofit-form__step"
        ref='formThree'
        v-if='currentStep === 3'
      >
        <nonprofit-form-step-three 
          @backButtonClicked='currentStep = 1'
        />
      </div>
    </transition>
  </div>
</template>

<script>
import NonprofitFormStepOne from 'Components/RuleYourWorld/NonprofitFormStepOne'
import NonprofitFormStepTwo from 'Components/RuleYourWorld/NonprofitFormStepTwo'
import NonprofitFormStepThree from 'Components/RuleYourWorld/NonprofitFormStepThree'

export default {
  name: 'NonprofitForm',

  components: {
    NonprofitFormStepOne,
    NonprofitFormStepTwo,
    NonprofitFormStepThree,
  },

  data () {
    return {
      currentStep: 1,
    }
  },

  methods: {
    incrementStep () {
      this.currentStep += 1;
    }
  },
}
</script>

<style lang='scss' scoped>
.nonprofit-form {
  padding-top: 3rem;
  padding-bottom: 3rem;
}
</style>
