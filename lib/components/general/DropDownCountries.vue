<template>
  <div class="dropdown-countries">
    <vue-select
      :options='countries'
      v-model='selected'
      label='name'
      placeholder='Click or type here to select a country'
    >
      <template slot="option" slot-scope="country">
        <div class="d-center selection">
          {{ country.name }}
        </div>
      </template>
    </vue-select>
  </div>
</template>

<script>
import VueSelect from 'vue-select'

import { getCountries } from 'countrycitystatejson'

export default {
  name: 'DropDownCountries',

  components: {
    VueSelect,
  },

  data () {
    return {
      countries: getCountries(),
      selected: null,
    }
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
.dropdown-countries {
  .dropdown {
    width: 100%;

    &-toggle {
      flex-grow: 1;
    }
  }
}
</style>

