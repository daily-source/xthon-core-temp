<template>
  <div class="comment-reply__wrapper">
    <RegisterOrLoginModal
      layout="comment"
      :state="showLoginModal"
      v-on:logged:in="closeLoginModal()"
      v-on:modal:close="closeLoginModal()"
    >
      <div slot="heading">You're almost there</div>
      <div slot="intro">
        <p class="is-centered">To display your comment, you need to sign up for a free account or log in if you have already one.</p>
      </div>
    </RegisterOrLoginModal>
    <form>
      <!--
        If not logged in, provide the login link
        If user doesn't want to log in, then use name/comment combo (avatar???)
        
      -->
      <p v-if="loggedIn" :class="{'login-highlight': loggedIn}">
        Commenting as <span class="highlight" v-html="userNickname || user.firstName"></span>.
        <a>
          <LogInModal>
            <h2 slot="trigger"><a>Not you?</a></h2>
          </LogInModal>
        </a>
      </p>

      <div class="control columns is-gapless">
        <div class="column is-8">
          <textarea class="textarea" type="text" name="comment" v-model="commentBody" rows="5" cols="75">
          </textarea>
        </div>
        <div class="column">
          <button class="button is-success" @click.prevent="validateAndSend()">Add comment</button>
        </div>
      </div>
      <input type="hidden" name="in_reply_to" :value="inReplyTo" />
      <input ref="faxthis" type="checkbox" name="contact_us_by_fax_only" v-model="fax" autocomplete="off">
    </form>
  </div>
</template>

<script>
import LogInModal from "Components/general/LogInModal.vue"
import RegisterOrLoginModal from "Components/general/RegisterOrLoginModal.vue"

export default {
  props: [ "inReplyTo" ],
  components: {
    LogInModal,
    RegisterOrLoginModal
  },
  data () {
    return {
      commentBody: "",
      fax: 1,
      fullName: "",
      showLoginModal: false
    }
  },
  mounted () {
    this.$refs.faxthis.classList.add("indented")
  },
  computed: {
    loggedIn () {
      return this.$store.state.user.loggedIn
    },
    userNickname () {
      if (this.$store.state.user.data) {
        return this.$store.state.user.data.nickname
      } else {
        return null
      }
    },
    user () {
      return this.$store.state.user
    }
  },
  methods: {
    closeLoginModal () {
      this.showLoginModal = false
    },
    validateAndSend () {
      if (this.loggedIn) {
        this.sendForm()
      } else {
        this.showLoginModal = true
      }
    },
    sendForm () {
      return this.$store.dispatch("WRITE_COMMENT", {
        comment: this.commentBody,
        reply: this.inReplyTo,
        fundraiserId: this.$store.state.fundraiser.id,
        userId: this.$store.state.user.auth0.sub,
        contact_us_by_fax_only: this.fax,
        token: this.user.tokenData.accessToken
      })
        .then(data => {
          this.commentBody = ""
          this.$emit("comment:added")
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style scoped lang="scss">
.g-recaptcha {
  margin: 20px 0;
}

textarea {
  border: 1px solid $color-silver;
  border-radius: 2px;
  box-shadow: none;
  padding: 5px;
  font-size: 16px;
  width: 260px;

  @include tablet {
    width: 340px;
  }
}

.input-name {
  width: 200px;

  @include tablet {
    width: auto;
  }
}
.indented {
  opacity: 0;
  visibility: hidden;
  position: absolute;
  z-index: -12000;
}

.button {
  @include tablet {
    margin-left: 20px;
  }
}

.control {
  margin: 10px 0;
}

.login-highlight {
  display: inline;
  animation: fadeHighlight 7s ease-in-out;  
}

.highlight {
  font-weight: bold;
  font-style: italic;
}

</style>
