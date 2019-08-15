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
        label="Country:"
        ref="country"
        :required="true"
        @selected="onCountrySelect"
        type="dropdown"
        error-text="Please enter your country."
        :value="form.country"
        v-on:input:change="updateUserField('country', $event)"
        v-on:next:field="selectedCountry ? openEdition('state') : openEdition('city')"
        v-on:previous:field="openEdition('mailing2')"
      ></drop-down-countries>
      <drop-down-states 
        label="State:"
        ref="state"
        :disabled="!selectedCountry"
        :required="true"
        @selected='onStateSelect'
        type="dropdown"
        error-text="Please enter your state."
        :value="form.state"
        v-on:input:change="updateUserField('state', $event)"
        v-on:next:field="openEdition('city')"
        v-on:previous:field="openEdition('country')"
        :country='selectedCountry && selectedCountry.shortName'
      ></drop-down-states>  
      <EditableTextFieldBasic
        label="City:"
        ref="city"
        error-text="Please enter a valid city."
        :required="true"
        type="name"
        :value="form.city"
        v-on:input:change="updateUserField('city', $event)"
        v-on:next:field="openEdition('zip')"
        v-on:previous:field="selectedCountry ? openEdition('state') : openEdition('country')"
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
      >Claim</button>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import DropDownCountries from 'Components/general/DropDownCountries.vue'
import DropDownStates from 'Components/general/DropDownStates.vue'

export default {
  props: ["nonprofit"],
  components: {
    EditableTextFieldBasic: () => import("Components/input/EditableTextFieldBasic.vue"),
    DropDownCountries,
    DropDownStates
  },
  data () {
    return {
      form: {},
      submitButtonDisabled: true,
      sendingForm: false,
      selectedCountry: null,
      selectedState: null
    }
  },
  methods: {
    onCountrySelect (country) {
      if (country) {
        this.selectedCountry = country
      } else {
        this.selectedCountry = null
      }
      this.validateForm()
    },
    onStateSelect (state) {
      if (state) {
        this.selectedState = state
      } else {
        this.selectedState = null
      }
      this.validateForm()
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