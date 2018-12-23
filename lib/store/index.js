import Vue from "vue"
import Vuex from "vuex"
import actions from "./actions"
import mutations from "./mutations"
import selections from './modules/selections'

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
        limit: 2
      },
      comments: {
        data: [],
        current: 1,
        limit: 3,
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
        id: null,
        loggedIn: false,
        email: null,
        fullName: null,
        firstname: null,
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
    modules: {
      selections,
    },
    actions,
    mutations,
  })
}
