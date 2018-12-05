<template>
  <div>
    <Modal
      size="medium"
      :prevent-body-scroll="false"
      :state="state"
      v-on:modal:close="closeModal()"
      v-on:modal:open="closeModal()"
    >
      <div slot="header"><slot name="heading">Claim this nonprofit</slot></div>
      <div slot="content">
        <slot name="intro"></slot>
        <UserDialog
          :spinner="userDialogSpinner"
          :state="userDialogModal"
          :disable-close= "userDialogDisableClose"
        >
          <div slot="header">Processing</div> 
          <div slot="content"><p>{{userDialogMessage}}</p></div> 
        </UserDialog>
        <div class="">
          <p class="is-centered">To manage this nonprofit, please complete this form. Once approved, this nonprofit will appear in your account and you will be able to manage it.</p>
          <form v-on:keyup.enter="validateLoginSubmit()">
            {temporary form}
            <div class="columns is-centered">
              <div class="form-submit-wrapper" @click.prevent="validateLoginSubmit()">
                <button class="button is-large is-warning"
                  :disabled="loginFormSubmitDisabled"
                >Submit</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
import Modal from "Components/general/Modal.vue"

export default {
  props: [ "state" ],
  components: {
    Modal,
    UserDialog: () => import("Components/general/UserDialog.vue"),
    UserManagementLinks: () => import("Components/login/UserManagementLinks.vue")
  },
  data () {
    return {
      userDialogSpinner: true,
      userDialogModal: false,
      userDialogMessage: "",
      userDialogDisableClose: true,
      loginForm: {},
      registerForm: {},
      loginFormSubmitDisabled: true,
      registerFormSubmitDisabled: true,
      showingLoginModal: false,
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
    userName () {
      return this.$store.state.user.fullname
    }
  },
  methods: {
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
.email-input-wrapper {
  margin-bottom: 12px !important;
}
.form-submit-wrapper {
  padding: 20px 30px;
}
</style>
