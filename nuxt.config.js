import colors from 'vuetify/es5/util/colors'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - challenge',
    title: 'challenge',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth'
  ],

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  auth: {
    strategies: {
      local: {
        token: {
          property: "token",
          global: true,
          required: true,
          type: "Bearer"
        },
        user: {
          property: "user",
          autoFetch: true
        },
        endpoints: {
          login: { url: "/api/v2/auth/login", method: "post", propertyName: 'token'},
          logout: { url: `/api/v2/auth/logout`, method: "post" },
          user: { url: "/api/v2/auth/me", method: "get", propertyName: 'data.attributes'}
        },
      },
      // github: {
      //   clientId: '57a3de1f6248054132e9',
      //   clientSecret: '61a55b599656565ab4a440bbdf3840a3e91dbdf2',
      // },
    },
    redirect: {
      login: '/login',
      logout: '/',
      callback: '/login',
      home: '/'
    }
  },

  axios: {
    baseURL: 'http://demo-api-vue.sanbercloud.com'
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
