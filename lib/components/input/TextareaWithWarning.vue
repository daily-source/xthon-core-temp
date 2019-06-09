<template>
  <textarea 
    :class='["textarea",  { "is-danger": !valid }]'
    v-bind='$attrs'
    v-on='listeners' 
  />
</template>

<script>
import InputFieldWithWarning from 'Components/input/InputFieldWithWarning'

export default {
  extends: InputFieldWithWarning,

  name: 'TextareaWithWarning'
}
</script>
