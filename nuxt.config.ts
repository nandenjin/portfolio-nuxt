import { Configuration as NuxtConfiguration } from '@nuxt/types'
import { getRoutes } from '@nandenjin/portfolio-nuxt-contents-module'

const baseUrl: string = 'https://www.nandenjin.com'
const description = 'Designer / developer in Japan. Web, graphic design, stage performance & lighting, etc. Creating arts inspired by technology.'

const config: NuxtConfiguration = {

  buildModules: ['@nuxt/typescript-build'],
  srcDir: 'src',

  env: {
    baseUrl
  },

  sitemap: {
    hostname: baseUrl,
    gzip: true,
    xslUrl: '/sitemap.xsl',
    routes: getRoutes()
  },

  head: {

    title: 'Kazumi Inada Portfolio',
    titleTemplate (title) {
      if (!title.match(/Kazumi Inada/)) {
        return title + ' - Kazumi Inada 稲田和巳'
      }
      return title
    },

    meta: [

      { charset: 'utf-8' },
      { name: 'creator', content: 'Kazumi Inada <hello@nandenjin.com>' },

      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      // { hid: 'description', name: 'description', content: '' },
      { name: 'theme-color', content: '#444444' },
      { hid: 'description', name: 'description', content: description },

      { hid: 'og:type', property: 'og:type', content: 'article' },
      { hid: 'og:site_name', property: 'og:site_name', content: 'Kazumi Inada Portfolio' },
      { hid: 'og:title', property: 'og:title', content: 'Kazumi Inada Portfolio' },
      { hid: 'og:description', property: 'og:description', content: description },
      { hid: 'og:image', property: 'og:image', content: baseUrl + '/site-cover.png' },

      { hid: 'twitter:card', name: 'twitter:card', content: 'summary_large_image' },
      { hid: 'twitter:creator', name: 'twitter:creator', content: '@nandenjin' },
      { hid: 'twitter:site', name: 'twitter:site', content: '@nandenjin' }

    ],

    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' }
    ]

  },

  pageTransition: {

    name: 'page-fade',
    mode: 'out-in'

  },

  layoutTransition: {

    name: 'page-fade',
    mode: 'out-in'

  },

  css: [

    'material-design-icons-iconfont/dist/material-design-icons.css',
    '~/assets/style/global.sass'

  ],

  modules: [
    ['@nuxtjs/google-analytics', { id: 'UA-73443235-3' }],
    '@nandenjin/portfolio-nuxt-contents-module',
    '@nuxtjs/sitemap'
  ],

  generate: {
    dir: 'dist',
    fallback: true
  },

  build: {

    extractCSS: true,

    loaders: {
      vue: {
        transformAssetUrls: {
          'image-box': 'src',
          'work-page-renderer': 'thumbnail'
        }
      }
    },

    extend (config) {
      // contents/pluginでfsのロードエラーが起きる
      // https://github.com/nuxt-community/dotenv-module/issues/11
      config.node = {
        fs: 'empty'
      }

      // <v-runtime-template>を使用するため、Vueをfull buildで使用する
      // https://github.com/alexjoverm/v-runtime-template
      config.resolve = config.resolve || {}
      config.resolve.alias = config.resolve.alias || {}
      config.resolve.alias.vue = 'vue/dist/vue.common'
    }

  }

}

export default config
