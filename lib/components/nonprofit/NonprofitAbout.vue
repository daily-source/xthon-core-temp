<template>
  <div class="nonprofit-extended">
    <div class="container">
      <div class="nonprofit-extended__separator"></div>
      <h2 ref="aboutHeading">About <span v-html="nonprofit.data.name || nonprofit.NAME"></span></h2>

      <NonprofitIRSData
        :nonprofit="nonprofit"
        :editing="editing"
        :can-edit="canEdit"
        ref="nonprofitIRSDataTable"
        v-on:edit:open="enableEdition()"
        v-on:edit:close="closeEdition()"
        v-on:edit:previous="openEdition('nonprofitEmail')"
        v-on:edit:next="openEdition('nonprofitAbout')"
      ></NonprofitIRSData>

      <div v-if="nonprofit.data.about || editing">
        <h2>About</h2>
        <div class="columns">
          <div class="nonprofit-extended__about column is-8-desktop">
            <div class="style-paragraph">
              <InlineFieldEditor
                type="textarea"
                ref="nonprofitAbout"
                :allow-empty="false"
                :minimum-length="5"
                error-text="This field can't be empty. It needs a meaningful description. HTML tags are not allowed."
                :value="nonprofit.data.about"
                :edition-is-enabled="editing"
                placeholder="Add a description."
                location="nonprofit.data.about"
                v-on:next:field="openEdition('nonprofitCity')"
                v-on:previous:field="openChildEdition('nonprofitName')"
              ></InlineFieldEditor>
            </div>
            <div class="helper-text" v-if="nonprofit.EIN">
              EMPLOYER ID NUMBER (EIN): {{nonprofit.EIN}}
            </div>
          </div>
          <div class="nonprofit-extended__icons column is-4-desktop">
            <div class="nonprofit-extended__icon" v-if="nonprofit.data">
              <Icons iconwidth="24px" iconheight="24px" icon="location" color="#f0f0f0" class="icon"
              />
              <div class="display-block">
                <InlineFieldEditor
                  type="text"
                  ref="nonprofitCity"
                  layout="inline"
                  :allow-empty="false"
                  :edition-is-enabled="editing"
                  error-text="This field can't be empty. HTML tags are not allowed"
                  :value="nonprofit.data.city"
                  :placeholder="`${nonprofit.CITY}, ${nonprofit.STATE}`"
                  location="nonprofit.data.city"
                  v-on:next:field="openEdition('nonprofitWebsite')"
                  v-on:previous:field="openEdition('nonprofitAbout')"
                ></InlineFieldEditor>
              </div>
            </div>
            <div class="nonprofit-extended__icon" v-if="nonprofit.data">
              <Icons iconwidth="24px" iconheight="24px" icon="link" color="#f0f0f0" class="icon"
                v-if="nonprofit.data.website || editing"
              />
              <div class="display-block">
                <InlineFieldEditor
                  type="url"
                  layout="inline"
                  ref="nonprofitWebsite"
                  :allow-empty="true"
                  :edition-is-enabled="editing"
                  error-text="Please enter a valid URL: https://example.org"
                  :value="nonprofit.data.website"
                  placeholder="Add a website"
                  location="nonprofit.data.website"
                  v-if="nonprofit.data.website || editing"
                  v-on:next:field="openEdition('nonprofitEmail')"
                  v-on:previous:field="openEdition('nonprofitCity')"
                ></InlineFieldEditor>
              </div>
            </div>
            <div class="nonprofit-extended__icon" v-if="nonprofit.data">
              <Icons iconwidth="24px" iconheight="24px" icon="email" color="#f0f0f0" class="icon"
                v-if="nonprofit.data.email || editing"
              />
              <div class="display-block">
                <InlineFieldEditor
                  type="email"
                  layout="inline"
                  ref="nonprofitEmail"
                  :allow-empty="false"
                  v-if="nonprofit.data.email || editing"
                  error-text="Please enter a valid email address. HTML tags are not allowed"
                  placeholder="Add a contact email"
                  :edition-is-enabled="editing"
                  :value="nonprofit.data.email"
                  location="nonprofit.data.email"
                  v-on:previous:field="openEdition('nonprofitWebsite')"
                ></InlineFieldEditor>
              </div>
            </div>
            <DonateAction
              :nonprofit-ein="nonprofit.EIN"
              v-if="!editing"
              trigger="nonprofit/about/data">
              <button class="button is-success nonprofit-extended__donate" type="submit">
                Donate
              </button>
            </DonateAction>
          </div>
        </div>
      </div>
      <div class="columns">
        <div class="nonprofit-extended__media column is-12-desktop">
          <div class="nonprofit-extended__icon">
            <Icons iconwidth="24px" iconheight="24px" icon="camera" color="#f0f0f0" class="icon"
              v-if="nonprofit.data.media && nonprofit.data.media.length || editing"
            />
            <p v-if="editing && nonprofit.data.media">
              <span>{{nonprofit.data.media.length}} Photos and videos</span>
            </p>
            <MediaViewer
              v-if="!editing && nonprofit.data.media && nonprofit.data.media.length"
              :media="nonprofit.data.media"
              v-on:modal:open="stopFlickity()"
              v-on:modal:close="startFlickity()"
              ref="mediaViewer"
            >
              <div slot="trigger">
                <a v-if="nonprofit.data.media">{{nonprofit.data.media.length}} Photos and videos</a>
              </div>
            </MediaViewer>
          </div>
          <MediaEditor
            v-if="editing"
            :media-source="nonprofit.data"
            location="nonprofit.data.media"
          ></MediaEditor>
          <flickity ref="carousel" class="nonprofit-extended__media-wrapper"
            v-if="nonprofit.data.media && !editing"
            :options="nonprofitMediaCarouselOptions"
            :class="{'short-wrapper': nonprofit.data.media.length < 3}"
          >
            <div
              @click=""
              v-for="(item, index) in nonprofit.data.media"
            >            
              <LazyLoadedImage
                class="nonprofit-extended__media-item"
                :is-background="true"
                :src="item.src"
                :key="item.src"
                v-if="item.type === 'image'"
              ></LazyLoadedImage>
              <LazyLoadedImage
                class="nonprofit-extended__media-item "
                :is-background="true"
                :src="`https://img.youtube.com/vi/${item.src}/mqdefault.jpg`"
                :key="item.src"
                v-if="item.type === 'video'"
              ></LazyLoadedImage>
            </div>
          </flickity>
        </div>
      </div>
      <SharingIconsRow
        :key="$route.fullPath"
        :nonprofit-ein="nonprofit.EIN"
        :route-path="$route.fullPath"
        trigger="nonprofit/about/shareIconsRow"
      ></SharingIconsRow>
    </div>
  </div>
</template>

<script>
import DonateAction from "Components/general/DonateAction.vue"
import SharingIconsRow from "Components/general/SharingIconsRow.vue"
import Icons from "Components/general/Icons.vue"
import Flickity from "Components/plugins/Flickity.vue"
import LazyLoadedImage from "Components/plugins/LazyLoadedImage.js"

export default {
  props: [ "nonprofit", "editing", "canEdit" ],
  components: {
    DonateAction,
    Icons,
    Flickity,
    SharingIconsRow,
    LazyLoadedImage,
    MediaEditor: () => import("Components/input/MediaEditor.vue"),
    NonprofitIRSData: () => import("Components/nonprofit/NonprofitIRSData.vue"),
    MediaViewer: () => import("Components/general/MediaViewer.vue"),
    InlineFieldEditor: () => import("Components/input/InlineFieldEditor.vue")
  },
  data () {
    return {
      nonprofitMediaCarouselOptions: {
        initialIndex: 0,
        prevNextButtons: false,
        pageDots: false,
        wrapAround: true,
        autoPlay: true
      }
    }
  },
  methods: {
    stopFlickity () {
      this.$refs.carousel.pausePlayer()
    },
    startFlickity () {
      this.$refs.carousel.unpausePlayer()
    },
    enableEdition () {
      this.$emit("edit:open")
    },
    openEdition (fieldName) {
      this.$refs[fieldName].openEdition()
    },
    closeEdition (fieldName) {
      this.$emit("edit:close")
    },
    openChildEdition (fieldName) {
      this.$refs.nonprofitIRSDataTable.openEdition(fieldName)
    },
    triggerMediaViewer (cell) {
      this.$refs.mediaViewer.openModal()
      this.$refs.mediaViewer.$refs.flickity.select(cell)
    }
  },
  mounted () {
    const carousel = this.$refs.carousel
    if (carousel) {
      carousel.on("staticClick", (event, pointer, cellElement, cellIndex) => {
        this.triggerMediaViewer(cellIndex)
      })
    }
  }
}
</script>

<style scoped lang="scss">
.nonprofit-extended {
  background-color: rgba($color-light-gray, 0.35);
  padding-bottom: 20px;
  margin-bottom: 40px;

  .helper-text {
    font-size: 12px;
  }

  &__separator {
    padding-top: 60px;
    max-width: 60%;
    margin: auto;
  }
  &__icon {
    display: flex;
    flex-direction: row;
    align-content: center;

    .icon {
      width: 30px;
      text-align: center;
      display: block;
    }
  }
  &__about {
    @include tablet {
      width: 50%;
    }
    @include widescreen {
      width: 66.66667%;
    }
  }
  &__icons {
    @include tablet {
      width: 50%;
    }
    @include widescreen {
      width: 33.33333%;
    }
  }
  &__media {
    margin-bottom: 20px;

    .icon {
      margin-bottom: 20px;
    }
    &.column {
      padding: 0;
    }
  }
  &__media-wrapper {
    width: calc(100vw);
    height: calc(100vw*3/4);
    overflow: hidden;
    transform: translateX(-20px);

    @include tablet {
      transform: translateX(0);
      width: 100%;
      height: 0;
      padding-bottom: 21%;
      text-align: left;
    }
    &.short-wrapper {
      @include tablet {
        width: calc(990px*0.8/3);
      }

    }
  }
  &__media-item {
    width: 100vw;
    height: calc(100vw*3/4);
    background-size: cover;
    background-position: center;

    @include tablet {
      width: calc(990px*0.8/3);
      height: calc(990px*0.8/3*3/4);
      border-right: 4px solid $white;
    }
    @include fullhd {
      width: calc(1140px*0.8/3);
      height: calc(1140px*0.8/3*3/4);
      border-right: 4px solid $white;
    }
  }
  &__share-figure {
    margin: 30px 0;
  }

  th {
    padding-right: 20px;
  }

  &__donate {
    margin-top: 10px;
  }
}

.nonprofit-description {
  margin-bottom: 30px;
  font-size: 20px;
  line-height: 1.5;

  @include tablet {
    padding: 0 70px;
  }

  &__manage-cta {
    display: flex;
    height: 100%;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-end;
    button {
      font-size: 1.1rem;
    }
  }
}

.display-block {
  flex: 1;
}
</style>
