<template>
  <div>
    <Modal
      :prevent-body-scroll="false"
      :state="state"
      v-on:modal:close="$emit('modal:close')"
    >
      <div slot="trigger"><slot name="trigger"></slot></div>
      <div slot="header"><slot name="heading"></slot></div>
      <div slot="content">
        <UserDialog
          class="user-dialog-password-change"
          :spinner="userDialogSpinner"
          :state="userDialogModal"
          :disable-close= "userDialogSpinner"
          v-on:modal:close="closeModals()"
        >
          <div slot="header">Processing...</div> 
          <div slot="content"><p>{{userDialogMessage}}</p></div> 
        </UserDialog>
        <form @keyup.enter="validateSubmit()">
          <InputPassword
            label="New password"
            :require-current-password="true"
            :required="true"
            :duplicate="true"
            :provide-feedback="true"
            v-on:input:valid="submitButtonDisabled = false"
            v-on:input:invalid="submitButtonDisabled = true"
            v-on:input:currentPassword="form.currentPassword = $event"
            v-on:input:password="form.password = $event"
            v-on:input:passwordConfirmation="form.passwordConfirmation = $event"
          ></InputPassword>
          <div class="columns is-centered">
            <div class="form-submit-wrapper" @click.prevent="submitPasswordChangeRequest()">
              <button class="button is-large is-danger is-centered"
                :disabled="submitButtonDisabled"
              >Submit</button>
            </div>
          </div>
        </form>
      </div>
    </Modal>
  </div>
</template>

<script>
import Icons from "Components/general/Icons.vue"

export default {
  props: ["state"],
  data () {
    return {
      editing: false,
      fieldValue: this.value,
      errorMessage: "",
      blurTimeout: null,
      submitButtonDisabled: true,
      form: {},
      userDialogSpinner: false,
      userDialogModal: false,
      userDialogMessage: ""
    }
  },
  components: {
    InputPassword: () => import("Components/input/InputPassword.vue"),
    UserDialog: () => import("Components/general/UserDialog.vue"),
    Modal: () => import("Components/general/Modal.vue"),
    Icons
  },
  methods: {
    validateSubmit () {
      if (this.submitButtonDisabled) {
        return
      }
      this.submitPasswordChangeRequest()
    },
    closeModals () {
      this.userDialogModal = false
      this.$emit("modal:close")
    },
    /**
     * Submit a password change request.
     * TODO: this needs to take into account the social login option.
     */
    submitPasswordChangeRequest () {
      this.userDialogMessage = ""
      this.userDialogModal = true
      this.userDialogSpinner = true
      return this.$store.dispatch("SUBMIT_PASSWORD_CHANGE_REQUEST", { form: this.form })
        .then(() => {
          this.userDialogMessage = "Your password was changed successfully!"
          this.userDialogSpinner = false
        })
        .catch(err => {
          if (err.code === 401) {
            this.userDialogMessage = "Unauthorized. Your current password was incorrect."
          } else {
            this.userDialogMessage = "Error: " + err.message
          }
          this.userDialogSpinner = false
          console.log(err)
        })
    }
  }
}
</script>

<style scoped lang="scss">
.form-submit-wrapper {
  margin: 30px 0;
}
</style>