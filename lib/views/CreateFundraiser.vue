<template>
  <div class="">
    <UserDialog
      :spinner="spinner"
      :state="userDialogModal"
      :disable-close= "userDialogDisableClose"
      v-on:modal:close="closeUserDialog()"
    >
      <div slot="header">{{userDialogHeading}}</div> 
      <div slot="content"><p>{{userDialogMessage}}</p></div> 
    </UserDialog>

    <AppHeader layout="app"></AppHeader>

    <CreateFundraiserForm
      ref="fundraiserForm"
      submit-button-label="Submit"
      v-on:submit:form="validateAndSubmit($event)"
    >
      <div slot="heading"><h1>Change the world in 3 easy steps:</h1></div>
    </CreateFundraiserForm>

    <AppFooter></AppFooter>
  </div>
</template>

<script>
import Vue from "vue"
import VueMeta from "vue-meta"

Vue.use(VueMeta)

export default {
  name: "nonprofit",
  data () {
    return {
      userDialogModal: false,
      userDialogHeading: "Processing...",
      userDialogMessage: "",
      userDialogSpinner: false,
      userDialogDisableClose: false,
      spinner: true
    }
  },
  /**
   * Uses dynamic import to speed up page performance.
   * See https://webpack.js.org/guides/code-splitting/ for reference.
   */
  components: {
    AppFooter: () => import("Components/general/AppFooter.vue"),
    AppHeader: () => import("Components/general/AppHeader.vue"),
    CreateFundraiserForm: () => import("Components/Volunteerathon/CreateFundraiserForm.vue"),
    UserDialog: () => import("Components/general/UserDialog.vue")
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
