<template>
  <div class="columns is-multiline is-mobile row-wrapper">
    <div class="column is-3-tablet is-11-mobile">
      <label :for="`input-editable_${_uid}`">{{label}}</label>
    </div>
    <div class="column is-5-tablet is-7-mobile editable-field-wrapper">
      <div v-if="disabledEdition" class="disabled-edition">
        {{fieldValue}} <span class="small">(Cannnot be modified)</span>
      </div>
      <div v-else>
        <div
          class="input-non-editable-value"
          v-if="!fieldIsOpen"
          v-html="value"
          @click="openEdition()"
        ></div>
        <div v-else>
          <input
            class="input-editable-value"
            :id="`input-editable_${_uid}`"
            v-model="fieldValue"
            ref="input"
            :type="type || 'text'"
            @blur="blurInput()"
            v-on:keyup.esc="cancelEdition()"
            v-on:keyup.enter="saveField()"
            @keydown.tab.prevent="next"
          />
        </div>        
      </div>
    </div>
    <div class="column is-4 editable-field-wrapper" v-if="!disabledEdition">
      <transition-group name="slide-fade">
        <button
          class="button is-primary button-edition"
          @click="openEdition()"
          v-if="!fieldIsOpen"
          key="edit"
        >Edit</button>
        <button
          class="button is-warning button-edition"
          @click="cancelEdition()"
          v-if="fieldIsOpen"
          key="cancel"
        >Cancel</button>
        <button
          class="button is-success button-edition"
          @click="saveField()"
          v-if="fieldIsOpen"
          key="save"
        >Save</button>
      </transition-group>
    </div>
    <transition name="slide-fade">
      <div class="column is-11-mobile is-6-tablet is-offset-4-tablet editable-error-message-wrapper" v-if="errorMessage">
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
  props: [ "label", "type", "value", "errorText", "disabledEdition" ],
  data () {
    return {
      fieldIsOpen: false,
      fieldValue: this.value,
      errorMessage: "",
      blurTimeout: null
    }
  },
  components: {
    Icons
  },
  methods: {
    cancelEdition () {
      this.fieldIsOpen = false
      this.errorMessage = ""
    },
    openEdition () {
      this.fieldValue = this.value
      this.fieldIsOpen = true
      Vue.nextTick(() => {
        this.$refs.input.focus()
      })
    },
    saveField () {
      if (!this.fieldIsOpen) {
        return { code: 401 }
      }
      return new Promise((resolve, reject) => {
        clearTimeout(this.blurTimeout)
        if (this.validateAllFields()) {
          this.$emit("input:save", this.fieldValue)
          this.cancelEdition()
          resolve()
        } else {
          this.errorMessage = this.errorText
        }
      })
    },
    next (e) {
      this.saveField()
        .then(() => {
          if (!e.shiftKey) {
            this.$emit("next:field")
          } else {
            this.$emit("previous:field")
          }
        })
        .catch(err => {
          return err
        })
    },
    /**
     * This is needed in order to allow an external button to save before the blur cancels the edition
     */
    blurInput () {
      this.blurTimeout = setTimeout(() => {
        this.cancelEdition()
      }, 200)
    },
    validateAllFields () {
      if (this.type === "name") {
        if (validator.validateName(this.fieldValue)) {
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
  }
}
</script>

<style scoped lang="scss">
.input-non-editable-value {
  font-weight: bold;
  font-size: inherit;
  height: 28px;
  line-height: 1.4;
  border-bottom: 2px solid transparent;
  &:hover {
    cursor: pointer;
    border-bottom: 2px dashed rgba($color-medium-gray, 0.4);
  }
}
.input-editable-value {
  width: 100%;
  font-weight: bold;
  font-size: inherit;
  line-height: 1.4;
  height: 28px;
  border: none;
  padding: 0;
  box-shadow: none;
  border-bottom: 1px solid $color-light-gray;
  background: rgba($color-light-gray, 0.5);
}
.action-icon-wrapper {
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
.is-pulled-right {
  text-align: right;
}
.is-multiline {
  @include tablet {
    margin-bottom: 0;
  }
}
.column.is-11-mobile {
  @include mobile {
    padding-bottom: 0;
  }
}
.column.is-7-mobile,
.column.is-5-mobile {
  @include mobile {
    padding-top: 0;
  }
}

.disabled-edition {
  color: $color-medium-gray;
  font-style: italic;
  font-weight: bold;
  span {
    display: block;
    font-weight: normal;
  }
}

.button-edition {
  padding-top: 0.1em;
  padding-bottom: 0.1em;
  margin-right: 0.5em;
}
.row-wrapper {
  align-items: center;
}
</style>