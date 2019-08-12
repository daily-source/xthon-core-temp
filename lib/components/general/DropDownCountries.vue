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

  data () {
    const countries = _.sortBy(getCountries(), country => {
      return country.name
    })
    return {
      countries,
      selected: null,
      userCountry: null,
    }
  },

  mounted () {
    // Loads the gmapApi if it's not loaded
    //this.$gmapApiPromiseLazy().then( () => {
      //console.log('loaded')
    //})
  },

  methods: {
    async extractCountryFromUserPosition () {
      const { coords } = this.userLocation
      
      if (coords) {
        const geocoderObject = new this.google.maps.Geocoder
        
        const location = await geocoder.geocodeLocation(geocoderObject, {lat: coords.latitude, lng: coords.longitude})

         this.userCountry = extractCountryFromGeocodedLocation(location)
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
  },

  computed: {
    google: gmapApi,
  },

  watch: {
    selected (newVal) {
      if (newVal) {
        this.$emit("selected", newVal)
      } else {
        this.$emit("selected", null)
      }
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

    &.open {
      .open-indicator {
        margin-top: 4px;
      }
    }
  }

  .dropdown-toggle {
    .clear {
      margin-top: 4px;
    }
  }
}
</style>
