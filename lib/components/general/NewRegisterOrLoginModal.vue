<template>
  <div>
    <Modal
      :prevent-body-scroll="true"
      :state="state"
      v-on:modal:close="closeModal()"
      v-on:modal:open="closeModal()"
    >
      <div slot="header"><slot name="heading">Please Log in or Register</slot></div>
      <div slot="content">
        <slot name="intro"></slot>
        <div class="is-centered">
          <button class="button is-warning padded" @click="triggerExternalLogin">Log in</button>        
          <button class="button is-success padded" @click="triggerExternalLogin">Sign up</button>        
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
import Modal from "Components/general/Modal.vue"
import SocialLogin from "Components/login/SocialLogin.vue"
import LogInModalAuth0 from "Components/general/LogInModalAuth0.vue"

export default {
  props: [ "state" ],
  components: {
    SocialLogin,
    Modal,
    LogInModalAuth0
  },
  data () {
    return {
    }
  },
  computed: {
    loggedIn () {
      return this.$store.state.user.loggedIn
    },
    userName () {
      return this.$store.state.user.data.firstName
    }
  },
  methods: {
    triggerExternalLogin () {
      // let expiresAt = JSON.stringify(expiresIn * 1000 + new Date().getTime())
      console.log("this.$route", this.$route.fullPath)
      localStorage.setItem("redirect_to_url", this.$route.fullPath)
      this.$auth.login()
    },
    closeModal () {
      this.$emit("modal:close")
    }
  }
}
</script>

<style scoped lang="scss">
.is-centered {
  text-align: center;
}
.padded {
  margin: 10px;
}
</style>
