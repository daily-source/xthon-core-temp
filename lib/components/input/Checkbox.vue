<template>
  <div class="custom-control custom-control--checkbox">
    <input 
      type="checkbox"
      class="custom-control__input"
      v-bind="$attrs"
      v-on='listeners'
    >
    <label 
      :for="`${$attrs.id}`"
      class='custom-control__label'
    >
      {{ label }}  
    </label>
  </div>
</template>

<script>
export default {
  name: 'Checkbox',

  props: {
    label: {
      type: String,
      required: true,
    }
  },

  inheritAttrs: false,

  computed: {
    listeners () {
      return {
        ...this.$listeners,
        change: event => {
          this.$emit('change', event.target.value)
        }
      }
    }
  },
}
</script>

<style scoped lang="scss">
  .custom-control--checkbox {
    & .custom-control__label {
      &:after {
        content: '\f00c';
        font-family: 'Font Awesome 5 Free';
        font-weight: 900;
      }
    }
  }
</style>
