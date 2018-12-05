<template>
  <div>
    <h1 class="modal-title">Thank you for donating</h1>
    <form>
      <div v-if="loggedIn">
        <p>We sent you a receipt. You can also access your donation in the future via <a>My Account.</a></p>
        <ul>
          <li>{ Return to Susan's fundraser }</li>
          <li>{ Create your own fundraiser fundraser }</li>
          <li>{ Donate to support us }</li>
        </ul>
      </div>
      <div v-if="emailFound && !loggedIn">
        <p>We sent you a receipt. Your email matches an existing account. Enter your password to add this donation to your account. Doing that will also display your profile photo next to your donation and comment on <span v-if="parent === 'fundraiser' && fundraiser.participant">{{fundraiser.participant.name}}</span><span v-if="parent === 'nonprofit'">{{nonprofit.NAME}}</span>'s fundraiser page.</p>
      </div>
      <div v-if="!emailFound && !loggedIn">
        <p>We emailed you a receipt. To have your photo show next to your donation on <span v-if="parent === 'fundraiser' && fundraiser.participant">{{fundraiser.participant.name}}</span><span v-if="parent === 'nonprofit'">{{nonprofit.NAME}}</span>'s page of donations, receive access to all our websites and enjoy a host of features, create a free account with us via one of these services:</p>
        <LogInModal layout="social-signup"></LogInModal>
        <p>Or add a password to create an account here:</p>
      </div>
      <div v-if="!loggedIn">
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

        <div class="form-submit-wrapper" @click.prevent="submitPassword()">
          <button class="button is-large is-danger"
            :disabled="submitButtonDisabled"
          >Submit</button>
          <span class="small-text">By clicking Submit, you agree to the <a>Terms and Conditions</a>.</span>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import Icons from "Components/general/Icons.vue"
import LogInModal from "Components/general/LogInModal.vue"
import InputPassword from "Components/input/InputPassword.vue"
import * as validator from "../../util/validator.js"

export default {
  props: [ "parent", "fundraiser", "nonprofit" ],
  data () {
    return {
      form: {},
      emailFound: false,
      submitButtonDisabled: false
    }
  },
  components: {
    Icons,
    InputPassword,
    LogInModal
  },
  computed: {
    email () {
      return this.$store.state.userActions.donation.email
    },
    loggedIn () {
      return this.$store.state.user.loggedIn
    }
  },
  methods: {
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
      return this.$store.dispatch("CREATE_USER", {
        email: this.email,
        password: this.form.password
      })
        .then(data => {
          this.$emit("success", { data: data })
        })
        .catch(err => {
          this.$emit("err", { err })
          console.log(err)
        })
    }
  },
  mounted () {
    // get a response on whether the email has been already used
    return this.$store.dispatch("LOOK_UP_EMAIL", {
      email: this.email
    })
      .then(data => {
        if (data) {
          this.emailFound = true
        } else {
          this.emailFound = false
        }
      })
      .catch(err => {
        console.log("error: ", err)
      })
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

      @include breakpoint($tablet) {
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
</style>