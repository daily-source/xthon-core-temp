import { mount } from "vue-test-utils"
import { expect } from "chai"
import DonateBillingMethod from "Components/donate/DonateBillingMethod.vue"

describe("DonateBillingMethod", () => {
  it("should invalidate a credit card: card number incomplete", () => {
    const input = mount(DonateBillingMethod, { propsData: { payment: { cardNumber: "123412341234123", securityCode: "123", billingZip: "12345", expirationYear: "23", expirationMonth: "12", method: "card" } } })
    expect(input.vm.validateAllFields()).to.equal(false)
  })

  it("should invalidate a credit card: no CVV provided", () => {
    const input = mount(DonateBillingMethod, { propsData: { payment: { cardNumber: "1234123412341234", securityCode: "", billingZip: "12345", expirationYear: "23", expirationMonth: "12", method: "card" } } })
    expect(input.vm.validateAllFields()).to.equal(false)
  })

  it("should invalidate a credit card: expired card", () => {
    const input = mount(DonateBillingMethod, { propsData: { payment: { cardNumber: "1234123412341234", securityCode: "123", billingZip: "12345", expirationYear: "17", expirationMonth: "12", method: "card" } } })
    expect(input.vm.validateAllFields()).to.equal(false)
  })

  it("should invalidate a credit card: invalid ZIP", () => {
    const input = mount(DonateBillingMethod, { propsData: { payment: { cardNumber: "1234123412341234", securityCode: "123", billingZip: "12", expirationYear: "23", expirationMonth: "12", method: "card" } } })
    expect(input.vm.validateAllFields()).to.equal(false)
  })

  it("should validate a credit card", () => {
    const input = mount(DonateBillingMethod, { propsData: { payment: { cardNumber: "1234123412341234", securityCode: "123", billingZip: "12345", expirationYear: "23", expirationMonth: "12", method: "card" } } })
    expect(input.vm.validateAllFields()).to.equal(true)
  })
})
