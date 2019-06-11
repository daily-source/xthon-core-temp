import Vue from "vue"
import axios from "axios"
import VueAxios from "vue-axios"

Vue.use(VueAxios, axios)

const baseURL = process.env.BASE_API
const cmsURL = process.env.CMS_API
const IRSSearchAPI = process.env.IRS_SEARCH_API_URL

/*
 * Fetch nonprofit. This will return the nonprofit data from the API, or
 * will default to the IRS search API service if it can't be found in the main system.
 * It will reject with a 404 if the EIN does not represent a valid nonprofit.
 */
export function fetchNonprofit (ein) {
  return new Promise((resolve, reject) => {
    return Vue.axios.get(`${baseURL}/nonprofits/${ein}`)
      .then(response => {
        if (response.data.length) {
          // Nonprofit was found in main system (nonprofit is not generic)
          return resolve(response.data[0])
        } else {
          // Nonprofit was not found in main system (nonprofit is generic)
          // Fetch generic resources from main system and nonprofit data from the IRS service
          let promises = []
          promises.push(Vue.axios.get(`${IRSSearchAPI}/nonprofits/${ein}`))
          promises.push(Vue.axios.get(`${cmsURL}/default`))
          return Vue.axios.all(promises)
            .then(result => {
              var res = result[0].data[0]
              res.data = result[1].data.data
              return resolve(res)
            })
            .catch(e => {
              console.log("e: ", e)
              return reject({ code: 404 })
            })
        }
    })
  })
}

/*
 * Fetch a fundraiser and return the data or a 404 code if not found.
 */
export function fetchFundraiser (id) {
  return new Promise((resolve, reject) => {
    return Vue.axios.get(`${baseURL}/fundraisers/${id}`)
      .then(response => {
        if (response.data.length) {
          return resolve(response.data[0])
        } else {
          return resolve({ code: 404 })
        }
      })
      .catch(e => {
        return reject(e)
      })
  })
}

/*
 * Fetch fundraisers for a given EIN. Return a 404 code if no fundraisers found.
 */
export function fetchFundraisers (ein, page, limit, paginated = true) {
  if (!paginated) {
    page = 1
  }
  return new Promise((resolve, reject) => {
    return Vue.axios.get(`${baseURL}/fundraisers/nonprofit/${ein}?&_limit=${limit}&_page=${page++}`)
      .then(response => {
        if (response.data.length) {
          return resolve(response.data)
        } else {
          return resolve({ code: 404 })
        }
      })
      .catch(e => {
        return reject(e)
      })
  })
}

/*
 * Fetch fundraisers for the explore page. Return a 404 code if no fundraisers found.
 */
export function fetchExploreFundraisers (page, limit, paginated = true) {
  if (!paginated) {
    page = 1
  }
  // TODO: create algorithm to display varied fundraisers.
  return new Promise((resolve, reject) => {
    return Vue.axios.get(`${baseURL}/fundraisers?&_limit=${limit}&_page=${page++}`)
      .then(response => {
        if (response.data.length) {
          return resolve(response.data)
        } else {
          return resolve({ code: 404 })
        }
      })
      .catch(e => {
        return reject(e)
      })
  })
}

/*
 * Fetch common data for large/editable chunks of content.
 */
export function fetchCommonData (id) {
  return new Promise((resolve, reject) => {
    return Vue.axios.get(`${cmsURL}/common`)
      .then(response => {
        return resolve(response.data)
      })
      .catch(e => {
        return reject(e)
      })
  })
}

/*
 * Fetch updates for a given fundraiser. Return from most recent to least recent, paginating.
 */
export function fetchUpdates (fundraiserId, page, limit, paginated = true) {
  if (!page) {
    page = 1
  }
  if (paginated) {
    page += 1
  }
  return new Promise((resolve, reject) => {
    return Vue.axios.get(`${baseURL}/updates/fundraiser/${fundraiserId}?posts_per_page=${limit}&page=${page}`)
      .then(response => {
        if (response.data.length) {
          return resolve(response.data)
        } else {
          return resolve({ code: 404 })
        }
      })
      .catch(e => {
        return reject(e)
      })
  })
}

/*
 * Fetch comments for a given fundraiser. Return from most recent to least recent, paginating.
 */
export function fetchComments (fundraiserId, page, limit, paginated = true) {
  if (!page) {
    page = 1
  }
  if (paginated) {
    page += 1
  }
  return new Promise((resolve, reject) => {
    return Vue.axios.get(`${baseURL}/comments/fundraiser/${fundraiserId}?posts_per_page=${limit}&page=${page}`)
      .then(response => {
        if (response.data.length) {
          return resolve(response.data)
        } else {
          return reject({ code: 404 }) //reject or resolve??
        }
      })
      .catch(e => {
        return reject(e)
      })
  })
}

/*
 * Fetch donations for a given nonprofit or fundraiser.
 */
export function fetchDonations (query, page, limit, paginated = true, sortBy = "amountInCents") {
  if (!page) {
    page = 1
  }
  if (paginated) {
    page += 1
  }
  return new Promise((resolve, reject) => {
    return Vue.axios.get(`${baseURL}/donations/${query}?posts_per_page=${limit}&page=${page}&sort_by=${sortBy}`)
      .then(response => {
        if (response.data.length) {
          return resolve(response.data)
        } else {
          return resolve({ code: 404 })
        }
      })
      .catch(e => {
        return reject(e)
      })
  })
}

/*
 * Fetch public donor data and sort them by total raised, descending.
 */
export function fetchTopFundraisers (ein, page = 1, limit, paginated = true) {
  return new Promise((resolve, reject) => {
    return Vue.axios.get(`${baseURL}/donations/top-fundraisers/nonprofit/${ein}`)
      .then(response => {
        if (response.data.length) {
          return resolve(response.data)
        } else {
          return resolve({ code: 404 })
        }
      })
      .catch(e => {
        return reject(e)
      })
  })
}

/*
 * Fetch data for the home page.
 */
export function fetchHomePage () {
  return new Promise((resolve, reject) => {
    return Vue.axios.get(`${cmsURL}/pages?page_name=home`)
      .then(response => {
        if (response.data) {
          return resolve(response.data[0])
        } else {
          return resolve({ code: 404 })
        }
      })
      .catch(e => {
        return reject(e)
      })
  })
}

/*
 * Send comment to the API. This can be another API, therefore the .env var on top.
 */
export function sendComment (commentBody, inReplyTo, fundraiserId, userId, honeypot, token) {
  return new Promise((resolve, reject) => {
    return Vue.axios.post(
      `${baseURL}/comments/fundraiser/${fundraiserId}`,
      {
        comment: commentBody,
        parentId: inReplyTo,
        userId: userId,
        fundraiserId: fundraiserId,
        fax: honeypot
      },
      {
        headers: { "Authorization": `Bearer ${token}` }
      }
    )
      .then(data => {
        return resolve(data.data)
      })
      .catch(e => {
        return reject(e)
      })
  })
}

/*
 * Report comment to the API. This can be another API, therefore the .env var on top.
 */
export function reportComment (commentId, userId, token) {
  // WIP
  // unplug the api temporarily
  return new Promise((resolve, reject) => {
    return resolve({
        status: 200,
        message: `comment reported with id: ${commentId}`
      })
    return Vue.axios.post(
      `${baseURL}/comments/report/${commentId}`,
      {
        userId: userId
      },
      {
        headers: { "Authorization": `Bearer ${token}` }
      }
    )
      .then(data => {
        return resolve(data.data)
      })
      .catch(e => {
        return reject(e)
      })
  })
}

/*
 * This function sends a request to the backend to update a user field using a token for authorization.
 */
export function updateUserField (id, field, value, token) {
  return new Promise((resolve, reject) => {
    return Vue.axios.put(
      `${baseURL}/users/${id}/field`,
      {
        field: field,
        value: value
      },
      {
        headers: { "Authorization": `Bearer ${token}` }
      }

    )
      .then(res => {
        return resolve(res)
      })
      .catch(err => {
        return reject(err)
      })
  })
}

/*
 * Save a specific nonprofit or fundraiser field using an inline field.
 */
export function saveInlineField (location, value, route, token) {
  return new Promise((resolve, reject) => {
    return Vue.axios.put(
      `${baseURL}/${route.name}s/${route.name === "nonprofit" ? route.params.ein : route.params.id}/update`,
      {
        location: location,
        value: value
      },
      {
        headers: { "Authorization": `Bearer ${token}` }
      }
    )
      .then(data => {
        return resolve({ location: location, value: value })
      })
      .catch(e => {
        return reject(e)
      })
  })
}

/*
 * Function that requests a presigned URL from the backend if the user is allowed to do that
 */
export function requestAvatarPreSignedURL ({ blob, sub, token }) {
  return new Promise((resolve, reject) => {
    return Vue.axios.get(
      `${baseURL}/users/get-avatar-presigned-url`,
      {
        headers: { "Authorization": `Bearer ${token}` }
      }
    ).then(data => {
      return resolve(data.data)
    })
      .catch(err => {
        return reject(err)
      })
  })
}

/*
 * Function that requests a presigned URL for either nonprofits or fundraisers
 */
export function requestGenericPreSignedUrl ({ blob, token, id, location, filename }) {
  var entity = location.split('.')[0]
  return new Promise((resolve, reject) => {
    return Vue.axios.get(
      `${baseURL}/${entity}s/${id}/get-image-presigned-url?location=${location}&filename=${filename}`,
      {
        headers: { "Authorization": `Bearer ${token}` }
      }
    ).then(data => {
      return resolve(data.data)
    })
      .catch(err => {
        return reject(err)
      })
  })
}

/*
 * Store an image on S3 using a presignedURL
 */
export function postImageToS3 (preSignedURL, blob) {
  var buf = new Buffer(blob.replace(/^data:image\/\w+;base64,/, ""), "base64")
  return new Promise((resolve, reject) => {
    return Vue.axios.put(
      preSignedURL,
      buf,
      {
        headers: {
          "Content-Type": "image/jpeg"
        }
      }
    ).then(data => {
      var postedURL = data.request.responseURL.split("?")[0]
      return resolve(postedURL)
    }).catch(err => {
      return reject(err)
    })
  })
}  

/*
 * Save the postedURL reference to the backend (for user avatar only)
 */
export function saveUserImageToBackend (sub, postedURL, token) {
  return new Promise((resolve, reject) => {
    return Vue.axios.put(
      `${baseURL}/users/${sub}/avatar`,
      {
        field: "avatar",
        value: postedURL
      },
      {
        headers: { "Authorization": `Bearer ${token}` }
      }
    ).then(() => {
      return resolve(postedURL)
    }).catch(err => {
      return reject(err)
    })
  })
}

/*
 * Save the postedURL reference to the backend (for nonprofits and fundraisers only)
 */
export function saveGenericImageToBackend ({ id, postedURL, token, location }) {
  var entity = location.split('.')[0]
  var target = location.split('.')[location.split('.').length - 1]

  return new Promise((resolve, reject) => {
    return Vue.axios.put(
      `${baseURL}/${entity}s/${id}/image`,
      {
        location: location,
        value: postedURL
      },
      {
        headers: { "Authorization": `Bearer ${token}` }
      }
    ).then(() => {
      return resolve(postedURL)
    }).catch(err => {
      return reject(err)
    })
  })
}


/*
 * Add a new update to the DB. Will be rejected if the fields are invalid.
 */
export function addNewUpdate (fundraiserId, update, userId, token) {
  return new Promise((resolve, reject) => {
    return Vue.axios.post(
      `${baseURL}/updates/fundraiser/${fundraiserId}`,
      {
        content: update,
        userId: userId
      },
      {
        headers: { "Authorization": `Bearer ${token}` }
      }
    )
      .then(data => {
        return resolve({ update: update })
      })
      .catch(e => {
        return reject(e)
      })
    })
}

/*
 * Remove an image from either a nonprofit or a fundraiser object using a token.
 */
export function removeFixedImage (location, route, token, filename) {
  var entity = location.split('.')[0]
  var target = location.split('.')[location.split('.').length - 1]
  var identifier = route.name === "nonprofit" ? route.params.ein : route.params.id
  return new Promise((resolve, reject) => {
    return Vue.axios.delete(
      `${baseURL}/${entity}s/${identifier}/image/${target}/${filename.substring(filename.lastIndexOf('/')+1)}`,
      {
        data: {
          fullURL: filename
        },
        headers: { "Authorization": `Bearer ${token}` }
      }
    ).then(filename => {
      return resolve(filename)
    })
    .catch(err => {
      return reject(err)
    })
  })
}

/*
 * Remove a video from either a nonprofit or a fundraiser using a token.
 */
export function removeVideo (location, route, youTubeID, token) {
  var entity = location.split('.')[0]
  var target = location.split('.')[location.split('.').length - 1]
  var identifier = route.name === "nonprofit" ? route.params.ein : route.params.id

  return new Promise((resolve, reject) => {
    return Vue.axios.delete(
      `${baseURL}/${entity}s/${identifier}/video/${youTubeID}`,
      {
        headers: { "Authorization": `Bearer ${token}` }
      }
    ).then(data => {
      return resolve(data)
    }).catch(err => {
      return reject(err)
    })
  })
}

/*
 * Add a video to either a nonprofit or a fundraiser using a token.
 */
export function addVideo (location, route, youTubeID, token) {
  var entity = location.split('.')[0]
  var target = location.split('.')[location.split('.').length - 1]
  var identifier = route.name === "nonprofit" ? route.params.ein : route.params.id

  return new Promise((resolve, reject) => {
    return Vue.axios.put(
      `${baseURL}/${entity}s/${identifier}/video`,
      {
        location: location,
        value: youTubeID
      },
      {
        headers: { "Authorization": `Bearer ${token}` }
      }
    ).then(data => {
      return resolve(data)
    }).catch(err => {
      return reject(err)
    })
  })
}

/*
 * Send a nonprofit form.
 */
export function submitNonprofitForm (form) {
  // This function needs to be added
  throw 'function required!!!'
}








// TODO - until this point, everything is for real and used.

// TODO - These functions should be deleted.
// TODO - Also delete all the actions and commits associated with these functions.
export function sendDonation (donation) {
  throw 'function does not exist'
}

/*
 * Mock a new user creation in the store. This should actually perform an API call.
 */
export function createUser (email, password) {
  throw 'function does not exist'
}

/*
 * Authenticate user. Temporarily allow a given password and return data from the DB for that user.
 */
export function authenticateUser (email, password) {
  throw 'function does not exist'
}

/*
 * Submit a password change request to the backend.
 */
export function submitPasswordChangeRequest (form) {
  throw 'function does not exist'
}

/*
 * Find if a given email is already in use.
 * Note for the backend: this should return only the email and the service used.
 * It also shouldn't return something under /users, only if the query is successful.
 */
export function lookUpEmail (email) {
  throw 'function does not exist'
}

/*
 * Remove a payment method.
 * TODO: This also needs to be protected behind auth and restricted to the user.
 */
export function removePaymentMethod (userId, methodId) {
  throw 'function does not exist'
}

/*
 * Set a temporary password
 */
export function setTemporaryPassword (email) {
  throw 'function does not exist'
}

/*
 * Save an image to the user's library.
 */
export function saveImageField (location, route, blob) {
  throw 'function does not exist'

}


