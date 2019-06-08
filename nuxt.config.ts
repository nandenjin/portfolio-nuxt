import NuxtConfiguration from '@nuxt/config'

const config: NuxtConfiguration = {

  srcDir: 'src',

  head: {

    title: 'Kazumi Inada Portfolio',

    meta: [

      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      // { hid: 'description', name: 'description', content: '' },
      { name: 'theme-color', content: '#444444' }

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
    '@/modules/contents.js',
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
    }

  }

}

export default config
