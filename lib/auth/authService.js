import auth0 from "auth0-js"
import Vue from "vue"

// exchange the object with your own from the setup step above.
let webAuth = new auth0.WebAuth({
  domain: process.env.AUTH0_DOMAIN,
  clientID: process.env.AUTH0_CLIENT_ID,
  redirectUri: process.env.SITE_DOMAIN, // THIS NEEDS TO COME FROM THE STORE
  audience: process.env.AUTH0_AUDIENCE,
  responseType: "token id_token",
  scope: "openid profile email"
})

let auth = new Vue({
  data () {
    return {
      token: "",
      accessToken: "",
      user: {}
    }
  },
  computed: {
    expiresAt: {
      get: function () {
        return localStorage.getItem("expires_at")
      },
      set: function (expiresIn) {
        let expiresAt = JSON.stringify(expiresIn * 1000 + new Date().getTime())
        localStorage.setItem("expires_at", expiresAt)
      }
    }
  },

  methods: {
    /*
    signupOnlyEmail () {
      webAuth.authorize({
        connection: 'Username-Password-Authentication'
      }, function (err, resp) {
        if(err){
          console.log(err);
        }else{
          console.log(resp);
        }
      })
    }, */
    login () {
      webAuth.authorize({
        extra: process.env.SITE_NAME
      }, () => {
        this.handleToken()
      })
    },
    signup () {
      webAuth.authorize({
        extra: process.env.SITE_NAME,
        login_hint: ""
      })
    },

    silentLogin () {
      webAuth.checkSession({}, (err, authResult) => {
        if (!err) {
          console.log('logged in: ', authResult)
          if (authResult && authResult.accessToken && authResult.idToken) {
            this.handleAuth(authResult)
          }
        } else {
          console.log(err)
        }
      })
    },
    logout () {
      return new Promise((resolve, reject) => {
        this.$eventHub.$emit("log_off") // should delete the token data from vuex
        // Remove all user/action info
        localStorage.clear()
        webAuth.logout({
          returnTo: process.env.AUTH0_LOGOUT_URL, // Allowed logout URL listed in dashboard
          clientID: process.env.AUTH0_CLIENT_ID // Your client ID
        })
      })
    },
    isAuthenticated () {
      return new Date().getTime() < this.expiresAt
    },
    handleAuth (authResult) {
      this.expiresAt = authResult.expiresIn
      this.user = authResult.idTokenPayload
      setTimeout(() => {
        // Emit event to eventHub to avoid importing the store here
        this.$eventHub.$emit("save_token", { accessToken: authResult.accessToken, idToken: authResult.idToken })
        this.$eventHub.$emit("set_user", { user: this.user })
      }, 50)
    },
    handleToken () {
      return new Promise((resolve, reject) => {
        webAuth.parseHash((err, authResult) => {
          if (authResult && authResult.accessToken && authResult.idToken) {
            this.handleAuth()
            resolve()
          } else if (err) {
            this.logout()
            reject(err)
          }
        })
      })
    },

    requestBackendData () {
      this.$eventHub.$emit("request_backend", { token: this.accessToken })
    }

  }
})

export default {
  install: function (Vue) {
    Vue.prototype.$auth = auth
  }
}
