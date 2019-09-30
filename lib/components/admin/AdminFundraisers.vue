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
      <div v-if="allFundraisersAdmin && allFundraisersAdmin.length">
        <table class="table is-striped is-fullwidth fundraisers-table">
          <thead>
            <tr>
              <th>Fundraiser</th>
              <th>Nonprofit EIN</th>
              <th>User</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="fundraiser in allFundraisersAdmin" :key="fundraiser.id">
              <td>
                <router-link :to="`/fundraiser/${fundraiser.id}`">{{fundraiser.name}}</router-link>
              </td>
              <td>
                <router-link :to="`/nonprofit/${fundraiser.NonprofitId}`">{{fundraiser.NonprofitId}}</router-link>
              </td>
              <td>
                <!--<router-link :to="`/fundraiser/${fundraiser.id}`">{{fundraiser.User.firstName}} {{fundraiser.User.lastName}}</router-link>-->
                {{`${fundraiser.User.firstName} ${fundraiser.User.lastName}`}}
              </td>
              <td v-if="fundraiser.status === 'pending' || fundraiser.status === 'published' || fundraiser.status === 'blocked'">
                <v-select
                  :options="statuses"
                  :searchable="false"
                  :value="{label: `${fundraiser.status}`}"
                  class="dropdown-status"
                  label="label"
                  ref="status"
                  @input="updateStatus(fundraiser.id, $event)"
                >
                  <template slot="option" slot-scope="option">
                      {{ option.label }}
                  </template>
                </v-select>
              </td>
              <td v-else>{{fundraiser.status}}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else>
        <p>You haven't created any fundraisers yet.</p>
        <p>To do so, <a @click="createFundraiserModal = true">create a fundraiser by clicking here.</a></p>
      </div>
    </section>
  </div>
</template>

<script>
import Vue from 'vue'
import vSelect from 'vue-select'
import * as userUtils from "Core/util/userUtils.js"
export default {
  data () {
    return {
      userDialogModal: false,
      userDialogHeading: "Processing...",
      userDialogMessage: "",
      userDialogSpinner: false,
      userDialogDisableClose: false,
      createFundraiserModal: false,
      statuses: [{label: 'pending'}, {label: 'published'}, {label: 'blocked'}]
    }
  },
  components: {
    NonprofitForm: () => import("Components/Volunteerathon/NonprofitForm.vue"),
    UserDialog: () => import("Components/general/UserDialog.vue"),
    vSelect
  },
  computed: {
    allFundraisersAdmin () {
      return this.$store.state.allFundraisersAdmin.data
    }
  },
  mounted () {
    this.loadAllFundraisersAdmin()
  },
  methods: {
    loadAllFundraisersAdmin (paginated = false) {
      return this.$store.dispatch("FETCH_ALL_FUNDRAISERS_ADMIN", { filter: '', token: this.$store.state.user.tokenData.accessToken })
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
      if (label && label === "pending" || label === "published" || label === "blocked") {
        return true
      }
      return false
    },
    updateStatus (fundraiserId, event) {
      if (!this.validatestatus(event.label)) {return false}
      var status = event.label
      return new Promise((resolve, reject) => {
        if (this.validatestatus(status)) {
          this.userDialogModal = true
          this.userDialogHeading = "Updating status..."
          this.userDialogMessage = ""
          this.userDialogDisableClose = true
          var route = []
          route.name = 'fundraiser'
          route.params = []
          route.params.id = fundraiserId
          this.$store.dispatch("SAVE_FUNDRAISER_STATUS", {
            location: "fundraiser.status",
            route: route,
            value: status
          })
            .then(() => {
              this.userDialogModal = false
              this.loadAllFundraisersAdmin()
              resolve(status)
            })
            .catch(err => {
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
    min-width: 160px !important;
    .clear {
      visibility: hidden !important;
    }
  }
  .dropdown-menu {
    right: 0 !important;
  }
}
</style>