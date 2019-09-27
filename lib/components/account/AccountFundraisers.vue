<template>
  <div class="user-management-page__wrapper">
    <UserDialog
      :spinner="userDialogSpinner"
      :state="userDialogModal"
      :diseable-close= "userDialogDisableClose"
    >
      <div slot="header">{{userDialogHeading}}</div> 
      <div slot="content"><p>{{userDialogMessage}}</p></div> 
    </UserDialog>

    <Modal
      size="large"
      :prevent-body-scroll="false"
      :state="createFundraiserModal"
      v-on:modal:close="createFundraiserModal = false"
      v-on:modal:open="createFundraiserModal = true"
    >
      <div slot="content">
        <NonprofitForm submit-button-label="Submit">
          <div slot="heading"><h1 class="section-title title title-blue">Create your first fundraiser</h1></div>
        </NonprofitForm>
      </div>
    </Modal>

    <h3>My Fundraisers</h3>
    <section class="fundraisers-section">
      <div v-if="userData.Fundraisers && userData.Fundraisers.length">
        <table class="table is-striped is-fullwidth fundraisers-table">
          <thead>
            <tr>
              <th>Fundraiser</th>
              <th>Raised</th>
              <th>Starts</th>
              <th>Ends</th>
              <th>Donors count</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="fundraiser in userData.Fundraisers" :key="fundraiser.id">
              <td>
                <router-link :to="`/fundraiser/${fundraiser.id}`">{{fundraiser.name}}</router-link>
              </td>
              <td>{{fundraiser.donated | centsToUsd}}</td>
              <td>{{fundraiser.startDate | formattedDate}}</td>
              <td>{{fundraiser.endDate | formattedDate}}</td>
              <td>{{fundraiser.donorsCount}}</td>
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
export default {
  data () {
    return {
      userDialogModal: false,
      userDialogHeading: "Processing...",
      userDialogMessage: "",
      userDialogSpinner: false,
      userDialogDisableClose: false,
      createFundraiserModal: false
    }
  },
  components: {
    Modal: () => import("Components/general/Modal.vue"),
    NonprofitForm: () => import("Components/Volunteerathon/NonprofitForm.vue"),
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