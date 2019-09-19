<template>
  <div>
    <DonateError
      :state="donateErrorModal"
      v-on:modal:close="handleDonateError()"
    ></DonateError>
    <DonateProcessing
      :state="donateProcessingModal"
      v-on:modal:close="handleDonateError()"
    ></DonateProcessing>
    <DonateFormHeading
      :parent="parent"
      :nonprofit="nonprofit"
      :fundraiser="fundraiser"
    ></DonateFormHeading>
    <form v-on:keyup.enter="validateSubmit()">
      <DonationBoxes
        :giving-levels="givingLevels"
        v-on:input:box="donation.amount = $event"
        v-on:input:level="donation.givingLevel = $event"
      >
      </DonationBoxes>
      <DonationFrequency
        v-on:input:frequency="donation.frequency = $event"
      >
      </DonationFrequency>
      <div class="billing-info" v-if="!loggedIn">
        <span class="login-link">
          <LogInModal v-on:success="validateAllFields()">
            <h2 slot="trigger"><a>Log in to use stored info »</a></h2>
          </LogInModal>
        </span>
      </div>
      <InputName
        label="Email (for the receipt):"
        :required="true"
        :error-message="nameErrorMsg"
        v-if="!userName"
        v-on:input:valid="validateAllFields()"
        v-on:input:invalid="validateAllFields()"
        v-on:input:first="donation.firstName = $event; errorMessage = ''"
        v-on:input:last="donation.lastName = $event; errorMessage = ''"
      ></InputName>
      <DonationComment
        :fundraiser="fundraiser"
        v-on:input:anonymous="donation.isAnonymous = $event"
        v-on:input:comment="donation.comment = $event"
      >
      </DonationComment>
      <InputEmail
        label="Email (for the receipt):"
        :required="true"
        :error-message="emailErrorMsg"
        v-if="!loggedIn"
        v-on:input:valid="validateAllFields()"
        v-on:input:invalid="validateAllFields()"
        v-on:input:email="donation.email = $event; errorMessage = ''"
      ></InputEmail>
      <div class="billing-method" v-if="!loggedIn">
        <DonatePasswordModal
          :key="donation.email"
          :modal-active="accountNeededModal"
          :parent="parent"
          :fundraiser="fundraiser"
          :nonprofit="nonprofit"
          :email="donation.email"
          :donation="donation"
          v-on:close:modal="accountNeededModal = false"
          v-on:success="authorize(); submitDonate()"
          v-on:error="unauthorize()"
        ></DonatePasswordModal>
        <DonateBillingMethod
          :payment="donation.paymentMethod"
          v-on:input:method="donation.paymentMethod.method = $event"
          v-on:input:card="donation.paymentMethod.cardNumber = $event"
          v-on:input:month="donation.paymentMethod.expirationMonth = $event"
          v-on:input:year="donation.paymentMethod.expirationYear = $event"
          v-on:input:code="donation.paymentMethod.securityCode = $event"
          v-on:input:save="donation.paymentMethod.savePaymentMethod = $event"
          v-on:form:valid="newPaymentMethodIsValid = true; validateAllFields()"
          v-on:form:invalid="newPaymentMethodIsValid = false; validateAllFields()"
        />
      </div>
      <StoredPaymentMethods
        :payment-methods="paymentMethods"
        :is-new-payment-method="donation.isNewPaymentMethod"
        v-on:toggle:paymentMethod="toggleNewPaymentMethod()"
        v-on:input:storedPaymentMethod="donation.storedPaymentMethod = $event"
      >
      </StoredPaymentMethods>
      <div class="billing-info logged-in" v-if="loggedIn">
        <DonateBillingMethod
          :payment="donation.paymentMethod"
          v-on:input:method="donation.paymentMethod.method = $event"
          v-on:input:card="donation.paymentMethod.cardNumber = $event"
          v-on:input:month="donation.paymentMethod.expirationMonth = $event"
          v-on:input:year="donation.paymentMethod.expirationYear = $event"
          v-on:input:code="donation.paymentMethod.securityCode = $event"
          v-on:input:save="donation.paymentMethod.savePaymentMethod = $event"
          v-on:input:zip="donation.paymentMethod.billingZip = $event"
          v-on:form:valid="newPaymentMethodIsValid = true; validateAllFields()"
          v-on:form:invalid="newPaymentMethodIsValid = false; validateAllFields()"
          v-if="donation.isNewPaymentMethod || !paymentMethods.length" />
      </div>
      <div>
        <div class="form-submit-wrapper" @click.prevent="submitDonate()">
          <button class="button is-large is-danger"
            :disabled="submitButtonDisabled"
          >
            {{submitButtonLabel || 'Donate'}}</button>
          <span class="small-text">By clicking Donate, you agree to the <a>Terms and Conditions</a>.</span>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import LogInModal from "Components/general/LogInModal.vue"
import DonateFormHeading from "Components/donate/DonateFormHeading.vue"
import DonateBillingMethod from "Components/donate/DonateBillingMethod.vue"
import DonatePasswordModal from "Components/donate/DonatePasswordModal.vue"
import DonationBoxes from "Components/input/DonationBoxes.vue"
import DonationFrequency from "Components/input/DonationFrequency.vue"
import DonationComment from "Components/input/DonationComment.vue"
import DonateError from "Components/donate/DonateError.vue"
import DonateProcessing from "Components/donate/DonateProcessing.vue"
import InputEmail from "Components/input/InputEmail.vue"
import InputName from "Components/input/InputName.vue"
import StoredPaymentMethods from "Components/input/StoredPaymentMethods.vue"
import * as validator from "../../util/validator.js"

export default {
  props: ["submitButtonLabel", "trigger", "givingLevels", "parent", "nonprofit", "fundraiser"],
  components: {
    DonateBillingMethod,
    DonateFormHeading,
    DonateError,
    DonatePasswordModal,
    DonateProcessing,
    DonationBoxes,
    DonationComment,
    DonationFrequency,
    InputEmail,
    InputName,
    LogInModal,
    StoredPaymentMethods
  },
  data () {
    return {
      accountNeededModal: false,
      accountCleared: false,
      volunteerFor: "",
      nonprofitIs: "",
      emailErrorMsg: "Please enter a valid Email",
      nameErrorMsg: "This field is required",
      firstNameErrorMsg: "",
      lastNameErrorMsg: "",
      newPaymentMethodIsValid: false,
      submitButtonDisabled: true,
      donateErrorModal: false,
      donateProcessingModal: false,
      donation: {
        isNewPaymentMethod: false,
        paymentMethod: {
          method: "card",
          cardNumber: null,
          expirationMonth: null,
          expirationYear: null,
          securityCode: null,
          savePaymentMethod: true,
          billingZip: null
        },
        storedPaymentMethod: {
          cardId: null,
          lastFour: null,
          expirationMonth: null,
          expirationYear: null
        },
        firstName: null,
        lastName: null,
        amount: 350,
        isAnonymous: false,
        isGift: false,
        givingLevel: {},
        email: "",
        frequency: "",
        comment: "",
        trigger: this.trigger
      }
    }
  },
  methods: {
    submitDonate () {
      // disable submit button while processing
      this.submitButtonDisabled = true
      // Recurring or want to save payment method, login modal needed.
      if (this.accountNeeded && !this.accountCleared && !this.loggedIn) {
        this.accountNeededModal = true
        this.submitButtonDisabled = false
      } else {
        // send data to payment processor: if no 'save' option or no 'recurring' selected, process and provide login info afterwards
        this.sendPaymentData()
      }
    },
    validateSubmit () {
      if (!this.submitButtonDisabled) {
        this.submitDonate()
      }
    },
    unauthorize () {
      this.submitButtonDisabled = false
    },
    authorize () {
      this.accountCleared = true
      this.accountNeededModal = false
    },
    toggleNewPaymentMethod () {
      this.donation.isNewPaymentMethod = !this.donation.isNewPaymentMethod
    },
    /**
     * If the donation attempt generated an error, delete the billing data introduced
     * and allow the user to restart the donation.
     */
    handleDonateError () {
      this.donateErrorModal = false
      this.donation.paymentMethod = {}
      this.donation.isNewPaymentMethod = true
      this.donation.paymentMethod.expiration_month = null
      this.donation.paymentMethod.expiration_year = null
      this.donation.paymentMethod.cardNumber = null
      this.donation.paymentMethod.securityCode = null
    },
    /**
     * Perform an on-client validation before enabling the submit button.
     * This will disable the submission to avoid sending incomplete data to the backend.
     */
    validateAllFields () {
      const validEmail = validator.validateEmail(this.donation.email)
      const validUnlogged = validEmail && this.donation.lastName && this.donation.firstName && this.newPaymentMethodIsValid
      const validLoggedNewPayment = this.loggedIn && this.newPaymentMethodIsValid && this.donation.isNewPaymentMethod
      const validStoredPayment = this.donation.storedPaymentMethod ? validator.validateExpirationDate(this.donation.storedPaymentMethod.expirationMonth, this.donation.storedPaymentMethod.expirationYear) : false
      const validLoggedStoredPayment = this.loggedIn && !this.donation.isNewPaymentMethod && validStoredPayment

      if (validUnlogged || validLoggedNewPayment || validLoggedStoredPayment) {
        this.submitButtonDisabled = false
      } else {
        this.submitButtonDisabled = true
      }
    },
    /**
     * Send payment data to the API, once cleared.
     * Enable the processing modal component while the donation is being processed.
     */
    sendPaymentData () {
      this.donateProcessingModal = true
      return this.$store.dispatch("SEND_DONATION", {
        donation: this.donation
      })
        .then(data => {
          this.$emit("success", { data: data })
          this.donateProcessingModal = false
        })
        .catch(err => {
          this.donateErrorModal = true
          this.donateProcessingModal = false
          console.log(err)
        })
    }
  },
  computed: {
    loggedIn () {
      return this.$store.state.user.loggedIn
    },
    userName () {
      return this.$store.state.user.nickname
    },
    paymentMethods () {
      if (this.loggedIn) {
        return this.$store.state.user.paymentMethods
      } else {
        return []
      }
    },
    accountNeeded () {
      return this.donation.frequency !== "once" || this.donation.paymentMethod.savePaymentMethod
    }
  },
  mounted () {
    this.validateAllFields()
  },
  watch: {
    "donation.firstName": function (newVal, oldVal) {
      this.validateAllFields()
      if (!newVal) {
        this.firstNameErrorMsg = "This field is required"
      } else {
        this.firstNameErrorMsg = ""
      }
    },
    "donation.lastName": function (newVal, oldVal) {
      this.validateAllFields()
      if (!newVal) {
        this.lastNameErrorMsg = "This field is required"
      } else {
        this.lastNameErrorMsg = ""
      }
    },
    "donation.email": function (newVal, oldVal) {
      this.validateAllFields()
      if (newVal && newVal.length > 3) {
        if (!validator.validateEmail(newVal)) {
          this.emailErrorMsg = "Email is invalid"
        } else {
          this.emailErrorMsg = ""
        }
      }
    },
    "donation.isNewPaymentMethod": function (newVal) {
      this.validateAllFields()
    },
    "donation.storedPaymentMethod": function (newVal, oldVal) {
      this.validateAllFields()
    },
    loggedIn (newVal) {
      if (newVal) {
        this.$emit("logged:in")
        // If the user has logged in but has already inserted new Card data.
        if (this.donation.paymentMethod.cardNumber) {
          this.donation.isNewPaymentMethod = true
        }
      } else {
        this.$emit("logged:out")
      }
    }
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
.billing-info {
  h2 {
    display: flex;
    flex-direction: row;
    text-align: center;
    font-size: 16px;
    font-weight: bold;
    margin: 20px 0 30px;
    color: $color-text;
    justify-content: center;
    a {
      color: $color-emphasis-alt;
      text-decoration: underline;
      &:hover {
        color: $color-text;
      }
    }
  }
  &.logged-in {
    h2 {
      margin-bottom: 10px;
    }
  }
}
.instructions {
  font-size: 14px;
  @include tablet {
    font-size: 16px;
  }
}
</style>
<style lang="scss">
  .editable-error-message-wrapper {
  text-align: center;
  @include tablet {
    text-align: left;
  }
  margin-bottom: 0 !important;
  margin-top: -10px;
  .editable-error-message {
    font-weight: 100;
    font-size: .8rem;
  }
}
</style>