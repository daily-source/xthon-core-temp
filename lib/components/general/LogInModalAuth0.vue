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
          <p v-if="loggedIn">You are logged in as {{user.auth0.name}}</p>
          <UserManagementLinks
            v-if="loggedIn"
            layout="header"
            v-on:goto:account="closeLoginBox()"
          ></UserManagementLinks>
          <div @click="logUserOut()" v-if="loggedIn"><a>Log Out »</a></div>
        </div>
        <transition name="slide-fade" mode="out-in">
          <div v-if="!loggedIn">

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
        <span @click="triggerExternalLogin()">
          <a>Login</a>
        </span>
        |
        <span @click="triggerExternalSignup()">
          <a>Register</a>
        </span>
      </div>
      <div @click="openLoginBox()" v-if="loggedIn">
        <slot name="logged"><a>Hi, {{givenName}}! »</a></slot>
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

import Vue from "vue"

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
      return this.$store.state.user.auth0.nickname
    },
    user () {
      return this.$store.state.user
    },
    givenName () {
      return this.$store.state.user.auth0.given_name || this.$store.state.user.auth0["https://maximumgood.org_user_metadata"].firstname || this.$store.state.user.auth0.nickname
    }
  },
  methods: {
    triggerExternalLogin () {
      localStorage.setItem("redirect_to_url", this.$route.fullPath)
      this.$auth.login()
    },
    triggerExternalSignup () {
      localStorage.setItem("redirect_to_url", this.$route.fullPath)
      this.$auth.signup()
    },

    // old methods
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
      this.$auth.logout()
      this.$store.commit("LOG_OFF", { status: false })
      this.closeLoginBox()
    },
    loginOrRegister () {
      if (this.register) {
        this.closeLoginBox()
      } else {
        this.logUserIn()
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
