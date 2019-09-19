<template>
  <div>
    <div class="modal" :class="{'is-active': modalActive}" v-on:keyup.enter="validateSubmit()">
      <div class="modal-background"></div>
      <div class="modal-content donate-view donate-view__wrapper inner-close small-modal">
        <h1 class="modal-title">You are about to donate</h1>
        <div>
          <div v-if="emailFound && !socialLogin">
            <p>
              The email {{email}} is already in use with an existing account. To save a payment method or make a recurring donation, you must either enter the password for the existing account:              
            </p>
            <InputPassword
              label="Password"
              :required="true"
              :duplicate="false"
              :provide-feedback="false"
              :error-message="errorMessage"
              v-on:input:valid="validateAllFields()"
              v-on:input:invalid="validateAllFields()"
              v-on:input:password="form.password = $event; errorMessage = ''"
            ></InputPassword>
            <div class="columns form-column__wrapper form-column__extra-padded input-line password-input-wrapper">
              <div class="column is-6 form-column__label-column input-label"></div>
              <div class="column is-6 form-column__input-column">
                <ModalForgetPassword></ModalForgetPassword>
              </div>
            </div>
          </div>
          <div v-if="emailFound && socialLogin">
            <p>
              The email {{email}} is already in use with an existing account. To save a payment method or make a recurring donation, you must either log in using the service you used to create your account:
            </p>
            <LogInModal layout="social-signup" :show-only="socialLogin"></LogInModal>
          </div>
          <div v-if="!emailFound">
            <p>To save the payment method or make a recurring donation, you must create a free account. Do this by either entering a password:</p>
            <InputPassword
              label="Password"
              :required="true"
              :duplicate="true"
              :provide-feedback="true"
              v-on:input:valid="validateAllFields()"
              v-on:input:invalid="validateAllFields()"
              v-on:input:password="form.password = $event; errorMessage = ''"
              v-on:input:passwordConfirmation="form.passwordConfirmation = $event; errorMessage = ''"
            ></InputPassword>
          </div>
          <div class="columns is-centered padded-more" v-if="!emailFound">
            Your username will be the email you already entered. You can change it later.
          </div>
        </div>
        <div v-if="!socialLogin">
          <div class="form-submit-wrapper" @click.prevent="submitPassword()">
            <button class="button is-large is-danger"
              :disabled="submitButtonDisabled"
            >Submit</button>
          </div>
        </div>
        <div v-if="!emailFound">
          <p>Or sign up using a service: </p>
          <LogInModal layout="social-signup"></LogInModal>          
        </div>
        <div class="columns is-centered padded-more" v-if="!emailFound || emailFound && socialLogin">
          <span v-if="emailFound">
            (After you log in, your donation will go through)          
          </span>
          <span v-if="!emailFound">
            (After you sign up, your donation will go through)          
          </span>
        </div>
        <p>Or click <a @click="closeModal()">here</a> to return to the previous screen and deselect the option for <strong>saving the payment method</strong> or <strong>making a recurring donation</strong>, in which case no account is needed. </p>
        <button class="modal-close is-large" aria-label="close" @click.prevent="closeModal()"></button>
      </div>
    </div>
  </div>
</template>

<script>
import Icons from "Components/general/Icons.vue"
import InputPassword from "Components/input/InputPassword.vue"
import LogInModal from "Components/general/LogInModal.vue"
import ModalForgetPassword from "Components/login/ModalForgetPassword.vue"
import Modal from "Components/general/Modal.vue"
import * as validator from "../../util/validator.js"

export default {
  props: [ "parent", "fundraiser", "nonprofit", "modalActive", "email", "donation" ],
  data () {
    return {
      errorMessage: "",
      form: {},
      emailFound: false,
      socialLogin: null,
      submitButtonDisabled: true,
      authorized: false
    }
  },
  components: {
    Icons,
    InputPassword,
    LogInModal,
    Modal,
    ModalForgetPassword
  },
  methods: {
    closeModal () {
      this.$emit("close:modal")
    },
    validateSubmit () {
      this.validateAllFields()
      if (!this.submitButtonDisabled) {
        this.submitPassword()
      }
    },
    validateAllFields () {
      const validPass = validator.validatePassword(this.form.password)
      const validPassConf = validPass && this.form.password === this.form.passwordConfirmation
      if (validPass && validPassConf || validPass && this.emailFound) { // eslint-disable-line no-mixed-operators
        this.submitButtonDisabled = false
      } else {
        this.submitButtonDisabled = true
      }
    },
    submitPassword () {
      this.submitButtonDisabled = true
      this.authorized = true
      if (this.emailFound) {
        this.$store.dispatch("AUTHENTICATE_USER", {
          email: this.email,
          password: this.form.password,
          firstname: this.firstname
        })
          .then((data) => {
            if (data) {
              this.$emit("success")
            } else {
              this.submitButtonDisabled = false
              this.errorMessage = "Wrong password"
            }
          })
          .catch(err => {
            this.$emit("error")
            console.log("error: ", err)
          })
      } else {
        this.$store.dispatch("CREATE_USER", {
          email: this.email,
          password: this.form.password,
          firstname: this.donation.firstname,
          lastname: this.donation.lastname
        })
          .then((data) => {
            this.$emit("success")
          })
          .catch(err => {
            this.$emit("error")
            console.log("error: ", err)
          })
      }
    }
  },
  watch: {
    // get a response on whether the email has been already used
    // perform the lookup only if the modal is showing
    modalActive () {
      return this.$store.dispatch("LOOK_UP_EMAIL", {
        email: this.email
      })
        .then(data => {
          if (data) {
            this.emailFound = true
            this.socialLogin = data.social_login
          } else {
            this.emailFound = false
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style scoped lang="scss">
.form-submit-wrapper {
  margin: 20px auto;
  text-align: center;
}

p {
  margin-bottom: 30px;
}
.donate-view {
  .page-title {
    text-align: center;
    color: $color-text;
    font-weight: bold;
    &__first {
      display: block;
      font-weight: bold;
      font-size: 30px;
      margin-bottom: 10px;

      @include tablet {
        margin-bottom: 0;
      }
    }
    &__second {
      color: $color-emphasis-alt;      
    }
  }
}

.parent__nonprofit {
  .page-title {
    &__first {
      font-weight: normal;
      font-size: 26px;
    }
  }
}
.padded-more {
  padding: 15px 0;
}
</style>