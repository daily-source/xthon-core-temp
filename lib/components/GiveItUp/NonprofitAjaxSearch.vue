<template v-if="canRender">
  <div class="column is-centered nonprofit-search-field-wrapper" :class="{'standalone columns': standalone}">
    <VueSelect
      transition="fade" 
      label="name"
      :filterable="false"
      :options="options"
      :placeholder="placeholder"
      @search="onSearch"
      v-model="selected"
    >
      <template slot="no-options">
        <span class="font-weight-normal">Type to search nonprofits...</span>
      </template>
      <template slot="option" slot-scope="option">
        <div class="d-center selection">
          {{ option.NAME }}
          </div>
      </template>
      <template slot="selected-option" slot-scope="option">
        <div class="selected ellipsis-text">           
          {{ option.NAME }}
        </div>
      </template>
    </VueSelect>
  </div>
</template>

<script>
import VueSelect from "vue-select"
import debounce from "lodash/debounce"

const IRSSearchAPI = process.env.IRS_SEARCH_API_URL

export default {
  name: 'NonprofitAjaxSearch',

  props: ["standalone", "placeholder", "defaultValue"],

  components: {
    VueSelect,
  },

  data () {
    return {
      canRender: false,
      selected: null,
      options: []
    }
  },

  /**
   * Display this form only in the browser, not in the server.
   */
  mounted () {
    this.canRender = false
    if (this.defaultValue) {
      this.selected = this.defaultValue
    }
  },

  /**
   * Perform a debounced lookup on the IRS Search API (meaning it will group the input to
   * avoid flooding the server with calls).
   */
  methods: {
    onSearch (search, loading) {
      loading(true)
      this.search(loading, search, this)
    },
    search: debounce((loading, search, vm) => {
      fetch(
        `${IRSSearchAPI}/nonprofits/search/${escape(search)}`
      ).then(res => {
        res.json().then(json => (vm.options = json))
        loading(false)
      })
    }, 350),
  },

  /**
   * Upon selection, emit selected value.
   * The parent component can react to the event like this v-on:selected="doSomething($event)".
   */
  watch: {
    selected (newVal) {
      if (newVal) {
        this.$emit("selected", newVal)
      } else {
        this.$emit("selected", null)
      }
    },
    defaultValue (newVal) {
      this.selected = newVal
    }
  }

}
</script>

<style lang="scss">
.nonprofit-search-field-wrapper {
  position: relative;
  display: flex;
  width: 400px;
  margin-right: 0.25em;

  .v-select {
    flex: 1;

    .vs__selected-options {
      font-size: 1rem !important;
    }

    .selected-tag {
      position: absolute;
      text-align: left;
      padding-right: 50px;
      width: 100%;
      margin-top: 0;
      font-weight: 400;
      top: 7px;
    }

    .dropdown-toggle {
      height: 38px;
      flex: 1;
      display: flex;

      li,
      a {
        background: transparent !important;
        overflow: hidden;
      }   
    }

    input[type=search] {
      text-align: left;
      flex: 1;
      margin-top: 0 !important;
      font-size: 1rem !important;
      position: relative;
      z-index: 10;
    }

  }

  .dropdown-menu {
    margin-top: 0 !important;
    li {
      padding-left: 0px;
      padding-right: 0px;
      a {
        display: block;
        white-space: normal;
        margin-bottom: 10px;
        background-color: transparent !important;
        color: #000 !important;

        &:hover {
          background-color: $primary !important;
          color: #fff !important;
        }

      }
      .selection {
        line-height: 20px;
        overflow: auto;
        font-size: 1rem;
        background-color: transparent;
        font-weight: 400;
      }
    }
  }

  .ellipsis-text {
    white-space: nowrap; 
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 1rem;
  }

  &.standalone {
    margin-left: .25em;
    max-width: 900px;

    .v-select {
      .dropdown-toggle {

        &:after {
          display: none;
        }      
      }
    }
  }

  .open-indicator {
    &:before {
      margin-top: -6px;
    }
  }

  .open {
    .open-indicator {
      &:before {
        margin-top: 0;
      }
    }
  }

  .vs__actions {
    position: absolute;
    right: 6px;
    height: 100%;
    display: flex;
    align-items: center;
    z-index: 11;
  }
}
</style>
