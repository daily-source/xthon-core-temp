<template v-if='type === "input"'>
  <input 
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

    /**
     * Warning length
     */
    warningMaxLength: {
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
      warnings: {
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

      console.log(hasError)

      if (hasError) {
        this.valid = false
        this.$emit('invalid', this.errors)        
      } else {
        this.valid = true
        this.$emit('valid')
      }
    },

    handleWarningChanges () {
      this.$emit('warningChange', this.warnings)
    },

    setErrors (value, event) {
      this.errors.maxLength = this.maxLength && value.length > this.maxLength
      this.errors.minLength = value.length < this.minLength

      this.$emit('input', value)
    },

    setWarnings (value, event) {
      this.warnings.maxLength = this.warningMaxLength && value.length >= this.warningMaxLength
    },
  },

  computed: {
    listeners () {
      return {
        ...this.$listeners,
        input: event => {
          const { value } = event.target

          this.setErrors(value, 'input')
          this.setWarnings(value, 'input')
        },

        keydown: event => {
          const { value } = event.target
          
          this.setErrors(value, 'keydown')
          this.setWarnings(value, 'keydown')
        },

        paste: event => {
          const { value } = event.target

          this.setErrors(value, 'paste')
          this.setWarnings(value, 'paste')
        },

        keyup: event => {
          const { value } = event.target
          
          this.setErrors(value, 'keydown')
          this.setWarnings(value, 'keyup')

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

    warnings: {
      deep: true,
      handler: 'handleWarningChanges',
    }
  },
}
</script>
