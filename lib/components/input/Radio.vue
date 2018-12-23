<template>
  <div class="custom-control custom-control--radio">
    <input 
      type="radio"
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
  name: 'Radio',

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
        },
        input: event => {
          this.$emit('input', event.target.value)
        }
      }
    }
  },
}
</script>

<style scoped lang="scss">
  .custom-control--radio {
    .custom-control__label {
      &:before,
      &:after {
        border-radius: 100%;
      }

      &:after {
        content: '\f111';
        font-family: 'Font Awesome 5 Free';
        font-weight: 900;
        color: $primary;
      }
    }

     .custom-control__input {
        &:checked ~ .custom-control__label {
        &:before {
          background-color: transparent;
        }

        &:after {
          opacity: 1;
        }
      }
    }
  }
</style>