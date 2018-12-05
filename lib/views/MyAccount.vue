<template>
  <div class="view-user-account-page">
    <AppHeader layout="page"></AppHeader>
      <section v-if="!loggedIn" class="not-logged-in__section-wrapper">
        <div class="container">
          <h1 class="section-title title title-gray">Please log in or register</h1>
          <div class="section-content">
            <p>This area is restricted. Please log in to access your account details, or register a free account to be able to create fundraisers and see your donation history.</p>
          </div>
          <div class="is-centered columns login-buttons-wrapper">
            <LogInModal :register="false">
              <div slot="trigger">
                <a class="button is-success">Log in</a>
              </div>
            </LogInModal>
            <LogInModal :register="true">
              <div slot="trigger">
                <a class="button is-info">Register</a>
              </div>
            </LogInModal>
          </div>
        </div>
      </section>
      <div v-if="loggedIn">
        <section>
          <div class="container">
            <h1 class="section-title title title-gray">My account</h1>
          </div>
        </section>
        <section>
          <div class="container">
            <div class="columns">
              <div class="column is-3">
                <UserManagementLinks></UserManagementLinks>            
              </div>
              <div class="column is-9">
                <transition-group name="list-complete" tag="div">
                  <AccountSettings
                    class="list-complete-item"
                    v-if="path === 'settings'"
                    key="settings"
                  ></AccountSettings>
                  <AccountDonations
                    class="list-complete-item"
                    v-if="path === 'donations'"
                    key="settings"
                  ></AccountDonations>
                  <AccountFundraisers
                    class="list-complete-item"
                    v-if="path === 'fundraisers'"
                    key="settings"
                  ></AccountFundraisers>
                  <AccountNonprofits
                    class="list-complete-item"
                    v-if="path === 'nonprofits'"
                    key="settings"
                  ></AccountNonprofits>
                </transition-group>
              </div>
            </div>
          </div>
        </section>
      </div>
    <AppFooter></AppFooter>
  </div>
</template>

<script>
import Vue from "vue"
import VueMeta from "vue-meta"

Vue.use(VueMeta)

export default {
  name: "account",
  /**
   * Uses dynamic import to speed up page performance.
   * See https://webpack.js.org/guides/code-splitting/ for reference.
   */
  components: {
    AppFooter: () => import("Components/general/AppFooter.vue"),
    AppHeader: () => import("Components/general/AppHeader.vue"),
    UserManagementLinks: () => import("Components/login/UserManagementLinks.vue"),
    LogInModal: () => import("Components/general/LogInModal.vue"),
    AccountSettings: () => import("Components/account/AccountSettings.vue"),
    AccountFundraisers: () => import("Components/account/AccountFundraisers.vue"),
    AccountDonations: () => import("Components/account/AccountDonations.vue"),
    AccountNonprofits: () => import("Components/account/AccountNonprofits.vue")
  },

  /**
   * Return stored data for this view.
   */
  computed: {
    loggedIn () {
      return this.$store.state.user.loggedIn
    },
    path () {
      return this.$route.params.path
    }
  },
  metaInfo () {
    return {
      title: "My Account"
    }
  }
}
</script>

<style scoped lang="scss">
.not-logged-in__section-wrapper {
  padding: 50px 0;
}
.section-title {
  margin-top: 40px;
  margin-bottom: 50px;
}
.section-content {
  text-align: center;
  margin-bottom: 30px;
}
.login-buttons-wrapper {
  display: flex;
  .button {
    margin: 0 10px;
  }
}

.list-complete-item {
  transition: all 0.5s;
  display: inline-block;
  width: 100%;
  margin-right: 10px;
}
.list-complete-enter, .list-complete-leave-to
/* .list-complete-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateX(30px);
}
.list-complete-leave-active {
  position: absolute;
}

section {
  padding-bottom: 50px;
}

</style>
