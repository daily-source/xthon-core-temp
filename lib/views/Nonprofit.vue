<template>
  <div class="" :key="nonprofit.id">
    <AppHeader layout="app"></AppHeader>

    <transition name="slide-fade">
      <DonateView
        v-if="donateActive"
        parent="nonprofit"
        v-on:close="closeDonation()"
      ></DonateView>
    </transition>

    <NonprofitHero
      :nonprofit="nonprofit"
      :common="common"
      :editing="enableEditionForThisNonprofit"
      v-on:edit:open="enableEdition()"
      v-on:edit:close="closeEdition()"
    ></NonprofitHero>
    <NonprofitForm submit-button-label="Submit">
    </NonprofitForm>

    <FloatingShareTools text="Check out this nonprofit!" via="Volunteerathon" title="Share this" />

    <NonprofitAbout
      :nonprofit="nonprofit"
      :editing="enableEditionForThisNonprofit"
      :can-edit="canManageThisNonprofit"
      :key="_uid + nonprofit.EIN"
      v-on:edit:open="enableEdition()"
      v-on:edit:close="closeEdition()"
    ></NonprofitAbout>

    <NonprofitFundraisers
      :fundraisers="fundraisers"
      :key="nonprofit.EIN"
      limit="5"
      section-title="Volunteerathons to raise money for this nonprofit"
    >
      <div slot="heading"><h2>Volunteerathons to raise money for this nonprofit</h2></div>
    </NonprofitFundraisers>

    <div class="container">
      <DonorsList
        section-title="Top Donors"
        view-all-cta=""
        :donations="donationsByAmount"
        limit="12"
        layout="horizontal"
      ></DonorsList>

      <DonorsList
        section-title="Top Fundraisers"
        view-all-cta=""
        limit="6"
        :donations="topFundraisers"
        layout="horizontal"
      ></DonorsList>
    </div>

    <section>
      <router-link
        class="button is-large is-info is-centered fundraiser_cta"
        to="/fundraiser/create"
      >Create your own fundraiser</router-link>
    </section>
    <AppFooter></AppFooter>

    <RegisterOrLoginModal
      layout="comment"
      :state="showLoginModal"
      v-on:logged:in="enableEdition()"
      v-on:modal:close="showLoginModal = false"
    >
      <div slot="heading">Please log in</div>
      <div slot="intro">
        <p class="is-centered">To manage this nonprofit, you need to be logged in. Please log in here or register for a free account.</p>
      </div>
    </RegisterOrLoginModal>
    <ClaimNonprofitModal
      layout="comment"
      :state="showClaimNonprofitModal"
      v-on:logged:in="enableEdition()"
      v-on:modal:close="showClaimNonprofitModal = false"
    >
    </ClaimNonprofitModal>

  </div>
</template>

<script>
import Vue from "vue"
import VueMeta from "vue-meta"
import RegisterOrLoginModal from "Components/general/RegisterOrLoginModal.vue"
import ClaimNonprofitModal from "Components/nonprofit/ClaimNonprofitModal.vue"
import DonorsList from "Components/general/DonorsList.vue"

Vue.use(VueMeta)

export default {
  name: "nonprofit",
  data () {
    return {
      showLoginModal: false,
      showClaimNonprofitModal: false,
      enableEditionForThisNonprofit: false
    }
  },
  /**
   * Uses dynamic import to speed up page performance.
   * See https://webpack.js.org/guides/code-splitting/ for reference.
   */
  components: {
    AppFooter: () => import("Components/general/AppFooter.vue"),
    AppHeader: () => import("Components/general/AppHeader.vue"),
    NonprofitHero: () => import("Components/nonprofit/NonprofitHero.vue"),
    DonateView: () => import("./DonateView.vue"),
    DonorsList,
    FloatingShareTools: () => import("Components/general/FloatingShareTools.vue"),
    NonprofitAbout: () => import("Components/nonprofit/NonprofitAbout.vue"),
    NonprofitFundraisers: () => import("Components/nonprofit/NonprofitFundraisers.vue"),
    NonprofitForm: () => import("Components/Volunteerathon/NonprofitForm.vue"),
    RegisterOrLoginModal,
    ClaimNonprofitModal
  },
  /**
   * This uses vue-meta in order to render the tags in the page. For the home page, it uses
   * the default values plus a custom description and title. The og:image property is defined
   * in the template, ./src/App.vue
   */
  metaInfo () {
    var activity = this.nonprofit.NTEE_CD !== "0"
      ? `NTEE Classification: ${this.nonprofit.NTEE_CD}`
      : `Activity: ${this.nonprofit.ACTIVITY}`
    var description = `Tax exempt organization. ${activity}`
    var name = this.nonprofit.NAME
    var imgSrc = this.nonprofit.data.hero ? this.nonprofit.data.hero.src : this.nonprofit.data.default_hero.src
    var imgUrl = `${this.$store.state.extra.request.protocol}://${this.$store.state.extra.request.host}${imgSrc}`
    return {
      title: name,
      meta: [
        { vmid: "description", name: "description", content: description },
        { vmid: "og:title", property: "og:title", content: name },
        { vmid: "og:description", property: "og:description", content: description },
        { vmid: "twitter:card", property: "twitter:card", content: "summary_large_image" },
        { vmid: "og:image:width", property: "og:image:width", content: "1024" },
        { vmid: "og:image:height", property: "og:image:height", content: "340" },
        { vmid: "og:image", property: "og:image", content: imgUrl }
      ]
    }
  },
  computed: {
    ein () {
      return this.$route.params.ein
    },
    nonprofit () {
      return this.$store.state.nonprofit
    },
    fundraisers () {
      return this.$store.state.fundraisers.data
    },
    donations () {
      return this.$store.state.donations.data
    },
    donationsByAmount () {
      return this.$store.state.donations.byAmount.data
    },
    topFundraisers () {
      return this.$store.state.topFundraisers.data
    },
    common () {
      return this.$store.state.common
    },
    donateModal () {
      return this.$route.name
    },
    donateActive () {
      return this.donateModal.includes("/donate")
    },
    loggedIn () {
      return this.$store.state.user.loggedIn
    },
    canManageThisNonprofit () {
      let userNonprofits = this.$store.state.user.Nonprofits
      if (userNonprofits && userNonprofits.length) {
        let nonprofitsToManage = userNonprofits.filter(item => {
          return item.id === this.nonprofit.EIN
        })
        if (nonprofitsToManage.length) {
          return true
        } else {
          return false
        }
      } else {
        return false
      }
    }
  },

  /**
   * Fetch data and store it just before entering the view.
   */
  asyncData ({ store, route: { params: { ein } } }) {
    return new Promise((resolve, reject) => {
      return store.dispatch("FETCH_NONPROFIT", { ein })
        .then(data => {
          resolve(data)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  /**
   * Exclude the fundraisers, donors and top donors blocks from getting rendered in the server.
   * This speeds up the process and reduces the size of the document (so TTFB improves).
   */
  mounted () {
    this.loadFundraisers()
    this.loadMoreDonations(true, "byAmount")
    this.loadMoreTopFundraisers()
  },
  methods: {
    /**
     * Fetch fundraisers for this EIN. If no fundraisers are returned, reset the store info,
     * so that it doesn't display info from other nonprofits.
     */
    loadFundraisers (paginated = false) {
      return this.$store.dispatch("FETCH_FUNDRAISERS", { ein: this.$route.params.ein })
        .then(data => {
          return data
        })
        .catch(err => {
          this.$store.commit("RESET_FUNDRAISERS")
          return err
        })
    },
    loadMoreDonations (paginated = false, sortBy) {
      return this.$store.dispatch("FETCH_DONATIONS", {
        nonprofitEIN: this.$route.params.ein,
        paginated: false,
        showAll: true,
        limit: 12,
        sortBy: sortBy
      })
        .then(data => {
          return data
        })
        .catch(err => {
          return err
        })
    },
    loadMoreTopFundraisers (paginated = false) {
      return this.$store.dispatch("FETCH_TOP_FUNDRAISERS", { ein: this.$route.params.ein, paginated: paginated })
        .then(data => {
          return data
        })
        .catch(err => {
          return err
        })
    },
    closeDonation () {
      this.$router.push({ name: "nonprofit", params: this.$route.params })
    },
    enableEdition () {
      if (!this.loggedIn) {
        this.showLoginModal = true
      } else {
        this.showLoginModal = false
        // determine if the nonprofit is in the list
        if (this.canManageThisNonprofit) {
          this.enableEditionForThisNonprofit = true
        } else {
          this.showClaimNonprofitModal = true
        }
      }
    },
    closeEdition () {
      this.enableEditionForThisNonprofit = false
    }
  },
  watch: {
    /**
     * As the view will be reused even if the ein param changes, we need to watch it
     * and fetch again the data for the other sections.
     */
    ein: function (ein) {
      this.loadFundraisers()
      this.loadMoreDonations(true, "byAmount")
      this.loadMoreTopFundraisers()
    },
    loggedIn (newVal) {
      if (!newVal) {
        this.closeEdition()
      }
    }
  }
}
</script>

<style scoped lang="scss">
.fundraiser_cta {
  margin: 50px auto;
  border-radius: 10px;
  display: flex;
  font-size: 18px;
  include tablet {
    font-size: 24px;
    width: 40%;
    max-width: 450px;
  }  
}

.nonprofit-intro {
  margin-bottom: 30px;
  font-size: 20px;
  line-height: 1.5;

  @include tablet {
    padding: 0 70px;
  }

  &__manage-cta {
    display: flex;
    height: 100%;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-end;
    button {
      font-size: 1.1rem;
    }
  }
}

</style>
