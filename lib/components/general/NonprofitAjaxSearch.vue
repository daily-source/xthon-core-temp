<template v-if="canRender">
  <div class="column is-centered nonprofit-search-field-wrapper" :class="{'standalone columns': standalone}">
    <VueSelect
      transition="fade" 
      label="NAME"
      :filterable="false"
      :options="options"
      :placeholder="'Type a keyword, nonprofit name or EIN'"
      @search="onSearch"
      v-model="selected"
    >
      <template slot="no-options">
        Type a keyword, nonprofit name or Employer ID Number
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

const IRSSearchAPI = process.env.VUE_APP_IRS_SEARCH_API_URL || process.env.IRS_SEARCH_API_URL

export default {
  props: ["standalone", "placeholder", "defaultValue"],
  components: {
    VueSelect
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
    }, 350)
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

  .v-select {
    flex: 1;

    &.dropdown .highlight a {
      transition: all 0.2s ease-in-out;
      color: white !important;
      background: $color-emphasis !important;
    }

    .selected-tag {
      position: absolute;
      text-align: left;
      padding-right: 50px;
      width: 100%;
      background: transparent !important;
    }
    .dropdown-toggle {
      height: 38px;
      flex: 1;
      display: flex;
      border: 1px solid rgba(60, 60, 60, 0.26);
      .clear {
        bottom: 14px;
        line-height: 36px;
      }
      .open-indicator {
        bottom: 7px;
      }
      .vs__selected-options {
        margin: 4px 0 0;
        input {
          font-weight: 100;
        }
      }
      .vs__actions {
        //align-items: center;
        .clear {
          font-size: 1.25rem;
          font-weight: 400;
          color: rgba(60, 60, 60, 0.26) !important;
        }
        .open-indicator:before {
          border-width: 2px 2px 0 0;
          height: 9px;
          width: 9px;
          color: rgba(60, 60, 60, 0.26) !important;
          border-color: rgba(60, 60, 60, 0.26) !important;
        }
        .spinner {
          width: 4em !important;
          height: 4em !important;
        }
      }
      @include tablet {
        .open-indicator {
          bottom: 12px;
        }        
      }    
    }
    input[type=search] {
      text-align: left;
      flex: 1;
    }
  }

  .dropdown-menu {
    margin-top: -10px;
    li {
      padding-left: 0px;
      padding-right: 0px;
      a {
        display: block;
        white-space: normal;
        margin-bottom: 4px;
        background: none !important;
      }
      .selection {
        padding-top: 4px;
        line-height: 20px;
        overflow: auto;
      }
    }
  }

  .ellipsis-text {
    white-space: nowrap; 
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &.standalone {
    margin: 40px auto;
    max-width: 600px;
  }
}

</style>
