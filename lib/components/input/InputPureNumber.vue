<template>
  <div 
    :class="['control', {'input-wrapper': icon}]"
  >
    <icons 
      :icon="icon" 
      class="input-icon" 
      iconwidth="20px" 
      iconheight="20px"
      color="#999"
      v-if='icon'
    />
    <input 
      class="input" 
      type="number" 
      name="action"
      :required="true"
      v-bind='$attrs'
      v-on='listeners'
    >
  </div>
</template>

<script>
import Icons from 'Components/general/Icons'

export default {
  name: 'InputPureNumber',

  props: {
    icon: {
      type: String,
      required: false,
      default: '',
    },
  },

  inheritAttrs: false,

  components: {
    Icons,
  },

  computed: {
    listeners () {
      return {
        ...this.$listeners,
        keypress: event => {
          const charCode = (event.which) ? event.which : event.keyCode;
          if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46 && charCode !== 101) {
            event.preventDefault();
          } else {
            return true;
          }
        },
        paste: event => {
          const text = event.clipboardData.getData('text')
          const test = !(/[0-9]/.test(text))
    
          if(test){
            event.preventDefault();
          }
        },
        input: event => {
          console.log(event.target.value)
          this.$emit('input', event.target.value)
        }
      }
    }
  },
}
</script>

<style lang='scss' scoped>
.input-wrapper{ 
  .input-icon {
    @include mobile {
      top: 11px;
    }
    top: 5px;
  }
}
</style>

