<template>
  <div class="stored-payment-methods-wrapper billing-info centered logged-in" v-if="loggedIn">
    <h2><span>Payment method</span></h2>
    <div v-if="!isNewPaymentMethod && paymentMethods && paymentMethods.length">
      <p><label :for="`stored-payment-method_${_uid}`">Choose an existing payment method:</label></p>

      <div class="select">
        <select v-model="donation.storedPaymentMethod" :id="`stored-payment-method_${_uid}`">
          <option
            v-for="paymentMethod in paymentMethods"
            :value="paymentMethod"
            :disabled="!isValidPaymentMethod(paymentMethod)"
          >{{`Card ending in ${paymentMethod.lastFour}`}} - {{paymentMethod.expirationMonth}}/{{paymentMethod.expirationYear}}</option>
        </select>
      </div>
    </div>

    <p class="add-payment-method__cta" @click="toggleNewPaymentMethod()" v-if="!isNewPaymentMethod && paymentMethods.length"><a>Use a new payment method</a></p>
    <p class="add-payment-method__cta" @click="toggleNewPaymentMethod()" v-if="isNewPaymentMethod && paymentMethods.length"><a>Use a stored payment method instead</a></p>
  </div>
</template>

<script>
import * as validator from "../../util/validator.js"

export default {
  props: ["paymentMethods", "isNewPaymentMethod"],
  data () {
    return {
      donation: {
        storedPaymentMethod: null
      }
    }
  },
  computed: {
    userName () {
      return this.$store.state.user.userName
    },
    loggedIn () {
      return this.$store.state.user.loggedIn
    }
  },
  methods: {
    isValidPaymentMethod (paymentMethod) {
      return validator.validateExpirationDate(paymentMethod.expirationMonth, paymentMethod.expirationYear)
    },
    toggleNewPaymentMethod () {
      this.$emit("toggle:paymentMethod")
    }
  },
  watch: {
    "donation.storedPaymentMethod": function (newVal) {
      this.$emit("input:storedPaymentMethod", newVal)
    }
  }
}
</script>

<style scoped lang="scss">
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
.add-payment-method__cta {
  margin: 10px 0 20px;
}

</style>