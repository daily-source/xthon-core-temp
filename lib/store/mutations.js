import Vue from "vue"

export default {
  // Auth0 stuff starts
  SAVE_TOKEN: (state, { accessToken, idToken }) => {
    Vue.set(state.user.tokenData, 'accessToken', accessToken)
    Vue.set(state.user.tokenData, 'idToken', idToken)
  },
  SET_USER: (state, user) => {
    if (user.user && user.user.sub) {
      Vue.set(state.user, 'auth0', user.user)
      Vue.set(state.user, 'loggedIn', true)
    } else {
      Vue.set(state.user, 'auth0', {})
      Vue.set(state.user, 'loggedIn', false)
    }
  },
  LOG_OFF: (state) => {
    // TODO: also delete all the cookies when logging user out
    Vue.set(state.user, "auth0", {})
    Vue.set(state.user, "tokenData", {})
    state.user.loggedIn = false
  },
  // Auth0 stuff ends

  // NodeJS auth stuff begins
  SET_BACKEND_USER: (state, {user}) => {
    Vue.set(state.user, "data", user)
  },

  // NodeJS auth stuff ends



  SET_HOME_PAGE: (state, { home }) => {
    state.home = home
  },
  SET_NONPROFIT: (state, { nonprofit }) => {
    state.nonprofit = nonprofit
  },
  SET_FUNDRAISER: (state, { fundraiser }) => {
    state.fundraiser = fundraiser
  },
  ADD_UPDATES: (state, { updates }) => {
    state.updates.data = state.updates.data.concat(updates)
    // Remove duplicates, needed when a new update is added and changes the paginated results.
    var a = state.updates.data
    state.updates.data = a.filter((obj, idx, arr) => (
      arr.findIndex((o) => o.id === obj.id) === idx
    ))
    state.updates.current++
  },
  ADD_NEW_UPDATE: (state, { update }) => {
    state.updates.data.unshift(update)
    state.fundraiser.counters.updatesCount++
  },
  SET_UPDATES: (state, { updates }) => {
    state.updates.data = updates
    state.updates.current = 1
  },
  RESET_FUNDRAISERS: (state) => {
    state.fundraisers.data = []
  },
  ADD_COMMENTS: (state, { comments }) => {
    state.comments.data = state.comments.data.concat(comments)
    var a = state.comments.data
    state.comments.data = a.filter((obj, idx, arr) => (
      arr.findIndex((o) => o.id === obj.id) === idx
    ))
    state.comments.current++
  },
  ADD_NEW_COMMENT: (state, { comment }) => {
    state.comments.data = state.comments.data.concat(comment)
    state.fundraiser.counters.commentsCount++
    state.comments.latest = comment.id
  },
  SET_COMMENTS: (state, { comments }) => {
    state.comments.data = comments
    state.comments.current = 1
    state.comments.latest = null
  },
  RESET_DONATIONS: (state) => {
    state.donations.byAmount.data = []
    state.donations.byDate.data = []
    state.donations.byAmount.current = 1
    state.donations.byDate.current = 1
  },
  RESET_COMMENTS: (state) => {
    state.comments.data = []
    state.comments.current = 1
  },
  RESET_UPDATES: (state) => {
    state.updates.data = []
    state.updates.current = 1
  },
  /**
   * Add fetched data to store.
   * If no data is returned, delete the current stored data.
   */
  SET_DONATIONS: (state, { byParam, donations }) => {
    state.donations[byParam].data = donations
    state.donations[byParam].current = 1
  },

  // modified method to allow two different sets.
  ADD_DONATIONS: (state, { byParam, donations }) => {
    state.donations[byParam].data = state.donations[byParam].data.concat(donations)
    state.donations[byParam].current++
  },
  ADD_TOP_FUNDRAISERS: (state, { fundraisers }) => {
    state.topFundraisers.data = fundraisers
  },
  SET_FUNDRAISERS: (state, { fundraisers }) => {
    state.fundraisers.data = fundraisers
  },
  SET_EXPLORE_FUNDRAISERS: (state, { fundraisers }) => {
    state.explore.fundraisers.data = fundraisers
  },
  SET_COMMON_DATA: (state, { common }) => {
    state.common = common
  },
  UPDATE_COMMENTS: (state, { comment }) => {
    console.log(comment)
  },
  UPDATE_DONATION: (state, { donation }) => {
    state.userActions.donation.status = "completed"
    state.userActions.donation.email = donation.data.donation.email
  },

  START_DONATION: (state, { initiator }) => {
    state.userActions.donation.status = "started"
    state.userActions.donation.amount = initiator.givingLevel ? initiator.givingLevel.amount : state.userActions.donation.amount
    state.userActions.donation.initiator = initiator
    state.userActions.donation.fundraiserId = initiator.fundraiserId
    state.userActions.donation.nonprofitEin = initiator.nonprofitEin
  },

  STORE_REQUEST: (state, req) => {
    state.extra.request = req
  },
  SET_USER_ACCOUNT_DATA: (state, { userData }) => {
    state.user.data = userData
  },
  REMOVE_PAYMENT_METHOD: (state, { methodId }) => {
    state.user.protected.paymentMethods.splice(state.user.protected.paymentMethods.findIndex(item => item.id === methodId), 1)
  },
  UPDATE_USER_FIELD: (state, { field, value }) => {
    state.user.data[field] = value
  },
  SAVE_INLINE_FIELD: (state, { location, value }) => {
    nestedObjectSet(state, location, value)
  },
  REMOVE_IMAGE: (state, { location, id }) => {
    nestedObjectRemove(state, location, id)
  },
  REMOVE_VIDEO: (state, { location, id }) => {
    nestedObjectRemove(state, location, id)
  },
  ADD_VIDEO: (state, { location, youTubeID }) => {
    nestedObjectAdd(state, location, {
      type: "video",
      src: youTubeID
    })
  },
  UPDATE_VIDEO: (state, { location, oldSrc, newSrc }) => {
    nestedObjectRemove(state, location, oldSrc)
    nestedObjectAdd(state, location, {
      type: "video",
      src: newSrc
    })
  }
}

/*
 * Helper function that dynamically creates the nested object path to be saved.
 */
/* eslint-disable */
const getNestedObject = (obj, path) => {
  const keys = path.split(".")
  const lastKey = keys.pop()

  const lastObj = keys.reduce((obj, key) =>
    obj[key] = obj[key] || {},
    obj)
  return { lastObj, lastKey }
}
 /* eslint-enable */

const nestedObjectRemove = (obj, path, id) => {
  const { lastObj, lastKey } = getNestedObject(obj, path)
  var newObj = []
  if (lastObj.hasOwnProperty(lastKey)) {
    if (Array.isArray(lastObj[lastKey])) {
      newObj = lastObj[lastKey].filter(item => item.id !== id)
      Vue.set(lastObj, lastKey, newObj)
    } else {
      Vue.set(lastObj, lastKey, {})
    }
  } else {
    console.log("nothing to remove")
  }
}

const nestedObjectSet = (obj, path, value) => {
  const { lastObj, lastKey } = getNestedObject(obj, path)
  Vue.set(lastObj, lastKey, value)
}

const nestedObjectAdd = (obj, path, value) => {
  const { lastObj, lastKey } = getNestedObject(obj, path)
  var newObj = []
  if (lastObj.hasOwnProperty(lastKey)) {
    newObj = lastObj[lastKey].concat(value)
  } else {
    newObj.push(value)
  }
  Vue.set(lastObj, lastKey, newObj)
}
