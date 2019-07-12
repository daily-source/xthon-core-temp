import Vue from "vue"
import Router from "vue-router"
import Meta from "vue-meta"
// import { Store } from "../store"
// const store = Store()

Vue.use(Router)
Vue.use(Meta, {
  ssrAttribute: "data-vue-meta-server-rendered"
})

// route-level code splitting
const Nonprofit = () => import("../views/Nonprofit.vue")
const HomePage = () => import("../views/HomePage.vue")
const ExplorePage = () => import("../views/ExplorePage.vue")
const Fundraiser = () => import("../views/Fundraiser.vue")
const Default404 = () => import("../views/Default404.vue")
const MyAccount = () => import("../views/MyAccount.vue")
const CreateFundraiser = () => import("../views/CreateFundraiser.vue")

export function createRouter () {
  return new Router({
    mode: "history",
    fallback: false,
    saveScrollPosition: true,
    scrollBehavior (to, from, savedPosition) {
      if (!to.name.includes("/donate")) {
        // Retain position if we are opening a donate (modal) route
        return { y: 0 }
      }
    },
    routes: [
      {
        path: "/",
        name: "home",
        component: HomePage
      },
      {
        path: "/explore",
        name: "explore",
        component: ExplorePage
      },
      {
        path: "/nonprofit",
        redirect: "/explore"
      },
      {
        path: "/nonprofit/:ein",
        name: "nonprofit",
        component: Nonprofit
      },
      {
        path: "/nonprofit/:ein/donate",
        name: "nonprofit/donate",
        component: Nonprofit
      },
      {
        path: "/nonprofit/:ein/claim",
        name: "nonprofit/claim",
        component: Nonprofit
      },
      {
        path: "/fundraiser",
        redirect: "/explore"
      },
      {
        path: "/fundraiser/create",
        name: "fundraiser/create",
        component: CreateFundraiser
      },
      {
        path: "/fundraiser/:id",
        name: "fundraiser",
        component: Fundraiser
      },
      {
        path: "/fundraiser/:id/donate",
        name: "fundraiser/donate",
        component: Fundraiser
      },
      {
        path: "/404",
        name: "Default",
        component: Default404
      },
      {
        path: "/account",
        redirect: "/account/settings"
      },
      {
        path: "/account/:path",
        name: "account",
        component: MyAccount
      }
    ]
  })
}
