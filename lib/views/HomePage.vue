<template>
  <div class="view-home-page">
    <AppHeader layout="page"></AppHeader>
    <TopMenu></TopMenu>
    <HomeHero
      :headline="home.hero.headline"
      :imgsrc="home.hero.imgsrc"
      :tagline="home.hero.tagline"
      :cta="home.hero.cta"
    ></HomeHero>
    <HomeSection2
      :headline="home.section2.headline"
      :tagline="home.section2.tagline"
      :boxes="home.section2.boxes"
      :results="home.section2.results"
    ></HomeSection2>
    <HomeSection3
      :headline="home.section3.headline"
      :tagline="home.section3.tagline"
      :boxes="home.section3.boxes"
      :bottomline="home.section3.bottomline"
      :results="home.section3.results"
    ></HomeSection3>
    <HomeSection4
      :headline="home.section4.headline"
      :boxes="home.section4.boxes"
    ></HomeSection4>
    <NonprofitForm submit-button-label="Submit"></NonprofitForm>
    <AppFooter></AppFooter>
  </div>
</template>

<script>
import Vue from "vue"
import VueMeta from "vue-meta"

Vue.use(VueMeta)

export default {
  name: "nonprofit",
  /**
   * Uses dynamic import to speed up page performance.
   * See https://webpack.js.org/guides/code-splitting/ for reference.
   */
  components: {
    AppFooter: () => import("Components/general/AppFooter.vue"),
    AppHeader: () => import("Components/Volunteerathon/AppHeader.vue"),
    HomeHero: () => import("Components/Volunteerathon/HomeHero.vue"),
    TopMenu: () => import("Components/general/TopMenu.vue"),
    HomeSection2: () => import("Components/Volunteerathon/HomeSection2.vue"),
    HomeSection3: () => import("Components/Volunteerathon/HomeSection3.vue"),
    HomeSection4: () => import("Components/Volunteerathon/HomeSection4.vue"),
    NonprofitForm: () => import("Components/Volunteerathon/NonprofitForm.vue")
  },

  /**
   * Fetch data and store it just before entering the view.
   */
  asyncData ({ store, route: { params: { ein } } }) {
    return new Promise((resolve, reject) => {
      return store.dispatch("FETCH_HOME_PAGE")
        .then(data => {
          resolve(data)
        })
        .catch(err => {
          reject(err)
        })
    })
  },

  /**
   * This uses vue-meta in order to render the tags in the page. For the home page, it uses
   * the default values plus a custom description and title. The og:image property is defined
   * in the template, ./src/App.vue
   */
  metaInfo () {
    var description = "Double the results, half the effort. A Volunteerathon® lets you make a far greater impact with your time than traditional fundraising events."
    var title = "Create a volunteerathon and do good!"
    return {
      title: "Home",
      meta: [
        { vmid: "description", name: "description", content: description },
        { vmid: "og:title", property: "og:title", content: title },
        { vmid: "og:description", name: "og:description", content: description }
      ]
    }
  },
  /**
   * Return stored data for this view.
   */
  computed: {
    home () {
      return this.$store.state.home
    }
  }
}
</script>

<style scoped lang="scss">
</style>
