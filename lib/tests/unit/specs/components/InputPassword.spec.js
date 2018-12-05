import { mount } from "vue-test-utils"
import { expect } from "chai"
import InputPassword from "Components/input/InputPassword.vue"

describe("InputPassword", () => {
  it("should invalidate an entry", () => {
    const input = mount(InputPassword)
    input.setData({ form: { password: "asdf" } })
    expect(input.vm.validateAllFields()).to.equal(false)
  })

  it("should validate a password", () => {
    const input = mount(InputPassword)
    input.setData({ form: { password: "qweQWE123!\"·" } })
    expect(input.vm.validateAllFields()).to.equal(true)
  })

  it("should not display an error message immediately", (done) => {
    const input = mount(InputPassword)
    input.setData({ form: { password: "qwe" }, errorMessageTimeout: 1 })
    input.vm.refreshPasswordField()
    setTimeout(() => {
      expect(input.vm.passwordErrorMessage).to.equal("")
      done()
    }, 0)
  })

  it("should display an error message after X seconds", (done) => {
    const input = mount(InputPassword)
    input.setProps({ provideFeedback: true })
    input.setData({ form: { password: "qQ1!" }, errorMessageTimeout: 1 })
    input.vm.refreshPasswordField()
    setTimeout(() => {
      expect(input.vm.passwordErrorMessage).to.equal("The password needs to be at least 8 characters long. ")
      done()
    }, 10)
  })

  it("should display an error message if the password confirmation does not match", (done) => {
    const input = mount(InputPassword)
    input.setProps({ provideFeedback: true, duplicate: true })
    input.setData({ form: { password: "qweQWE123!\"·" }, errorMessageTimeout: 1 })
    input.vm.refreshPasswordField()
    input.vm.refreshPasswordConfirmationField()
    setTimeout(() => {
      expect(input.vm.passwordConfirmationErrorMessage).to.equal("The passwords do not match.")
      done()
    }, 10)
  })

  it("should validate the password and the confirmation", () => {
    const input = mount(InputPassword)
    input.setProps({ duplicate: true })
    input.setData({ form: { password: "qweQWE123!\"·", passwordConfirmation: "qweQWE123!\"·" } })
    expect(input.vm.validateAllFields()).to.equal(true)
  })
})
