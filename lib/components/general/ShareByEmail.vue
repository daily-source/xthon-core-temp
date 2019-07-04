<template>
  <div class="sharing-icons-row__wrapper">
    <Modal
      class="donate-error-modal"
      :prevent-body-scroll="false"
      :state="state"
      v-on:modal:close="dismiss()"
    >
      <div slot="header">
        <span v-if="!loggedIn">You need to be logged in</span>
        <span v-if="loggedIn">Share this with a friend</span>
      </div>
      <div slot="content">
        <div v-if="!loggedIn">
          <p>In order to share this page to a friend by email, you need to be logged in. We will include your first and last name with the email.</p>
          <p class="is-centered dismiss-cta" @click="logIn()">
            <span class="button is-centered is-large is-warning">Log in</span>
          </p>
        </div>
        <div v-if="loggedIn">
          <div class="columns form-column__wrapper form-column__extra-padded input-line is-multiline">
            <div class="column is-5 form-column__label-column input-label">
              <label :for="`input-name-first_${_uid}`" class="label">Friend's name:</label>
            </div>
            <div class="column is-5 form-column__input-column">
              <div class="control input-wrapper">
                <Icons icon="user" class="input-icon" iconwidth="20px" iconheight="20px" color="#999"></Icons>
                <input class="input"
                  type="text"
                  placeholder=""
                  :required="true"
                  v-model="form.firstname"
                  autocomplete="given-name"
                  :id="`input-name-first_${_uid}`"
                  v-on:input="$emit('input:first', $event.target.value)"
                />
              </div>
            </div>
            <div class="column is-5 is-offset-5" v-if="firstnameErrorMessage">
              <span class="error-message">{{firstnameErrorMessage}}</span>
            </div>
          </div>
          <div class="columns form-column__wrapper form-column__extra-padded input-line is-multiline">
            <div class="column is-5 form-column__label-column input-label">
              <label :for="`input-email_${_uid}`" class="label">Friend's email:</label>
            </div>
            <div class="column is-5 form-column__input-column">
              <div class="control input-wrapper">
                <Icons icon="email" class="input-icon" iconwidth="20px" iconheight="20px" color="#999"></Icons>
                <input class="input"
                  placeholder=""
                  :required="true"
                  v-model="form.email"
                  type="email"
                  autocomplete="email"
                  :id="`input-email_${_uid}`"
                  v-on:input="$emit('input:first', $event.target.value)"
                />
              </div>
            </div>
            <div class="column is-5 is-offset-5" v-if="emailErrorMessage">
              <span class="error-message">{{emailErrorMessage}}</span>
            </div>
          </div>

          <p class="is-centered dismiss-cta" @click="share()">
            <button class="button is-centered is-large is-danger" :disabled="!validateAllFields()">Share</button>
          </p>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
import * as validator from "../../util/validator.js"
import Icons from "Components/general/Icons.vue"

export default {
  props: [ "state" ],

  data () {
    return {
      form: {},
      firstnameErrorMessage: '',
      emailErrorMessage: ''
    }
  },

  components: {
    Icons,
    Modal: () => import("Components/general/Modal.vue")
  },

  computed: {
    loggedIn () {
      return this.$store.state.user.loggedIn
    }
  },
  methods: {
    validateAllFields () {
      return this.validateEmail() && this.validateName()
    },
    validateEmail () {
      var validEmail = validator.validateEmail(this.form.email)
      if (!validEmail && this.form.email) {
        this.emailErrorMessage = "Enter a valid email"
      } else {
        this.emailErrorMessage = ""
      }
      return validEmail
    },
    validateName () {
      var validName = validator.validateName(this.form.firstname)
      if (!validName && this.form.firstname) {
        this.firstnameErrorMessage = "Enter a valid user name"
      } else {
        this.firstnameErrorMessage = ""
      }
      return validName
    },
    dismiss () {
      this.$emit('dismiss')
    },
    logIn () {
      localStorage.setItem("redirect_to_url", this.$route.fullPath)
      this.$auth.login()
    },
    share () {
      // This won't use the sharer utility but will hit the actions directly.
      var shareUrl = `${window.location.origin}${window.location.pathname}`
      this.$store.dispatch('SHARE_BY_EMAIL', {
        url: shareUrl,
        text: this.shareText,
        via: this.siteName,
        targetName: this.form.firstname,
        targetEmail: this.form.email,
        token: this.$store.state.user.tokenData.accessToken
      })
      .then(response => {
        console.log('success: ', response)
      })
      .catch(err => {
        console.log('error: ', err)
      })
    }
  },
  watch: {
    "form.firstname": function (newVal, oldVal) {
      this.validateAllFields()
    },
    "form.email": function (newVal, oldVal) {
      this.validateAllFields()
    }
  }
}
</script>

<style scoped lang="scss">
.is-centered {
  text-align: center;
  margin-top: 1em;
}
.error-message {
  color: red;
}
</style>

