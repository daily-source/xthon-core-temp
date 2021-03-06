<template>
  <div>
    <ShareByEmail
      :state="shareByEmailIsOpen"
      v-on:dismiss="shareByEmailIsOpen = false"
    ></ShareByEmail>
    <section class="nonprofit-hero">
      <InlineImageEditor
        class="hero is-medium nonprofit-hero__hero-wrapper"
        location="nonprofit.data.hero"
        ref="imageEditor"
        filename="hero"
        :item="nonprofit.data.hero"
        :is-background-image="true"
        :open-default="false"
        :edition-is-enabled="editing"
        :is-standalone="true"
        :disable-orientation="true"
        :initial-ratio="0.3"
        :default-image="nonprofit.data.default_hero.src || nonprofit.data.default_hero"
        :required="true"
        :key="_uid + '_' + nonprofit.EIN"
        layout="overlay"
        type="avatar"
        v-on:edition:open="newImageOpenId = $event"
        v-on:edition:close="newImageOpenId = null"
      ></InlineImageEditor>
      <div class="container nonprofit-hero__hero-container">
        <InlineImageEditor
          class="nonprofit-hero__logo-wrapper"
          location="nonprofit.data.logo"
          filename="logo"
          ref="imageEditor"
          :item="nonprofit.data.logo"
          :is-background-image="true"
          :open-default="false"
          :edition-is-enabled="editing"
          :is-standalone="true"
          :disable-orientation="true"
          :required="false"
          :key="nonprofit.data && nonprofit.data.logo ? nonprofit.data.logo : _uid + '_' + nonprofit.EIN"
          default-text="Add a logo"
          layout="overlay"
          type="avatar"
          v-if="nonprofit.data && nonprofit.data.logo || editing"
          v-on:edition:open="newImageOpenId = $event"
          v-on:edition:close="newImageOpenId = null"
        ></InlineImageEditor>
      </div>
      <div class="container columns center nonprofit-name__wrapper">
        <div
          class="nonprofit-hero__nonprofit-name column is-6-tablet is-7-desktop is-7-widescreen is-7-fullhd"
          :class="{'not-claimed': !nonprofit.data.logo && !editing}" v-if="!nonprofit.data.name"
        >
          <InlineFieldEditor
            type="textarea"
            ref="nonprofitName"
            :remove-returns="true"
            :allow-empty="false"
            error-text="This field can't be empty. HTML tags are not allowed"
            :edition-is-enabled="editing"
            :value="nonprofit.NAME"
            location="nonprofit.data.name"
          ></InlineFieldEditor>
        </div>
        <div class="nonprofit-hero__nonprofit-name column is-6-tablet is-7-desktop is-7-widescreen is-7-fullhd" :class="{'not-claimed': !nonprofit.data.logo && !editing}" v-if="nonprofit.data.name">
          <InlineFieldEditor
            type="textarea"
            ref="nonprofitName"
            :remove-returns="true"
            :allow-empty="false"
            error-text="This field can't be empty"
            :edition-is-enabled="editing"
            :value="nonprofit.data.name"
            location="nonprofit.data.name"
          ></InlineFieldEditor>
        </div>
        <div class="nonprofit-hero__cta-wrapper column is-6-tablet is-5-desktop is-5-widescreen is-5-fullhd" :class="{'not-claimed': !nonprofit.data.logo}">
          <div class="button nonprofit-hero__cta-fundraise">Fundraise</div>
          <DonateAction
            :nonprofit-ein="nonprofit.EIN"
            trigger="nonprofit/hero/cta"
            class='nonprofit-hero__donate-wrapper'  
          >
            <div class="button nonprofit-hero__cta-donate">
              Donate
            </div>
          </DonateAction>
          <div class="button nonprofit-hero__cta-share" @click="toggleShareBox()">
            <transition name="slide-fade">
              <ShareBox
                v-if="shareBoxIsOpen"
                class="share-box__wrapper"
                :text="shareText"
                :via="siteName"
                v-on:email:open="shareByEmailIsOpen = true"
                v-on:close="toggleShareBox(false)"
                :title="shareWindowTitle" />
            </transition>
            <Icons iconwidth="16px" iconheight="16px" icon="share" color="#ffffff" class="share-icon-trigger" />
            Share
          </div>
          <div class="nonprofit-hero__cta-manage">
            <a @click="claimOrganization()" class="unselectable" v-if="!claimed">Claim this organization</a>
            <div v-if="claimed">
              <a @click="enableEdition()" class="unselectable" v-if="!editing && canEdit">Manage this nonprofit</a>
              <a @click="closeEdition()" class="unselectable" v-if="editing">Close edition</a>
            </div>
          </div>
        </div>
      </div>
      <div class="container">
        <div
          :class="{'transparent-block': editing}"
          class="nonprofit-intro allow-html"
          v-if="common.nonprofit"
          v-html="common.nonprofit.intro"
        ></div>
      </div>
    </section>
  </div>
</template>

<script>
import DonateAction from "Components/general/DonateAction.vue"
import ShareBox from "Components/general/ShareBox.vue"
import Icons from "Components/general/Icons.vue"

export default {
  props: [ "common", "nonprofit", "editing", "canEdit" ],
  components: {
    DonateAction,
    Icons,
    ShareBox,
    InlineFieldEditor: () => import("Components/input/InlineFieldEditor.vue"),
    InlineImageEditor: () => import("Components/input/InlineImageEditor.vue"),
    ShareByEmail: () => import("Components/general/ShareByEmail.vue")
  },
  data () {
    return {
      showLoginModal: false,
      shareText: "Check out this nonprofit!",
      siteName: "Volunteerathon",
      shareWindowTitle: "Share Nonprofit",
      shareBoxIsOpen: false,
      shareByEmailIsOpen: false
    }
  },
  computed: {
    loggedIn () {
      return this.$store.state.user.loggedIn
    },
    claimed () {
      return this.$store.state.nonprofit.data.claimed
    }
  },
  methods: {
    claimOrganization () {
      this.$router.push({
        name: 'nonprofit/claim',
        params: {
          ein: this.$route.params.ein
        }
      })
    },
    openShareBox () {
      this.toggleShareBox(true)
    },
    toggleShareBox (state) {
      this.shareBoxIsOpen = !this.shareBoxIsOpen
    },
    enableEdition () {
      this.$emit("edit:open")
    },
    closeEdition () {
      this.$emit("edit:close")
    },
    updateNonprofitLogo (blob) {
      this.userDialogModal = true
      this.userDialogSpinner = true
      return this.$store.dispatch("SAVE_REPLACE_IMAGE", {
        image: blob,
        nonprofitId: this.nonprofit.EIN,
        location: 'logo',
        entity: 'nonprofit',
        replace: true
      })
        .then(() => {
          setTimeout(() => {
            this.userDialogModal = false
          }, 500)
        })
        .catch(err => {
          this.userDialogSpinner = false
          this.userDialogHeading = "Error"
          this.userDialogMessage = `An error has occurred: ${err.response.statusText}`
        })
    },
  }
}
</script>

<style scoped lang="scss">
.nonprofit-hero {
  &__hero-wrapper {
    background-size: cover;
    background-position: bottom center;
    position: relative;
    max-height: 360px;
    min-height: 360px;
  }

  &__hero-container {
    padding: 0;
    min-width: 90%;
    position: relative;

    @include tablet {
      min-width: 0;
      width: 100vw;
    }
  }

  &__logo-wrapper {
    position: absolute;
    background-size: cover;
    width: 140px;
    height: 140px;
    top: 20px;

    @include tablet {
      top: unset;
      bottom: -70px;
    }
    @include widescreen {
      top: unset;
      bottom: -80px;
      width: 200px;
      height: 200px;
    }
    .field-wrapper {
      position: relative;
      z-index: 2;
    }
  }

  .container.center {
    margin: auto;
  }

  &__nonprofit-name {
    font-size: 30px;
    color: $color-text;
    font-weight: bold;
    margin-top: 20px;
    padding-bottom: 20px;
    padding: 0;

    @include tablet {
      padding-left: 140px;
      margin-bottom: 30px;
    }

    @include widescreen {
      padding-left: 200px;
      margin-bottom: 30px;
    }

    @include fullhd {
      padding-left: 220px;
      margin-bottom: 30px;
    }

    &.not-claimed {
      padding-left: 0;
    }
  }

  &__cta-wrapper {
    text-align: center;
    position: absolute;
    bottom: 145px;
    text-align: right;
    display: flex;
    flex-direction: column;
    right: 0;
    margin-right: 0;
    flex-wrap: wrap;
    padding-right: 0;

    &.not-claimed {
      bottom: 190px;
    }

    @include tablet {
      margin-top: 10px;
      text-align: right;
      position: static;
      padding-right: 0;
      flex-direction: row;
      align-items: flex-start;
      justify-content: flex-end;
    }

    @include desktop {
      height: 100%;
    }

    .button {
      text-transform: uppercase;
      margin-left: 20px;
      margin-bottom: 10px;
      font-weight: bold;
      font-size: 12px;
      border-radius: 10px;
      padding: 20px 10px;
      min-width: 40vw;
      color: $white;
      border: none;
      box-shadow: 1px 1px 10px rgba($color-text, 0.5);
      transition: background-color 0.2s ease-in-out;

      @include mobile {
        min-width: 40vw;
        margin-left: 10px;
        padding: 15px 20px;
      }
      @include tablet {
        min-width: auto;
        margin-left: 10px;
        padding: 15px 20px;
      }
      @include widescreen {
        margin-left: 10px;
        padding: 15px 20px;
      }
    }
  }

  &__donate-wrapper {
    margin-left: 10px;

    @include tablet {
      padding-left: 0;
    }
  }

  &__cta-donate {
    background-color: rgba($color-emphasis-alt, 0.8);

    @include mobile {
      width: 100% !important;
      margin-left: 0 !important;
    }

    &:hover {
      background-color: rgba($color-emphasis-alt, 1);
    }
  }

  &__cta-fundraise {
    background-color: rgba($color-emphasis, 0.8);

    &:hover {
      background-color: rgba($color-emphasis, 1);
    }
  }

  &__cta-share {
    background-color: rgba($color-text, 0.5);
    position: relative;

    .share-icon-trigger {
      margin-right: 10px !important;
      margin-top: 5px;
      display: block;
    }

    &:hover {
      background-color: rgba($color-text, 0.7);
    }
    .share-box__wrapper {
      position: absolute;
      right: 0;
      top: -20px;

      @include mobile {
        top: 80px;
      }
    }
  }
  &__cta-manage {
    font-size: 1em;

    @include tablet {
      background: transparent;
      width: 100%;
    }
  }
}
.nonprofit-name__wrapper {
  position: relative;
  z-index: 0;
}
.allow-html {
  transition: opacity 0.1s ease-in-out;
  &.transparent-block {
    opacity: 0;
    display: none;
    @include tablet {
      display: block;
    }
  }
}
</style>
<style lang="scss">
.nonprofit-hero__logo-wrapper {
  .field-wrapper {
    position: relative;
    z-index: 2;
  }
}

.nonprofit-hero__logo-wrapper {
  .field-wrapper {
    &.is-open-true {
      z-index: 20 !important;
    }
  }
}
</style>