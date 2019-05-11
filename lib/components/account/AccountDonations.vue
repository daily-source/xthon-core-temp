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
      <div v-if="userData.Donations && userData.Donations.length">
        <table class="table is-striped is-fullwidth donations-table">
          <thead>
            <tr>
              <th>Fundraiser/Nonprofit</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Anonymous</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="donation in userData.Donations" :key="donation.id">
              <td>
                <div v-if="donation.fundraiser_id">
                  <router-link :to="`/fundraiser/${donation.FundraiserId}`">See fundraiser</router-link>
                </div>
                <div v-else>
                  <router-link :to="`/nonprofit/${donation.NonprofitId}`">See nonprofit</router-link>
                </div>
              </td>
              <td>{{donation.amountInCents | centsToUsd}}</td>
              <td>{{donation.createdAt | formattedDate}}</td>
              <td>{{donation.anonymous | booleanToBinary}}</td>
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
      return this.$store.state.user.data
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
    @include mobile {
      padding: .5em .25em;
    }
  }
}
</style>