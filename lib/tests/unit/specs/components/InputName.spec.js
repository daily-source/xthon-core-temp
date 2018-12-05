import { mount } from "vue-test-utils"
import { expect } from "chai"
import InputName from "Components/input/InputName.vue"

describe("InputName", () => {
  it("should render an empty username invalid", () => {
    const input = mount(InputName)
    input.setData({ form: { firstname: "" } })
    expect(input.vm.validateAllFields()).to.equal(false)
  })

  it("should validate a username", () => {
    const input = mount(InputName)
    input.setData({ form: { firstname: "John", lastname: "Doe" } })
    expect(input.vm.validateAllFields()).to.equal(true)
  })

  it("should not display an error message immediately", (done) => {
    const input = mount(InputName)
    input.setData({ form: { firstname: "John" }, errorMessageTimeout: 1 })
    input.vm.refreshFirstNameValidation()
    setTimeout(() => {
      expect(input.vm.firstnameErrorMessage).to.equal("")
      done()
    }, 0)
  })

  it("should display an error message after X seconds", (done) => {
    const input = mount(InputName)
    input.setData({ form: { firstname: "John", lastname: "" }, errorMessageTimeout: 1 })
    input.vm.refreshFirstNameValidation()
    input.vm.refreshLastNameValidation()
    setTimeout(() => {
      expect(input.vm.lastnameErrorMessage).to.equal("This field is required")
      done()
    }, 10)
  })
})
