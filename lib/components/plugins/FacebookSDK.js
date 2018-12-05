import Vue from "vue"

const vueFb = {}
vueFb.install = function install (Vue, options) {
  (function (d, s, id) {
    var js
    var fjs = d.getElementsByTagName(s)[0]
    if (d.getElementById(id)) { return }
    js = d.createElement(s)
    js.id = id
    js.src = "//connect.facebook.net/en_US/sdk.js"
    fjs.parentNode.insertBefore(js, fjs)
  }(document, "script", "facebook-jssdk"))

  window.fbAsyncInit = function onSDKInit () {
    window.FB.init(options)
    window.FB.AppEvents.logPageView()
    Vue.FB = window.FB
    window.dispatchEvent(new Event("fb-sdk-ready"))
  }
  Vue.FB = undefined
}

Vue.use(vueFb, {
  appId: process.env.FB_APP_ID,
  autoLogAppEvents: true,
  xfbml: true,
  version: "v2.9"
})
