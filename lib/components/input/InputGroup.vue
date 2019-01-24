<template>
  <div 
    class="input-group"
  >
    <input 
      v-bind='$attrs'
      v-on='listeners'
      :class='["input", { "input--has-prepend": prependText, "input--has-append": appendText }]'
      type="text"
    >
    <div class="input-group__prepend" v-if='prependText'>
      {{ prependText }}
    </div>
    <div class="input-group__append" v-if='appendText'>
      {{ appendText }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'InputGroup',

  inheritAttrs: false,

  props: {
    prependText: {
      type: String,
    },
    appendText: {
      type: String,
    }
  },

  computed: {
    listeners () {
      return {
        ...this.$listeners,
        input: event => {
          this.$emit('input', event.target.value)
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .input-group {
    position: relative; 

    .input {
      &--has-prepend {
        padding-left: 1.75em;
      }

      &--has-append {
        padding-right: 1.75em;
      }

      &:focus {
        ~ .input-group__prepend,
        ~ .input-group__append {
          color: $primary;
        }
      }
    }

    &__prepend,
    &__append {
      position: absolute;
      top: .5em;
      color: $color-gray;
      transition: all .2s ease;
      font-weight: 700;
    }

    &__prepend {
      left: .75em;
    }

    &__append {
      right: .5em;
    }
  }
</style>  