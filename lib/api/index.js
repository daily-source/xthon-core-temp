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
    Vue.axios.get(`${baseURL}/nonprofits/${ein}`)
      .then(response => {
        if (response.data.length) {
          // Nonprofit was found in main system (nonprofit is not generic)
          resolve(response.data[0])
        } else {
          // Nonprofit was not found in main system (nonprofit is generic)
          // Fetch generic resources from main system and nonprofit data from the IRS service
          let promises = []
          promises.push(Vue.axios.get(`${IRSSearchAPI}/nonprofits/${ein}`))
          promises.push(Vue.axios.get(`${cmsURL}/default`))
          Vue.axios.all(promises)
            .then(result => {
              var res = result[0].data[0]
              res.data = result[1].data.data
              resolve(res)
            })
            .catch(e => {
              console.log("e: ", e)
              reject({ code: 404 })
            })
        }
      })
      .catch(e => {
        reject(e)
      })
  })
}

/*
 * Fetch a fundraiser and return the data or a 404 code if not found.
 */
export function fetchFundraiser (id) {
  return new Promise((resolve, reject) => {
    Vue.axios.get(`${baseURL}/fundraisers/${id}`)
      .then(response => {
        if (response.data.length) {
          resolve(response.data[0])
        } else {
          reject({ code: 404 })
        }
      })
      .catch(e => {
        reject(e)
      })
  })
}

/*
 * Fetch fundraisers for a given EIN. Return a 404 code if no fundraisers found.
 */
export function fetchFundraisers (ein, page, limit, paginated = true) {
  return new Promise((resolve, reject) => {
    if (!paginated) {
      page = 1
    }
    Vue.axios.get(`${baseURL}/fundraisers/nonprofit/${ein}?&_limit=${limit}&_page=${page++}`)
      .then(response => {
        if (response.data.length) {
          resolve(response.data)
        } else {
          reject({ code: 404 })
        }
      })
      .catch(e => {
        reject(e)
      })
  })
}

/*
 * Fetch fundraisers for the explore page. Return a 404 code if no fundraisers found.
 */
export function fetchExploreFundraisers (page, limit, paginated = true) {
  return new Promise((resolve, reject) => {
    if (!paginated) {
      page = 1
    }
    // TODO: create algorithm to display varied fundraisers.
    Vue.axios.get(`${baseURL}/fundraisers?&_limit=${limit}&_page=${page++}`)
      .then(response => {
        if (response.data.length) {
          resolve(response.data)
        } else {
          reject({ code: 404 })
        }
      })
      .catch(e => {
        reject(e)
      })
  })
}

/*
 * Fetch common data for large/editable chunks of content.
 */
export function fetchCommonData (id) {
  return new Promise((resolve, reject) => {
    Vue.axios.get(`${cmsURL}/common`)
      .then(response => {
        resolve(response.data)
      })
      .catch(e => {
        reject(e)
      })
  })
}

/*
 * Fetch updates for a given fundraiser. Return from most recent to least recent, paginating.
 */
export function fetchUpdates (fundraiserId, page, limit, paginated = true) {
  return new Promise((resolve, reject) => {
    if (!page) {
      page = 1
    }
    if (paginated) {
      page += 1
    }
    Vue.axios.get(`${baseURL}/updates/fundraiser/${fundraiserId}?posts_per_page=${limit}&page=${page}`)
      .then(response => {
        if (response.data.length) {
          resolve(response.data)
        } else {
          reject({ code: 404 })
        }
      })
      .catch(e => {
        reject(e)
      })
  })
}

/*
 * Fetch comments for a given fundraiser. Return from most recent to least recent, paginating.
 */
export function fetchComments (fundraiserId, page, limit, paginated = true) {
  return new Promise((resolve, reject) => {
    if (!page) {
      page = 1
    }
    if (paginated) {
      page += 1
    }
    Vue.axios.get(`${baseURL}/comments/fundraiser/${fundraiserId}?posts_per_page=${limit}&page=${page}`)
      .then(response => {
        if (response.data.length) {
          resolve(response.data)
        } else {
          reject({ code: 404 })
        }
      })
      .catch(e => {
        reject(e)
      })
  })
}

/*
 * Fetch donations for a given nonprofit or fundraiser.
 */
export function fetchDonations (query, page, limit, paginated = true, sortBy = "amountInCents") {
  return new Promise((resolve, reject) => {
    if (!page) {
      page = 1
    }
    if (paginated) {
      page += 1
    }
    Vue.axios.get(`${baseURL}/donations/${query}?posts_per_page=${limit}&page=${page}&sort_by=${sortBy}`)
      .then(response => {
        if (response.data.length) {
          resolve(response.data)
        } else {
          reject({ code: 404 })
        }
      })
      .catch(e => {
        reject(e)
      })
  })
}

/*
 * Fetch public donor data and sort them by total raised, descending.
 */
export function fetchTopFundraisers (ein, page = 1, limit, paginated = true) {
  return new Promise((resolve, reject) => {
    Vue.axios.get(`${baseURL}/donations/top-fundraisers/nonprofit/${ein}`)
      .then(response => {
        if (response.data.length) {
          resolve(response.data)
        } else {
          reject({ code: 404 })
        }
      })
      .catch(e => {
        reject(e)
      })
  })
}

/*
 * Fetch data for the home page.
 */
export function fetchHomePage () {
  return new Promise((resolve, reject) => {
    Vue.axios.get(`${cmsURL}/pages?page_name=home`)
      .then(response => {
        if (response.data) {
          resolve(response.data[0])
        } else {
          reject({ code: 404 })
        }
      })
      .catch(e => {
        reject(e)
      })
  })
}

/*
 * Send comment to the API. This can be another API, therefore the .env var on top.
 */
export function sendComment (commentBody, inReplyTo, fundraiserId, userId, honeypot, token) {
  return new Promise((resolve, reject) => {
    Vue.axios.post(
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
        resolve(data.data.response)
      })
      .catch(e => {
        reject(e)
      })
  })
}

/*
 * Send donation to the API. For now, mock a server response, randomly rejecting a donation.
 */
export function sendDonation (donation) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.5) {
        reject({ code: 401 })
      } else {
        resolve({ data: { donation } })
      }
    }, 3000)
  })
}

/*
 * Mock a new user creation in the store. This should actually perform an API call.
 */
export function createUser (email, password) {
  return new Promise((resolve, reject) => {
    resolve({ data: { email: { email } } })
  })
}

/*
 * Authenticate user. Temporarily allow a given password and return data from the DB for that user.
 */
export function authenticateUser (email, password) {
  return new Promise((resolve, reject) => {
    // temporarily allow any user
    Vue.axios.get(`${baseURL}/auth/login?email=${email}`)
      .then(data => {
        if (data && data.data) {
          resolve(data.data)
        } else {
          resolve({ code: 401 })
        }
      })
      .catch(e => {
        console.log("err: ", e)
        reject(e)
      })
  })
}

/*
 * Submit a password change request to the backend.
 */
export function submitPasswordChangeRequest (form) {
  return new Promise((resolve, reject) => {
    // Emulate an API call. Reject a portion of the requests.
    setTimeout(() => {
      // reject if password is incorrect
      if (form.currentPassword !== "qqQQ11!!") {
        reject({ code: 401 })
      }
      if (form.currentPassword === form.password) {
        reject({ message: "Please use a different password" })
      }
      if (Math.random() > 0.9) {
        reject({ message: "Remote API error" })
      }
      resolve()
    }, 1000)
  })
}

/*
 * Find if a given email is already in use.
 * Note for the backend: this should return only the email and the service used.
 * It also shouldn't return something under /users, only if the query is successful.
 */
export function lookUpEmail (email) {
  return new Promise((resolve, reject) => {
    Vue.axios.get(`${baseURL}/users/lookup/${email}`)
      .then(data => {
        if (data.length) {
          resolve(data)
        } else {
          resolve(null)
        }
      })
      .catch(e => {
        console.log("err: ", e)
        reject(e)
      })
  })
}

/*
 * Remove a payment method.
 * TODO: This also needs to be protected behind auth and restricted to the user.
 */
export function removePaymentMethod (userId, methodId) {
  return new Promise((resolve, reject) => {
    Vue.axios.delete(`${baseURL}/users/${userId}/payment-method/${methodId}`)
      .then(data => {
        console.log(data)
        resolve(data)
      })
      .catch(e => {
        console.log("err: ", e)
        reject(e)
      })
  })
}

/*
 * TODO: the complete call. This also needs to be protected behind auth and restricted to the user.
 */
export function updateUserField (id, field, value, token) {
  return Vue.axios.put(
    `${baseURL}/users/${id}`,
    {
      field: field,
      value: value
    },
    {
      headers: { "Authorization": `Bearer ${token}` }
    }

  )
    .then(res => {
      return res
    })
    .catch(err => {
      return err
    })
}

/*
 * Save a specific nonprofit or fundraiser field
 */
// WIP.
export function saveInlineField (location, value, route, token) {
  return new Promise((resolve, reject) => {
    // TODO
    // do a different call depending on the 'location'
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
        resolve({ location: location, value: value })
      })
      .catch(e => {
        reject(e)
      })
  })
}

export function requestAvatarPreSignedURL ({ blob, sub, token }) {
  return new Promise((resolve, reject) => {
    return Vue.axios.get(
      `${baseURL}/users/get-avatar-presigned-url`,
      {
        headers: { "Authorization": `Bearer ${token}` }
      }
    ).then(data => {
      resolve(data.data)
    })
      .catch(err => {
        reject(err)
      })
  })
}

export function requestGenericPreSignedUrl ({ blob, token, id, location }) {
  var entity = location.split('.')[0]
  var target = location.split('.')[location.split('.').length - 1]

  return new Promise((resolve, reject) => {
    return Vue.axios.get(
      `${baseURL}/${entity}s/${id}/get-image-presigned-url`,
      {
        headers: { "Authorization": `Bearer ${token}` }
      }
    ).then(data => {
      resolve(data.data)
    })
      .catch(err => {
        reject(err)
      })
  })
}

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
      resolve(postedURL)
    }).catch(err => {
      console.log("postImageToS3 reject with err: ", err)
      reject(err)
    })
  })
}

// This functions doesnt work for the user avatar. Commented out while we finish the nonprofit method
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
      resolve(postedURL)
    }).catch(err => {
      reject(err)
    })
  })
}




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
      resolve(postedURL)
    }).catch(err => {
      reject(err)
    })
  })
}

/*
 * Add a new update
 */
// WIP.
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
        resolve({ update: update })
      })
      .catch(e => {
        reject(e)
      })
  })
}

/*
 * Send a nonprofit form.
 * TODO: the complete call. This also requires a second page of data for the fundraiser to be created.
 */
export function submitNonprofitForm (form) {
  return new Promise((resolve, reject) => {
    // Emulate an API call.
    // Randomly reject some calls
    setTimeout(() => {
      if (Math.random() > 0.95) {
        reject({ code: 401 })
      }
      resolve(form)
    }, 1000)
  })
}

/*
 * Set a temporary password
 */
export function setTemporaryPassword (email) {
  return new Promise((resolve, reject) => {
    // Emulate an API call.
    // Randomly reject some calls
    setTimeout(() => {
      if (Math.random() > 0.95) {
        reject({ code: 401 })
      }
      resolve(email)
    }, 1000)
  })
}

/*
 * Save an image to the user's library.
 */
export function saveImageField (location, route, blob) {
  return new Promise((resolve, reject) => {
    // Emulate an API call.
    // Randomly reject some calls
    setTimeout(() => {
      if (Math.random() > 0.95) {
        reject({ code: 401 })
      }
      console.log("save image: ", route.fullPath + blob)
      resolve({ location: location })
    }, 1000)
  })
}

/*
 * Remove an image.
 */
export function removeFixedImage (location, route, token) {
  return new Promise((resolve, reject) => {
    var entity = location.split('.')[0]
    var target = location.split('.')[location.split('.').length - 1]
    var identifier = route.name === "nonprofit" ? route.params.ein : route.params.id
    console.log('request url: ', `${baseURL}/${entity}s/${identifier}/${target}`)
    return Vue.axios.delete(
      `${baseURL}/${entity}s/${identifier}/${target}`,
      {
        headers: { "Authorization": `Bearer ${token}` }
      }
    ).then(() => {
      resolve()
    })
    .catch(err => {
      reject(err)
    })
  })
}

/*
 * Remove a video.
 */
export function removeVideo (location, route, youTubeID) {
  return new Promise((resolve, reject) => {
    // Emulate an API call.
    // Randomly reject some calls
    setTimeout(() => {
      if (Math.random() > 0.95) {
        reject({ code: 401 })
      }
      resolve({ location: location })
      console.log("remove video: ", route.fullPath + youTubeID)
    }, 1000)
  })
}

/*
 * Add a video.
 */
export function addVideo (location, route, youTubeID) {
  return new Promise((resolve, reject) => {
    // Emulate an API call.
    // Randomly reject some calls
    setTimeout(() => {
      if (Math.random() > 0.95) {
        reject({ code: 401 })
      }
      resolve({ location: location })
      console.log("add video: ", route.fullPath + youTubeID)
    }, 1000)
  })
}

/*
 * Update a video.
 */
export function updateVideo (location, route, oldSrc, newSrc) {
  return new Promise((resolve, reject) => {
    // Emulate an API call.
    // Randomly reject some calls
    setTimeout(() => {
      if (Math.random() > 0.95) {
        reject({ code: 401 })
      }
      resolve({ location: location })
      console.log("update video: ", route.fullPath + "/" + oldSrc)
    }, 1000)
  })
}
