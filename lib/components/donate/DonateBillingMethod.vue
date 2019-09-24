<template>
  <div>
    <div class="billing-info">
      <div class="columns form-column__wrapper form-column__extra-padded input-line">
        <div class="column is-2 form-column__input-column method">
          <div class="control">
            <label class="radio">
              <input type="radio" name="method" v-model="payment.method" value="card"
                v-on:input="$emit('input:method', $event.target.value)"
              >
              Credit Card
            </label>
            <label class="radio">
              <input type="radio" name="method" v-model="payment.method" value="paypal"
                v-on:input="$emit('input:method', $event.target.value)"
              >
              PayPal
            </label>
            <label class="radio">
              <input type="radio" name="method" v-model="payment.method" value="check"
                v-on:input="$emit('input:method', $event.target.value)"
              >
              Check
            </label>
          </div>
        </div>
      </div>
      <div class="columns form-column__wrapper form-column__extra-padded input-line input-card-number is-multiline">
        <div class="column is-6-tablet form-column__label-column input-label"><label class="label">Card Number:</label></div>
        <div class="column is-6-tablet form-column__input-column">
          <div class="control input-wrapper customMargin" style="max-width: 200px;">
            <Icons icon="credit-card" class="input-icon" iconwidth="20px" iconheight="20px" color="#999"></Icons>
            <input class="custom-editable-value" type="text" placeholder="0000 0000 0000 0000"
              v-bind:value="payment.cardNumber"
              v-on:input="$emit('input:card', $event.target.value)"
            />
          </div>
        </div>
        <div class="column is-6-tablet is-offset-6-tablet editable-error-message-wrapper" v-if="creditCardNumberErrorMessage">
          <span class="editable-error-message">{{creditCardNumberErrorMessage}}</span>
        </div>
      </div>
      <div class="columns form-column__wrapper form-column__extra-padded input-line input-expiry-number is-multiline">
        <div class="column is-6 form-column__label-column input-label"><label class="label">Expiration date (MM/YY):</label></div>
        <div class="column is-3 form-column__input-column">
          <div class="columns auto-margin">
            <select
              class="column is-one-quarter-mobile is-one-third-tablet is-one-quarter-desktop is-one-quarter-widescreen is-one-quarter-fullhd"
              v-bind:value="payment.expirationMonth"
              v-on:input="$emit('input:month', $event.target.value)"
              :value="1"
            >
              <option v-for="month in [1,2,3,4,5,6,7,8,9,10,11,12]" :value="month">{{month}}</option>
            </select>
            <select
              class="column is-one-quarter-mobile is-one-third-tablet is-one-quarter-desktop is-one-quarter-widescreen is-one-quarter-fullhd"
              v-bind:value="payment.expirationYear"
              v-on:input="$emit('input:year', $event.target.value)"
              :value="getYearArray()[0]"
            >
              <option v-for="year in getYearArray()" :value="year">{{year}}</option>
            </select>
          </div>
        </div>
        <div class="column is-5 is-offset-5" v-if="expirationDateErrorMessage">
          <span class="error-message">{{expirationDateErrorMessage}}</span>
        </div>
      </div>
      <div class="columns form-column__wrapper form-column__extra-padded input-line input-card-code">
        <div class="column is-6-tablet form-column__label-column input-label">
          <label class="label">Security Code:</label>
        </div>
        <div class="column is-6-tablet form-column__input-column">
          <div class="control input-wrapper auto-margin customMargin" style="max-width: 100px;">
            <Icons icon="lock" class="input-icon" iconwidth="20px" iconheight="20px" color="#999"></Icons>
            <input class="custom-editable-value" type="text" name="security-code" placeholder="" min="0" max="9999"
              autocomplete="off"
              v-bind:value="payment.securityCode"
              v-on:input="$emit('input:code', $event.target.value)"
            />
          </div>
        </div>
      </div>
      <div class="centered is-gift-wrapper">
        <div>
          <label class="checkbox">
            <input type="checkbox"
              name="payment-method"
              :value="payment.savePaymentMethod"
              v-model="payment.savePaymentMethod"
              v-on:click="$emit('input:save', $event.target.value)"
            />
              Save the payment method
          </label>
        </div>
      </div>
      <div class="columns form-column__wrapper form-column__extra-padded input-line input-zip is-multiline">
        <div class="column is-6-tablet form-column__label-column input-label"><label class="label">Billing zip code :</label></div>
        <div class="column is-6-tablet form-column__input-column">
          <div class="control input-wrapper auto-margin customMargin" style="max-width: 100px;">
            <Icons icon="location" class="input-icon" iconwidth="20px" iconheight="20px" color="#999"></Icons>
            <input class="custom-editable-value" type="text" placeholder="00000"
              v-model:value="payment.billingZip"
              v-on:input="$emit('input:zip', $event.target.value)"
            />
          </div>
        </div>
        <div class="column is-5 is-offset-5" v-if="billingZipErrorMessage">
          <span class="error-message">{{billingZipErrorMessage}}</span>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import Icons from "Components/general/Icons.vue"
import * as validator from "../../util/validator.js"

export default {
  props: {
    payment: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      creditCardNumberErrorMessage: "",
      expirationDateErrorMessage: "",
      billingZipErrorMessage: "",
      timeoutCardNumber: null,
      timeoutZip: null
    }
  },
  components: {
    Icons
  },
  methods: {
    getYearArray () {
      const currentYear = (new Date()).getFullYear() - 2000
      var yearArray = []
      for (var i = currentYear; i < currentYear + 12; i++) {
        yearArray.push(i)
      }
      return yearArray
    },
    validateAllFields () {
      const validCardNumber = validator.validateCreditCardNumber(this.payment.cardNumber)
      const validCVV = validator.validatePasswordNumber(this.payment.securityCode)
      const validExpirationDate = validator.validateExpirationDate(this.payment.expirationMonth, this.payment.expirationYear)
      const validZIP = validator.validateZipCode(this.payment.billingZip)
      if (validCardNumber && validExpirationDate && validCVV && validZIP) {
        this.$emit("form:valid")
        return true
      } else {
        this.$emit("form:invalid")
        return false
      }
    }
  },
  watch: {
    "payment.cardNumber": function (newVal, oldVal) {
      var vm = this
      this.creditCardNumberErrorMessage = ""
      this.validateAllFields()
      this.payment.cardNumber = validator.formatNumber(newVal, oldVal, 16)
      clearTimeout(this.timeoutCardNumber)
      this.timeoutCardNumber = setTimeout(() => {
        if (validator.validateCreditCardNumber(newVal)) {
          vm.creditCardNumberErrorMessage = ""
        } else {
          vm.creditCardNumberErrorMessage = "Please enter all the digits."
        }
      }, 5000)
    },
    "payment.expirationMonth": function (newVal, oldVal) {
      this.validateAllFields()
    },
    "payment.expirationYear": function (newVal, oldVal) {
      this.validateAllFields()
    },
    "payment.securityCode": function (newVal, oldVal) {
      this.validateAllFields()
      this.payment.securityCode = validator.formatNumber(newVal, oldVal, 4)
    },
    "payment.billingZip": function (newVal, oldVal) {
      this.validateAllFields()
      this.payment.billingZip = validator.formatNumber(newVal, oldVal, 5)

      var vm = this
      this.billingZipErrorMessage = ""
      clearTimeout(this.timeoutZip)
      this.timeoutZip = setTimeout(() => {
        if (validator.validateZipCode(newVal)) {
          vm.billingZipErrorMessage = ""
        } else {
          vm.billingZipErrorMessage = "Please introduce a valid ZIP code."
        }
      }, 5000)
    }
  }
}
</script>

<style scoped lang="scss">
.centered {
  text-align: center;
}
.input-line {
  margin-bottom: 10px;
  &:first-child {
    margin-top: 0px;
  }
  @include tablet {
    margin-bottom: 20px;
  }
  &.input-card-code {
    @include tablet {
      display: flex;
      flex-direction: row;
      align-items: center;      
    }
  }
}

.method {
  flex: 1;
  margin-top: 30px;
  margin-bottom: 20px;

  @include tablet {
    padding: 0 100px;
    margin-top: 10px;
  }
  .control {
    display: flex;
    justify-content: space-evenly;
  }
  .radio {
    display: flex;
    justify-content: center;
    align-items: center;
    input {
      margin-right: 5px;
    }
  }
}
.save-method {
  margin-top: 5px;
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
.input-expiry-number {
  align-items: center;
  .auto-margin {
    display: flex !important;
    margin: auto;
    justify-content: center;
    @include tablet {
      justify-content: left;
    }
  }
}
select {
  width: 100%;
  max-width: 60px;
  font-size: inherit;
  font-weight: 100;
  line-height: 1.4;
  height: 34px;
  border: none;
  box-shadow: none;
  background: none;
  border: 1px solid rgba(60,60,60,.26);
  border-radius: 4px;
  margin: 0 5px 0;
  padding: 0;
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
.is-gift-wrapper {
  margin-top: 10px;
  margin-bottom: 30px;
}
</style>