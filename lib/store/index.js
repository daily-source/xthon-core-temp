import Vue from "vue"
import Vuex from "vuex"
import actions from "./actions"
import mutations from "./mutations"

Vue.use(Vuex)

export function createStore () {
  return new Vuex.Store({
    state: {
      fullPath: "",
      common: {},
      nonprofit: {/* [ein: number] */},
      fundraiser: {/* [id: number] */},
      fundraisers: {
        data: [],
        current: 1,
        limit: 6
      },
      updates: {
        data: [],
        current: 1,
        limit: 10
      },
      comments: {
        data: [],
        current: 1,
        limit: 10,
        latest: null
      },
      donations: {
        byAmount: {
          data: [],
          current: 1,
          limit: 6
        },
        byDate: {
          data: [],
          current: 1,
          limit: 3
        }
      },
      donationsByAmount: {
        data: [],
        current: 1,
        limit: 2
      },
      allFundraisers: {
        data: [],
        current: 1,
        limit: 10
      },
      allClaimsAdmin: {
        data: [],
        current: 1,
        limit: 10
      },
      allFundraisersAdmin: {
        data: [],
        current: 1,
        limit: 10
      },
      allUsersAdmin: {
        data: [],
        current: 1,
        limit: 10
      },
      topFundraisers: {
        data: [],
        current: 1,
        limit: 6
      },
      home: {},
      explore: {
        fundraisers: {
          data: []
        }
      },
      user: {
        auth0: {
          at_hash: "",
          aud: "",
          email: "",
          email_verified: "",
          exp: "",
          family_name: "",
          gender: "",
          given_name: "",
          iat: "",
          iss: "",
          locale: "",
          name: "",
          nickname: "",
          nonce: "",
          picture: "",
          sub: "",
          updated_at: ""
        },
        tokenData: {
          idToken: "",
          accessToken: ""
        },
        loginAttempt: false,
        loggedIn: false,
        paymentMethods: [
        ],
        data: {}
      },
      userActions: {
        donation: {
          status: "",
          amount: 350,
          email: null,
          initiator: {}
        }
      },
      extra: {
        request: {}
      }
    },
    actions,
    mutations
  })
}
