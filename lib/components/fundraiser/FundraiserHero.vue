<template>
  <div class="container is-fluid white-bg fundraiser-content__wrapper">
    <div class="columns fundraiser-content" v-if="!editing">
      <div class="column is-two-thirds-desktop fundraiser-content__left">
        <div class="fundraiser-photo-section">
          <flickity
            ref="flickity"
            class="main-carousel"
            :options="mainCarouselOptions"
          >
            <LazyLoadedImage
              class="fundraiser-photo-section__photo"
              :is-background="true"
              :src="item"
              :key="_uid + item"
              v-for="(item, index) in fundraiser.media.images"
            ></LazyLoadedImage>
            <div class="fundraiser-photo-section__photo fundraiser-photo-section__video plyr-wrapper" v-for="(item, index) in fundraiser.media.videos">
              <VuePlyrWrapper v-if="canRender">
                <vue-plyr :ref="`plyr_${fundraiser.media.images.length + index}`">
                  <div data-plyr-provider="youtube" :data-plyr-embed-id="item"></div>
                </vue-plyr>
              </VuePlyrWrapper>
            </div>

          </flickity>
        </div>
      </div>
      <div class="column is-one-third-desktop fundraiser-content__right">
        <div class="fundraiser-pledge">
          <div class="fundraiser-pledge__heading" v-if="fundraiser.User">
            <p class="button-wrapper" v-if="canEdit">
              <a class="button is-light is-rounded is-medium" @click="openEdition()" v-if="!editing">Edit this fundraiser</a>
            </p>
            <slot name="copytext">
              <p>
                {{fundraiser.User.firstName}} will volunteer {{fundraiser.fundraiserDetails.hours}} hours {{fundraiser.communityWork}} for <router-link :to="`/nonprofit/${fundraiser.Nonprofit.EIN}`">{{fundraiser.Nonprofit.NAME}}</router-link> to raise money for the same nonprofit                
              </p>
            </slot>
            <p class="fundraiser-pledge__subheading">
              <slot name="effortstext">Please support {{fundraiser.User.firstName}}'s efforts</slot>
            </p>
          </div>
          <div class="button fundraiser-pledge__cta is-success is-large">
            <DonateAction
              :fundraiser-id="fundraiser.fundraiser_id"
              trigger="fundraiser/hero">
              Donate now
            </DonateAction>
          </div>
          <div class="progress-bar fundraiser-pledge__progress-wrapper">
            <ProgressBar :details="fundraiser.fundraiserDetails" size="large" />
          </div>
          <div class="fundraiser-pledge__more-stats">
            <div class="fundraiser-pledge__goal">Goal: {{fundraiser.fundraiserDetails.goal | centsToUsd}}</div>
            <div class="fundraiser-pledge__goal">Days left: {{fundraiser.fundraiserDetails.daysLeft}}</div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="editing">
      <MediaEditor
        :media-source="fundraiser.media"
        location="fundraiser.media"
      >
        <h2 slot="heading">Edit the gallery</h2>
        <p slot="tagline" v-if="!fundraiser.media.images.length && !fundraiser.media.videos.length">You don't have any images or videos. A default image will be used.</p>
      </MediaEditor>
    </div>
  </div>
</template>

<script>
import DonateAction from "Components/general/DonateAction.vue"
import ProgressBar from "Components/general/ProgressBar.vue"
import Flickity from "Components/plugins/Flickity.vue"
import LazyLoadedImage from "Components/plugins/LazyLoadedImage.js"

export default {
  props: [ "fundraiser", "canEdit", "editing" ],
  components: {
    DonateAction,
    Flickity,
    LazyLoadedImage,
    ProgressBar,
    MediaEditor: () => import("Components/input/MediaEditor.vue"),
    InlineImageEditor: () => import("Components/input/InlineImageEditor.vue"),
    VuePlyrWrapper: () => import("Components/general/VuePlyrWrapper.vue")
  },
  data () {
    return {
      canRender: false,
      mainCarouselOptions: {
        initialIndex: 0,
        prevNextButtons: false,
        pageDots: true,
        wrapAround: true,
        autoPlay: false
      }
    }
  },
  methods: {
    openEdition () {
      this.$emit("edit:open")
    }
  },

  mounted () {
    this.canRender = true

    /** Listen to a flickity event:
     * if there's a slide change and the previous one had a video, pause it.
     */
    const flick = this.$refs.flickity

    flick.on("change", (current) => {
      var nextSlide = current + 1
      var prevSlide = current - 1
      if (nextSlide === flick.$flickity.cells.length) {
        nextSlide = 0
      }
      if (prevSlide < 0) {
        prevSlide = flick.$flickity.cells.length - 1
      }

      // Auto play if there's video in the selected cell.
      if (flick.$flickity.cells[current].element.className.indexOf("plyr") > -1) {
        setTimeout(() => {
          this.$refs[`plyr_${current}`][0].player.play()
        }, 100)
      }

      if (flick.$flickity.cells[prevSlide].element.className.indexOf("plyr") > -1) {
        setTimeout(() => {
          this.$refs[`plyr_${prevSlide}`][0].player.pause()
        }, 2500)
      }

      if (flick.$flickity.cells[nextSlide].element.className.indexOf("plyr") > -1) {
        setTimeout(() => {
          this.$refs[`plyr_${nextSlide}`][0].player.pause()
        }, 2500)
      }

      // Auto pause if there's video in the previously selected cell.
      this.$emit("slideChange", flick)
    })
  }
}
</script>

<style scoped lang="scss">
.fundraiser-content {
  &__wrapper {
    @include tablet {
      padding-top: 20px !important;
    }
  }
  &__left {
    @include mobile {
      padding-left: 0 !important;
    }
  }
  &__right {
    @include tablet {
      padding-left: 6px;
      display: flex;
    }
  }
}

.fundraiser-photo-section {
  width: 100vw;

  @include mobile {
    max-width: $max-flickity-width - 22px;
    margin-left: 0;
  }

  @include tablet {
    transform: translateX(0);
    width: calc(100% - 30px);
    height: 0;
    padding-bottom: calc(100% * 2/3 - 60px + 70px);
    overflow: hidden;
  }

  &__photo {
    width: 100vw;
    height: calc((100vw - 30px) * 2/3);
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;

    @include mobile {
      max-width: $max-flickity-width;
    }

    @include tablet {
      width: 102%;
      height: 0;
      padding-bottom: calc(100% * 2/3);
      overflow: hidden;
      background-color: $color-lightest-gray;
    }
  }
  &__thumbnail {
    width: 28.3333vw;
    height: calc(28.3333vw*3/4);
    background-size: cover;
    background-position: center;
    margin-right: 2.5vw;

    @include tablet {
      width: calc(5vw);
      height: calc(5vw*3/4);
      margin-right: 0.5vw;

      &:hover {
        cursor: pointer;
      }
    }
  }
  &__video {
    display: flex;
    > div {
      display: flex;
      align-items: center;
      justify-content: center;
      flex: 1;
      > div {
        flex: 1;
      }
    }
    @include tablet {
      height: 100%;
      padding-bottom: 0;
      overflow: hidden;
      background-color: $color-lightest-gray;
    }
  }
}

.fundraiser-pledge {
  margin-top: 20px;
  font-size: 17px;
  text-align: center;

  @include tablet {
    text-align: left;
    margin-bottom: 30px;
    margin-top: 0;
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: 0px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  p {
    font-size: 22px;
    &.fundraiser-pledge__subheading {
      font-size: 18px;
      color: $color-medium-gray;
      font-style: italic;
      margin-bottom: 20px;
    }
  }

  &__cta {
    text-transform: uppercase;
    margin-bottom: 20px;
    display: block;
  }

  &__stats {
    text-align: center;
    display: block;
    margin-bottom: 15px;
  }

  &__more-stats {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 10px;
  }
}

.button-wrapper {
  display: block;
  .button {
    width: 100%;
  }
}
</style>
