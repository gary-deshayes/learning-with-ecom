// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/apollo',
    ['@pinia/nuxt', {
      autoImports: [
        // automatically imports `defineStore`
        'defineStore', // import { defineStore } from 'pinia'
        // automatically imports `defineStore` as `definePiniaStore`
        ['defineStore', 'definePiniaStore'], // import { defineStore as definePiniaStore } from 'pinia'
      ],
    },]
  ],
  runtimeConfig: {
    public : {
      URL_BACK: process.env.URL_BACK
    }
  },
  apollo: {
    clients: {
      default: {
        httpEndpoint: 'http://localhost:8000/graphql'
      }
    },
  },
})
