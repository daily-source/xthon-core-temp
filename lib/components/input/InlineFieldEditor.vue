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
    <div class="editable-field-wrapper">
      <div
        class="input-non-editable-value"
        v-if="!fieldIsOpen"
        v-html="value || placeholder"
        @click="openEdition()"
      ></div>
      <div v-if="editionIsEnabled && fieldIsOpen">
        <div class="action-buttons-wrapper" v-if="type === 'textarea'">
          <button class="button is-warning button-cancel" @click="cancelEdition()" v-if="fieldIsOpen">Cancel</button>
          <button class="button is-info button-save" @click="saveField()" v-if="fieldIsOpen">Save</button>
        </div>
        <input
          v-if="type === 'text' || type === 'url' || type === 'email'"
          class="input-editable-value"
          :id="`input-editable_${_uid}`"
          v-model="fieldValue"
          ref="input"
          :placeholder="placeholder"
          :type="type || 'text'"
          :autocomplete="disableAutoComplete ? 'on' : 'off'"
          @blur="blurInput()"
          v-on:keyup.esc="cancelEdition()"
          v-on:keyup.enter="saveField()"
          @keydown.tab.prevent="tabPressed"
        />
        <textarea
          v-if="type === 'textarea'"
          class="input-editable-value"
          :id="`input-editable_${_uid}`"
          v-model="fieldValue"
          ref="input"
          :rows="calculateRows()"
          @blur="blurInput()"
          v-on:keyup.esc="cancelEdition()"
          v-on:keyup.enter="enterPressed"
          @keydown.tab.prevent="tabPressed"
        ></textarea>
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
import * as validator from "../../util/validator.js"
import Vue from "vue"

export default {
  props: [ "type", "value", "errorText", "allowEmpty", "removeReturns", "layout", "location", "placeholder", "editionIsEnabled", "minimumLength", "onBlurSave" ],
  data () {
    return {
      userDialogSpinner: true,
      userDialogModal: false,
      userDialogHeading: "Processing...",
      userDialogMessage: "",
      fieldIsOpen: false,
      fieldValue: this.value,
      errorMessage: "",
      blurTimeout: null,
      disableAutoComplete: false
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
    },
    openEdition () {
      if (!this.editionIsEnabled) {
        return
      }
      this.fieldIsOpen = true
      this.fieldValue = this.value
      Vue.nextTick(() => {
        this.$refs.input.focus()
      })
    },
    calculateRows () {
      let rows = this.fieldValue ? Math.ceil(this.fieldValue.length / 60) : 0
      if (this.fieldValue) {
        rows += this.fieldValue.split(/\n/).length
      }
      return rows > 2 ? rows : 2
    },
    /*
     * This method will save a field if it can be validated.
     */
    saveField () {
      if (!this.fieldIsOpen) {
        return
      }
      return new Promise((resolve, reject) => {
        clearTimeout(this.blurTimeout)
        if (this.validateField()) {
          this.userDialogHeading = "Processing..."
          this.userDialogModal = true
          this.$store.dispatch("SAVE_INLINE_FIELD", {
            location: this.location,
            route: this.$route,
            value: this.fieldValue
          })
            .then(() => {
              this.cancelEdition()
              this.fieldIsOpen = false
              this.userDialogModal = false
              resolve(this.fieldValue)
            })
            .catch(err => {
              this.userDialogHeading = "Error"
              this.userDialogMessage = err.response.statusText
              this.userDialogSpinner = false
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
      if (this.type === "textarea") {
        this.removeTrailingReturn()
      }
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
        this.removeTrailingReturn()
        this.saveField()
      }
    },
    removeTrailingReturn () {
      // Remove leading and trailing carriage return on save
      if (this.fieldValue) {
        this.fieldValue = this.fieldValue.replace(/^[\r\n]+|[\r\n]+$/g, "")
      }
    },
    closeUserDialog () {
      this.userDialogModal = false
      this.userDialogMessage = ""
      this.userDialogHeading = ""
    },
    /**
     * The timeout is needed so an external button can save before the blur cancels the edition
     */
    blurInput () {
      this.blurTimeout = setTimeout(() => {
        if (this.onBlurSave) {
          this.saveField()
        } else {
          this.cancelEdition()
        }
      }, 200)
    },
    validateField () {
      if (this.minimumLength && this.fieldValue && this.fieldValue.length < this.minimumLength) {
        return false
      }

      if (this.type === "text") {
        if (validator.validateTextNoHtml(this.fieldValue, this.allowEmpty)) {
          return true
        }
        return false
      }
      if (this.type === "textarea") {
        if (validator.validateTextNoHtml(this.fieldValue, this.allowEmpty)) {
          return true
        }
        return false
      }
      if (this.type === "url") {
        if (validator.validateURL(this.fieldValue)) {
          return true
        }
        return false
      }
      if (this.type === "email") {
        if (validator.validateEmail(this.fieldValue)) {
          return true
        }
        return false
      }
    }
  },
  watch: {
    fieldValue (newVal) {
      // Remove any triple carriage return.
      if (this.fieldValue) {
        this.fieldValue = newVal.replace(/(\r\n|\r|\n){3,}/g, "$1\n")
        // Remove all carriage returns if this should be treated like an input.
        if (this.removeReturns) {
          this.fieldValue = newVal.replace(/(\r\n|\r|\n)/g, "")
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
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

  &.is-editing-true {
    min-width: 200px;
    width: 100%;
    transition: background-color 0.2s ease-in-out;

    &:hover {
      background: $color-light-gray;
      cursor: pointer;
    }
    .input-non-editable-value {
      border: 4px dashed rgba($color-medium-gray, 0.3);
      transition: border-color 0.2s ease-in-out;
      &:hover {
        border-color: $color-emphasis;
      }
    }
  }
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

.layout-inline {
  display: inline-block;
  .action-icons-wrapper {
    right: 0;
    top: 0px;
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