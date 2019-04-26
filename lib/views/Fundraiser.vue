<template>
  <div class="fundraiser">
    <AppHeader layout="app"></AppHeader>

    <transition name="slide-fade">
      <DonateView
        v-if="donateActive"
        parent="fundraiser"
        v-on:close="closeDonation()"
      ></DonateView>
    </transition>

    <FundraiserHeader
      :fundraiser="fundraiser"
      :editing="enableEditionForThisFundraiser"
      v-on:edit:close="closeEdition()"
    ></FundraiserHeader>
    <FundraiserHero
      :fundraiser="fundraiser"
      :key="_uid + fundraiser.id"
      :can-edit="canManageThisFundraiser"
      :editing="enableEditionForThisFundraiser"
      v-on:edit:open="enableEdition()"
    ></FundraiserHero>
    <FundraiserParticipant
      id="FundraiserParticipant"
      ref="FundraiserParticipant"
      :fundraiser="fundraiser"
      :editing="enableEditionForThisFundraiser"
      :can-edit="canManageThisFundraiser"
      v-on:edit:close="closeEdition()"
      v-on:edit:open="enableEdition('FundraiserParticipant')"
    ></FundraiserParticipant>

    <FundraiserLowerBody
      id="FundraiserLowerBody"
      :fundraiser="fundraiser"
      :key="'lowerBody_' + _uid"
      :can-edit="canManageThisFundraiser"
      :editing="enableEditionForThisFundraiser"
      v-on:edit:close="closeEdition()"
      v-on:edit:open="enableEdition('FundraiserLowerBody')"
    ></FundraiserLowerBody>

    <AppFooter></AppFooter>
  </div>
</template>

<script>
import Vue from "vue"
import VueMeta from "vue-meta"
import AppHeader from "Components/Volunteerathon/AppHeader.vue"
import FundraiserHeader from "Components/fundraiser/FundraiserHeader.vue"

Vue.use(VueMeta)

export default {
  name: "fundraiser",
  /**
   * Uses dynamic import to speed up page performance.
   * See https://webpack.js.org/guides/code-splitting/ for reference.
   */
  components: {
    AppHeader,
    AppFooter: () => import("Components/general/AppFooter.vue"),
    FundraiserHeader,
    FundraiserHero: () => import("Components/fundraiser/FundraiserHero.vue"),
    FundraiserParticipant: () => import("Components/fundraiser/FundraiserParticipant.vue"),
    FundraiserLowerBody: () => import("Components/fundraiser/FundraiserLowerBody.vue"),
    DonateView: () => import("./DonateView.vue")
  },
  data () {
    return {
      enableEditionForThisFundraiser: false
    }
  },
  /**
   * This uses vue-meta in order to render the tags in the page. For the home page, it uses
   * the default values plus a custom description and title. The og:image property is defined
   * in the template, ./src/App.vue
   */
  metaInfo () {
    var description = `Support ${this.fundraiser.User.firstName}'s volunteerathon: ${this.fundraiser.name} for the nonprofit ${this.fundraiser.Nonprofit.NAME}`
    var title = this.fundraiser.name
    var img = `${this.$store.state.extra.request.protocol}://${this.$store.state.extra.request.host}${this.fundraiser.data.media[0].src}`
    return {
      title: title,
      meta: [
        { vmid: "description", name: "description", content: description },
        { vmid: "og:title", property: "og:title", content: title },
        { vmid: "og:description", property: "og:description", content: description },
        { vmid: "twitter:card", property: "twitter:card", content: "summary_large_image" },
        { vmid: "og:image", property: "og:image", content: img },
        { vmid: "og:image:width", property: "og:image:width", content: "800" },
        { vmid: "og:image:height", property: "og:image:height", content: "533" }
      ]
    }
  },
  computed: {
    fundraiser () {
      return this.$store.state.fundraiser
    },
    donateModal () {
      return this.$route.name
    },
    donateActive () {
      return this.donateModal === "fundraiser/donate"
    },
    loggedIn () {
      return this.$store.state.user.loggedIn
    },
    canManageThisFundraiser () {
      if (!this.loggedIn) {
        return false
      }
      let userFundraisers = this.$store.state.user.data.Fundraisers
      if (userFundraisers && userFundraisers.length) {
        let fundraisersToManage = userFundraisers.filter(item => {
          return item.id === this.fundraiser.id
        })
        if (fundraisersToManage.length) {
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
  asyncData ({ store, route: { params: { id } } }) {
    return new Promise((resolve, reject) => {
      store.dispatch("FETCH_FUNDRAISER", { id })
        .then(data => {
          resolve(data)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  /**
   * If this is a donation view, redirect to the corresponding fundraiser on close event.
   */
  methods: {
    closeDonation () {
      this.$router.push({ name: "fundraiser", params: this.$route.params })
    },
    enableEdition (ref) {
      if (!this.loggedIn) {
        this.showLoginModal = true
      } else {
        this.showLoginModal = false
        // determine if the user manages this fundraiser
        if (this.canManageThisFundraiser) {
          this.enableEditionForThisFundraiser = true
          if (ref) {
            setTimeout(() => {
              this.$scrollTo(`#${ref}`, { offset: -200 })
            }, 1000)
          }
        }
      }
    },
    closeEdition () {
      this.enableEditionForThisFundraiser = false
      if (this.$refs.FundraiserParticipant) {
        // TODO
        // Not sure if this is really needed
        // this.$refs.FundraiserParticipant.$refs.imageEditor.cancelEdition()
      }
    }
  },
  watch: {
    loggedIn (newVal) {
      if (!newVal) {
        this.closeEdition()
      }
    }
  }
}
</script>

<style lang="scss">
.fundraiser {
  background-color: $color-fundraiser-bg;

  @include tablet {
    background-color: $color-fundraiser-bg;
  }

  .is-fluid.white-bg {
    background-color: $white;

    @include tablet {
      padding: 0 50px 20px;
    }
  }
}

</style>
