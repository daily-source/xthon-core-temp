<template>
  <div class="view-user-account-page">
    <AppHeader layout="page"></AppHeader>
      <section class="centered-content">
        <div class="container">
          <h1 class="section-title title title-gray">404 - Not found!</h1>
          <p>The requested page couldn't be found. Please <router-link to="/">go to the home page</router-link> or navigate using the menu above.</p>
        </div>
      </section>
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
    AppHeader: () => import("Components/Volunteerathon/AppHeader.vue")
  },

  metaInfo () {
    return {
      title: "404"
    }
  }
}
</script>

<style scoped lang="scss">
</style>
