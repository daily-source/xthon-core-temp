<template>
  <div>
    <div class="columns form-column__wrapper form-column__extra-padded input-line is-multiline">
      <div class="column is-6 form-column__label-column input-label">
        <label :for="`input-name-first_${_uid}`" class="label">First name:</label>
      </div>
      <div class="column is-4 form-column__input-column">
        <div class="control input-wrapper customMargin">
          <Icons icon="user" class="input-icon" iconwidth="20px" iconheight="20px" color="#999"></Icons>
          <input class="custom-editable-value" type="text" placeholder=""
            :required="required"
            v-model="form.firstname"
            autocomplete="given-name"
            :id="`input-name-first_${_uid}`"
            v-on:input="$emit('input:first', $event.target.value)"
          />
        </div>
      </div>
      <div class="column is-6-tablet is-offset-6-tablet editable-error-message-wrapper" v-if="firstnameErrorMessage">
        <span class="editable-error-message">{{firstnameErrorMessage}}</span>
      </div>
    </div>
    <div class="columns form-column__wrapper form-column__extra-padded input-line is-multiline">
      <div class="column is-6 form-column__label-column input-label">
        <label :for="`input-name-last_${_uid}`" class="label">Last name:</label>
      </div>
      <div class="column is-4 form-column__input-column">
        <div class="control input-wrapper customMargin">
          <Icons icon="user" class="input-icon" iconwidth="20px" iconheight="20px" color="#999"></Icons>
          <input class="custom-editable-value" type="text" placeholder=""
            :required="required"
            autocomplete="family-name"
            v-model:value="form.lastname"
            :id="`input-name-last_${_uid}`"
            v-on:input="$emit('input:last', $event.target.value)"
          />
        </div>
      </div>
      <div class="column is-6-tablet is-offset-6-tablet editable-error-message-wrapper" v-if="lastnameErrorMessage">
        <span class="editable-error-message">{{lastnameErrorMessage}}</span>
      </div>
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
      firstnameErrorMessage: "",
      lastnameErrorMessage: "",
      firstnameTimeout: null,
      lastnameTimeout: null,
      timeout: null,
      errorMessageTimeout: 5000
    }
  },
  components: {
    Icons
  },
  methods: {
    validateAllFields () {
      if (validator.validateName(this.form.firstname) && validator.validateName(this.form.lastname)) {
        this.$emit("input:valid")
        return true
      } else {
        this.$emit("input:invalid")
        return false
      }
    },
    refreshFirstNameValidation () {
      this.firstnameErrorMessage = ""
      clearTimeout(this.firstnameTimeout)
      this.firstnameTimeout = setTimeout(() => {
        if (!validator.validateName(this.form.firstname)) {
          this.firstnameErrorMessage = "This field is required."
        } else {
          this.firstnameErrorMessage = ""
        }
      }, this.errorMessageTimeout)
    },
    refreshLastNameValidation () {
      this.lastnameErrorMessage = ""
      clearTimeout(this.lastnameTimeout)
      this.lastnameTimeout = setTimeout(() => {
        if (!validator.validateName(this.form.lastname)) {
          this.lastnameErrorMessage = "This field is required."
        } else {
          this.lastnameErrorMessage = ""
        }
      }, this.errorMessageTimeout)
    }
  },
  watch: {
    "form.firstname": function () {
      this.validateAllFields()
      this.refreshFirstNameValidation()
    },
    "form.lastname": function () {
      this.validateAllFields()
      this.refreshLastNameValidation()
    }
  }
}
</script>

<style scoped lang="scss">
.input-wrapper {
  max-width: 200px;
}
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