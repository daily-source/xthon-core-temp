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
        :value="index"
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
			selectedIndex: 'large',
		}
	},

  computed: {
    selectedSize () {
      return this.sizes[this.selectedIndex] 
    },

    listeners () {
      return {
        ...this.$listeners,
        change: event => {
          this.selectedIndex = event.target.value
					console.log(this.selectedSize)
          this.$emit('input', this.selectedSize)
        },
      }
    },

    ...mapState({
      sizes: state => state.counterwidgets.sizes,
    }),
  },
}
</script>
