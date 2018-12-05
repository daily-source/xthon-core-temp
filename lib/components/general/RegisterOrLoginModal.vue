<template>
  <div>
    <Modal
      size="large"
      :prevent-body-scroll="false"
      :state="state"
      v-on:modal:close="closeModal()"
      v-on:modal:open="closeModal()"
    >
      <div slot="header"><slot name="heading">Almost there</slot></div>
      <div slot="content">
        <slot name="intro"></slot>
        <UserDialog
          :spinner="userDialogSpinner"
          :state="userDialogModal"
          :disable-close= "userDialogDisableClose"
        >
          <div slot="header">Processing</div> 
          <div slot="content"><p>{{userDialogMessage}}</p></div> 
        </UserDialog>
        <div class="columns">
          <div class="column is-6">
            <h4 class="is-centered">Log in</h4>
            <p class="is-centered">If you're already a user, log in here:</p>
            <SocialLogin>
            </SocialLogin>
            <p class="is-centered">Or use your email/password combination:</p>
            <form v-on:keyup.enter="validateLoginSubmit()">
              <InputEmail
                label="Email"
                :required="true"
                v-on:input:valid="validateLoginFields()"
                v-on:input:invalid="validateLoginFields()"
                v-on:input:email="loginForm.email = $event"
              ></InputEmail>
              <InputPassword
                label="Password"
                :required="false"
                :duplicate="false"
                :provide-feedback="false"
                :error-message="errorMessage"
                v-on:input:valid="validateLoginFields()"
                v-on:input:invalid="validateLoginFields()"
                v-on:input:password="loginForm.password = $event; errorMessage = ''"
              ></InputPassword>
            </form>
            <div class="columns form-column__wrapper form-column__extra-padded input-line password-input-wrapper">
              <div class="column is-5 form-column__label-column input-label"></div>
              <div class="column is-5 form-column__input-column">
                <ModalForgetPassword
                  :key="forgetPasswordEmail"
                  :email="forgetPasswordEmail"
                ></ModalForgetPassword>
              </div>
            </div>
            <div class="columns is-centered">
              <div class="form-submit-wrapper" @click.prevent="validateLoginSubmit()">
                <button class="button is-large is-danger"
                  :disabled="loginFormSubmitDisabled"
                >Submit</button>
              </div>
            </div>
          </div>
          <div class="column is-6">
            <h4 class="is-centered">Register</h4>
            <p class="is-centered">If you're new, sign up for a free account</p>
            <SocialLogin>
            </SocialLogin>
            <form v-on:keyup.enter="validateRegisterSubmit()">
              <InputName
                label="Email (for the receipt):"
                :required="true"
                v-if="true"
                v-on:input:valid="validateRegisterFields()"
                v-on:input:invalid="validateRegisterFields()"
                v-on:input:first="registerForm.firstname = $event"
                v-on:input:last="registerForm.lastname = $event"
              ></InputName>
              <InputEmail
                label="Email"
                :required="true"
                v-on:input:valid="validateRegisterFields()"
                v-on:input:invalid="validateRegisterFields()"
                v-on:input:email="registerForm.email = $event"
              ></InputEmail>
              <InputPassword
                label="Password"
                :required="true"
                :duplicate="true"
                :provide-feedback="true"
                v-on:input:valid="validateRegisterFields()"
                v-on:input:invalid="validateRegisterFields()"
                v-on:input:password="registerForm.password = $event"
                v-on:input:passwordConfirmation="registerForm.passwordConfirmation = $event"
              ></InputPassword>
              <div class="columns is-centered">
                <div class="form-submit-wrapper" @click.prevent="validateRegisterSubmit()">
                  <button class="button is-large is-danger"
                    :disabled="registerFormSubmitDisabled"
                  >Submit</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
import Modal from "Components/general/Modal.vue"
import ModalForgetPassword from "Components/login/ModalForgetPassword.vue"
import InputEmail from "Components/input/InputEmail.vue"
import InputName from "Components/input/InputName.vue"
import InputPassword from "Components/input/InputPassword.vue"
import SocialLogin from "Components/login/SocialLogin.vue"
import * as validator from "../../util/validator.js"

export default {
  props: [ "state" ],
  //  props: [ "layout", "login", "signup", "showOnly", "display", "requireName", "register" ],
  components: {
    InputEmail,
    InputName,
    InputPassword,
    ModalForgetPassword,
    SocialLogin,
    Modal,
    UserDialog: () => import("Components/general/UserDialog.vue"),
    UserManagementLinks: () => import("Components/login/UserManagementLinks.vue")
  },
  data () {
    return {
      userDialogSpinner: true,
      userDialogModal: false,
      userDialogMessage: "",
      userDialogDisableClose: true,
      loginForm: {},
      registerForm: {},
      loginFormSubmitDisabled: true,
      registerFormSubmitDisabled: true,
      showingLoginModal: false,
      errorMessage: "",
      welcomeMessage: "",
      submitButtonDisabled: true,
      form: {},
      forgetPasswordEmail: "",
      timeout: null
    }
  },
  computed: {
    loggedIn () {
      return this.$store.state.user.loggedIn
    },
    userName () {
      return this.$store.state.user.fullname
    }
  },
  methods: {
    /*
     * Validate the login fields.
     */
    validateLoginFields () {
      if (validator.validateEmail(this.loginForm.email) && validator.validatePassword(this.loginForm.password)) {
        this.loginFormSubmitDisabled = false
        return true
      } else {
        this.loginFormSubmitDisabled = true
        return false
      }
    },
    validateRegisterFields () {
      if (validator.validateEmail(this.registerForm.email) && validator.validatePassword(this.registerForm.password) && this.registerForm.password === this.registerForm.passwordConfirmation && validator.validateName(this.registerForm.firstname) && validator.validateName(this.registerForm.lastname)) {
        this.registerFormSubmitDisabled = false
        return true
      } else {
        this.registerFormSubmitDisabled = true
        return false
      }
    },
    validateLoginSubmit () {
      if (this.validateLoginFields()) {
        this.submitLoginForm()
      }
    },
    validateRegisterSubmit () {
      if (this.validateRegisterFields()) {
        this.submitRegisterForm()
      }
    },
    closeModal () {
      this.$emit("modal:close")
    },
    /*
     * Submit the login form.
     * Enable the 'processing' modal while the API responds.
     */
    submitLoginForm () {
      if (!this.loginFormSubmitDisabled) {
        this.loginFormSubmitDisabled = true
        this.userDialogModal = true
        this.userDialogSpinner = true
        this.userDialogMessage = ""
        return this.$store.dispatch("AUTHENTICATE_USER", {
          email: this.loginForm.email,
          password: this.loginForm.password
        })
          .then(data => {
            if (data) {
              this.$emit("logged:in")
              this.closeModal()
            } else {
              this.errorMessage = "Wrong password or email does not exist"
              this.userDialogModal = false
            }
          })
          .catch(err => {
            console.log("error: ", err)
          })
      }
    },
    /*
     * Submit the register form.
     * Enable the 'processing' modal while the API responds.
     */
    submitRegisterForm () {
      if (!this.registerFormSubmitDisabled) {
        this.registerFormSubmitDisabled = true
        this.userDialogModal = true
        this.userDialogSpinner = true
        this.userDialogMessage = ""
        return this.$store.dispatch("AUTHENTICATE_USER", {
          lastname: this.registerForm.lastname,
          firstname: this.registerForm.firstname,
          email: this.registerForm.email,
          password: this.registerForm.password,
          passwordConfirmation: this.registerForm.passwordConfirmation
        })
          .then(data => {
            if (data) {
              this.$emit("logged:in")
              this.closeModal()
            } else {
              this.errorMessage = "Wrong password or email does not exist"
              this.userDialogModal = false
            }
          })
          .catch(err => {
            console.log("error: ", err)
          })
      }
    }
  }
}
</script>

<style scoped lang="scss">
.is-centered {
  text-align: center;
}
.email-input-wrapper {
  margin-bottom: 12px !important;
}
.form-submit-wrapper {
  padding: 20px 30px;
}
</style>
