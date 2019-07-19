/**
 * Contains locations specific functions and classes
 */


 /**
  * Since we're not interested in the address and only store address the format
  * {`city` `state`, `country`}, we extract address components from a Geocoded
  * location object
  *
  * @param {Object} geocodedLocation A geocoded location object 
  */
export const extractUSLocationFromGeocodedLocation = (geocodedLocation) => {
  const city = geocodedLocation.address_components.find(place => place.types.indexOf("locality") !== -1 )
  const state = geocodedLocation.address_components.find(place => place.types.indexOf("administrative_area_level_1") !== -1 )

  return {
    formatedAddress: `${city ? city.long_name + ', ' : ''} ${state ? state.long_name + ', ' : ''} US`,
    city,
    state,
  }
}

/**
 * Gets a country object from a Geocoded Location
 * 
 * @param {Object} geocodedLocation 
 */
export function extractCountryFromGeocodedLocation (geocodedLocation) {
  return geocodedLocation.address_components.find(component => component.types.indexOf('country') !== -1)
}


