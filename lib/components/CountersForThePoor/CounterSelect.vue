<template>
  <div class='counters-select__wrap'>
    <div class='select is-block'>
      <select 
        :value='counterId'
        @input='onInput'
       >
        <option 
          v-for='counter in counters'
          :value='counter.id' 
          :key='counter.id'
        >
          {{ counter.title }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'CounterSelect',

  props: {
    counterId: {
      type: [Number, String],
      default: 0,
    }
  },

  methods: {
    onInput (event) {
      this.$emit('input', event.target.value)
    }
  },

  computed: {
    ...mapState({
      counters: state => state.counterwidgets.counters
    }),
  }
}
</script>

<style lang="scss" scoped>
</style>
