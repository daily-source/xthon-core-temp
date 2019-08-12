export default {
  data () {
    return {
      userLocation: null,
    }
  },

  /**
   * Gets the user location using the HTML5 Geolocation API
   * 
   * @returns {Object} userLocation
   */
  methods: {
    getUserLocation () {
      navigator.geolocation.getCurrentPosition(this.setUserLocation)

      return this.userLocation
    },
    
    /** 
     * Sets user location
     *
     * @param {Object} position
     */
    setUserLocation (position) {
      this.userLocation = position
    },
  }
}