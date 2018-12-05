<template>
  <div class="columns form-column__wrapper form-column__extra-padded input-line email-input-wrapper is-multiline">
    <div class="column is-5 form-column__label-column input-label">
      <label :for="`input-email_${_uid}`" class="label">{{label}}</label>
    </div>
    <div class="column is-5 form-column__input-column">
      <div class="control input-wrapper">
        <Icons icon="email" class="input-icon" iconwidth="20px" iconheight="20px" color="#999"></Icons>
        <input class="input" type="text" name="action" placeholder=""
          autocomplete="email"
          :required="required"
          v-model="form.email"
          :id="`input-email_${_uid}`"
          v-on:input="$emit('input:email', $event.target.value)"
        >
      </div>
    </div>
    <div class="column is-5 is-offset-5" v-if="errorMessage">
      <span class="error-message">{{errorMessage}}</span>
    </div>
  </div>
</template>

<script>
import Icons from "Components/general/Icons.vue"
import * as validator from "../../util/validator.js"

export default {
  props: [ "label", "required" ],
  data () {
    return {
      form: {},
      errorMessage: "",
      errorMessageTimeout: 5000,
      timeout: null
    }
  },
  components: {
    Icons
  },
  methods: {
    validateAllFields () {
      if (validator.validateEmail(this.form.email)) {
        this.$emit("input:valid")
        return true
      } else {
        this.$emit("input:invalid")
        return false
      }
    },
    refreshFieldValidation () {
      this.errorMessage = ""
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        if (!validator.validateEmail(this.form.email)) {
          this.errorMessage = "Email is invalid"
        } else {
          this.errorMessage = ""
        }
      }, this.errorMessageTimeout)
    }
  },
  watch: {
    "form.email": function () {
      this.validateAllFields()
      this.refreshFieldValidation()
    }
  }
}
</script>

<style scoped lang="scss">

</style>