import { mount } from "vue-test-utils"
import { expect } from "chai"
import DonateForm from "Components/donate/DonateForm.vue"
import actions from "../../../../store/actions"
import mutations from "../../../../store/mutations"
import Vue from "vue"
import Vuex from "vuex"

import * as filters from "../../../../util/filters"
// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.use(Vuex)

describe("DonateForm", () => {
  let store

  beforeEach(() => {
    store = new Vuex.Store({
      state: {
        user: {
          loggedIn: false
        }
      },
      actions: actions,
      mutations: mutations
    })
  })

  it("should disable the submit button if no name/email data is provided and the user is not logged in", () => {
    const donateForm = mount(DonateForm, { store: store })
    donateForm.setData({
      donation: {
        paymentMethod: {
          cardNumber: "123412341234123",
          securityCode: "123",
          billingZip: "12345",
          expirationYear: "23",
          expirationMonth: "12",
          method: "card"
        },
        firstname: "John",
        lastname: "Doe"
      }
    })
    donateForm.vm.validateAllFields()
    expect(donateForm.vm.submitButtonDisabled).to.equal(true)
  })

  it("should enable the submit button if name/email/card data are provided and the user is not logged in", () => {
    const donateForm = mount(DonateForm, { store: store })
    donateForm.setData({
      newPaymentMethodIsValid: true,
      donation: {
        paymentMethod: {
          cardNumber: "1234123412341234",
          securityCode: "123",
          billingZip: "12345",
          expirationYear: "23",
          expirationMonth: "12",
          method: "card"
        },
        firstName: "John",
        lastName: "Doe",
        email: "john@martinez.com"
      }
    })
    donateForm.vm.validateAllFields()
    expect(donateForm.vm.submitButtonDisabled).to.equal(false)
  })

  it("should trigger the DonatePasswordModal as the user is not logged in but still wants to save the payment method", () => {
    const donateForm = mount(DonateForm, { store: store })
    donateForm.setData({
      newPaymentMethodIsValid: true,
      donation: {
        paymentMethod: {
          cardNumber: "1234123412341234",
          securityCode: "123",
          billingZip: "12345",
          expirationYear: "23",
          expirationMonth: "12",
          method: "card",
          savePaymentMethod: true
        },
        firstname: "John",
        lastname: "Doe",
        email: "john@doe.com"
      }
    })
    donateForm.vm.validateAllFields()
    donateForm.vm.submitDonate()
    expect(donateForm.vm.accountNeededModal).to.equal(true)
  })

  it("should allow the donation to go through as the user is not logged in but also doesn't want to save the payment method", () => {
    const donateForm = mount(DonateForm, { store: store })
    var spy = sinon.spy(donateForm.vm, "sendPaymentData") /* eslint no-undef: 0 */
    donateForm.setData({
      newPaymentMethodIsValid: true,
      donation: {
        paymentMethod: {
          cardNumber: "1234123412341234",
          securityCode: "123",
          billingZip: "12345",
          expirationYear: "23",
          expirationMonth: "12",
          method: "card",
          savePaymentMethod: false
        },
        frequency: "once",
        firstname: "John",
        lastname: "Doe",
        email: "john@doe.com"
      }
    })
    donateForm.vm.validateAllFields()
    donateForm.vm.submitDonate()
    expect(spy.called).to.equal(true)
  })
})
