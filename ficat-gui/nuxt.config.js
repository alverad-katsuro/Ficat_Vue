const config = require('./server/config')

module.exports = {
  ssr: false,
  /*
   ** Headers of the page
   */
  head: {
    title: 'FICAT | Sistema De Geração Automática de Ficha Catalográfica',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href:
          'https://cdn.jsdelivr.net/npm/@mdi/font@5.8.55/css/materialdesignicons.min.css'
      }
    ],
    htmlAttrs: {
      class: 'htmlClass',
      lang: 'pt-BR'
    },
    bodyAttrs: {
      class: 'bodyClass'
    }
  },

  env: {
    ...config
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: ['hooper/dist/hooper.css'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~/plugins/lang.js',
    '~/plugins/vue-cookies.js',
    '~/plugins/vuelidate.js',
    '~/plugins/buefy.js'
  ],
  /*
   ** Nuxt.js dev-modules
   */
  devModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://buefy.github.io/#/documentation

    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/recaptcha'
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  // axios: {
  //   headers: { }
  // },

  recaptcha: {
    hideBadge: true, // Hide badge element (v3 & v2 via size=invisible)
    language: 'pt-BR', // Recaptcha language (v2)
    siteKey: process.env.RECAPTCHA_SITE_KEY, // Site key for requests
    version: 2, // Version
    size: 'normal'
  },

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
}
