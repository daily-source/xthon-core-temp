<template>
  <div class="nonprofit-form">
    <div class="nonprofit-form__step">
      <nonprofit-form-step-one />
    </div>
    <div class="nonprofit-form__step">
      <nonprofit-form-step-two />
    </div>
    <div class="nonprofit-form__step">
      <nonprofit-form-step-three />
    </div>
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
}
</script>

<style lang='scss' scoped>
.nonprofit-form {
  padding-top: 3rem;
  padding-bottom: 3rem;
}
</style>
