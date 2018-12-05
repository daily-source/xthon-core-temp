import Vue from "vue"
import "es6-promise/auto"
import { createApp } from "./app"
import ProgressBar from "./components/ProgressBar.vue"

// global progress bar
const bar = Vue.prototype.$bar = new Vue(ProgressBar).$mount()
document.body.appendChild(bar.$el)

// a global mixin that calls `asyncData` when a route component's params change
Vue.mixin({
  beforeRouteUpdate (to, from, next) {
    const { asyncData } = this.$options
    if (asyncData) {
      asyncData({
        store: this.$store,
        route: to
      })
        .then(() => {
          next()
        })
        .catch(err => {
          console.log(err)
          // TODO: redirect depending on the error. For now, redirect to 404.
          next("/404")
        })
    } else {
      next()
    }
  }
})

const { app, router, store } = createApp()

// prime the store with server-initialized state.
// the state is determined during SSR and inlined in the page markup.
if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}

// wait until router has resolved all async before hooks
// and async components...
router.onReady(() => {
  // Add router hook for handling asyncData.
  // Doing it after initial route is resolved so that we don't double-fetch
  // the data that we already have. Using router.beforeResolve() so that all
  // async components are resolved.
  router.beforeResolve((to, from, next) => {
  /**
   * Reconstruct the request occurring in SPA mode in the client.
   * Commit the equivalent request to the store for its use in the meta-tags manager.
   */
    var req = {
      protocol: store.state.extra.request.protocol,
      host: store.state.extra.request.host,
      url: to.path,
      fullUrl: store.state.extra.request.protocol + "://" + store.state.extra.request.host + to.fullPath
    }
    store.commit("STORE_REQUEST", req)

    const matched = router.getMatchedComponents(to)
    const prevMatched = router.getMatchedComponents(from)
    let diffed = false
    const activated = matched.filter((c, i) => {
      return diffed || (diffed = (prevMatched[i] !== c))
    })
    const asyncDataHooks = activated.map(c => c.asyncData).filter(_ => _)
    if (!asyncDataHooks.length) {
      return next()
    }

    bar.start()
    Promise.all(asyncDataHooks.map(hook => hook({ store, route: to })))
      .then(() => {
        bar.finish()
        next()
      })
      .catch(err => {
        router.push("/404")
        console.log(err)
        next()
      })
  })

  // actually mount to DOM
  app.$mount("#app")
})

// service worker
if (location.protocol === "https:" && navigator.serviceWorker) {
  navigator.serviceWorker.register("/service-worker.js")
}
