<template>
  <div 
    class="nonprofit-form"
    ref='nonprofitForm'
  >
    <div 
      class="nonprofit-form__wrapper"
    >
      <transition
        appear
        @after-appear='onElAppear'
        @enter='enter'
        @after-leave='afterLeave'
        @leave='onElLeave'
      >
        <div 
          class="nonprofit-form__step"
          ref='formOne'
          v-if='currentStep === 1'
        >
          <nonprofit-form-step-one 
            @form:submit='changeStep'
          />
        </div>
      </transition>
      <transition
        @before-enter='beforeEnter'
        @enter='enter'
        @after-leave='afterLeave'
        @leave='onElLeave'
      >
        <div 
          class="nonprofit-form__step"
          ref='formTwo'
          v-if='currentStep === 2'
        >
          <nonprofit-form-step-two 
            @form:submit='changeStep'
          />
        </div>
      </transition>
      <transition
        @before-enter='beforeEnter'
        @enter='enter'
        @after-leave='afterLeave'
        @leave='onElLeave'
      >
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
  </div>
</template>

<script>
import { TweenMax } from 'gsap'
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
      height: this.stepOneFormHeight,
      targetHeight: 0,
    }
  },

  methods: {
    changeStep () {
      this.currentStep += 1;
    },

    mounted () {
    },

    /**
     * Animation-specific methods
     */
    beforeEnter (el) {
    },

    onElAppear (el) {
      el.style.opacity = 1

      this.$el.style.height = `${el.clientHeight}px`
    },

    enter (el) {
      console.log(el.clientHeight)
      TweenMax.to(el, .4, { opacity: 1 })
      TweenMax.to(this.$el, .2, { height: el.clientHeight })
    },

    afterLeave (el) {

    },

    onElLeave (el) {
      TweenMax.to(el, .5, { opacity: 0 })
    }
  },

  computed: {
    stepOneFormHeight () {
      return this.$refs.formOne.clientHeight
    },
  },
}
</script>

<style lang='scss' scoped>
.nonprofit-form {
  margin-top: 3rem;
  margin-bottom: 3rem;

  &__step {
    opacity: 0;
  }
}
</style>
