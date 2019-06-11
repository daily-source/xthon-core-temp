<template>
  <div>
    <Modal
      size="medium"
      :prevent-body-scroll="false"
      :state="state"
      :disable-close= "false"
      v-on:modal:close="closeLoginModal()"
    >
      <div slot="content">
        <h2 class="centered">Report a comment</h2>
        <form>
          <div v-if="loggedIn" :class="{'login-highlight': loggedIn}">
            <p>Why are you reporting this comment?</p>
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
                <p>How is this comment {{form.reason}}?</p>
                <textarea class="textarea" type="text" name="notes" v-model="form.notes" rows="3" cols="75">
                </textarea>
              </div>
            </transition>

            <button
              class="button is-success"
              @click.prevent="sendReportCommentForm()"
              :disabled="disableSubmit"
            >Report comment</button>
          </div>
          <div v-else>
            <p class="centered">You need to log in before you are able to report a comment.</p>
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
    </Modal>
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
    Modal: () => import("Components/general/Modal.vue")
  },
  data () {
    return {
      form: {},
      disableSubmit: true
    }
  },
  computed: {
    loggedIn () {
      return this.$store.state.user.loggedIn
    }
  },
  methods: {
    closeLoginModal () {
      this.$emit('close:modal')
    },
    sendReportCommentForm () {
      return this.$store.dispatch("REPORT_COMMENT", {
        commentId: this.form.commentId,
        userId: this.$store.state.user.auth0.sub,
        token: this.$store.state.user.tokenData.accessToken
      })
        .then(data => {
          this.$emit('close')
          console.log('comment was reported', data)
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  watch: {
    "form.reason": function (newVal) {
      if (newVal) {
        this.disableSubmit = false
      }
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
