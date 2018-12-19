<template>
  <div>
    <section class="nonprofit-hero">
      <InlineImageEditor
        class="hero is-medium nonprofit-hero__hero-wrapper"
        location="nonprofit.data.hero"
        ref="imageEditor"
        :item="nonprofit.data.hero"
        :is-background-image="true"
        :open-default="false"
        :edition-is-enabled="editing"
        :is-standalone="true"
        :disable-orientation="true"
        :initial-ratio="0.3"
        :default-image="nonprofit.data.default_hero"
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
          ref="imageEditor"
          :item="nonprofit.data.logo"
          :is-background-image="true"
          :open-default="false"
          :edition-is-enabled="editing"
          :is-standalone="true"
          :disable-orientation="true"
          :required="false"
          :key="_uid + '_' + nonprofit.EIN"
          default-text="Add a logo"
          layout="overlay"
          type="avatar"
          v-if="nonprofit.data && nonprofit.data.logo || editing"
          v-on:edition:open="newImageOpenId = $event"
          v-on:edition:close="newImageOpenId = null"
        ></InlineImageEditor>
      </div>
      <div class="container columns center">
        <div class="nonprofit-hero__nonprofit-name column is-6-tablet is-7-desktop is-7-widescreen is-7-fullhd" :class="{'not-claimed': !nonprofit.data.logo && !editing}" v-if="!nonprofit.data.name">
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
        <div class="nonprofit-hero__nonprofit-name column is-6-tablet is-7-desktop is-7-widescreen is-7-fullhd" :class="{'not-claimed': !nonprofit.data.logo}" v-if="nonprofit.data.name">
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
            trigger="nonprofit/hero/cta">
            <div class="button nonprofit-hero__cta-donate">
              Donate
            </div>
          </DonateAction>
          <div class="button nonprofit-hero__cta-share" @click="share()">
            <transition name="slide-fade">
              <ShareBox
                v-if="openShareBox"
                class="share-box__wrapper"
                :text="shareText"
                :via="siteName"
                :title="shareWindowTitle" />
            </transition>
            <Icons iconwidth="16px" iconheight="16px" icon="share" color="#ffffff" class="share-icon-trigger" />
            Share
          </div>
          <div class="nonprofit-hero__cta-manage">
            <a @click="enableEdition()" class="unselectable" v-if="!editing">Manage this nonprofit</a>
            <a @click="closeEdition()" class="unselectable" v-if="editing">Close edition</a>
          </div>
        </div>
      </div>
      <div class="container">
        <div class="nonprofit-intro" v-if="common.nonprofit">
          {{common.nonprofit.intro}}
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import DonateAction from "Components/general/DonateAction.vue"
import ShareBox from "Components/general/ShareBox.vue"
import Icons from "Components/general/Icons.vue"

export default {
  props: [ "common", "nonprofit", "editing" ],
  components: {
    DonateAction,
    Icons,
    ShareBox,
    InlineFieldEditor: () => import("Components/input/InlineFieldEditor.vue"),
    InlineImageEditor: () => import("Components/input/InlineImageEditor.vue")
  },
  data () {
    return {
      showLoginModal: false,
      shareText: "Check out this nonprofit!",
      siteName: "Volunteerathon",
      shareWindowTitle: "Share Nonprofit",
      openShareBox: false
    }
  },
  computed: {
    loggedIn () {
      return this.$store.state.user.loggedIn
    }
  },
  methods: {
    share (commentId) {
      this.openShareBox = !this.openShareBox
    },
    enableEdition () {
      this.$emit("edit:open")
    },
    closeEdition () {
      this.$emit("edit:close")
    }
  }
}
</script>

<style scoped lang="scss">
.nonprofit-hero {
  &__hero-wrapper {
    background-size: cover;
    background-position: bottom center;
    position: relative;
    max-height: 390px;
    min-height: 390px;
  }

  &__hero-container {
    padding: 0;
    min-width: 90%;

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
      left: 20px;
    }
    @include widescreen {
      top: unset;
      left: unset;
      bottom: -80px;
      width: 200px;
      height: 200px;
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

  &__cta-donate {
    background-color: rgba($color-emphasis-alt, 0.8);

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
    font-size: 12px;

    @include tablet {
      background: transparent;
      width: 100%;
    }
  }
}
</style>