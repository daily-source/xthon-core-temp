<template>
  <div>
    <div
      class="modal"
      :class="{'is-active': showingLoginModal}"
      v-on:keyup.enter="validateSubmit()"
    >
      <div class="modal-background" @click="closeLoginBox()"></div>
      <div class="modal-content donate-view donate-view__wrapper inner-close small-modal">
        <h1 class="title-centered">
          <slot name="heading">
            <span v-if="loggedIn">Your account</span>
            <span v-if="!loggedIn && !register">Login</span>
            <span v-if="!loggedIn && register">Register</span>            
          </slot>
        </h1>
        <slot name="intro">
          <p class="is-centered" v-if="!loggedIn">Please log in with your email and password:</p>
        </slot>
        <div class="centered">
          <p v-if="loggedIn">You are logged in as {{nickname || user.firstName}}</p>
          <UserManagementLinks
            v-if="loggedIn"
            layout="header"
            v-on:goto:account="closeLoginBox()"
          ></UserManagementLinks>
          <div @click="logUserOut()" v-if="loggedIn"><a>Log Out »</a></div>
        </div>
        <transition name="slide-fade" mode="out-in">
          <div v-if="!loggedIn">
            <form v-on:keyup.enter="validateSubmit()">
              <InputName
                label="Email (for the receipt):"
                :required="true"
                v-if="requireName"
                v-on:input:valid="validateAllFields()"
                v-on:input:invalid="validateAllFields()"
                v-on:input:first="form.firstname = $event; errorMessage = ''"
                v-on:input:last="form.lastname = $event; errorMessage = ''"
              ></InputName>
              <InputEmail
                label="Email"
                :required="true"
                v-on:input:valid="validateAllFields()"
                v-on:input:invalid="validateAllFields()"
                v-on:input:email="setEmail($event)"
              ></InputEmail>
              <InputPassword
                label="Password"
                :required="true"
                :duplicate="register"
                :provide-feedback="register"
                :error-message="errorMessage"
                v-on:input:valid="validateAllFields()"
                v-on:input:invalid="validateAllFields()"
                v-on:input:password="form.password = $event; errorMessage = ''"
                v-on:input:passwordConfirmation="form.passwordConfirmation = $event; errorMessage = ''"
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
              <div class="form-submit-wrapper" @click.prevent="loginOrRegister()">
                <button class="button is-large is-danger"
                  :disabled="submitButtonDisabled"
                >Submit</button>
              </div>
            </div>
            <SocialLogin>
              <div slot="header" class="social-login-wrapper columns is-centered">
                <p class="is-centered">Or with one of the following services:</p>
              </div>
            </SocialLogin>
          </div>
        </transition>
        <button class="modal-close is-large" aria-label="close" @click.prevent="closeLoginBox()"></button>
      </div>
    </div>
    <div v-if="layout === 'social-signup'">
      <SocialLogin :show-only="showOnly"></SocialLogin>
    </div>
    <div v-if="layout === 'app-header'">
      <div v-if="!loggedIn">
        <span @click="openLoginBox()">
          <a>Login</a>
        </span>
        |
        <span @click="openLoginBox()">
          <a>Register</a>
        </span>
      </div>
      <div @click="openLoginBox()" v-if="loggedIn">
        <slot name="logged"><a>{{nickname || user.firstName}} »</a></slot>
      </div>
    </div>
    <div v-if="!layout">
      <div class="trigger" v-if="!loggedIn">
        <span @click="openLoginBox()">
          <slot name="trigger"></slot>
        </span>
      </div>
      <slot name="intro"></slot>
    </div>
  </div>
</template>

<script>
import Icons from "Components/general/Icons.vue"
import ModalForgetPassword from "Components/login/ModalForgetPassword.vue"
import InputEmail from "Components/input/InputEmail.vue"
import InputName from "Components/input/InputName.vue"
import InputPassword from "Components/input/InputPassword.vue"
import SocialLogin from "Components/login/SocialLogin.vue"
import * as validator from "../../util/validator.js"

export default {
  props: [ "layout", "login", "signup", "showOnly", "display", "requireName", "register" ],
  components: {
    Icons,
    InputEmail,
    InputName,
    InputPassword,
    ModalForgetPassword,
    SocialLogin,
    UserManagementLinks: () => import("Components/login/UserManagementLinks.vue")
  },
  data () {
    return {
      showingLoginModal: this.display || false,
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
    nickname () {
      return this.$store.state.user.nickname
    },
    user () {
      return this.$store.state.user
    }
  },
  methods: {
    setEmail (event) {
      this.form.email = event
      this.forgetPasswordEmail = event
    },
    openLoginBox () {
      this.showingLoginModal = true
    },
    closeLoginBox () {
      this.showingLoginModal = false
      clearTimeout(this.timeout)
      this.$emit("modal:close")
    },
    logUserOut () {
      this.$store.commit("LOG_OFF", { status: false })
      this.closeLoginBox()
    },
    validateSubmit () {
      if (!this.submitButtonDisabled) {
        this.logUserIn()
      }
    },
    loginOrRegister () {
      if (this.register) {
        this.closeLoginBox()
      } else {
        this.logUserIn()
      }
    },
    validateAllFields () {
      const validName = validator.validateName(this.form.firstname) && validator.validateName(this.form.lastname)
      const validPass = validator.validatePassword(this.form.password) && !this.register || validator.validatePassword(this.form.password) && this.form.password === this.form.passwordConfirmation
      if (validPass && validator.validateEmail(this.form.email) && (validName && this.requireName || !this.requireName)) {
        this.submitButtonDisabled = false
      } else {
        this.submitButtonDisabled = true
      }
    },
    logUserIn () {
      if (!this.submitButtonDisabled) {
        this.submitButtonDisabled = true
        return this.$store.dispatch("AUTHENTICATE_USER", {
          email: this.form.email,
          password: this.form.password
        })
          .then(data => {
            if (data) {
              // provide some feedback
              this.welcomeMessage = `You are logged in, ${this.nickname}`
              this.$emit("modal:logged")
              this.timeout = setTimeout(() => {
                this.showingLoginModal = false
              }, 6000)
            } else {
              this.validateAllFields()
              this.errorMessage = "Wrong password or email does not exist"
            }
          })
          .catch(err => {
            console.log("error: ", err)
          })
      }
    }
  },
  watch: {
    display: function (value) {
      if (value) {
        this.showingLoginModal = value
      }
    }
  }
}
</script>

<style scoped lang="scss">
.trigger {
  &:hover {
    cursor: pointer;
  }
}
.billing-info {
  .trigger {
    text-decoration: underline;
    color: $color-emphasis-alt;
    &:hover {
      color: $color-gray;
    }
  }
}

ul {
  margin-left: 30px;
  font-size: 20px;
}

li {
  list-style-type: disc;
}

.form-submit-wrapper {
  text-align: center;
  margin: 20px 0;

  @include mobile {
    margin: 30px 0;
  }
}
.social-login-wrapper {
  margin: 30px 0;
}
.input-line {
  margin-bottom: 15px !important;
}
.centered {
  text-align: center;
}
</style>
