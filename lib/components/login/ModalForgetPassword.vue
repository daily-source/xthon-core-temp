<template>
  <Modal
    :prevent-body-scroll="false"
    :state="childState"
    :enable-esc="true"
    v-on:modal:close="closeModals()"
    v-on:modal:open="childState = true"
  >
    <div slot="trigger"><a>Forgot password?</a></div>
    <div slot="header">Password Recovery</div>
    <div slot="content">
      <UserDialog
        :spinner="userDialogSpinner"
        :state="userDialogModal"
        :disable-close= "userDialogSpinner"
        v-on:modal:close="closeModals()"
      >
        <div slot="header">Processing...</div> 
        <div slot="content"><p>{{userDialogMessage}}</p></div> 
      </UserDialog>

      <form @keyup.enter="validateSubmit()">
        <div v-if="!this.showEmailInput">
          <p class="is-centered">We are going to send you a temporary password to the email address you entered. Please use that password to log in.</p>
        </div>
        <div v-if="this.showEmailInput">
          <p class="is-centered">Please enter your email below. We are going to send you a temporary password to that email address. Please use that password to log in.</p>
          <InputEmail
            label="Email"
            :required="true"
            :key="email"
            v-on:input:valid="validEmailInput = true"
            v-on:input:invalid="validEmailInput = false"
            v-on:input:email="emailInput = $event"
          ></InputEmail>
        </div>
        <div class="is-centered forgot-password-cta" @click.prevent="requestPassword()">
          <button type="submit" class="button is-centered is-large is-warning" :disabled="submitButtonDisabled">Request new password</button>
        </div>
      </form>
    </div>
  </Modal>
</template>

<script>
import Modal from "Components/general/Modal.vue"
import * as validator from "../../util/validator.js"

export default {
  props: ["email"],
  components: {
    UserDialog: () => import("Components/general/UserDialog.vue"),
    InputEmail: () => import("Components/input/InputEmail.vue"),
    Modal
  },
  computed: {
    /*
     * Show the email input only if the previously entered email is not valid.
     */
    showEmailInput () {
      if (validator.validateEmail(this.email)) {
        return false
      } else {
        return true
      }
    },
    submitButtonDisabled () {
      if (this.validEmailInput || !this.showEmailInput) {
        return false
      }
      return true
    }
  },
  data () {
    return {
      userDialogSpinner: false,
      userDialogModal: false,
      userDialogDisableClose: false,
      userDialogMessage: "",
      childState: false,
      emailInput: "",
      validEmailInput: false
    }
  },
  methods: {
    closeModals () {
      this.childState = false
      this.userDialogModal = false
    },
    validateSubmit () {
      if (!this.submitButtonDisabled) {
        this.requestPassword()
      }
    },
    /*
     * Request a password reset.
     * Use a temporary dialog window while the API call is performed.
     * Display the answer in the dialog box.
     */
    requestPassword () {
      this.userDialogSpinner = true
      this.userDialogModal = true
      this.userDialogMessage = ""
      return this.$store.dispatch("SET_TEMPORARY_PASSWORD", { email: this.emailInput })
        .then(() => {
          this.userDialogMessage = "Your password has been reset. Please check your email."
          this.userDialogSpinner = false
        })
        .catch(err => {
          this.userDialogMessage = "There has been an error. Please try again later."
          this.userDialogSpinner = false
          console.log(err)
        })
    }
  }
}
</script>

<style scoped lang="scss">
.forgot-password-cta {
  margin: 20px auto;
  text-align: center;
}
p.is-centered {
  text-align: center;
  margin-bottom: 30px;
}
</style>