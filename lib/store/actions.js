import {
  createUser,
  fetchFundraiser,
  fetchFundraisers,
  fetchComments,
  fetchCommonData,
  fetchDonations,
  fetchExploreFundraisers,
  fetchHomePage,
  fetchNonprofit,
  fetchTopFundraisers,
  fetchUpdates,
  lookUpEmail,
  sendComment,
  sendDonation,
  removePaymentMethod,
  //submitNonprofitForm,
  submitFundraiserForm,
  submitPasswordChangeRequest,
  setTemporaryPassword,
  saveInlineField,
  saveFundraiserStatus,
  saveImageField,
  removeFixedImage,
  removeVideo,
  addVideo,
  updateVideo,
  updateUserField,
  addNewUpdate,
  requestAvatarPreSignedURL,
  postImageToS3,
  saveGenericImageToBackend,
  saveUserImageToBackend,
  requestGenericPreSignedUrl,
  reportComment,
  shareViaEmail,
  reportContent,
  submitClaimForm
} from "../api"

export default {
  /**
   * Fetch nonprofit for the given EIN.
   * Store the response or reject the promise if not found.
   * Same for most functions below.
   */
  SHARE_BY_EMAIL: ({ commit, dispatch, state }, { url, via, targetName, targetEmail, token }) => {
    return new Promise((resolve, reject) => {
      return shareViaEmail({
        url: url,
        via: via,
        targetName: targetName,
        targetEmail: targetEmail,
        token: token
      })
        .then(data => {
          resolve(data)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  /**
   * Fetch nonprofit for the given EIN.
   * Store the response or reject the promise if not found.
   * Same for most functions below.
   */
  FETCH_NONPROFIT: ({ commit, dispatch, state }, { ein }) => {
    return new Promise((resolve, reject) => {
      return fetchNonprofit(ein)
        .then(data => {
          commit("SET_NONPROFIT", { nonprofit: data })
          resolve(data)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  FETCH_FUNDRAISER: ({ commit, dispatch, state }, { id }) => {
    return new Promise((resolve, reject) => {
      return fetchFundraiser(id)
        .then(data => {
          commit("SET_FUNDRAISER", { fundraiser: data })
          resolve(data)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  FETCH_FUNDRAISERS: ({ commit, dispatch, state }, { ein }) => {
    return new Promise((resolve, reject) => {
      return fetchFundraisers(ein)
        .then(data => {
          commit("SET_FUNDRAISERS", { fundraisers: data })
          resolve(data)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  FETCH_COMMON_DATA: ({ commit, dispatch, state }) => {
    return new Promise((resolve, reject) => {
      return fetchCommonData()
        .then(data => {
          commit("SET_COMMON_DATA", { common: data })
          resolve(data)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  /**
   * Fetch updates for a given fundraiser.
   * If no data is returned, delete the stored object (meaning the fundraiser doesn't have any updates).
   */
  FETCH_UPDATES: ({ commit, dispatch, state }, { fundraiserId, paginated }) => {
    return new Promise((resolve, reject) => {
      return fetchUpdates(fundraiserId, state.updates.current, state.updates.limit, paginated)
        .then(data => {
          if (paginated) {
            commit("ADD_UPDATES", { updates: data })
          } else {
            commit("SET_UPDATES", { updates: data })
          }
          resolve(data)
        })
        .catch(err => {
          if (paginated) {
            commit("ADD_UPDATES", { updates: [] })
          } else {
            commit("SET_UPDATES", { updates: [] })
          }
          reject(err)
        })
    })
  },
  FETCH_COMMENTS: ({ commit, dispatch, state }, { fundraiserId, paginated }) => {
    return new Promise((resolve, reject) => {
      return fetchComments(fundraiserId, state.comments.current, state.comments.limit, paginated)
        .then(data => {
          if (paginated) {
            commit("ADD_COMMENTS", { comments: data })
          } else {
            commit("SET_COMMENTS", { comments: data })
          }
          resolve(data)
        })
        .catch(err => {
          if (paginated) {
            commit("ADD_COMMENTS", { comments: [] })
          } else {
            commit("SET_COMMENTS", { comments: [] })
          }
          reject(err)
        })
    })
  },
  /**
   * Fetch donors data.
   * The query is modified depending on the target: if it's nonprofit or a fundraiser.
   * If no data is returned, delete the stored object.
   */
  FETCH_DONATIONS: ({ commit, dispatch, state }, { fundraiserId, nonprofitEIN, paginated, limit, sortBy, showAll }) => {
    return new Promise((resolve, reject) => {
      var query = ""
      var page = state.donations[sortBy].current
      var max = limit || state.donations.limit

      if (fundraiserId) {
        query = `fundraiser/${fundraiserId}`
      }
      if (nonprofitEIN) {
        query = `nonprofit/${nonprofitEIN}`
      }

      if (showAll) {
        max = 50
        page = 1
        paginated = false
      }
      // Modify the identifiers for the api.
      var sortByParam = "createdAt"
      if (sortBy === "byAmount") {
        sortByParam = "amountInCents"
      }

      return fetchDonations(query, page, max, paginated, sortByParam)
        .then(data => {
          if (paginated) {
            commit("ADD_DONATIONS", { byParam: sortBy, donations: data || [] })
          } else {
            commit("SET_DONATIONS", { byParam: sortBy, donations: data || [] })
          }
          resolve(data)
        })
        .catch(err => {
          commit("SET_DONATIONS", { byParam: sortBy, donations: [] })
          reject(err)
        })
    })
  },
  FETCH_TOP_FUNDRAISERS: ({ commit, dispatch, state }, { ein, paginated }) => {
    return new Promise((resolve, reject) => {
      return fetchTopFundraisers(ein, state.topFundraisers.current, state.topFundraisers.limit, paginated)
        .then(data => {
          commit("ADD_TOP_FUNDRAISERS", { fundraisers: data })
          resolve(data)
        })
        .catch(err => {
          commit("ADD_TOP_FUNDRAISERS", { fundraisers: [] })
          reject(err)
        })
    })
  },
  FETCH_HOME_PAGE: ({ commit, dispatch, state }) => {
    return new Promise((resolve, reject) => {
      return fetchHomePage()
        .then(data => {
          commit("SET_HOME_PAGE", { home: data })
          resolve(data)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  FETCH_EXPLORE_FUNDRAISERS: ({ commit, dispatch, state }) => {
    return new Promise((resolve, reject) => {
      return fetchExploreFundraisers()
        .then(data => {
          commit("SET_EXPLORE_FUNDRAISERS", { fundraisers: data })
          resolve(data)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  /**
   * This just stores the donation trigger, to be further sent with the donation to the backend.
   */
  START_DONATION: ({ commit, dispatch, state }, { initiator }) => {
    commit("START_DONATION", { initiator: initiator })
  },
  WRITE_COMMENT: ({ commit, dispatch, state }, { comment, reply, fundraiserId, userId, honeypot, token }) => {
    return new Promise((resolve, reject) => {
      return sendComment(comment, reply, fundraiserId, userId, honeypot, token)
        .then(data => {
          commit("ADD_NEW_COMMENT", { comment: data.response, count: data.count })
          resolve(data)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  REPORT_CONTENT: ({ commit, dispatch, state }, { entity, contentId, report, token }) => {
    return new Promise((resolve, reject) => {
      return reportContent(entity, contentId, report, token)
        .then(data => {
          return resolve(data)
        })
        .catch(err => {
          return reject(err)
        })
    })
  },
  SEND_DONATION: ({ commit, dispatch, state }, { donation }) => {
    return new Promise((resolve, reject) => {
      return sendDonation(donation)
        .then(data => {
          commit("UPDATE_DONATION", { donation: data })
          resolve(data)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  SUBMIT_CLAIM_FORM: ({ commit, dispatch, state }, { ein, form }) => {
    return new Promise((resolve, reject) => {
      return submitClaimForm(ein, form, state.user.tokenData.accessToken)
        .then(data => {
          return resolve(data)
        })
        .catch(err => {
          return reject(err)
        })
    })
  },
  /**
   * This should create a new user. For now, create a fake user and authenticate it.
   */
  CREATE_USER: ({ commit, dispatch, state }, { email, password, firstname, lastname }) => {
    return new Promise((resolve, reject) => {
      return createUser({ email: email, password: password, firstname: firstname, lastname: lastname })
        .then(data => {
          if (data && data.code !== 401) {
            // temporarily use a standard email to authentica a newly created user.
            dispatch("AUTHENTICATE_USER", { email: "john@doe.com", password: "qqQQ11!!" })
              .then(data => {
                if (data && data.code !== 401) {
                  resolve(data)
                } else {
                  resolve({ code: 401 })
                }
              })
              .catch(err => {
                console.log(err)
              })
          } else {
            resolve(null)
          }
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  SET_USER: ({ commit, dispatch, state }, { user }) => {
    commit("SET_USER", { user })
  },
  LOOK_UP_EMAIL: ({ commit, dispatch, state }, { email }) => {
    return new Promise((resolve, reject) => {
      return lookUpEmail(email)
        .then(data => {
          resolve(data)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  REMOVE_PAYMENT_METHOD: ({ commit, dispatch, state }, { userId, methodId }) => {
    return new Promise((resolve, reject) => {
      return removePaymentMethod(userId, methodId)
        .then(id => {
          commit("REMOVE_PAYMENT_METHOD", { methodId })
          resolve(id)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  UPDATE_USER_FIELD: ({ commit, dispatch, state }, { id, field, value }) => {
    return new Promise((resolve, reject) => {
      return updateUserField(state.user.auth0.sub, field, value, state.user.tokenData.accessToken)
        .then(res => {
          commit("UPDATE_USER_FIELD", { field: field, value: value })
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  /*
  SUBMIT_NONPROFIT_FORM: ({ commit, dispatch, state }, { form }) => {
    return new Promise((resolve, reject) => {
      return submitNonprofitForm(form)
        .then(data => {
          resolve(data)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  */
  SUBMIT_FUNDRAISER_FORM: ({ commit, dispatch, state }, { form }) => {
    return new Promise((resolve, reject) => {
      return submitFundraiserForm(form, state.user.tokenData.accessToken)
        .then(data => {
          resolve(data)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  SUBMIT_PASSWORD_CHANGE_REQUEST: ({ commit, dispatch, state }, { form }) => {
    return new Promise((resolve, reject) => {
      submitPasswordChangeRequest(form)
        .then(() => {
          resolve()
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  SET_TEMPORARY_PASSWORD: ({ commit, dispatch, state }, { email }) => {
    return new Promise((resolve, reject) => {
      setTemporaryPassword(email)
        .then(() => {
          resolve()
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  SAVE_INLINE_FIELD: ({ commit, dispatch, state }, { location, route, value }) => {
    return new Promise((resolve, reject) => {
      saveInlineField(location, value, route, state.user.tokenData.accessToken)
        .then(data => {
          commit("SAVE_INLINE_FIELD", { location: location, value: value })
          resolve(data)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  SAVE_FUNDRAISER_STATUS: ({ commit, dispatch, state }, { location, route, value }) => {
    return new Promise((resolve, reject) => {
      saveFundraiserStatus(location, value, route, state.user.tokenData.accessToken)
        .then(data => {
          commit("SAVE_FUNDRAISER_STATUS", { location: location, value: value })
          resolve(data)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  // Saves the nonprofit logo
  // This should also be used for other images...
  // The location is used for: logo or hero... add or remove?
  // This is only used for those locations where the previous image gets removed:
  // Namely: nonprofit logo, nonprofit hero, user logo (not included yet)
  SAVE_GENERIC_IMAGE: ({ commit, dispatch, state }, { image, location, route, filename }) => {
    // because we have the location, we can also decide where to direct this request
    // so this is going to be a generic method to replace others
    // let's record the actions in variables
    // but this cant be done with the actions...

    var token = state.user.tokenData.accessToken
    var sub = state.user.auth0.sub
    var target = location.split('.')[location.split('.').length - 1]
    var entity = location.split('.')[0]
    var identifier = entity === 'nonprofit' ? route.params.ein : route.params.id

    // if no image, then we need to save an empty string so that the image is replaced for what?
    if (image) {
      return new Promise((resolve, reject) => {
        return requestGenericPreSignedUrl({
          blob: image,
          id: identifier,
          token: token,
          location: location,
          filename: filename
        })
          .then(preSignedURL => { return postImageToS3(preSignedURL, image) })
          .then(postedURL => { return saveGenericImageToBackend({
              id: identifier,
              postedURL: postedURL,
              token: token,
              location: location
            })
          })
          .then(postedURL => {
            commit("UPDATE_FIXED_IMAGE", { image: postedURL, entity: entity, target: target })
            return resolve(postedURL)
          })
          .catch(err => {
            return reject(err)
          })
      })
    } else {
      // No avatar, so save empty string (or remove the previous one)
      return new Promise((resolve, reject) => {
        return saveGenericImageToBackend(sub, "", token)
          .then(() => {
            commit("UPDATE_NONPROFIT_IMAGE", { image: "", target: target })
            resolve()
          })
          .catch(err => {
            reject(err)
          })
      })
    }
  },

  // This saves the user avatar
  SAVE_PROFILE_AVATAR: ({ commit, dispatch, state }, { avatar }) => {
    var token = state.user.tokenData.accessToken
    var sub = state.user.auth0.sub
    // if no avatar, then we need to save an empty string so that the
    if (avatar) {
      return new Promise((resolve, reject) => {
        return requestAvatarPreSignedURL({
          blob: avatar,
          sub: sub,
          token: token
        })
          .then(preSignedURL => { return postImageToS3(preSignedURL, avatar) })
          .then(postedURL => { return saveUserImageToBackend(sub, postedURL, token) })
          .then(postedURL => {
            commit("UPDATE_USER_AVATAR", { avatar: postedURL })
            resolve()
          })
          .catch(err => {
            reject(err)
          })
      })
    } else {
      // No avatar, so save empty string (or remove the previous one)
      return new Promise((resolve, reject) => {
        return saveUserImageToBackend(sub, "", token)
          .then(() => {
            commit("UPDATE_USER_AVATAR", { avatar: "" })
            resolve()
          })
          .catch(err => {
            reject(err)
          })
      })
    }
  },
  ADD_NEW_UPDATE: ({ commit, dispatch, state }, { fundraiserId, content, userId, token }) => {
    return new Promise((resolve, reject) => {
      addNewUpdate(fundraiserId, content, userId, token)
        .then(data => {
          commit("ADD_NEW_UPDATE", {
            update: {
              content: content,
              createdAt: new Date()
            }
          })
          resolve(data)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  SAVE_IMAGE_FIELD: ({ commit, dispatch, state }, { location, route, blob }) => {
    return new Promise((resolve, reject) => {
      saveImageField(location, route, blob)
        .then(data => {
          resolve(data)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  REMOVE_FIXED_IMAGE: ({ commit, dispatch, state }, { location, route, filename }) => {
    return new Promise((resolve, reject) => {
      return removeFixedImage(location, route, state.user.tokenData.accessToken, filename)
        .then(data => {
          commit("REMOVE_FIXED_IMAGE", { location: `${location}`, filename: filename })
          return resolve(data)
        })
        .catch(err => {
          return reject(err)
        })
    })
  },
  REMOVE_VIDEO: ({ commit, dispatch, state }, { location, route, youTubeID }) => {
    return new Promise((resolve, reject) => {
      return removeVideo(location, route, youTubeID, state.user.tokenData.accessToken)
        .then(data => {
          commit("REMOVE_FIXED_VIDEO", { location: `${location}`, filename: youTubeID })
          return resolve(data)
        })
        .catch(err => {
          return reject(err)
        })
    })
  },
  ADD_VIDEO: ({ commit, dispatch, state }, { location, route, youTubeID }) => {
    return new Promise((resolve, reject) => {
      return addVideo(location, route, youTubeID, state.user.tokenData.accessToken)
        .then(data => {
          commit("ADD_VIDEO", { location: `${location}.videos`, youTubeID: youTubeID })
          return resolve(data)
        })
        .catch(err => {
          return reject(err)
        })
    })
  },
  USER_CAN: ({ commit, dispatch, state }, { permission }) => {
    if (state.user.loggedIn == true) {
      if (state.user.data.permissions != undefined && JSON.stringify(state.user.data.permissions).indexOf(permission) > -1) {
        return true
      } else {
        return false
      }
    }
    return false
  },
}
