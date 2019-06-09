<template v-if='type === "input"'>
  <input 
    type="text"
    :class='["input",  { "is-danger": !valid }]'
    v-bind='$attrs'
    v-on='listeners' 
  />
</template>

<script>
export default {
  name: 'InputFieldWithWarning',

  inheritAttrs: false,

  props: {
    /**
     * Minimum length of the input 
     */
    minLength: {
      type: Number,
      required: false,
      default: 0,
    },

    /**
     * Max length of the input 
     */
    maxLength: {
      type: Number,
      required: false,
    },
  },

  data () {
    return {
      errors: {
        maxLength: false,
        minLength: false,
      },
      valid: true,
    }
  },

  methods: {
    setFieldInvalid () {
      this.valid = false
    },

    setFieldValid () {
      this.valid = true
    },

    checkIfHasError () {
      const hasError = Object.keys(this.errors).some(key => {
        return this.errors[key] === true
      })

      if (hasError) {
        this.valid = false
        this.$emit('invalid', this.errors)        
      } else {
        this.valid = true
        this.$emit('valid')
      }
    },

    setErrors (value, event) {
      console.log(value.length)
      this.errors.maxLength = this.maxLength && value.length > this.maxLength
      this.errors.minLength = value.length < this.minLength

      this.$emit('input', value)
    }
  },

  computed: {
    listeners () {
      return {
        ...this.$listeners,
        input: event => {
          const { value } = event.target

          this.setErrors(value, 'input')
        },

        keydown: event => {
          console.log('keydown')
          const { value } = event.target
          
          this.setErrors(value, 'keydown')
        }
      }
    },

    attrs () {
      return this.$attrs
    },
  },

  watch: {
    errors: {
      deep: true,
      handler: 'checkIfHasError',
    },
  },
}
</script>
