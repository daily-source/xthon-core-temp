<template>
  <div :class="`field-wrapper layout-${layout} is-editing-${editionIsEnabled}`">
    <UserDialog
      :spinner="userDialogSpinner"
      :state="userDialogModal"
      :disable-close= "userDialogSpinner"
      v-on:modal:close="closeUserDialog()"
    >
      <div slot="header">{{userDialogHeading}}</div> 
      <div slot="content"><p>{{userDialogMessage}}</p></div> 
    </UserDialog>
    <div class="action-icons-wrapper" :class="{'is-open': fieldIsOpen}" v-if="editionIsEnabled">
      <div class="action-icon-wrapper" @click="openEdition()" :class="{'hide-icon': fieldIsOpen}">
        <Icons icon="pencil" class="action-icon" iconwidth="16px" iconheight="16px" color="#FFF"></Icons>
      </div>
      <div class="action-icon-wrapper" @click="saveField()" :class="{'hide-icon': !fieldIsOpen}">
        <Icons icon="check" class="action-icon" iconwidth="16px" iconheight="16px" color="#FFF"></Icons>
      </div>
      <div class="action-icon-wrapper" @click="cancelEdition()" :class="{'hide-icon': !fieldIsOpen}">
        <Icons icon="close-circle" class="action-icon" iconwidth="16px" iconheight="16px" color="#FFF"></Icons>
      </div>
    </div>
    <div class="action-buttons-wrapper">
      <button class="button is-warning button-cancel" @click="cancelEdition()" v-if="fieldIsOpen">Cancel</button>
      <button class="button is-info button-save" @click="saveField()" v-if="fieldIsOpen">Save</button>
    </div>
    <div class="editable-field-wrapper">
      <div
        class="input-non-editable-value"
        v-if="!fieldIsOpen"
        v-html="value || placeholder"
        @click="openEdition()"
      ></div>
      <div v-if="editionIsEnabled && fieldIsOpen">
        <wysiwyg v-model="fieldValue" ></wysiwyg>
      </div>
    </div>
    <transition name="slide-fade">
      <div class="editable-error-message-wrapper" v-if="errorMessage">
        <span class="editable-error-message">{{errorMessage}}</span>
      </div>
    </transition>
  </div>
</template>

<script>
import Icons from "Components/general/Icons.vue"

export default {
  props: [ "type", "value", "errorText", "allowEmpty", "removeReturns", "layout", "location", "placeholder", "editionIsEnabled", "defaultOpen" ],
  data () {
    return {
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
    UserDialog: () => import("Components/general/UserDialog.vue")
  },
  methods: {
    cancelEdition () {
      this.fieldIsOpen = false
      this.errorMessage = ""
      this.$emit("edit:close")
    },
    openEdition () {
      if (!this.editionIsEnabled) {
        return
      }
      this.fieldIsOpen = true
      this.fieldValue = this.value
    },
    /*
     * This method will save a field if it can be validated.
     */
    saveField () {
      if (!this.fieldIsOpen) {
        return
      }
      if (!this.location) {
        this.$emit("edit:save", { value: this.fieldValue })
        this.cancelEdition()
        return
      }
      return new Promise((resolve, reject) => {
        clearTimeout(this.blurTimeout)
        if (this.fieldValue) {
          this.userDialogModal = true
          this.$store.dispatch("SAVE_INLINE_FIELD", { location: this.location, route: this.$route, value: this.fieldValue })
            .then(() => {
              this.cancelEdition()
              this.fieldIsOpen = false
              this.userDialogModal = false
              resolve(this.fieldValue)
            })
            .catch(err => {
              console.log(err)
              this.userDialogModal = false
              reject(err)
            })
        } else {
          this.errorMessage = this.errorText
          this.userDialogModal = false
          resolve()
        }
      })
    },
    tabPressed (e) {
      this.saveField()
        .then(data => {
          if (data) {
            if (!e.shiftKey) {
              this.$emit("next:field")
            } else {
              this.$emit("previous:field")
            }
          }
        })
        .catch(err => {
          return err
        })
    },
    enterPressed (e) {
      if (!e.shiftKey) {
        this.saveField()
      }
    },
    /**
     * The timeout is needed so an external button can save before the blur cancels the edition
     */
    blurInput () {
      this.blurTimeout = setTimeout(() => {
        this.cancelEdition()
      }, 200)
    }
  },
  mounted () {
    require("Components/plugins/VueWYSIWYG.js")
    if (this.defaultOpen) {
      this.openEdition()
    }
  }
}
</script>

<style lang="scss">
.input-non-editable-value,
.editable-field-wrapper {
  font-size: inherit;
  ul {
    li {
      list-style-type: disc;
      list-style-position: inside;
      margin-left: 20px;
    }
  }
  ol {
    li {
      list-style-position: inside;
    }
  }
  h1,
  h2 {
    font-size: 20px;
    font-weight: bold;
    color: $color-emphasis-alt;
  }
  h3,
  h4,
  h5,
  h6 {
    font-size: 17px;
    font-weight: normal;
    color: $color-emphasis-alt;
  }
}
</style>
<style scoped lang="scss">
@import "~vue-wysiwyg-2/dist/vueWysiwyg.css";

.input-non-editable-value {
  border-bottom: 1px solid transparent;
  white-space: pre-line;
}
.input-editable-value,
textarea {
  font-weight: inherit;
  font-size: inherit;
  line-height: inherit;
  border: none;
  padding: inherit;
  box-shadow: none;
  border-bottom: 1px solid $color-light-gray;
  word-break: break-word;
  background-color: rgba($color-light-gray, 0.5);
  color: inherit;
  width: 100%;
}
.action-icons-wrapper {
  background: rgba($color-text, 0.8);
  border-radius: 5px;
  display: inline;
  padding: 0 5px;
  position: absolute;
  line-height: 24px;
  height: 24px;
  font-size: 20px;
  top: -30px;
  transition: background-color 0.2s ease-in-out;
  &.is-open {
    background: rgba($blue, 0.8);
  }
}

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

  &.is-editing-true {
    margin-top: 50px;
  }
}

.layout-inline {
  display: inline-block;
  .action-icons-wrapper {
    right: 0;
    top: 0px;
    transform: translateX(80px);
  }
}

.layout-block {
  display: block;
}

.layout-title {
  display: inline-block;

  @include tablet {
    min-width: 750px;
    max-width: 900px;
    width: auto;
  }
  &.is-editing-true {
    @include tablet {
      min-width: 600px;
    }
  }
  .action-icons-wrapper {
    position: static;
    @include tablet {
      position: absolute;
      right: 0;
      top: 4px;
      bottom: 0;
      margin: auto;
      transform: translateX(100px);
    }
  }
  .input-editable-value {
    text-align: center;
  }
}

.editable-error-message {
  font-size: 16px;
  font-weight: normal;
}
.action-buttons-wrapper {
  position: absolute;
  right: 0;
  top: -45px;
  .button-save {
    background-color: $color-emphasis;
    transition: background-color 0.2s ease-in-out;
    &:hover {
      background-color: rgba($color-emphasis, 0.8);
    }
  }
  .button-cancel {
    margin-right: 5px;
    display: inline-block;
  }
}
</style>