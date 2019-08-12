<template>
  <div>
    <section class="account-section">
      <h4 class="has-text-centered">Personal Data</h4>
      <EditableTextFieldBasic
        label="Mailing address 1:"
        ref="mailing1"
        error-text="Please enter a valid mailing address."
        :required="true"
        type="address"
        :value="form.mailing1"
        v-on:input:change="updateUserField('mailing1', $event)"
        v-on:next:field="openEdition('mailing2')"
      ></EditableTextFieldBasic>
      <EditableTextFieldBasic
        label="Mailing address 2:"
        ref="mailing2"
        type="address"
        error-text="Please enter a valid address."
        :required="false"
        :value="form.mailing2"
        v-on:input:change="updateUserField('mailing2', $event)"
        v-on:next:field="openEdition('country')"
        v-on:previous:field="openEdition('mailing1')"
      ></EditableTextFieldBasic>


      <drop-down-countries
        @selected="onCountrySelect"
      ></drop-down-countries>


      <EditableTextFieldBasic
        label="Country:"
        ref="country"
        error-text="Please enter a valid country."
        :required="true"
        type="name"
        :value="form.country"
        v-on:input:change="updateUserField('country', $event)"
        v-on:next:field="openEdition('state')"
        v-on:previous:field="openEdition('mailing2')"
      ></EditableTextFieldBasic>
      <EditableTextFieldBasic
        label="State:"
        ref="state"
        error-text="Please enter a valid state."
        :required="true"
        type="name"
        :value="form.state"
        v-on:input:change="updateUserField('state', $event)"
        v-on:next:field="openEdition('city')"
        v-on:previous:field="openEdition('country')"
      ></EditableTextFieldBasic>
      <EditableTextFieldBasic
        label="City:"
        ref="city"
        error-text="Please enter a valid city."
        :required="true"
        type="name"
        :value="form.city"
        v-on:input:change="updateUserField('city', $event)"
        v-on:next:field="openEdition('zip')"
        v-on:previous:field="openEdition('state')"
      ></EditableTextFieldBasic>
      <EditableTextFieldBasic
        label="Zip:"
        ref="zip"
        error-text="Please enter a valid zip code."
        :required="true"
        type="zip"
        :value="form.zip"
        v-on:input:change="updateUserField('zip', $event)"
        v-on:next:field="openEdition('telephone')"
        v-on:previous:field="openEdition('city')"
      ></EditableTextFieldBasic>
      <EditableTextFieldBasic
        label="Telephone:"
        ref="telephone"
        error-text="Please enter a valid telephone number."
        :required="true"
        type="telephone"
        :value="form.telephone"
        v-on:input:change="updateUserField('telephone', $event)"
        v-on:next:field="openEdition('nonprofitEmail')"
        v-on:previous:field="openEdition('zip')"
      ></EditableTextFieldBasic>
      <h4 class="has-text-centered">Nonprofit Data</h4>
      <EditableTextFieldBasic
        label="Nonprofit email:"
        ref="nonprofitEmail"
        error-text="Email is invalid"
        :required="true"
        type="email"
        :value="form.nonprofitEmail"
        v-on:input:change="updateUserField('nonprofitEmail', $event)"
        v-on:next:field="openEdition('nonprofitTelephone')"
        v-on:previous:field="openEdition('telephone')"
      ></EditableTextFieldBasic>
      <EditableTextFieldBasic
        label="Nonprofit telephone:"
        ref="nonprofitTelephone"
        error-text="Please enter a valid telephone number."
        :required="true"
        type="telephone"
        :value="form.nonprofitTelephone"
        v-on:input:change="updateUserField('nonprofitTelephone', $event)"
        v-on:next:field="openEdition('nonprofitWebsite')"
        v-on:previous:field="openEdition('nonprofitEmail')"
      ></EditableTextFieldBasic>
      <EditableTextFieldBasic
        label="Nonprofit website:"
        ref="nonprofitWebsite"
        error-text="Website url is invalid."
        :required="false"
        type="url"
        :value="form.nonprofitWebsite"
        v-on:input:change="updateUserField('nonprofitWebsite', $event)"
        v-on:next:field="openEdition('notes')"
        v-on:previous:field="openEdition('nonprofitTelephone')"
      ></EditableTextFieldBasic>
      <EditableTextFieldBasic
        label="Notes:"
        ref="notes"
        error-text="This field can't be empty."
        :required="false"
        type="name"
        :value="form.notes"
        v-on:input:change="updateUserField('notes', $event)"
        v-on:previous:field="openEdition('nonprofitWebsite')"
      ></EditableTextFieldBasic>
    </section>

    <div class="form-submit-wrapper" @click.prevent="submitForm()">
      <button class="button is-large is-danger"
        :disabled="submitButtonDisabled"
      >
        Claim</button>
      <!--<span class="small-text">By clicking Claim, you agree to the <a>Terms and Conditions</a>.</span>-->
    </div>
  </div>
</template>

<script>
//import * as validator from "../../util/validator.js"
import Vue from 'vue'

export default {
  props: ["nonprofit"],
  components: {
    EditableTextFieldBasic: () => import("Components/input/EditableTextFieldBasic.vue"),
    DropDownCountries: () => import("Components/general/DropDownCountries.vue"),
  },
  data () {
    return {
      form: {},
      submitButtonDisabled: true,
      sendingForm: false
    }
  },
  methods: {
    onCountrySelect (country) {
      this.selectedCountry = country
      this.form.country = country.name
    },
    openEdition (fieldName) {
      this.$refs[fieldName].openEdition()
    },
    updateUserField (fieldName, newValue) {
      if (!this.sendingForm) {
        Vue.set(this.form, fieldName, newValue)
        this.validateForm()
      }
    },
    validateForm () {
      if (
        this.$refs['mailing1'].validateField() &&
        this.$refs['country'].validateField() &&
        this.$refs['state'].validateField() &&
        this.$refs['city'].validateField() &&
        this.$refs['zip'].validateField() &&
        this.$refs['telephone'].validateField() &&
        this.$refs['nonprofitEmail'].validateField() &&
        this.$refs['nonprofitTelephone'].validateField()
      ) {
        this.submitButtonDisabled = false
      }
      else {
        this.submitButtonDisabled = true
      }
    },
    submitForm () {
      // disable submit button while processing
      this.submitButtonDisabled = true
      this.sendingForm = true
      console.log("submit form action!")
    },
  },
  computed: {
    /*userData () {
      return this.$store.state.user
    },*/
    loggedIn () {
      return this.$store.state.user.loggedIn
    },
  },
  mounted () {
    
  },
  watch: {
    
  }
}
</script>

<style scoped lang="scss">
.centered {
  text-align: center;
}

.form-submit-wrapper {
  margin: 20px auto;
  text-align: center;
}
.custom-amount-input {
  &:disabled {
    color: rgba($color-text, 0.2);
  }
}

.form-column__input-column {
  padding-bottom: 0;
  padding-top: 0;
}

.instructions {
  font-size: 14px;
  @include tablet {
    font-size: 16px;
  }
}

</style>