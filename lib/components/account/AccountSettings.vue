<template>
  <div class="user-management-page__wrapper">
    <UserDialog
      :spinner="userDialogSpinner"
      :state="userDialogModal"
      :disable-close= "userDialogSpinner"
      v-on:modal:close="closeUserDialog()"
    >
      <div slot="header">{{userDialogHeading}}</div> 
      <div slot="content"><p>{{userDialogMessage}}</p></div> 
    </UserDialog>

    <h3>Settings</h3>

    <section class="account-section">
      <h4>Personal Data</h4>
      <EditableTextField
        label="Nickname:"
        ref="nickname"
        :value="userData.data.nickname"
        error-text="This field can't be empty"
        type="name"
        v-on:input:save="updateUserField('nickname', $event)"
        v-on:next:field="openEdition('firstName')"
      ></EditableTextField>
      <EditableTextField
        label="First name:"
        ref="firstName"
        :value="userData.data.firstName"
        error-text="This field can't be empty. Use no more than 140 chars."
        type="name"
        v-on:input:save="updateUserField('firstName', $event)"
        v-on:next:field="openEdition('lastName')"
        v-on:previous:field="openEdition('nickname')"
      ></EditableTextField>
      <EditableTextField
        label="Last name:"
        ref="lastName"
        :value="userData.data.lastName"
        error-text="This field can't be empty. Use no more than 140 chars."
        type="name"
        v-on:input:save="updateUserField('lastName', $event)"
        v-on:next:field="openEdition('location')"
        v-on:previous:field="openEdition('firstName')"
      ></EditableTextField>
      <EditableTextField
        label="Location:"
        ref="location"
        :value="userData.data.location"
        error-text="This field can't be empty. Use no more than 140 chars."
        type="name"
        v-on:input:save="updateUserField('location', $event)"
        v-on:next:field="openEdition('nickname')"
        v-on:previous:field="openEdition('lastName')"
      ></EditableTextField>
      <EditableTextField
        label="Email:"
        ref="email"
        :disabled-edition="true"
        :value="userData.auth0.email"
        error-text="Email is invalid"
        type="email"
        v-on:input:save="updateUserField('email', $event)"
        v-on:previous:field="openEdition('location')"
      ></EditableTextField>
      <EditableImageField
        label="Avatar:"
        :avatar="userData.data.avatar && userData.data.avatar.src ? userData.data.avatar.src : ''"
        error-text="Invalid image"
        type="avatar"
        v-on:input:save="updateAvatar($event)"
      ></EditableImageField>
    </section>

    <section class="account-section">
      <h4>Stored Payment Methods</h4>
      <div v-if="userData.protected && userData.protected.paymentMethods && userData.protected.paymentMethods.length">
        <table class="table is-striped is-fullwidth payment-methods-table">
          <thead>
            <tr>
              <th>Payment method</th>
              <th>Number</th>
              <th>Expiration</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="method in userData.protected.paymentMethods" :key="method.id">
              <td v-if="method.method === 'card'">
                <Icons icon="credit-card" class="input-icon" iconwidth="20px" iconheight="20px" color="#999"></Icons> Credit Card
              </td>
              <td>**** **** **** {{method.lastFour}}</td>
              <td>{{method.expirationMonth}}/{{method.expirationYear}}</td>
              <td><a class="delete" @click="removePaymentMethod(method.id)">(Remove)</a></td>
            </tr>
          </tbody>
        </table>
        <p class="small">*Note: you can add a new payment method directly on the donation screen.</p>
      </div>
      <p v-else>You don't have any stored payment methods. You can add them while donating.</p>
    </section>
  </div>
</template>

<script>
export default {
  data () {
    return {
      userDialogModal: false,
      userDialogHeading: "Processing...",
      userDialogMessage: "",
      userDialogSpinner: false
    }
  },
  components: {
    DonateBillingMethod: () => import("Components/donate/DonateBillingMethod.vue"),
    UserDialog: () => import("Components/general/UserDialog.vue"),
    Icons: () => import("Components/general/Icons.vue"),
    EditableTextField: () => import("Components/input/EditableTextField.vue"),
    EditableImageField: () => import("Components/input/EditableImageField.vue")
  },
  computed: {
    userData () {
      return this.$store.state.user
    }
  },
  methods: {
    openEdition (fieldName) {
      this.$refs[fieldName].openEdition()
    },
    removePaymentMethod (id) {
      this.userDialogModal = true
      this.userDialogSpinner = true
      return this.$store.dispatch("REMOVE_PAYMENT_METHOD", { userId: this.userData.id, methodId: id })
        .then(data => {
          this.userDialogMessage = "The payment method was removed."
          this.userDialogSpinner = false
        })
        .catch(err => {
          this.userDialogMessage = "An error occurred. Try again later."
          this.userDialogSpinner = false
          console.log(err)
        })
    },
    updateUserField (fieldName, newValue) {
      if (this.$store.state.user.data[fieldName] === newValue) {
        return
      }
      this.userDialogModal = true
      this.userDialogSpinner = true
      return this.$store.dispatch("UPDATE_USER_FIELD", { id: this.userData.id, field: fieldName, value: newValue })
        .then(data => {
          this.userDialogModal = false
        })
        .catch(err => {
          this.userDialogMessage = "An error occurred. Try again later."
          this.userDialogSpinner = false
          console.log(err)
        })
    },
    updateAvatar (blob) {
      this.userDialogModal = true
      this.userDialogSpinner = true
      return this.$store.dispatch("SAVE_PROFILE_AVATAR", { avatar: blob })
        .then(() => {
          setTimeout(() => {
            this.userDialogModal = false
          }, 500)
        })
        .catch(err => {
          this.userDialogSpinner = false
          this.userDialogHeading = "Error"
          this.userDialogMessage = err
        })
    },
    closeUserDialog () {
      this.userDialogMessage = ""
      this.userDialogModal = false
    }
  }
}
</script>

<style scoped lang="scss">
.account-section {
  margin-bottom: 80px;
}
.user-management-page {
  &__wrapper {
  }
}
.capitalize {
  text-transform: capitalize;
}
.small {
  font-size: 16px;
}
ul {
  margin-left: 30px;

  li {
    list-style-type: disc;
  }
}
.input-icon {
  display: inline-block;
  transform: translateY(3px);
}
.payment-methods-table {
  td {
    text-align: center;
  }
}
.table {
  thead {
    th {
      text-align: center;
    }
  }
  th {
    @include mobile {
      padding: .5em .25em;
    }
  }
}
</style>