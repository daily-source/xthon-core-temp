<template>
  <div class="custom-choice is-flex">
      <!-- <input v-model="checked" @click="handleChecked()" type="checkbox"  :id="`${index}`" >
      <label class="custom-control-label" :for="`${index}`">Custom Choice</label> -->
    <checkbox 
      :id="`${index}`"
      @click='handleChecked()'
      label='Custom Choice'
    />
    <div class="custom-choice__input-container">
      <label :for="`${index}-input`" class="is-sr-only">Custom Choice</label>
      <input
        v-model="label"
        :id="`${index}-input`"
        type="text"
        :class="['input', {'is-invalid': error}]"
        max="15"
        placeholder="Enter your own"
      >
      <small class="has-text-danger" v-if="error">
        *You must type something into the text entry box before this item can be selected. Simply click your mouse in the box and type a word. Then you’ll be able to put a checkmark in that checkbox.
      </small>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Checkbox from 'Components/input/Checkbox'

export default {
  name: 'CustomChoice',

  components: {
    Checkbox
  },

  props: ['index'],

  data() {
    return {
      checked: false,
      label: '',
      error: false,
    };
  },

  methods: {
    handleChecked() {
      console.log('false')
      return
      if (!this.label) {
        this.error = true;
      }
    },

    ...mapActions({
      addSelected: 'selections/pushSelected',
      removeSelected: 'selections/removeSelected',
      changeSelectedLabel: 'selections/changeSelectedLabel',
    }),
  },

  watch: {
    label() {
      const choice = {
        name: this.index,
        label: this.label,
        customChoice: true,
      };

      if (this.label) {
        this.error = false;
        this.addSelected({ choice });
        this.changeSelectedLabel({ choice, label: this.label });
      } else {
        this.checked = false;
        this.removeSelected({ choice });
      }
    },

    checked() {
      const choice = {
        name: this.index,
        label: this.label,
        customChoice: true,
      };

      if (this.checked && this.label) {
        this.addSelected({ choice });
      } else {
        this.checked = false;
        this.removeSelected({ choice });
      }
    },
  },
};
</script>

<style lang="scss">
 .custom-choice {
    align-items: center;
    margin-bottom: 0.5rem;
    position: relative;

    .custom-control__label {
      font-size: 0;
    }
  }
</style>