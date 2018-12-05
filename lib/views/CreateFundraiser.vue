<template>
  <div class="">
    <AppHeader layout="app"></AppHeader>

    <NonprofitForm submit-button-label="Submit">
      <div slot="heading"><h1>Change the world in 3 easy steps:</h1></div>
    </NonprofitForm>

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
    AppHeader: () => import("Components/general/AppHeader.vue"),
    NonprofitForm: () => import("Components/nonprofit/NonprofitForm.vue")
  },
  /**
   * This uses vue-meta in order to render the tags in the page. For the home page, it uses
   * the default values plus a custom description and title. The og:image property is defined
   * in the template, ./src/App.vue
   */
  metaInfo () {
    var description = "Create a fundraiser and do good."
    var title = "Create"
    return {
      title: title,
      meta: [
        { vmid: "description", name: "description", content: description },
        { vmid: "og:title", property: "og:title", content: title },
        { vmid: "og:description", property: "og:description", content: description }
      ]
    }
  }
}
</script>

<style scoped lang="scss">


</style>
