<template>
  <div class="select is-block">
    <select 
      name="size" 
      id="size" 
      v-bind='$attrs'
      v-on='listeners'
    >
      <option 
        v-for='(size, index) in sizes' 
        :key='index' 
        :value="size.width"
      >
        {{ size.label + ' (' + size.width + 'px)' }}
      </option>
    </select>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'SelectSize',

  inheritAttrs: false,

  data () {
    return {
      size: this.value,
    }
  },

  computed: {
    listeners() {
      return {
        ...this.$listeners,
        input: event => {
          this.$emit('input', event.target.value)
        },
      }
    },

    ...mapState({
      sizes: state => state.counterwidgets.sizes,
    }),
  },
}
</script>
