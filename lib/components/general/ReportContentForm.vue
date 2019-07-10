<template>
  <div>
    <UserDialog
      :not-centered="true"
      :spinner="userDialogSpinner"
      :state="state"
      :disable-close= "userDialogSpinner"
      v-on:modal:close="closeLoginModal()"
    >
      <div slot="header">
      </div> 
      <div slot="content">
        <div v-if="sending">
          <div class="centered">
            <h2 class="centered">{{userDialogHeading}}</h2>
            <p>{{userDialogMessage}}</p>
          </div>
        </div>
        <div v-if="!sending">
          <h2 class="centered">Report a {{entity}}</h2>
          <form>
            <div v-if="loggedIn" :class="{'login-highlight': loggedIn}">
              <p>Why are you reporting this {{entity}}?</p>
              <p>
                <label class="radio">
                  <input type="radio" name="reason" v-model="form.reason" value="offensive">
                  It is offensive
                </label>
              </p>
              <p>
                <label class="radio">
                  <input type="radio" name="reason" v-model="form.reason" value="inappropriate">
                  It is inappropriate
                </label>
              </p>
              <p>
                <label class="radio">
                  <input type="radio" name="reason" v-model="form.reason" value="spam">
                  It is spam
                </label>
              </p>

              <transition name="fade">
                <div v-if="form.reason === 'offensive' || form.reason === 'inappropriate'">
                  <p>How is this {{entity}} {{form.reason}}?</p>
                  <textarea class="textarea" type="text" name="notes" v-model="form.notes" rows="3" cols="75">
                  </textarea>
                </div>
              </transition>

              <button
                class="button is-success"
                @click.prevent="sendReportCommentForm()"
                :disabled="disableSubmit"
              >Report {{entity}}</button>
            </div>
            <div v-else>
              <p class="centered">You need to log in before you are able to report this {{entity}}.</p>
              <LogInModalAuth0
                :register="false"
              >
                <div slot="trigger" class="centered">
                  <span class="button is-success is-rounded">Log in</span>
                </div>
              </LogInModalAuth0>
            </div>
          </form>
        </div>
      </div> 
    </UserDialog>
  </div>
</template>

<script>
import LogInModal from "Components/general/LogInModal.vue"
import RegisterOrLoginModal from "Components/general/RegisterOrLoginModal.vue"
import LogInModalAuth0 from "Components/general/LogInModalAuth0.vue"

export default {
  props: [ "commentId", "state" ],
  components: {
    LogInModalAuth0,
    UserDialog: () => import("Components/general/UserDialog.vue")
  },
  data () {
    return {
      form: {},
      error: null,
      disableSubmit: true,
      userDialogSpinner: false,
      userDialogHeading: '',
      userDialogMessage: '',
      spinner: false,
      sending: false
    }
  },
  computed: {
    loggedIn () {
      return this.$store.state.user.loggedIn
    },
    entity () {
      return this.commentId ? 'comment' : this.$route.name
    }
  },
  methods: {
    closeLoginModal () {
      this.error = false
      this.sending = false
      this.userDialogMessage = ''
      this.userDialogHeading = ''
      this.form = {}
      this.$emit('close:modal')
    },
    sendReportCommentForm () {
      this.error = null
      this.userDialogHeading = 'Processing'
      this.spinner = true
      this.sending = true
      return this.$store.dispatch("REPORT_CONTENT", {
        entity: this.entity,
        contentId: this.commentId ? this.commentId : this.$route.params.ein || this.$route.params.id,
        report: this.form,
        token: this.$store.state.user.tokenData.accessToken
      })
        .then(data => {
          this.userDialogHeading = 'Sent'
          this.userDialogMessage = 'The report has been filed. You can close this dialog box.'
          this.spinner = false
          setTimeout(() => {
            this.$emit('close')
          }, 3000)
        })
        .catch(err => {
          this.error = true
          this.userDialogHeading = 'Error'
          this.userDialogMessage = `The report couldn't be sent. ${err}`
          this.spinner = false
        })
    }
  },
  watch: {
    "form.reason": function (newVal) {
      if (newVal) {
        this.disableSubmit = false
      }
    },
    state: function (newVal) {
      this.error = null
    }
  }
}
</script>

<style scoped lang="scss">
.radio {
  margin-left: 20px;
}
.textarea {
  margin-bottom: 40px;
}
.centered {
  text-align: center;
}
</style>
