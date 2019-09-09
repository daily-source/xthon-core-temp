<template>
  <div class="dropdown-countries columns is-multiline row-wrapper">
    <div class="column is-offset-3 is-3-tablet inputLabel">
      <label :for="`input-editable_${_uid}`" ref="label">{{label}}</label>
    </div>
    <vue-select
      :autocomplete="autocomplete ? `${autocomplete}` : 'on'"
      :options='countries'
      v-model='selected'
      label='name'
      :type="type || 'dropdown'"
      :required="required"
      placeholder='Click or type here to select a country'
      class="column is-5-tablet editable-field-wrapper"
      ref="input"
      v-on:change="vueSelectInputChange($event)"
      v-on:search:blur="doNothingIfTheValueHasntChanged($event)"
      :selectOnTab="true"
      :clearSearchOnSelect="false"
    >
      <template slot="option" slot-scope="country">
        <div class="d-center selection">
          {{ country.name }}
        </div>
      </template>
    </vue-select>
    <transition name="slide-fade">
      <div class="column is-6-tablet is-offset-6-tablet editable-error-message-wrapper" v-if="errorMessage">
        <span class="editable-error-message">{{errorMessage}}</span>
      </div>
    </transition>
  </div>
</template>

<script>
import Vue from 'vue'
import VueSelect from 'vue-select'
import { getCountries } from 'countrycitystatejson'
import { gmapApi } from 'vue2-google-maps'
import _ from 'lodash'
import userGeolocation from 'Core/util/userGeolocation'
import geocoder from 'Core/util/geocoder'
import { extractCountryFromGeocodedLocation } from 'Core/util/locations'

export default {
  name: 'DropDownCountries',
  mixins: [userGeolocation],
  components: {
    VueSelect,
  },
  props: [ "label", "type", "value", "errorText", "disabledEdition", "required", "autocomplete"],
  data () {
    const countries = _.sortBy(getCountries(), country => {
      return country.name
    })
    return {
      countries,
      selected: null,
      userCountry: null,
      fieldIsOpen: false,
      fieldValue: this.value,
      errorMessage: ""
    }
  },
  mounted () {
    this.$emit('dropdown:loaded')
    // Loads the gmapApi if it's not loaded
    //this.$gmapApiPromiseLazy().then( () => {
      //console.log('loaded')
    //})
  },
  methods: {
    doNothingIfTheValueHasntChanged () {
      if (this.$refs.input.value) {
        if (this.value.name === this.$refs.input.value.name) {
          this.$refs.input.search = this.$refs.input.value.name
        }
      }
    },
    vueSelectInputChange (event) {
      if (this.$refs.input.value) {
        this.$refs.input.search = this.$refs.input.value.name
      } else {
        this.$refs.input.search = ''
      }
      if (!event) {
        this.$emit("selected", null)
        this.$emit('input:change', null)
        this.selected = null
        this.validateField()
      }
    },
    async extractCountryFromUserPosition () {
      const { coords } = this.userLocation
      if (coords) {
        const geocoderObject = new this.google.maps.Geocoder
        const location = await geocoder.geocodeLocation(geocoderObject, {lat: coords.latitude, lng: coords.longitude})
         this.userCountry = extractCountryFromGeocodedLocation(location)
      }
    },
    openEdition () {
      this.$refs.input.$refs.search.focus()
    },
    next (e) {
      if (!e.shiftKey) {
        this.$emit("next:field")
      } else {
        this.$emit("previous:field")
      }
    },
    setCountriesToDisplay () {
      if (this.userCountry) {
        const index = this.countries.findIndex(country => country.shortName === this.userCountry.short_name)
        const deleted = this.countries.splice(index, 1)
        this.countries = [
          ...deleted,
          ...this.countries,
        ]
      }
    },
    validateField () {
      if (!this.required && !this.selected) {
        this.errorMessage = ""
        return true
      }
      if (this.selected) {
        this.errorMessage = ""
        return true
      } else {
        this.errorMessage = this.errorText
        return false
      }
    }
  },
  computed: {
    google: gmapApi,
  },
  watch: {
    'selected': function (newVal) {
      this.$emit("selected", newVal)
      this.$emit('input:change', newVal)
      this.validateField()
    },
    userLocation () {
      this.extractCountryFromUserPosition()
    },
    userCountry () {
      this.setCountriesToDisplay()
    },
    //google (val) {
      //this.getUserLocation()
    //},
  }
}
</script>

<style lang='scss' scoped>
.dropdown-countries {
  .dropdown {
    //width: 100%;
    &-toggle {
      flex-grow: 1;
    }
    &.open {
      .open-indicator {
        margin-top: 4px;
      }
    }
  }
  .dropdown-toggle {
    border: 1px solid $color-light-gray;
    .clear {
      margin-top: 4px;
    }
  }
}
.is-multiline {
  @include tablet {
    margin-bottom: 0;
  }
}
.row-wrapper {
  align-items: center;
}
.inputLabel {
  text-align: center;
  @include tablet {
    text-align: right !important;
  }
}
</style>
<style lang='scss'>
  .dropdown-countries {
    input {
      opacity: 1 !important;
      font-weight: 100 !important;
    }
    .clear {
      font-size: 1.25rem !important;
      font-weight: 400 !important;
      margin-bottom: -1px !important;
    }
    .open-indicator:before {
      border-width: 2px 2px 0 0;
      height: 9px;
      width: 9px;
      color: rgba(60, 60, 60, 0.26) !important;
      border-color: rgba(60, 60, 60, 0.26) !important;
    }
  }
</style>