/**
 * Geocodes a location using Google's Reverse Geocoding API
 * 
 * @param {Object} geocoder Geocoder object
 * @param {Object} latLng Google Maps LatLng Object
 * 
 * @returns Promise
 */
const geocodeLocation = (geocoder, latLng) => {
  return new Promise((resolve, reject) => {
    geocoder.geocode({'location': latLng}, (results, status) => {
      if (status==='OK' && results.length > 0) {
        resolve(results[0])
        return
      }
      reject('Address cannot be geocoded')
    })
  })
}

export default {
  geocodeLocation
}