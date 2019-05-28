<template>
  <div :class="`field-wrapper layout-${layout}`">
    <UserDialog
      :spinner="userDialogSpinner"
      :state="userDialogModal"
      :disable-close= "userDialogSpinner"
      v-on:modal:close="cancelEdition()"
    >
      <div slot="header">{{userDialogHeading}}</div> 
      <div slot="content"><p>{{userDialogMessage}}</p></div> 
    </UserDialog>
    <div class="columns editable-field-wrapper">
      <div class="column is-6">
        <div
          @click="openEdition()"
        >
          <transition name="slide-fade">
            <VuePlyrWrapper v-if="item || youTubeID && fieldIsOpen">
              <vue-plyr :ref="`plyr_${_uid}`" :key="videoSource">
                <div data-plyr-provider="youtube" :data-plyr-embed-id="videoSource"></div>
              </vue-plyr>
            </VuePlyrWrapper>
          </transition>
        </div>
        <div class="video-input-wrapper"
          v-if="fieldIsOpen"
        >
          <div class="field">
            <div class="field-label is-normal">
              <label class="label">Paste here the YouTube URL of your video:</label>
            </div>
            <div class="field-body">
              <div class="field">
                <p class="control">
                  <input
                    class="input-editable-value"
                    type="text"
                    v-model="fieldValue"
                    v-on:keyup.enter="saveVideo()"
                  />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="column is-6 image-control">
        <div class="action-icons-wrapper" :class="{'is-open': fieldIsOpen}">
          <div class="action-icon-wrapper" @click="openEdition()" :class="{'hide-icon': fieldIsOpen}">
            <Icons icon="pencil" class="action-icon" iconwidth="16px" iconheight="16px" color="#FFF"></Icons>
          </div>
          <div class="action-icon-wrapper" @click="saveVideo()" :class="{'hide-icon': !fieldIsOpen}">
            <Icons icon="check" class="action-icon" iconwidth="16px" iconheight="16px" color="#FFF"></Icons>
          </div>
          <div class="action-icon-wrapper" @click="cancelEdition()" :class="{'hide-icon': !fieldIsOpen}">
            <Icons icon="close-circle" class="action-icon" iconwidth="16px" iconheight="16px" color="#FFF"></Icons>
          </div>
        </div>
        <div class="button-wrapper">
          <button class="button is-warning" @click="removeVideo()">Remove</button>
          <button class="button is-success" @click="saveVideo()" v-if="fieldIsOpen">Save</button>
        </div>
        <div class="instructions" v-if="fieldIsOpen">
          <p>Paste the YouTube URL of your video, like https://www.youtube.com/watch?v=yXrlhebkpIQ</p>
          <p>Click save to process and store the video.</p>
        </div>
      </div>
    </div>
      <transition name="slide-fade">
        <div class="editable-error-message-wrapper" v-if="errorMessage">
          <span class="editable-error-message">{{errorMessage}}</span>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import Icons from "Components/general/Icons.vue"
import * as validator from "../../util/validator.js"
import LazyLoadedImage from "Components/plugins/LazyLoadedImage.js"

export default {
  props: [ "item", "layout", "location", "openId", "openDefault" ],
  data () {
    return {
      croppaObject: {},
      ratio: 1,
      userDialogSpinner: true,
      userDialogModal: false,
      userDialogHeading: "Processing...",
      userDialogMessage: "",
      fieldIsOpen: false,
      fieldValue: this.value,
      youTubeID: null,
      errorMessage: "",
      blurTimeout: null
    }
  },
  components: {
    Icons,
    LazyLoadedImage,
    VuePlyrWrapper: () => import("Components/general/VuePlyrWrapper.vue"),
    UserDialog: () => import("Components/general/UserDialog.vue")
  },
  computed: {
    calculateWidth () {
      if (typeof window === "undefined" || typeof this.$el === "undefined") {
        return 400
      }
      let wrapperWidth = this.$el.clientWidth
      return wrapperWidth < 400 ? wrapperWidth - 6 : 400
    },
    calculateHeight () {
      return this.calculateWidth * this.ratio
    },
    videoSource () {
      if (!this.fieldIsOpen) {
        return this.item || this.youTubeID
      } else {
        return this.youTubeID || this.item
      }
    }
  },
  mounted () {
    if (this.openDefault) {
      this.openEdition()
    }
  },
  methods: {
    cancelEdition () {
      this.fieldIsOpen = false
      this.errorMessage = ""
      this.userDialogModal = false
      this.$emit("edition:close", this._uid)
    },
    openEdition () {
      this.fieldIsOpen = true
      if (this.videoSource) {
        this.fieldValue = `https://www.youtube.com/watch?v=${this.videoSource}`
      }
      this.$emit("edition:open", this._uid)
    },
    removeVideo () {
      console.log('this.item: ', this.item, typeof this.item)
      if (!this.youTubeID && this.fieldIsOpen === true) {
        this.cancelEdition()
        return
      }
      if (!this.item) {
        this.cancelEdition()
        return
      }
      console.log('here dude')
      this.userDialogModal = true
      if (typeof this.item !== "undefined") {
        this.$store.dispatch("REMOVE_VIDEO", { location: this.location, route: this.$route, youTubeID: this.item })
          .then(() => {
            this.cancelEdition()
          })
          .catch(err => {
            this.userDialogSpinner = false
            this.userDialogMessage = `Error: ${err.message}. Please reload the page.`
          })
      } else {
        this.cancelEdition()
      }
    },
    /*
     * This method will save an image to the library if it can be validated.
     */
    saveVideo () {
      if (!this.youTubeID) {
        this.userDialogModal = true
        this.userDialogMessage = "Please add a valid YouTube URL."
        this.userDialogSpinner = false
        return
      }
      this.userDialogModal = true
      this.userDialogSpinner = true

      this.$store.dispatch("ADD_VIDEO", {
        location: this.location,
        route: this.$route,
        youTubeID: this.youTubeID
      })
        .then(() => {
          this.userDialogSpinner = false
          this.userDialogMessage = "The video has been added."
          setTimeout(() => {
            this.cancelEdition()
          }, 3000)
        })
        .catch(err => {
          console.log(err)
          this.userDialogSpinner = false
          this.userDialogMessage = `Error: ${err.message}. Please reload the page.`
        })
    }
  },
  watch: {
    /*
     * Close this instance if another one was opened.
     */
    openId (newValue) {
      if (this.fieldIsOpen) {
        if (newValue !== this._uid) {
          this.fieldIsOpen = false
        }
      }
    },
    fieldValue (videoURL) {
      var videoID = validator.getYouTubeID(videoURL)
      if (videoID) {
        this.youTubeID = videoID
      } else {
        this.youTubeID = null
      }
    }
  }
}
</script>

<style scoped lang="scss">
.action-icon-wrapper {
  height: 16px;
  line-height: 16px;
  display: inline-block;
  padding: 0 3px;
  transition: opacity 0.1s ease-in-out;
}
.hide-icon {
  opacity: 0.4;
  &:hover {
    cursor: disabled;
  }
}

.field-wrapper {
  position: relative;
  margin-bottom: 20px;
}
.action-icons-wrapper {
  background: rgba($color-text, 0.8);
  border-radius: 5px;
  display: inline;
  padding: 0 5px;
  line-height: 24px;
  height: 24px;
  font-size: 20px;
  top: 10px;
  right: 80px;
  transition: background-color 0.2s ease-in-out;
  &.is-open {
    background: rgba($blue, 0.8);
  }
}

.input-editable-value {
  font-weight: normal;
  font-size: 20px;
  line-height: 1.4;
  height: 28px;
  width: 100%;
  padding: 20px 5px;
  text-align: center;
  border: 1px solid $color-light-gray;
}

.video-input-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 220px;
  background: rgba($color-text, 0.4);
  color: $white;
}
.image-control {
  .action-icons-wrapper {
    width: 100%;
  }
  .button-wrapper {
    display: block;
    margin-top: 5px;
    .button {
      margin-right: 5px;
    }
  }
}
.inline-image-item {
  width: 100%;
  max-width: 600px;
}
.croppa-container {
  background: rgba($color-light-gray, 1);
  border: 3px solid $blue;
}
.instructions {
  margin-top: 20px;
}
.media-item {
  max-width: 600px;
}

.orientation-wrapper {
  div {
    display: inline;
    &:hover {
      cursor: pointer;
    }
  }
}
</style>