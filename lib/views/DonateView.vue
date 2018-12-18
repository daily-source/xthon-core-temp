<template>
  <div class="modal is-active" :class="`parent__${parent}`">
    <div class="modal-background"></div>
    <div class="modal-content donate-view donate-view__wrapper" id="donate-view-modal-wrapper">
      <transition name="fade" mode="out-in">
        <DonateForm
          :trigger="donationData.initiator.trigger"
          :parent="parent"
          :nonprofit="nonprofit"
          :fundraiser="fundraiser"
          :giving-levels="typeof fundraiser !== 'undefined' ? fundraiser.giving_levels : null"
          v-if="donationStatus === 'started'"
          v-on:success="donationStatus = 'thanks'"
          v-on:logged:in="scrollModalTop()"
          v-on:close="$emit('close')"
        ></DonateForm>
      </transition>
      <transition name="fade" mode="out-in">
        <DonateThankYou
          v-if="donationStatus === 'thanks'"
          :parent="parent"
          :fundraiser="fundraiser"
          :nonprofit="nonprofit"
          v-on:success="donationStatus = 'userCreated'"
        ></DonateThankYou>
      </transition>
      <transition name="fade" mode="out-in">
        <DonateUserCreated
          v-if="donationStatus === 'userCreated'"
          v-on:success="$emit('close')"
        ></DonateUserCreated>
      </transition>
      <button class="modal-close is-large" aria-label="close" @click="$emit('close')"></button>
    </div>
  </div>
</template>

<script>
import Vue from "vue"
import VueMeta from "vue-meta"

Vue.use(VueMeta)

export default {
  props: [ "parent" ],
  /**
   * Uses dynamic import to speed up page performance.
   * See https://webpack.js.org/guides/code-splitting/ for reference.
   */
  components: {
    DonateForm: () => import("Components/donate/DonateForm.vue"),
    DonateThankYou: () => import("Components/donate/DonateThankYou.vue"),
    DonateUserCreated: () => import("Components/donate/DonateUserCreated.vue")
  },
  data () {
    return {
      donationStatus: "started"
    }
  },
  computed: {
    fundraiser () {
      return this.$store.state.fundraiser
    },
    nonprofit () {
      return this.$store.state.nonprofit
    },
    donationData () {
      return this.$store.state.userActions.donation
    },
    common () {
      return this.$store.state.common
    }
  },
  mounted () {
    document.body.classList.add("no-scroll")
  },
  destroyed () {
    document.body.classList.remove("no-scroll")
  },
  methods: {
    scrollModalTop () {
      const wrapper = this.$el.querySelector("#donate-view-modal-wrapper")
      wrapper.scrollTop = 0
    }
  },
  metaInfo () {
    var description = this.parent === "nonprofit" ? `Donate to this tax exempt organization. ${this.nonprofit.NTEE_CD || this.nonprofit.ACTIVITY}` : `Support ${this.fundraiser.participant.name}'s volunteerathon: ${this.fundraiser.name} for the nonprofit ${this.fundraiser.Nonprofit.name}`
    var title = this.parent === "nonprofit" ? this.nonprofit.NAME : this.fundraiser.name
    var imgSrc =
    this.parent === "nonprofit"
      ? this.nonprofit.data.hero
        ? this.nonprofit.data.hero.src
        : this.nonprofit.data.default_hero.src
      : this.fundraiser.data.media[0].src
    var img = `${this.$store.state.extra.request.protocol}://${this.$store.state.extra.request.host}${imgSrc}`
    var imgWidth = this.parent === "nonprofit" ? 1024 : 800
    var imgHeight = this.parent === "nonprofit" ? 340 : 533
    return {
      title: `Donate | ${title}`,
      meta: [
        { vmid: "description", name: "description", content: description },
        { vmid: "title", property: "title", content: title },
        { vmid: "og:title", property: "og:title", content: title },
        { vmid: "og:description", property: "og:description", content: description },
        { vmid: "twitter:card", property: "twitter:card", content: "summary_large_image" },
        { vmid: "og:image", property: "og:image", content: img },
        { vmid: "og:image:width", property: "og:image:width", content: imgWidth },
        { vmid: "og:image:height", property: "og:image:height", content: imgHeight }
      ]
    }
  }
}
</script>

<style scoped lang="scss">
.donate-view {
  .page-title {
    text-align: center;
    color: $color-text;
    font-weight: bold;
    &__first {
      display: block;
      font-weight: bold;
      font-size: 30px;
      margin-bottom: 10px;

      @include tablet {
        margin-bottom: 0;
      }
    }
    &__second {
      color: $color-emphasis-alt;      
    }
  }
}

.parent__nonprofit {
  .page-title {
    &__first {
      font-weight: normal;
      font-size: 26px;
    }
  }
}
</style>
