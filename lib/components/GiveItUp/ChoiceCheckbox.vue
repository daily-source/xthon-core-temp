<template>
  <div class="choice-checkbox mb-3">
    <checkbox 
      v-model='checked'
      :disabled='choice.hasCustomField && !customAmount'
      :id='choice.name'
      :label='choice.label'
    />
    <input-group 
      v-if='choice.hasCustomField'
      v-model='customAmount'
      placeholder='Enter amount'
      prepend-text='$'
    />
  </div>

</template>

<script>
import { mapActions } from 'vuex'
import Checkbox from 'Components/input/Checkbox'
import InputGroup from 'Components/input/InputGroup'

export default {
  name: 'ChoiceCheckbox',

  components: {
    Checkbox,
    InputGroup
  },

  props: ['choice'],

  data() {
    return {
      checked: false,
      customAmount: '',
    };
  },

  computed: {
    customLabelCombined() {
      return `${this.choice.label} $${this.customAmount}`;
    },
  },

  methods: {
    inputHandler() {
      const defaultArg = {
        checked: this.checked,
        choice: this.choice,
      };

      if (this.choice.hasCustomField) {
        return this.$emit('choiceChanged', { ...defaultArg, customLabel: this.customLabelCombined });
      }
      return this.$emit('choiceChanged', defaultArg);
    },

    ...mapActions({
      changeSelectedLabel: 'selections/changeSelectedLabel',
    }),
  },

  watch: {
    customAmount() {
      if (!this.choice.hasCustomField) return;

      if (!this.customAmount) this.checked = false;

      this.changeSelectedLabel({
        choice: {
          ...this.choice,
        },
        label: this.customLabelCombined,
      });
    },

    checked() {
      this.inputHandler();
    },
  },


};
</script>

<style lang="scss">
  .choice-checkbox {
    .custom-control {
      label {
        font-size: 1.125em;
      }
    }

    .input-group {
      max-width: 200px;
      margin-left: 1.5em;
    }

  }
</style>