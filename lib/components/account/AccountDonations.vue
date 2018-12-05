<template>
  <div class="user-management-page__wrapper">
    <UserDialog
      :spinner="userDialogSpinner"
      :state="userDialogModal"
      v-on:modal:close="closeUserDialog()"
    >
      <div slot="header">{{userDialogHeading}}</div> 
      <div slot="content"><p>{{userDialogMessage}}</p></div> 
    </UserDialog>

    <h3>Donations</h3>

    <section class="donations-section">
      <div v-if="userData.protected.donations && userData.protected.donations.length">
        <table class="table is-striped is-fullwidth donations-table">
          <thead>
            <tr>
              <th>Fundraiser/Nonprofit</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Public</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="donation in userData.protected.donations" :key="donation.id">
              <td>
                <div v-if="donation.fundraiser_id">
                  <router-link :to="`/fundraiser/${donation.Fundraiser.id}`">See fundraiser</router-link>
                </div>
                <div v-else>
                  <router-link :to="`/nonprofit/${donation.Nonprofit.id}`">See nonprofit</router-link>
                </div>
              </td>
              <td>{{donation.amount | usd}}</td>
              <td>{{donation.timestamp | formattedDate}}</td>
              <td>{{donation.public | booleanToBinary}}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else>
        <p>You haven't made any donations yet.</p>
        <p><router-link to="/explore">Go to the Explore page</router-link> to find nonprofits and fundraisers to support.</p>
      </div>
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
    UserDialog: () => import("Components/general/UserDialog.vue")
  },
  computed: {
    userData () {
      return this.$store.state.user
    }
  }
}
</script>

<style scoped lang="scss">
.account-section {
  margin-bottom: 80px;
}

.donations-table {
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
    @include breakpoint($mobile) {
      padding: .5em .25em;
    }
  }
}
</style>