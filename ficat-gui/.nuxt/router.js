import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _ba02f4f8 = () => interopDefault(import('../pages/about.vue' /* webpackChunkName: "pages/about" */))
const _1e61236e = () => interopDefault(import('../pages/admin/index.vue' /* webpackChunkName: "pages/admin/index" */))
const _e743f940 = () => interopDefault(import('../pages/login.vue' /* webpackChunkName: "pages/login" */))
const _377dafbc = () => interopDefault(import('../pages/statistics.vue' /* webpackChunkName: "pages/statistics" */))
const _28ba88f6 = () => interopDefault(import('../pages/talk.vue' /* webpackChunkName: "pages/talk" */))
const _0e5bfe92 = () => interopDefault(import('../pages/tutorial.vue' /* webpackChunkName: "pages/tutorial" */))
const _28a47ebe = () => interopDefault(import('../pages/admin/areas_do_conhecimento.vue' /* webpackChunkName: "pages/admin/areas_do_conhecimento" */))
const _047c7270 = () => interopDefault(import('../pages/admin/cursos.vue' /* webpackChunkName: "pages/admin/cursos" */))
const _7a2a432a = () => interopDefault(import('../pages/admin/unidades_academicas.vue' /* webpackChunkName: "pages/admin/unidades_academicas" */))
const _3d304ede = () => interopDefault(import('../pages/admin/usuarios.vue' /* webpackChunkName: "pages/admin/usuarios" */))
const _7a933f6e = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/about",
    component: _ba02f4f8,
    name: "about"
  }, {
    path: "/admin",
    component: _1e61236e,
    name: "admin"
  }, {
    path: "/login",
    component: _e743f940,
    name: "login"
  }, {
    path: "/statistics",
    component: _377dafbc,
    name: "statistics"
  }, {
    path: "/talk",
    component: _28ba88f6,
    name: "talk"
  }, {
    path: "/tutorial",
    component: _0e5bfe92,
    name: "tutorial"
  }, {
    path: "/admin/areas_do_conhecimento",
    component: _28a47ebe,
    name: "admin-areas_do_conhecimento"
  }, {
    path: "/admin/cursos",
    component: _047c7270,
    name: "admin-cursos"
  }, {
    path: "/admin/unidades_academicas",
    component: _7a2a432a,
    name: "admin-unidades_academicas"
  }, {
    path: "/admin/usuarios",
    component: _3d304ede,
    name: "admin-usuarios"
  }, {
    path: "/",
    component: _7a933f6e,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
