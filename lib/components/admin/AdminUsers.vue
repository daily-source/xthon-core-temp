<template>
  <div class="user-management-page__wrapper">
    <UserDialog
      :spinner="userDialogSpinner"
      :state="userDialogModal"
      :diseable-close= "userDialogDisableClose"
      v-on:modal:close="closeUserDialog()"
    >
      <div slot="header">{{userDialogHeading}}</div> 
      <div slot="content"><p>{{userDialogMessage}}</p></div> 
    </UserDialog>
    <section class="fundraisers-section">
      <div v-if="allUsersAdmin && allUsersAdmin.length">
        <table class="table is-striped is-fullwidth fundraisers-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Location</th>
              <th>Created at</th>
              <th>Account type</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in allUsersAdmin" :key="user.id">
              <td>
                {{`${user.firstName} ${user.lastName}`}}
              </td>
              <td>
                {{user.location}}
              </td>
              <td>
                {{user.createdAt | formattedDate}}
              </td>
              <td>
                <v-select
                  :options="statuses"
                  :searchable="false"
                  :value="{label: `${user.account}`}"
                  class="dropdown-account"
                  label="label"
                  :ref="user.id"
                  @input="updateStatus(user.id, {label: `${user.account}`}, $event)"
                >
                  <template slot="option" slot-scope="option">
                      {{ option.label }}
                  </template>
                </v-select>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else>
        <p>No users.</p>
      </div>
    </section>
  </div>
</template>

<script>
import Vue from 'vue'
import vSelect from 'vue-select'
import * as userUtils from "Core/util/userUtils.js"
export default {
  name: "adminUsers",
  data () {
    return {
      userDialogModal: false,
      userDialogHeading: "Processing...",
      userDialogMessage: "",
      userDialogSpinner: false,
      userDialogDisableClose: false,
      statuses: [{label: 'Personal'}, {label: 'NonprofitRegular'}, {label: 'NonprofitPlus'}, {label: 'NonprofitStaff'}, {label: 'XTHON_STAFF'}, {label: 'XTHON_SUPER_USER'}, {label: 'Blocked'}]
    }
  },
  components: {
    NonprofitForm: () => import("Components/Volunteerathon/NonprofitForm.vue"),
    UserDialog: () => import("Components/general/UserDialog.vue"),
    vSelect
  },
  computed: {
    allUsersAdmin () {
      return this.$store.state.allUsersAdmin.data
    },
  },
  mounted () {
    this.loadUsersAdmin()
  },
  methods: {
    loadUsersAdmin (paginated = false) {
      return this.$store.dispatch("FETCH_ALL_USERS_ADMIN", { filter: '', token: this.$store.state.user.tokenData.accessToken })
        .then(data => {
          return data
        })
        .catch(err => {
          return err
        })
    },
    userCan(per) {
      return userUtils.userCan(per, this.$store.state.user)
    },
    validatestatus (label) {
      if (label && label === "Personal" || label === "NonprofitRegular" || label === "NonprofitPlus" || label === "NonprofitStaff" || label === "XTHON_STAFF" || label === "XTHON_SUPER_USER" || label === "Blocked") {
        return true
      }
      return false
    },
    updateStatus (claimId, current, event) {
      if (!this.validatestatus(event.label)) {return false}
      var status = event.label
      if (confirm(`Are you sure you want to change account to ${status}`)) {
        return new Promise((resolve, reject) => {
          if (this.validatestatus(status)) {
            this.userDialogModal = true
            this.userDialogHeading = "Updating account type..."
            this.userDialogMessage = ""
            this.userDialogDisableClose = true
            var route = []
            route.name = 'user'
            route.params = []
            route.params.id = claimId
            this.$store.dispatch("SAVE_USER_ACCOUNT_TYPE", {
              location: "user.account",
              route: route,
              value: status
            })
              .then(() => {
                this.userDialogModal = false
                this.loadUsersAdmin()
                resolve(status)
              })
              .catch(err => {
                this.$refs[claimId][0].value = current
                this.userDialogModal = true
                this.userDialogHeading = "Error"
                this.userDialogMessage = err
                this.userDialogDisableClose = false
                this.userDialogSpinner = false
                reject(err)
              })
          } else {
            this.errorMessage = this.errorText
            this.userDialogModal = false
            resolve()
          }
        })
      } else {
        this.$refs[claimId][0].value = current
      }
    },
    closeUserDialog() {
      this.userDialogModal = false
    }
  }
}
</script>

<style scoped lang="scss">
.account-section {
  margin-bottom: 80px;
}

.fundraisers-table {
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
<style lang="scss">
.v-select {
  .dropdown-toggle {
    min-width: 260px !important;
    .clear {
      visibility: hidden !important;
    }
  }
  .dropdown-menu {
    right: 0 !important;
  }
}
</style>