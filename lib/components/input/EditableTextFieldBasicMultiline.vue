<template>
  <div class="columns is-multiline row-wrapper">
    <div class="column is-offset-3 is-3-tablet inputLabel">
      <label :for="`input-editable_${_uid}`">{{label}}</label>
    </div>
    <div class="column is-6-tablet editable-field-wrapper customMargin" style="max-width: 300px;">
      <div v-if="disabledEdition" class="disabled-edition">
        {{fieldValue}} <span class="small">(Cannnot be modified)</span>
      </div>
      <textarea
        :autocomplete="autocomplete ? `${autocomplete}` : 'on'"
        class="input-editable-value"
        :style="`resize: ${resize}`"
        :id="`input-editable_${_uid}`"
        v-model="fieldValue"
        ref="input"
        :rows="rows"
        :cols="cols"
        :height="height"
        resize="none"
        :required="required"
        @blur="blurInput()"
        v-on:keyup.esc="cancelEdition()"
        @keydown.tab.prevent="next"
      ></textarea>
    </div>
    <transition name="slide-fade">
      <div class="column is-6-tablet is-offset-6-tablet editable-error-message-wrapper" v-if="errorMessage">
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
  props: [ "label", "type", "resize", "rows", "cols", "height", "value", "errorText", "disabledEdition", "required", "autocomplete"],
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
      this.fieldValue = this.value
    },
    openEdition () {
      this.fieldValue = this.value
      this.fieldIsOpen = true
      Vue.nextTick(() => {
        this.$refs.input.focus()
      })
    },
    next (e) {
      if (!e.shiftKey) {
        this.$emit("next:field")
      } else {
        this.$emit("previous:field")
      }
    },
    blurInput () {
      this.blurTimeout = setTimeout(() => {
        this.cancelEdition()
      }, 200)
    },
    validateField () {
      if (!this.required && !this.fieldValue) {
        this.errorMessage = ""
        return true
      }
      if (this.type === "notes") {
        if (validator.validateNotes(this.fieldValue)) {
          this.errorMessage = ""
          return true
        }
        this.errorMessage = this.errorText
        return false
      }
    }
  },

  watch: {
    'fieldValue': function (newVal) {
      this.$emit('input:change', newVal)
      this.validateField()
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
  border-bottom: 2px dashed rgba($color-medium-gray, 0.4);
  &:hover {
    cursor: pointer;
    border-bottom: 2px dashed rgba($color-medium-gray, 0.4);
  }
}
.input-editable-value {
  width: 100%;
  font-size: inherit;
  font-weight: 100;
  line-height: 1.4;
  border: none;
  box-shadow: none;
  background: none;
  border: 1px solid rgba(60,60,60,.26);
  border-radius: 4px;
  margin: 4px 0 0;
  padding: 0 7px;
  &:hover {
    cursor: pointer;
  }
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
  margin-bottom: 0.5em;
}
.row-wrapper {
  align-items: center;
}

.inputLabel {
  text-align: center;
  @include tablet {
    text-align: right !important;
  }
}
.customMargin {
  margin: auto;
  @include tablet {
    margin-left: 0;
  }
}
</style>