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
      <div v-if="allClaimsAdmin && allClaimsAdmin.length">
        <table class="table is-striped is-fullwidth fundraisers-table">
          <thead>
            <tr>
              <th>Form</th>
              <th v-if="viewClaim" colspan="3">Details</th>
              <th v-if="!viewClaim">Nonprofit EIN</th>
              <th v-if="!viewClaim">Nonprofit status</th>
              <th v-if="!viewClaim">User</th>
              <th v-if="!viewClaim">Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="claim in allClaimsAdmin" :key="claim.id" v-if="!viewClaim">
              <td>
                <button @click="toggleClaim(claim.id)">View</button>
              </td>
              <td>
                <router-link :to="`/nonprofit/${claim.NonprofitId}`">{{claim.NonprofitId}}</router-link>
              </td>
              <td>
                {{claim.Nonprofit.status}}
              </td>
              <td>
                {{`${claim.User.firstName} ${claim.User.lastName}`}}
              </td>
              <td>
                {{claim.createdAt | formattedDate}}
              </td>
              <td>
                <v-select
                  :options="statuses"
                  :searchable="false"
                  :value="{label: `${claim.status}`}"
                  class="dropdown-status"
                  label="label"
                  :ref="claim.id"
                  @input="updateStatus(claim.id, {label: `${claim.status}`}, $event)"
                >
                  <template slot="option" slot-scope="option">
                      {{ option.label }}
                  </template>
                </v-select>
              </td>
            </tr>
            <tr v-for="claim in allClaimsAdmin" :key="claim.id" v-if="viewClaim && claim.id === currentViewId">
              <td>
                <button @click="toggleClaim(null)">Close</button>
              </td>
              <td v-if="viewClaim" colspan="3">
                <strong><em>User:</em></strong> {{claim.User.firstName}} {{claim.User.lastName}}<br><strong><em>Date:</em></strong> {{claim.createdAt | formattedDate}}<br><strong><em>Mailing 1:</em></strong> {{claim.claim.mailing1}}<br><strong><em>Mailing 2:</em></strong> {{claim.claim.mailing2}}<br><strong><em>Name:</em></strong> {{claim.claim.country.name}}<br><strong><em>State:</em></strong> {{claim.claim.state}}<br><strong><em>City:</em></strong> {{claim.claim.city}}<br><strong><em>Zip:</em></strong> {{claim.claim.zip}}<br><strong><em>Telephone:</em></strong> {{claim.claim.telephone}}<br><strong><em>Nonprofit email:</em></strong> {{claim.claim.nonprofitEmail}}<br><strong><em>Nonprofit telephone:</em></strong> {{claim.claim.nonprofitTelephone}}<br><strong><em>Nonprofit website:</em></strong> {{claim.claim.nonprofitWebsite}}<br><strong><em>Notes:</em></strong> {{claim.claim.notes}}
              </td>
              <td>
                <v-select
                  :options="statuses"
                  :searchable="false"
                  :value="{label: `${claim.status}`}"
                  class="dropdown-status"
                  label="label"
                  :ref="claim.id"
                  @input="updateStatus(claim.id, $event)"
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
        <p>No claims.</p>
      </div>
    </section>
  </div>
</template>

<script>
import Vue from 'vue'
import vSelect from 'vue-select'
import * as userUtils from "Core/util/userUtils.js"
export default {
  name: "adminClaims",
  data () {
    return {
      userDialogModal: false,
      userDialogHeading: "Processing...",
      userDialogMessage: "",
      userDialogSpinner: false,
      userDialogDisableClose: false,
      statuses: [{label: 'pending'}, {label: 'approved'}, {label: 'disapproved'}],
      viewClaim: false,
      currentViewId: null
    }
  },
  components: {
    NonprofitForm: () => import("Components/Volunteerathon/NonprofitForm.vue"),
    UserDialog: () => import("Components/general/UserDialog.vue"),
    vSelect
  },
  computed: {
    allClaimsAdmin () {
      return this.$store.state.allClaimsAdmin.data
    },
  },
  mounted () {
    this.loadClaimsAdmin()
  },
  methods: {
    loadClaimsAdmin (paginated = false) {
      return this.$store.dispatch("FETCH_ALL_CLAIMS_ADMIN", { filter: '', token: this.$store.state.user.tokenData.accessToken })
        .then(data => {
          return data
        })
        .catch(err => {
          return err
        })
    },
    toggleClaim(id) {
      this.currentViewId = id
      this.viewClaim = !this.viewClaim
    },
    userCan(per) {
      return userUtils.userCan(per, this.$store.state.user)
    },
    validatestatus (label) {
      if (label && label === "pending" || label === "approved" || label === "disapproved") {
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
            this.userDialogHeading = "Updating status..."
            this.userDialogMessage = ""
            this.userDialogDisableClose = true
            var route = []
            route.name = 'claim'
            route.params = []
            route.params.id = claimId
            this.$store.dispatch("SAVE_CLAIM_STATUS", {
              location: "claim.status",
              route: route,
              value: status
            })
              .then(() => {
                this.userDialogModal = false
                this.loadClaimsAdmin()
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