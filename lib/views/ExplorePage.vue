<template>
  <div class="explore__wrapper" :class="`version${version}`">
    <div  v-if="!version || version === 1">
      <AppHeader layout="home"></AppHeader>
      <section class="examples__section-wrapper">
        <div class="container">
          <h1 class="section-title title">Examples of Volunteerathons done to raise money</h1>
          <NonprofitFundraisers :fundraisers="fundraisers" limit="5"></NonprofitFundraisers>
        </div>
      </section>

      <section class="find-nonprofits__section-wrapper">
        <div class="container">
          <h1 class="section-title title">Find a nonprofit</h1>
          <p class="section-intro">Search our directory of over 800,000 IRS nonprofits that you can make tax-deductible donations to or raise money for. The search will take you to their profiles on our site where you can donate to them:</p>
          <NonprofitAjaxSearch
            v-if="canRender"
            v-on:selected="goToNonprofit($event)"
            placeholder="Enter a nonprofit name"
            :standalone="true"
          ></NonprofitAjaxSearch>
        </div>
      </section>

      <NonprofitForm submit-button-label="Submit">
        <div slot="heading"><h1 class="section-title title title-blue">Start Your Own Volunteerathon</h1></div>
      </NonprofitForm>

      <section class="other-sites__section-wrapper">
        <div class="container">
          <h1 class="section-title title">Explore our other websites</h1>
          <p>We have many websites to help nonprofits and their supporters raise awareness and raise money for their causes. Click the images below to visit them.</p>
          <div class="columns is-multiline">
            <div class="column is-4" v-for="(site, key) in otherSites">
              <a :href="site.url" target="_blank" :alt="site.name">
                <LazyLoadedImage class="other-sites-img__wrapper"
                  :class="`other-sites-${key}`"
                  :src="site.imgsrc"
                  :is-background="true"
                ></LazyLoadedImage>
              </a>
            </div>
          </div>
          <div class="columns is-centered align-center">
            <transition-group name="list-complete">
              <p
                v-if="!showMoreWebsitesNotice"
                :key="_uid + 1"
                class="list-complete-item"
              >
                <button
                  class="button is-medium is-warning"
                  @click.prevent="showMoreWebsitesNotice = true"
                >View all</button>
              </p>
              <p
                v-if="showMoreWebsitesNotice"
                :key="_uid + 2"
                class="list-complete-item"
              >More websites are coming soon. Please return to view them.</p>
            </transition-group>
          </div>
        </div>
      </section>

      <WaysSupport :version="version || 1">
        <div slot="heading">
          <h1 class="section-title title title-blue">Ways to support our nonprofit’s work</h1>
        </div>        
      </WaysSupport>

      <AppFooter></AppFooter>
    </div>
    <div  v-if="version === 2">
      <AppHeader layout="page"></AppHeader>
      <section class="find-nonprofits__section-wrapper">
        <div class="container">
          <h1 class="section-title title">Find a nonprofit</h1>
          <p class="section-intro">Search our directory of over 800,000 IRS nonprofits that you can make tax-deductible donations to or raise money for. The search will take you to their profiles on our site where you can donate to them:</p>
          <NonprofitAjaxSearch
            :standalone="true"
            v-if="canRender"
            v-on:selected="goToNonprofit($event)"
          ></NonprofitAjaxSearch>
        </div>
      </section>
      <section class="examples__section-wrapper">
        <div class="container">
          <h1 class="section-title title">Examples of Volunteerathons done to raise money</h1>
          <NonprofitFundraisers :fundraisers="fundraisers" limit="5"></NonprofitFundraisers>
        </div>
      </section>

      <NonprofitForm submit-button-label="Submit" class="start-your-own__section-wrapper">
        <div slot="heading"><h1>Start Your Own Volunteerathon</h1></div>
      </NonprofitForm>

      <section class="other-sites__section-wrapper">
        <div class="container">
          <h1 class="section-title title">Explore our other websites</h1>
          <p>We have many websites to help nonprofits and their supporters raise awareness and raise money for their causes. Click the images below to visit them.</p>
          <div class="columns is-multiline">
            <div class="column is-4" v-for="(site, key) in otherSites">
              <a :href="site.url" target="_blank" :alt="site.name">
                <LazyLoadedImage class="other-sites-img__wrapper"
                  :class="`other-sites-${key}`"
                  :src="site.imgsrc"
                  :is-background="true"
                ></LazyLoadedImage>
              </a>
            </div>
          </div>
          <div class="columns is-centered align-center">
            <transition-group name="list-complete">
              <p
                v-if="!showMoreWebsitesNotice"
                :key="_uid + 1"
                class="list-complete-item"
             >
                <button
                  class="button is-medium is-warning"
                  @click.prevent="showMoreWebsitesNotice = true"
                >View all</button>
              </p>
              <p
                v-if="showMoreWebsitesNotice"
                :key="_uid + 2"
                class="list-complete-item"
              >More websites are coming soon. Please return to view them.</p>
            </transition-group>
          </div>
        </div>
      </section>

      <WaysSupport :version="version">
        <div slot="heading">
          <h1 class="section-title title">Ways to support our nonprofit’s work</h1>
        </div>        
      </WaysSupport>

      <AppFooter></AppFooter>
    </div>
  </div>
</template>

<script>
import Vue from "vue"
import VueMeta from "vue-meta"

Vue.use(VueMeta)

export default {
  name: "explore",
  /**
   * Uses dynamic import to speed up page performance.
   * See https://webpack.js.org/guides/code-splitting/ for reference.
   */
  components: {
    AppFooter: () => import("Components/general/AppFooter.vue"),
    AppHeader: () => import("Components/general/AppHeader.vue"),
    LazyLoadedImage: () => import("Components/plugins/LazyLoadedImage"),
    TopMenu: () => import("Components/general/TopMenu.vue"),
    NonprofitAjaxSearch: () => import("Components/general/NonprofitAjaxSearch.vue"),
    NonprofitFundraisers: () => import("Components/nonprofit/NonprofitFundraisers.vue"),
    NonprofitForm: () => import("Components/Volunteerathon/NonprofitForm.vue"),
    WaysSupport: () => import("Components/explore/WaysSupport.vue")
  },
  data () {
    return {
      showMoreWebsitesNotice: false,
      canRender: false,
      showSocialMedia: false,
      otherSites: [
        { name: "Quitathon", url: "https://quitathon.org", imgsrc: "/static/assets/images/other-sites/quitathon.png" },
        { name: "Loseathon", url: "https://loseathon.org", imgsrc: "/static/assets/images/other-sites/loseathon.png" },
        { name: "Bike for Good", url: "https://bike-for-good.org", imgsrc: "/static/assets/images/other-sites/bike-for-good.png" },
        { name: "Polar plunge for Good", url: "https://polar-plunge-for-good.org", imgsrc: "/static/assets/images/other-sites/polar-plunge-for-good.png" },
        { name: "Give it up for Good", url: "https://give-it-up.org", imgsrc: "/static/assets/images/other-sites/give-it-up-for-good.png" },
        { name: "Run for Good", url: "https://run-for-good.org", imgsrc: "/static/assets/images/other-sites/run-for-good.png" }
      ]
    }
  },
  metaInfo () {
    return {
      title: "Explore",
      meta: [
        { vmid: "og:title", property: "og:title", content: "Explore multiple ways to do good!" },
        { vmid: "description", name: "description", content: "Check out Volunteerathons to donate to and nonprofits that are doing good deeds and that also need your help." },
        { vmid: "twitter:card", property: "twitter:card", content: "summary_large_image" },
        { vmid: "og:image:width", property: "og:image:width", content: "1280" },
        { vmid: "og:image:height", property: "og:image:height", content: "680" },
        { vmid: "og:image", property: "og:image", content: `${this.$store.state.extra.request.protocol}://${this.$store.state.extra.request.host}/public/volunteerathon-screenshot.png` }
      ]
    }
  },
  mounted () {
    this.canRender = true
  },
  asyncData ({ store, route: { params: { ein } } }) {
    return new Promise((resolve, reject) => {
      return store.dispatch("FETCH_EXPLORE_FUNDRAISERS")
        .then(data => {
          resolve(data)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  computed: {
    fundraisers () {
      return this.$store.state.explore.fundraisers.data
    },
    version () {
      return parseInt(this.$route.query.version, 10) || 0
    }
  },
  methods: {
    goToNonprofit (nonprofit) {
      this.$router.push(`/nonprofit/${nonprofit.EIN}`)
    }
  }
}
</script>

<style lang="scss">
.version1 {
  .find-nonprofits__section-wrapper {
    .dropdown-toggle {
      border: 1px solid $color-text;
      font-size: 20px;
      input {
        &::placeholder,
        &::-ms-input-placeholder {
          color: rgba($color-text, 0.6);
        }
      }
    }
    .dropdown-menu {
      margin-top: 3px;
    }
  }
}
</style>

<style scoped lang="scss">
section {
  margin: 30px 0;
  @include breakpoint($tablet) {
    margin: 50px 0;
  }
  &:last-child {
    margin-bottom: 0;
  }
}

.find-nonprofits__section-wrapper {
  .section-intro {
    max-width: 850px;
    margin-left: auto;
    margin-right: auto;
  }
}

.version2 {
  .section-title {
    font-weight: 700;
    font-size: 28px;
    color: $color-text;

    @include breakpoint($tablet) {
      font-size: 38px;
    }
  }

  .examples__section-wrapper {
    background: $color-lightest-green;
    padding-top: 50px;
  }
  .other-sites__section-wrapper {
    background: $color-fundraiser-bg;
    padding-top: 50px;
    padding-bottom: 50px;
  }
}

.version0 {
  .section-title {
    color: $color-text;
  }

  .examples__section-wrapper {
    padding-top: 50px;
  }
  .find-nonprofits__section-wrapper {
    padding-top: 50px;
    padding-bottom: 20px;
    background: $color-blueish;
  }
  .other-sites__section-wrapper {
    background: $color-brownish;
    padding-top: 50px;
    padding-bottom: 50px;
  }
}

.version1 {
  .examples__section-wrapper {
    margin-top: 0;
  }

  .other-sites-img__wrapper {
    &.other-sites-0 {
      transform: scale(1.05) translateY(8%);
    }
    &.other-sites-1 {
      transform: scale(0.68);
    }
    &.other-sites-2 {
      transform: scale(0.7);
    }
    &.other-sites-3 {
      transform: scale(0.65);
    }
    &.other-sites-5 {
      transform: scale(0.75);
    }
  }

  .section-title {
    font-weight: 700;
    color: $color-text;
    font-size: 28px;

    &.title-blue {
      color: $color-emphasis;
    }
    @include breakpoint($tablet) {
      font-size: 38px;
    }
  }

  .examples__section-wrapper {
    padding-top: 50px;
  }
  .find-nonprofits__section-wrapper {
    padding-top: 50px;
    padding-bottom: 20px;
    background: $color-blueish;
  }
  .other-sites__section-wrapper {
    background: $color-brownish;
    padding-top: 50px;
    padding-bottom: 50px;
  }
}

.other-sites-img__wrapper {
  background-size: contain;
  background-position: center center;
  background-repeat: no-repeat;
  width: 100%;
  height: 0;
  padding-bottom: 50%;
  display: block;
  &.other-sites-1 {
    transform: scale(0.75);
  }
  &.other-sites-2 {
    transform: scale(0.7);
  }
  &.other-sites-3 {
    transform: scale(0.7);
  }
  &.other-sites-5 {
    transform: scale(0.75);
  }
}
.align-center {
  text-align: center;
}
.explore__wrapper {
  .page-wrapper {
    padding-top: 0;
    padding-bottom: 0;
  }
}

.support__wrapper {
  margin-top: 0;
}

.list-complete-item {
  transition: all 0.5s;
  display: inline-block;
  width: 100%;
}
.list-complete-enter, .list-complete-leave-to
/* .list-complete-leave-active below version 2.1.8 */ {
  opacity: 0;

}
.list-complete-leave-active {
  position: absolute;
  transform: translateX(400px)
}
</style>