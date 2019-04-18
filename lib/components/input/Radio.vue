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
      <span></span>
    </label>
  </div>
</template>

<script>
export default {
  name: "Radio",

  props: {
    label: {
      type: String,
      required: true
    }
  },

  inheritAttrs: false,

  computed: {
    listeners () {
      return {
        ...this.$listeners,
        change: event => {
          this.$emit("change", event.target.value)
        },
        input: event => {
          this.$emit("input", event.target.value)
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .custom-control--radio {
    .custom-control__label {
      &:before,
      span {
        border-radius: 100%;
      }

      span {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        background-color: $primary;

        &:before {
          content: '';
          display: block;
          width: 40%;
          height: 40%;
          border-radius: 100%;
          background-color: #fff;
        }
      }
    }

     .custom-control__input {
        &:checked ~ .custom-control__label {
        &:before {
          background-color: transparent;
        }
      }
    }
  }
</style>