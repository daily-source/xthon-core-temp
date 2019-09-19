<template>
  <div class="columns form-column__wrapper form-column__extra-padded input-line email-input-wrapper is-multiline">
    <div class="column is-6 form-column__label-column input-label">
      <label :for="`input-email_${_uid}`" class="label">{{label}}</label>
    </div>
    <div class="column is-6 form-column__input-column">
      <div class="control input-wrapper customMargin" style="max-width: 200px;">
        <Icons icon="email" class="input-icon" iconwidth="20px" iconheight="20px" color="#999"></Icons>
        <input class="custom-editable-value" type="text" name="action" placeholder=""
          autocomplete="email"
          :required="required"
          v-model="form.email"
          :id="`input-email_${_uid}`"
          v-on:input="$emit('input:email', $event.target.value)"
        >
      </div>
    </div>
    <div class="column is-6-tablet is-offset-6-tablet editable-error-message-wrapper" v-if="errorMessage">
      <span class="editable-error-message">{{errorMessage}}</span>
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
.custom-editable-value {
  width: 100%;
  font-size: inherit;
  font-weight: 100;
  line-height: 1.4;
  height: 34px;
  border: none;
  box-shadow: none;
  background: none;
  border: 1px solid rgba(60,60,60,.26);
  border-radius: 4px;
  margin: 4px 0 0;
  padding-left: 35px;
  &:hover {
    cursor: pointer;
  }
}
.customMargin {
  margin: auto;
  @include tablet {
    margin-left: 0;
  }
}
</style>