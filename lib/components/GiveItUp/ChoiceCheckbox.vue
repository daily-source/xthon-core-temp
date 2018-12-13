<style lang="scss">
  .choice-checkbox {
    .custom-control {
      margin-bottom: .625em;
      label {
        font-size: 1.125em;
      }
    }
    .input-group {
      max-width: 150px;
      margin-left: 1.5em;
    }
  }
</style>

<template>
  <div class="choice-checkbox mb-3">
    <div class="custom-control custom-checkbox mb-0">
      <input type="checkbox" class="custom-control-input" :id="choice.name" v-model="checked" :disabled="choice.hasCustomField && !customAmount">
      <label class="custom-control-label" :for="choice.name">{{ choice.hasCustomField ? customLabelCombined : choice.label }}</label>
    </div>
    <div class="input-group input-group-sm" v-if="choice.hasCustomField">
      <div class="input-group-prepend"><span class="input-group-text">$</span></div>
      <input v-model="customAmount" type="number" class="form-control">
    </div>
  </div>
  
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'ChoiceCheckbox',

  props: ['choice'],

  data() {
    return {
      checked: false,
      customAmount: '',
    }
  },

  computed: {
    customLabelCombined() {
      return `${this.choice.label} $${this.customAmount}`
    }
  },

  methods: {
    inputHandler() {
      const defaultArg = {
        checked: this.checked,
        choice: this.choice
      }

      if (this.choice.hasCustomField) {
        return this.$emit('choiceChanged', { ...defaultArg, customLabel: this.customLabelCombined })
      }
      return this.$emit('choiceChanged', defaultArg)
    },

    ...mapActions({
      changeSelectedLabel: 'selections/changeSelectedLabel'
    })
  },

  watch: {
    customAmount () {
      if (!this.choice.hasCustomField) return

      if (!this.customAmount) this.checked = false

      this.changeSelectedLabel({
        choice: {
          ...this.choice,
        },
        label: this.customLabelCombined,
      })
    },

    checked () {
      this.inputHandler()
    },
  },

 
}
</script>
