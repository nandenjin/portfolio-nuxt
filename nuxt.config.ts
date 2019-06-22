import NuxtConfiguration from '@nuxt/config'

const config: NuxtConfiguration = {

  srcDir: 'src',

  head: {

    title: 'Kazumi Inada Portfolio',
    titleTemplate(title) {
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

      { hid: 'og:type', property: 'og:type', content: 'article' },
      { hid: 'og:site_name', property: 'og:site_name', content: 'Kazumi Inada Portfolio' },
      { hid: 'og:title', property: 'og:title', content: 'Kazumi Inada Portfolio' },
      { hid: 'og:description', property: 'og:description', content: 'Creating arts inspired by technology' },

      { hid: 'twitter:card', name: 'twitter:card', content: 'summary_large_image' },
      { hid: 'twitter:creator', name: 'twitter:creator', content: '@nandenjin' },
      { hid: 'twitter:site', name: 'twitter:site', content: '@nandenjin' },
      { hid: 'twitter:title', name: 'twitter:title', content: 'Kazumi Inada Portfolio' },
      { hid: 'twitter:description', name: 'twitter:description', content: 'Creating arts inspired by technology' }

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
    ['@nuxtjs/google-tag-manager', { id: 'GTM-T7VHZDX' }],
    '@nandenjin/portfolio-nuxt-contents-module',
    'nuxt-cache-payload'
  ],

  generate: {

    dir: 'dist'

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

    extend(config) {
      // contents/pluginでfsのロードエラーが起きる
      // https://github.com/nuxt-community/dotenv-module/issues/11
      config.node = {
        fs: 'empty'
      }
    }

  }

}

export default config
