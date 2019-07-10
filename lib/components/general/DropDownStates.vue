<template>
  <div class="dropdown-states">
    <vue-select
      :options='states'
      v-model='selected'
      label='name'
      placeholder='Click or type here to select a state'
    >
      <template slot="option" slot-scope="state">
        <div class="d-center selection">
          {{ state.name }}
        </div>
      </template>
    </vue-select>
  </div>
</template>

<script>
import { getStatesByShort } from 'countrycitystatejson'

import VueSelect from 'vue-select'

export default {
  name: 'DropDownStates',

  components: {
    VueSelect,
  },

  props: {
    country: {
      type: String,
      required: false,
      default: 'US'
    },
  },

  data () {
    return {
      selected: null,
    }
  },

  computed: {
    states () {
      return getStatesByShort(this.country || 'US')
    },
  },

   watch: {
    selected (newVal) {
      if (newVal) {
        this.$emit("selected", newVal)
      } else {
        this.$emit("selected", null)
      }
    },
  },
}
</script>

<style lang='scss'>
.dropdown-states {
  .dropdown {
    width: 100%;

    &-toggle {
      flex-grow: 1;
    }
  }
}
</style>
