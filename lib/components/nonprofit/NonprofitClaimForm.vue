<template>
  <div class="nonprofit-claim-form">
    <h2 class='has-text-weight-bold' v-if='!nonprofit.claimed'>Claim and Manage This Nonprofit</h2>
    <h2 class='has-text-weight-bold' v-else>Reclaim This Nonprofit</h2>
    <p class="nonprofit-claim-form__subheading">
      Legal address on file with the IRS
    </p>
    <nonprofit-irs-details 
      :nonprofit='nonprofit'
      class='nonprofit-claim-form__irs-details'
    />

    <form 
      @submit.prevent='processForm'
    >
      <div class="nonprofit-claim-form__address-fields nonprofit-claim-form__field-group">
        <p class='nonprofit-claim-form__subheading is-marginless'>Your mailing address for receiving checks from us:</p>
        <p class='has-text-grey'>Note: checks will be made out to your legal name.</p>
        <div class="nonprofit-claim-form__field field">
          <label class="checkbox">
            <input 
              type="checkbox" 
              v-model='form.sameLegalAddress' 
              name='same-legal-address'
            >
              Same as the legal address above
          </label>
        </div>
        <slide-fade>
          <div 
            class="nonprofit-claim-form__address-fields"
            v-show='!form.sameLegalAddress'
          >
            <div class="nonprofit-claim-form__field field is-horizontal">
              <div class="nonprofit-claim-form__field-label field-label">
                <label class='label has-text-weight-bold' for="mailing-address-1">Mailing address:<span class='has-text-danger'>*</span></label>
              </div>
              <div class="field-body">
                <div class="field">
                  <div class="control">
                    <input-field-with-warning 
                      v-model='form.mailingAddr1'
                      class='nonprofit-claim-form__input'
                      id='mailing-address-1'
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="nonprofit-claim-form__field field is-horizontal">
              <div class="nonprofit-claim-form__field-label field-label">
                <label class='label has-text-weight-bold' for="mailing-address-2">Mailing address 2:<span class='has-text-danger'>*</span></label>
              </div>
              <div class="field-body">
                <div class="field">
                  <div class="control">
                    <input-field-with-warning 
                      v-model='form.mailingAddr2'
                      class='nonprofit-claim-form__input'
                      id='mailing-address-2'
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="nonprofit-claim-form__field field is-horizontal">
              <div class="nonprofit-claim-form__field-label field-label">
                <p class='label has-text-weight-bold is-marginless'>Country:<span class='has-text-danger'>*</span></p>
              </div>
              <div class="field-body">
                <div class="field">
                  <div class="control">
                    <drop-down-countries 
                      @selected='onCountrySelect'
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="nonprofit-claim-form__field field is-horizontal">
              <div class="nonprofit-claim-form__field-label field-label">
                <p class='label has-text-weight-bold is-marginless'>State:<span class='has-text-danger'>*</span></p>
              </div>
              <div class="field-body">
                <div class="field">
                  <div class="control">
                    <drop-down-states 
                      @selected='onStateSelect'
                      :country='selectedCountry && selectedCountry.shortName'
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="nonprofit-claim-form__field field is-horizontal nonprofit-claim-form__address">
              <div class="field-body">
                <div class="nonprofit-claim-form nonprofit-claim-form__field--city field is-horizontal">
                  <div class="nonprofit-claim-form__field-label nonprofit-claim-form__field-label--small field-label">
                    <label class='label has-text-weight-bold' for="city">City:<span class='has-text-danger'>*</span></label>
                  </div>
                  <div class="field-body">
                    <div class="control">
                      <input-field-with-warning 
                        v-model='form.city'
                        class='nonprofit-claim-form__input'
                        id='city'
                      />
                    </div>
                  </div>
                </div>
                <!-- <div class="field is-horizontal">
                  <div class="nonprofit-claim-form__field-label nonprofit-claim-form__field-label--small field-label">
                    <label class='label has-text-weight-bold' for="state">State:<span class='has-text-danger'>*</span></label>
                  </div>
                  <div class="field-body">
                    <div class="control">
                      <input-field-with-warning 
                        v-model='form.state'
                        class='nonprofit-claim-form__input'
                        id='state'
                      />
                      <drop-down-states
                        class='nonprofit-claim-form__input'
                      />
                    </div>
                  </div>
                </div> -->
                <div class="field is-horizontal">
                  <div class="nonprofit-claim-form__field-label nonprofit-claim-form__field-label--small field-label">
                    <label class='label has-text-weight-bold' for="zip">Zip:<span class='has-text-danger'>*</span></label>
                  </div>
                  <div class="field-body">
                    <div class="control">
                      <input-field-with-warning 
                        v-model='form.zip'
                        class='nonprofit-claim-form__input'
                        id='zip'
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </slide-fade>
        <div class="nonprofit-claim-form__field field is-horizontal">
          <div class="nonprofit-claim-form__field-label field-label">
            <label class='label' for="link">Nonprofit Website:</label>
          </div>
          <div class="field-body">
            <div class="field">
              <div class="control">
                <input-field-with-warning
                  v-model='form.link'
                  class='nonprofit-claim-form__input'
                  id='link'
                  placeholder='Link to front page of your nonprofit’s website'
                  @invalid='(errors) => onFieldError("link", errors)'
                  @valid='onFieldValid("link")'
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="nonprofit-claim-form__general-fields nonprofit-claim-form__field-group">
        <p class="nonprofit-claim-form__subheading">Nonprofit login details</p>
        <div class="nonprofit-claim-form__field field is-horizontal">
          <div class="nonprofit-claim-form__field-label field-label">
            <label class='label' for="email">Email:<span class='has-text-danger'>*</span></label>
          </div>
          <div class="field-body">
            <div class="field">
              <div class="control">
                <input-field-with-warning 
                  class='nonprofit-claim-form__input'
                  id='email'
                  type='email'
                  v-model='form.email'
                  placeholder='This email will be your nonprofit’s login username'
                />
              </div>
            </div>
          </div>
        </div>
        <div class="nonprofit-claim-form__field field is-horizontal">
          <div class="nonprofit-claim-form__field-label field-label">
            <label class='label' for="password">Password:<span class='has-text-danger'>*</span></label>
          </div>
          <div class="field-body">
            <div class="field">
              <div class="control">
                <input-field-with-warning
                  v-model='form.password'
                  class='nonprofit-claim-form__input'
                  id='password'
                  type='password'
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="nonprofit-claim-form__contact-fields nonprofit-claim-form__field-group">
        <p class='nonprofit-claim-form__subheading is-marginless'>Contact person</p>
        <p class='has-text-grey'>Submit the details below so we can verify you’re with the nonprofit. After you’ve claimed this nonprofit, you can edit the nonprofit profile page and other settings. Our team must do at least one verification step.</p>
        <div class="nonprofit-claim-form__field field is-horizontal">
          <div class="nonprofit-claim-form__field-label field-label">
            <label class='label' for="firstname">First name:<span class='has-text-danger'>*</span></label>
          </div>
          <div class="field-body">
            <div class="field">
              <div class="control">
                <input-field-with-warning 
                  class='nonprofit-claim-form__input'
                  id='firstname'
                  v-model='form.firstName'
                />
              </div>
            </div>
          </div>
        </div>
        <div class="nonprofit-claim-form__field field is-horizontal">
          <div class="nonprofit-claim-form__field-label field-label">
            <label class='label' for="lastname">Last name:<span class='has-text-danger'>*</span></label>
          </div>
          <div class="field-body">
            <div class="field">
              <div class="control">
                <input-field-with-warning 
                  class='nonprofit-claim-form__input'
                  id='lastname'
                  v-model='form.lastName'
                />
              </div>
            </div>
          </div>
        </div>
        <div class="nonprofit-claim-form__field field is-horizontal">
          <div class="nonprofit-claim-form__field-label field-label">
            <label class='label' for="contact-email">Your email:<span class='has-text-danger'>*</span></label>
          </div>
          <div class="field-body">
            <div class="field">
              <div class="control">
                <input-field-with-warning 
                  class='nonprofit-claim-form__input'
                  id='contact-email'
                  type='email'
                  v-model='form.contactEmail'
                />
                <p class="field-details has-text-grey">If your email is at the same domain name as your nonprofit’s website, we can verify by emailing you to confirm that you’re attempting to claim the nonprofit.</p>
              </div>
            </div>
          </div>
        </div>
        <div class="nonprofit-claim-form__field field is-horizontal">
          <div class="nonprofit-claim-form__field-label field-label">
            <label class='label' for="nonprofit-telephone">Nonprofit telephone:<span class='has-text-danger'>*</span></label>
          </div>
          <div class="field-body">
            <div class="field">
              <div class="control">
                <input-field-with-warning 
                  class='nonprofit-claim-form__input'
                  id='nonprofit-telephone'
                  v-model='form.telephone'
                />
                <p class="field-details has-text-grey">We can verify by confirming that the nonprofit telephone is on your website, calling it and having someone tell us you work with the nonprofit.</p>
              </div>
            </div>
          </div>
        </div>
        <div class="nonprofit-claim-form__field field is-horizontal">
          <div class="nonprofit-claim-form__field-label field-label">
            <label class='label' for="contact-telephone">Your telephone:<span class='has-text-danger'>*</span></label>
          </div>
          <div class="field-body">
            <div class="field">
              <div class="control">
                <input-field-with-warning 
                  class='nonprofit-claim-form__input'
                  id='contact-telephone'
                  v-model='form.contactTelephone'
                />
                <p class='field-details has-text-grey'>Sometimes emails get routed to spam. If the above methods fail, we need your phone so we have a way of reaching you.</p>
              </div>
            </div>
          </div>
        </div>
        <div class="nonprofit-claim-form__field field is-horizontal">
          <div class="nonprofit-claim-form__field-label field-label">
            <label class='label' for="note">Note:</label>
          </div>
          <div class="field-body">
            <div class="field">
              <div class="control">
                <div class="nonprofit-claim-form__input">
                  <textarea-with-warning 
                    id='note'
                    class='nonprofit-claim-form__note'
                    rows='10'
                    :max-length='700'
                    :warningMaxLength='675'
                    @invalid='(errors) => onFieldError("note", errors)'
                    @valid='onFieldValid("note")'
                    @warningChange='(warnings) => onFieldWarning("description", warnings)'
                    v-model='form.note'
                  />
                </div>
              </div>
              <div class="field-errors">
                <p 
                  class='help has-text-success has-text-weight-bold'
                  v-if='(errors.note && errors.note.maxLength) || (warnings.note && warnings.note.maxLength)'
                >
                  Maximum 700 characters. Remaining: 
                  <span
                    :class='{"has-text-danger": errors.note && errors.note.maxLength}'
                  >
                    {{ 700 - form.note.length }}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <button class='button is-primary' type='submit' :disabled='!isValid'>Submit</button>
    </form>
  </div>
</template>

<script>
import InputFieldWithWarning from 'Components/input/InputFieldWithWarning'
import TextareaWithWarning from 'Components/input/TextareaWithWarning'

import NonprofitIrsDetails from 'LocalComponents/Nonprofit/NonprofitIRSDetails'
import SlideFade from 'Components/transitions/SlideFade'
import DropDownCountries from 'Components/general/DropDownCountries'
import DropDownStates from 'Components/general/DropDownStates'

export default {
  name: 'NonprofitClaimForm',

  components: {
    NonprofitIrsDetails,
    SlideFade,
    InputFieldWithWarning,
    TextareaWithWarning,
    DropDownCountries,
    DropDownStates,
  },

  props: {
    nonprofit: {
      type: Object,
      required: true,
    },
  },

  data () {
    return {
      form: {
        country: '',
        state: '',
        sameLegalAddress: false,
      },
      selectedCountry: null,
      selectedState: null,
      errors: {},
      warnings: {},
    }
  },

  methods: {
    onCountrySelect (country) {
      this.selectedCountry = country
      this.form.country = country.name
    },

    onStateSelect (state) {
      this.selectedState = state
      this.form.state = state
    },
    
    onFieldError (field, errors) {
      this.errors[field] = errors
    },

    onFieldWarning (field, warnings) {
      this.warnings[field] = warnings
    },

    onFieldValid (field) {
      this.errors[field] = null
    },

    processForm () {
      this.$router.push({ name: 'nonprofit-sign-up-step-four' })      
    },
  },

  computed: {
    isValid () {
      if (this.form.sameLegalAddress) {
        return this.form.email && this.form.password && this.form.firstName && this.form.lastName && this.form.contactEmail && this.form.telephone && this.form.contactTelephone
      }

      return this.form.mailingAddr1 && this.form.mailingAddr2 && this.form.country && this.form.state && this.form.city && this.form.zip && this.form.email && this.form.password && this.form.firstName && this.form.lastName && this.form.contactEmail && this.form.telephone && this.form.contactTelephone
    },
  },
}
</script>

<style lang='scss' scoped>
.nonprofit-claim-form {
  &__subheading {
    font-size: 1.125em;
    font-weight: 700;
  }

  &__irs-details {
    padding-bottom: 1em;
  }

  .label {
    &:not(.checkbox) {
      font-weight: 700 !important;
    }
  }

  &__field {
    &:last-of-type {
      margin-bottom: 1em;
    }

    // &--city {
    //   flex-shrink: 0;
    //   flex-basis: 300px;
    //   max-width: 300px;
    // }
  }

  &__input {
    max-width: 500px;
  }

  &__field-label {
    // flex-basis: 155px;
    text-align: left;

    &:not(&--small) {
      flex-basis: 100px;
      max-width: 185px;
      margin-right: 1.5em;
    }
  }

  &__small-text {
    font-size: 0.875em;
  }

  &__address {
    max-width: 708px;
    .control {
      width: 100%;
    }
    .field-label {
      margin-right: .5em;
    }
  }

  &__field-group{
    max-width: 710px;

    &:not(:first-of-type) {
      margin-top: 2em;
    }
  }

  &__address-fields {
    margin-top: 0 !important;
  }

  .field-details {
    margin-top: .25em;
    margin-bottom: 0;
  }
}
</style>

<style lang='scss'>
.nonprofit-claim-form {
  .dropdown-countries,
  .dropdown-states {
    max-width: 500px;
  }
}
</style>
