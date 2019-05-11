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

    <h3>Nonprofits I manage</h3>
    <section class="nonprofits-section">
      <div v-if="userData.Nonprofits && userData.Nonprofits.length">
        <table class="table is-striped is-fullwidth fundraisers-table">
          <thead>
            <tr>
              <th>Nonprofit</th>
              <th>Raised</th>
              <th>Donors count</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="nonprofit in userData.Nonprofits" :key="nonprofit.EIN">
              <td>

                <router-link :to="`/nonprofit/${nonprofit.EIN}`">{{nonprofit.NAME || nonprofit.data.name}}</router-link>
              </td>
              <td>
                <span v-if="nonprofit.data">{{nonprofit.data.donated | centsToUsd}}</span>
                <span v-else>{{ 0 | centsToUsd }}</span>
              </td>
              <td>
                <span v-if="nonprofit.data">{{nonprofit.data.donorsCount}}</span>
                <span v-else>0</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else>
        <p>You are not managing any nonprofit yet. If you represent one or more organizations, get to the nonprofit page using the search engine below. There you will be able to claim the organization and manage it.</p>
        <NonprofitAjaxSearch
          v-on:selected="goToNonprofit($event)"
          placeholder="Enter a nonprofit name"
          :standalone="true"
        ></NonprofitAjaxSearch>

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
      userDialogDisableClose: false
    }
  },
  components: {
    NonprofitAjaxSearch: () => import("Components/general/NonprofitAjaxSearch.vue"),
    UserDialog: () => import("Components/general/UserDialog.vue")
  },
  computed: {
    userData () {
      return this.$store.state.user.data
    }
  },
  methods: {
    goToNonprofit (ein) {
      this.$router.push(`/nonprofit/${ein}`)
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
.nonprofit-search-field-wrapper.standalone {
  @include tablet {
    margin-left: -0.75em;
  }
}
</style>