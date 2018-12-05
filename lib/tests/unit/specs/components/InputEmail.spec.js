import { mount } from "vue-test-utils"
import { expect } from "chai"
import InputEmail from "Components/input/InputEmail.vue"

describe("InputEmail", () => {
  it("should invalidate an entry", () => {
    const input = mount(InputEmail)
    input.setData({ form: { email: "asd@asd" } })
    expect(input.vm.validateAllFields()).to.equal(false)
  })

  it("should validate an email", () => {
    const input = mount(InputEmail)
    input.setData({ form: { email: "john@gmail.com" } })
    expect(input.vm.validateAllFields()).to.equal(true)
  })

  it("should not display an error message immediately", (done) => {
    const input = mount(InputEmail)
    input.setData({ form: { email: "john@" }, errorMessageTimeout: 10 })
    input.vm.refreshFieldValidation()
    setTimeout(() => {
      expect(input.vm.errorMessage).to.equal("")
      done()
    }, 0)
  })

  it("should display an error message after X seconds", (done) => {
    const input = mount(InputEmail)
    input.setData({ form: { email: "john@" }, errorMessageTimeout: 1 })
    input.vm.refreshFieldValidation()
    setTimeout(() => {
      expect(input.vm.errorMessage).to.equal("Email is invalid")
      done()
    }, 20)
  })
})
