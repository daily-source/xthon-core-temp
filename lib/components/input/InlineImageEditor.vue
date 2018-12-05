<template>
  <div>
    <div class="overlay" v-if="fieldIsOpen && isStandalone"></div>
    <div :class="`field-wrapper layout-${layout} is-open-${fieldIsOpen} flex-one`">
      <UserDialog
        :spinner="userDialogSpinner"
        :state="userDialogModal"
        :disable-close= "userDialogSpinner"
        v-on:modal:close="cancelEdition()"
      >
        <div slot="header">{{userDialogHeading}}</div> 
        <div slot="content"><p>{{userDialogMessage}}</p></div> 
      </UserDialog>
      <div class="editable-field-wrapper flex-one" :class="{'columns': !isStandalone}">
        <div :class="{'flex-one': isBackgroundImage && !fieldIsOpen, 'column is-6': !isStandalone}">
          <div
            :class="{'flex-one': isBackgroundImage}"
            v-if="!fieldIsOpen"
            @click="openEdition()"
          >
            <LazyLoadedImage
              class="inline-image-item"
              :class="{'is-open': fieldIsOpen, 'is-background': isBackgroundImage}"
              :is-background="isBackgroundImage"
              :src="staticImage"
              :alt="alt"
              :default-text="defaultText"
              :is-editable="editionIsEnabled"
            ></LazyLoadedImage>
          </div>
          <croppa
            :style="{width: `${calculateWidth + 6}px`, height: `${calculateHeight + 6}px`}"
            v-model="croppaObject"
            :initial-image="croppaInitialImage"
            :placeholder="'Select file'"
            :placeholder-font-size="20"
            :show-remove-button="false"
            :width="calculateWidth"
            :height="calculateHeight"
            :prevent-white-space="true"
            v-on:keyup.enter="saveImage()"
            v-on:new-image="errorMessage = ''"
            v-if="fieldIsOpen"
          >
            <div slot="initial">Click here to upload a file</div>
          </croppa>
        </div>
        <div
          class="image-control"
          :class="{'column is-6': !isStandalone, 'hero-image': ratio === 0.3}"
          v-if="editionIsEnabled"
        >
          <div class="action-icons-wrapper" :class="{'is-open': fieldIsOpen}">
            <div class="action-icon-wrapper" @click="openEdition()" :class="{'hide-icon': fieldIsOpen}">
              <Icons icon="pencil" class="action-icon" iconwidth="16px" iconheight="16px" color="#FFF"></Icons>
            </div>
            <div class="action-icon-wrapper" @click="saveImage()" :class="{'hide-icon': !fieldIsOpen}">
              <Icons icon="check" class="action-icon" iconwidth="16px" iconheight="16px" color="#FFF"></Icons>
            </div>
            <div class="action-icon-wrapper" @click="cancelEdition()" :class="{'hide-icon': !fieldIsOpen}">
              <Icons icon="close-circle" class="action-icon" iconwidth="16px" iconheight="16px" color="#FFF"></Icons>
            </div>
          </div>
          <div class="button-wrapper">
            <div class="orientation-wrapper" v-if="!disableOrientation && fieldIsOpen">
              <div @click="ratio = 1">
                <Icons icon="crop-square" class="action-icon" iconwidth="24px" iconheight="24px" color="#333"></Icons>
              </div>
              <div @click="ratio = 4/3">
                <Icons icon="crop-portrait" class="action-icon" iconwidth="24px" iconheight="24px" color="#333"></Icons>
              </div>
              <div @click="ratio = 3/4">
                <Icons icon="crop-landscape" class="action-icon" iconwidth="24px" iconheight="24px" color="#333"></Icons>
              </div>
            </div>
            <button class="button is-warning" @click="removeImage()" v-if="!required">Remove</button>
            <button class="button is-info" @click="clearField()" v-if="fieldIsOpen">Clear</button>
            <button class="button is-primary" @click="useDefault()" v-if="defaultImage && fieldIsOpen">Use default</button>
            <button class="button is-success" @click="saveImage()" v-if="fieldIsOpen">Generate</button>
          </div>
          <div class="instructions" v-if="fieldIsOpen">
            <p>Move the picture around the frame to crop it. You can also scroll or pinch with two fingers to zoom.</p>
            <p>Click generate once ready to save the image.</p>
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
  </div>
</template>

<script>
import Icons from "Components/general/Icons.vue"
import LazyLoadedImage from "Components/plugins/LazyLoadedImage.js"

export default {
  props: [ "item", "layout", "location", "openId", "openDefault", "isBackgroundImage", "alt", "editionIsEnabled", "type", "is-standalone", "disableOrientation", "initialRatio", "defaultImage", "required", "defaultText" ],
  data () {
    return {
      croppaObject: {},
      croppaInitialImage: "",
      ratio: 1,
      userDialogSpinner: true,
      userDialogModal: false,
      userDialogHeading: "Processing...",
      userDialogMessage: "",
      fieldIsOpen: false,
      fieldValue: this.value,
      errorMessage: "",
      blurTimeout: null
    }
  },
  components: {
    Icons,
    LazyLoadedImage,
    UserDialog: () => import("Components/general/UserDialog.vue")
  },
  computed: {
    calculateWidth () {
      if (typeof window === "undefined" || typeof this.$el === "undefined") {
        return 400
      }
      let wrapperWidth = this.$el.clientWidth
      if (this.type === "avatar") {
        if (this.layout === "overlay") {
          return wrapperWidth - 12
        }
        return wrapperWidth / 2 - 12
      }
      return wrapperWidth < 400 ? wrapperWidth - 6 : 400
    },
    calculateHeight () {
      return this.calculateWidth * this.ratio
    },
    initialImage () {
      return typeof this.item !== "undefined" ? this.item.src : ""
    },
    staticImage () {
      return this.initialImage ? this.initialImage : this.defaultImage ? this.defaultImage.src : ""
    }
  },
  mounted () {
    if (this.openDefault) {
      this.openEdition()
    }
    if (this.initialRatio) {
      this.ratio = this.initialRatio
    }
    this.croppaInitialImage = this.initialImage
  },
  methods: {
    cancelEdition () {
      if (this.fieldIsOpen && !this.croppaObject.hasImage()) {
        this.$emit("image:remove")
      }
      this.fieldIsOpen = false
      this.errorMessage = ""
      this.userDialogModal = false
      this.$emit("edition:close", this._uid)
    },
    openEdition () {
      if (!this.editionIsEnabled) {
        return
      }
      this.fieldIsOpen = true
      this.$emit("edition:open", this._uid)
    },
    clearField () {
      if (this.croppaObject && this.croppaObject.hasImage()) {
        this.croppaObject.remove()
      }
    },
    useDefault () {
      this.croppaInitialImage = this.defaultImage.src
      this.croppaObject.refresh()
    },
    removeImage () {
      this.userDialogModal = true
      this.userDialogSpinner = true
      this.errorMessage = ""
      if (typeof this.item !== "undefined") {
        this.$store.dispatch("REMOVE_IMAGE", { location: this.location, route: this.$route, id: this.item.id })
          .then(() => {
            this.cancelEdition()
          })
          .catch(err => {
            this.userDialogSpinner = false
            this.errorMessage = "An unknown error occurred."
            console.log(err)
          })
      } else {
        this.cancelEdition()
      }
    },
    /*
     * This method will save an image to the library if it can be validated.
     */
    saveImage () {
      if (!this.fieldIsOpen) {
        return
      }
      this.userDialogModal = true
      this.croppaObject.generateBlob(
        blob => {
          if (!blob) {
            this.userDialogMessage = "The image couldn't be generated."
            this.userDialogSpinner = false
          } else {
            this.userDialogSpinner = true
            this.$store.dispatch("SAVE_IMAGE_FIELD", { location: this.location, route: this.$route, blob: blob })
              .then(() => {
                this.cancelEdition()
              })
              .catch(err => {
                console.log(err)
              })
          }
        },
        "image/jpeg",
        0.8
      ) // 80% compressed jpeg file
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

.flex-one {
  flex: 1;
  height: 100%;
  width: 100%;
}
.field-wrapper {
  position: relative;
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
.layout-top {
  .action-icons-wrapper {
    position: absolute;
    top: -30px;
    width: auto;
  }
}

.layout-undefined {
  margin-bottom: 20px;
}

.image-control {
  @include breakpoint($mobile) {
    margin-top: -20px;
    margin-bottom: 20px;
  }

  .action-icons-wrapper {
    width: auto;
  }
  .button-wrapper {
    display: block;
    margin-top: 5px;
    position: relative;
    z-index: 10;
    .button {
      margin-right: 5px;
    }
  }
}
.inline-image-item {
  width: 100%;
  max-width: 600px;
  &.is-background {
    width: 100%;
    height: 100%;
    background-color: $color-light-gray;
    background-size: cover;
    background-position: center center;
    display: flex;
    align-items: center;
    justify-content: center;
  }
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

.fundraiser-participant__avatar {
  .inline-image-item {
    width: 120px;
    height: 120px;
    background-size: cover;
    background-position: center center;
    &.is-open {
      width: 100%;
      height: 0;
      padding-bottom: 100%;
    }
  }
  &.is-editing {
    .inline-image-item {
      width: 100%;
      height: 0;
      padding-bottom: 100%;
    }
  }
}
.editable-field-wrapper {
  width: auto;
  position: relative;
}
.is-open-true {
  .editable-field-wrapper {
    z-index: 30;
  }
}
.editable-error-message {
  font-size: 16px;
  font-weight: normal;
}

.nonprofit-hero__hero-wrapper {
  .editable-field-wrapper {
    height: 390px;
  }
  .inline-image-item {
    max-width: 100vw;
  }
}
.nonprofit-hero__logo-wrapper {
  top: -370px;
  @include breakpoint($desktop) {
    top: -120px;
  }
}

.layout-overlay {
  .image-control {
    margin-top: 10px;
    width: 90vw;
  }
  &.is-open-true {
    .image-control {
      @include breakpoint($tablet) {
        width: 300px;
        position: absolute;
        z-index: 20;
        top: 0;
        left: calc(100% + 10px);
        margin-top: 0;
      }
      &.hero-image {
        @include breakpoint($tablet) {
          position: static;
          margin-top: 10px;
          margin-left: 10px;
        }
      }
    }
  }
  .hero-image {
    .action-icons-wrapper {
      display: inline-block;
      position: absolute;
      top: 10px;
      left: 10px;
      right: unset;
    }    
  }
}


.overlay {
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 19;
  background: rgba(255,255,255, 0.98);
}
</style>