<template>
  <div>
    <div class="columns form-column__wrapper form-column__extra-padded input-line password-input-wrapper is-multiline" v-if="requireCurrentPassword">
      <div class="column is-6 form-column__label-column input-label">
        <label :for="`input-current-password_${_uid}`" class="label">Current password:</label>
      </div>
      <div class="column is-6 form-column__input-column">
        <div class="control input-wrapper customMargin" style="max-width: 200px;">
          <Icons icon="lock" class="input-icon" iconwidth="20px" iconheight="20px" color="#999"></Icons>
          <input class="custom-editable-value" type="password" name="action" placeholder=""
            :required="required"
            v-model="form.currentPassword"
            autocomplete="current-password" 
            :id="`input-current-password_${_uid}`"
            v-on:input="$emit('input:currentPassword', $event.target.value)"
          >
        </div>
      </div>
    </div>
    <div class="columns form-column__wrapper form-column__extra-padded input-line password-input-wrapper is-multiline">
      <div class="column is-6 form-column__label-column input-label">
        <label :for="`input-password_${_uid}`" class="label">{{label}}:</label>
      </div>
      <div class="column is-6 form-column__input-column">
        <div class="control input-wrapper customMargin" style="max-width: 200px;">
          <Icons icon="lock" class="input-icon" iconwidth="20px" iconheight="20px" color="#999"></Icons>
          <input class="custom-editable-value" type="password" name="action" placeholder=""
            :required="required"
            v-model="form.password"
            autocomplete="current-password new-password" 
            :id="`input-password_${_uid}`"
            v-on:input="$emit('input:password', $event.target.value)"
          >
        </div>
      </div>
      <div class="column is-5 is-offset-5" v-if="passwordErrorMessage || errorMessage">
        <span class="error-message">{{passwordErrorMessage}}{{errorMessage}}</span>
      </div>
    </div>
    <div class="columns form-column__wrapper form-column__extra-padded input-line password-input-wrapper is-multiline" v-if="duplicate">
      <div class="column is-5 form-column__label-column input-label">
        <label :for="`input-password-confirmation_${_uid}`" class="label">{{label}} confirmation:</label>
      </div>
      <div class="column is-5 form-column__input-column">
        <div class="control input-wrapper">
          <Icons icon="lock" class="input-icon" iconwidth="20px" iconheight="20px" color="#999"></Icons>
          <input class="input" type="password" name="action" placeholder=""
            :required="required"
            v-model="form.passwordConfirmation"
            autocomplete="current-password new-password" 
            :id="`input-password-confirmation_${_uid}`"
            v-on:input="$emit('input:passwordConfirmation', $event.target.value)"
          >
        </div>
      </div>
      <div class="column is-5 is-offset-5" v-if="passwordConfirmationErrorMessage || errorMessage">
        <span class="error-message">{{passwordConfirmationErrorMessage}}{{errorMessage}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import Icons from "Components/general/Icons.vue"
import * as validator from "../../util/validator.js"

export default {
  props: [ "label", "duplicate", "required", "provideFeedback", "errorMessage", "requireCurrentPassword" ],
  data () {
    return {
      form: {},
      passwordErrorMessage: "",
      passwordConfirmationErrorMessage: "",
      timeout: null,
      timeoutConf: null,
      errorMessageTimeout: 6000
    }
  },
  components: {
    Icons
  },
  methods: {
    validateAllFields () {
      const validCurrentPass = validator.validatePassword(this.form.currentPassword) || !this.requireCurrentPassword
      const validPass = validator.validatePassword(this.form.password)
      const validPassConf = this.form.password === this.form.passwordConfirmation || !this.duplicate
      if (validCurrentPass && validPass && validPassConf) {
        this.$emit("input:valid")
        return true
      } else {
        this.$emit("input:invalid")
        return false
      }
    },
    refreshPasswordConfirmationField () {
      this.validateAllFields()
      this.passwordConfirmationErrorMessage = ""
      clearTimeout(this.timeoutConf)
      this.timeoutConf = setTimeout(() => {
        if (this.form.passwordConfirmation !== this.form.password) {
          this.passwordConfirmationErrorMessage = "The passwords do not match."
        } else {
          this.passwordConfirmationErrorMessage = ""
        }
      }, this.errorMessageTimeout)
    },
    refreshPasswordField () {
      this.validateAllFields()
      this.passwordErrorMessage = ""
      clearTimeout(this.timeout)

      if (this.provideFeedback) {
        this.timeout = setTimeout(() => {
          if (!validator.validatePasswordLength(this.form.password)) {
            this.passwordErrorMessage += "The password needs to be at least 8 characters long. "
          }
          if (!validator.validatePasswordCapital(this.form.password)) {
            this.passwordErrorMessage += "Add at least one capital letter. "
          }
          if (!validator.validatePasswordLower(this.form.password)) {
            this.passwordErrorMessage += "Add at least one lower-case letter. "
          }
          if (!validator.validatePasswordNumber(this.form.password)) {
            this.passwordErrorMessage += "Add at least one number. "
          }
          if (!validator.validatePasswordSpecial(this.form.password)) {
            this.passwordErrorMessage += "Add at least one special character. "
          }
        }, this.errorMessageTimeout)
      }
    }
  },
  watch: {
    "form.currentPassword": function () {
      this.validateAllFields()
    },
    "form.password": function () {
      this.validateAllFields()
      this.refreshPasswordConfirmationField()
      this.refreshPasswordField()
    },
    "form.passwordConfirmation": function (newVal, oldVal) {
      this.validateAllFields()
      this.refreshPasswordConfirmationField()
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
</style>