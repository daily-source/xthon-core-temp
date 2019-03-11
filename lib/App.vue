<template>
  <div id="app">
    <div id="fb-root"></div>
    <transition name="page" mode="out-in">
      <router-view class="view"></router-view>
    </transition>

    <!--
      TODO: remove block below.
      This menu is temporary, only useful for development. Should be removed once the site is up.
    -->
    <nav class="fake-menu">
      <router-link to="/nonprofit/43178037">Nonprofit (Generic)</router-link>
      <router-link to="/nonprofit/237069110">Nonprofit (Claimed)</router-link>
      <router-link to="/fundraiser/8">Fundraiser (8)</router-link>
      <router-link to="/fundraiser/6">Fundraiser (6)</router-link>
      <router-link to="/nonprofit/99999943138428">nonexistent Nonprofit</router-link>
    </nav>
  </div>
</template>

<style src='./assets/scss/main.scss'></style>

<script>
import Vue from "vue"
import VueMeta from "vue-meta"
import AppHeader from "Components/general/AppHeader.vue"
import VueScrollTo from "vue-scrollto"
import Croppa from "vue-croppa"

import Datetime from 'vue-datetime'
import 'vue-datetime/dist/vue-datetime.css'
 
Vue.use(VueScrollTo)
Vue.use(VueMeta)
Vue.use(Croppa)
Vue.use(Datetime)

export default {
  name: "App",
  components: {
    AppHeader
  },
  /**
   * Fetch the /api/common data to populate the menus and content that might come from the DB.
   */
  beforeCreate () {
    return this.$store.dispatch("FETCH_COMMON_DATA")
      .then(data => {
        return data
      })
      .catch(err => {
        console.log(err)
      })
  },
  mounted () {
    require("Components/plugins/FacebookSDK.js")
  },
  metaInfo () {
    /**
     * If this is a nonprofit, add structured data for the nonprofit.
     * Otherwise, add structured data for the Daily Source organization.
     * This cannot be changed in the views, therefore it has to be added here.
     */
    var structuredData = {}
    if (this.$route.name === "nonprofit") {
      structuredData = {
        "@context": `${this.$store.state.extra.request.protocol}://schema.org`,
        "@type": "Organization",
        "url": this.$store.state.extra.request.fullUrl,
        "name": this.$store.state.nonprofit.NAME,
        "address": {
          "@type": "PostalAddress",
          "streetAddress": this.$store.state.nonprofit.STREET,
          "addressLocality": this.$store.state.nonprofit.CITY,
          "addressRegion": this.$store.state.nonprofit.STATE,
          "postalCode": this.$store.state.nonprofit.ZIP,
          "addressCountry": "USA"
        }
      }
    } else {
      structuredData = {
        "@context": `${this.$store.state.extra.request.protocol}://schema.org`,
        "@type": "Organization",
        "url": `${this.$store.state.extra.request.protocol}://${this.$store.state.extra.request.host}`,
        "name": "Volunteerathon",
        "contactPoint": {
          "@type": "ContactPoint",
          "email": "info@dailysource.org",
          "url": "https://dailysource.org",
          "contactType": "Customer support"
        },
        "address": {
          "@type": "PostalAddress",
          "postOfficeBoxNumber": "321",
          "streetAddress": "3800 S Tamiami Trail",
          "addressLocality": "Sarasota",
          "addressRegion": "FL",
          "postalCode": "34239",
          "addressCountry": "USA"
        }
      }
    }
    /*
     * This is the default meta configuration. Other views can rewrite the info.
    */
    var description = "Double the results, half the effort. A Volunteerathon® lets you make a far greater impact with your time than traditional fundraising events."
    var title = "Create a volunteerathon and do good!"
    return {
      title: "",
      titleTemplate: "%s | Volunteerathon",
      htmlAttrs: {
        lang: "en",
        amp: undefined
      },
      headAttrs: {
        test: true
      },
      meta: [
        { vmid: "title", property: "title", content: title },
        { vmid: "description", name: "description", content: description },
        { vmid: "og:description", property: "og:description", content: description },
        { vmid: "og:url", property: "og:url", content: this.$store.state.extra.request.fullUrl },
        { vmid: "og:type", property: "og:type", content: "website" },
        { vmid: "og:title", property: "og:title", content: title },
        { vmid: "og:image:width", property: "og:image:width", content: "384" },
        { vmid: "og:image:height", property: "og:image:height", content: "384" },
        { vmid: "og:image", property: "og:image", content: `${this.$store.state.extra.request.protocol}://${this.$store.state.extra.request.host}/public/logo-384.png` },
        { vmid: "og:site_name", property: "og:site_name", content: "Volunteerathon" },
        { vmid: "twitter:card", property: "twitter:card", content: "summary" },
        { vmid: "twitter:site", property: "twitter:site", content: "@volunteerathon" },
        { vmid: "twitter:creator", property: "twitter:creator", content: "@volunteerathon" },
        { vmid: "fb:app_id", property: "fb:app_id", content: process.env.FB_APP_ID }
      ],
      script: [
        {
          innerHTML: JSON.stringify(structuredData),
          type: "application/ld+json"
        }
      ],
      __dangerouslyDisableSanitizers: ["script"]
    }
  }
}
</script>

<style scoped lang="scss">
.view {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  justify-content: space-between;
}

/**
 * TODO: remove styles below.
 * The styles below are temporary and should be removed once the site is up.
 */
.fake-menu {
  display: none;
  position: fixed;
  opacity: 0;
  bottom: 40px;
  left: 20px;
  padding: 10px;
  transition: all 0.2s ease-in-out;
  background-color: rgba(0,0,0,0.8);
  z-index: 20000;
  font-size: 16px;
  a {
    display: block;
  }

  &:hover {
    opacity: 1;
  }
  @include widescreen {
    display: block;
  }
}
</style>