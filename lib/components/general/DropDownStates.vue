<template>
  <div class="dropdown-states columns is-multiline row-wrapper">
    <div class="column is-offset-3 is-3-tablet inputLabel">
      <label :for="`input-editable_${_uid}`" ref="label">{{label}}</label>
    </div>
    <vue-select
      :options='states'
      v-model='selected'
      label='name'
      :type="type || 'dropdown'"
      :required="required"
      placeholder='Click or type here to select a state'
      class="column is-5-tablet editable-field-wrapper"
      ref="input"
      v-on:change="vueSelectInputChange($event)"
      v-on:search:blur="doNothingIfTheValueHasntChanged($event)"
      :selectOnTab="true"
      :clearSearchOnSelect="false"
      :disabled="disabled"
    >
      <template slot="option" slot-scope="state">
        <div class="d-center selection">
          {{ state.name }}
        </div>
      </template>
    </vue-select>
    <transition name="slide-fade">
      <div class="column is-6-tablet is-offset-6-tablet editable-error-message-wrapper" v-if="errorMessage">
        <span class="editable-error-message">{{errorMessage}}</span>
      </div>
    </transition>
  </div>
</template>

<script>
import { getStatesByShort } from 'countrycitystatejson'
import VueSelect from 'vue-select'

export default {
  name: 'DropDownStates',
  components: {
    VueSelect,
  },
  props: {
    country: {
      type: String,
      required: false,
      default: 'US'
    },
    label: {},
    type: {},
    value: {},
    errorText: {},
    disabled: {},
    required: {}
  },
  data () {
    return {
      selected: null,
      fieldIsOpen: false,
      fieldValue: this.value,
      errorMessage: ""
    }
  },
  methods: {
    doNothingIfTheValueHasntChanged () {
      if (this.$refs.input.value) {
        if (this.value === this.$refs.input.value) {
          this.$refs.input.search = this.$refs.input.value
        }
      }
    },
    vueSelectInputChange (event) {
      if (this.$refs.input.value) {
        this.$refs.input.search = this.$refs.input.value
      } else {
        this.$refs.input.search = ''
      }
      if (!event) {
        this.$emit("selected", null)
        this.$emit('input:change', null)
        this.selected = null
        this.validateField()
      }
    },
    openEdition () {
      if (!this.disabled) {
        this.$refs.input.$refs.search.focus()
      }
    },
    next (e) {
      if (!e.shiftKey) {
        this.$emit("next:field")
      } else {
        this.$emit("previous:field")
      }
    },
    validateField () {
      if (!this.required && !this.selected) {
        this.errorMessage = ""
        return true
      }
      if (this.selected) {
        this.errorMessage = ""
        return true
      } else {
        this.errorMessage = this.errorText
        return false
      }
    }
  },
  computed: {
    states () {
      return getStatesByShort(this.country || 'US')
    },
  },
   watch: {
    'selected': function (newVal) {
      this.$emit("selected", newVal)
      this.$emit('input:change', newVal)
      this.validateField()
    },
    country () {
      this.selected = null
    },
  },
}
</script>

<style lang='scss' scoped>
.dropdown-states {
  .dropdown {
    //width: 100%;
    &-toggle {
      flex-grow: 1;
    }
    &.open {
      .open-indicator {
        margin-top: 4px;
      }
    }
  }
  .dropdown-toggle {
    border: 1px solid $color-light-gray;
    .clear {
      margin-top: 4px;
    }
  }
}
.is-multiline {
  @include tablet {
    margin-bottom: 0;
  }
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
</style>
<style lang='scss'>
  .dropdown-states {
    input {
      opacity: 1 !important;
    }
  }
</style>