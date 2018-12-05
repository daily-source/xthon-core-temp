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

describe("DonateFormLoggedIn", () => {
  let store

  beforeEach((done) => {
    store = new Vuex.Store({
      state: {
        user: {
          loggedIn: false
        }
      },
      actions: actions,
      mutations: mutations
    })

    store.dispatch("AUTHENTICATE_USER", {
      email: "m@h.c",
      password: "qqQQ11!!"
    }).then(data => {
      done()
    })
  })

  it("should render a list with 2 stored payment methods", () => {
    const donateForm = mount(DonateForm, { store: store })
    const storedPaymentMethods = donateForm.find(".stored-payment-methods-wrapper select")
    expect(storedPaymentMethods.element.length).to.equal(2)
  })

  it("should show one disabled payment method and one that can be selected", () => {
    const donateForm = mount(DonateForm, { store: store })
    const storedPaymentMethods = donateForm.find(".stored-payment-methods-wrapper select")
    expect(storedPaymentMethods.element.children[0].getAttribute("disabled")).to.equal(null)
    expect(storedPaymentMethods.element.children[1].getAttribute("disabled")).to.equal("disabled")
  })

  it("should not show the stored payments selector once user logs out", () => {
    // Log user off
    store.state.user = {}
    store.state.user.loggedIn = false

    const donateForm = mount(DonateForm, { store: store })
    const storedPaymentMethods = donateForm.find(".stored-payment-methods-wrapper")
    expect(storedPaymentMethods.element).to.equal(undefined)
  })
})
