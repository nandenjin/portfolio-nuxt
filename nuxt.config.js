
module.exports = { 

  srcDir: 'src',
  buildDir: 'functions/build',

  head: {

    title: 'Kazumi Inada Portfolio',

    meta: [

      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      // { hid: 'description', name: 'description', content: '' },
      { name: 'theme-color', content: '#444444', },

    ],

    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' }
    ]

  },

  transition: {

    name: 'page-fade',
    mode: 'out-in',

  },

  css: [

    '~/assets/scss/global.scss',

  ],

  generate: {

    dir: 'hosting',

  },

  build: {

    extractCSS: true,

    extend( config ) {

      const vueLoader = config.module.rules.find((rule) => rule.loader === 'vue-loader');
      vueLoader.options.transformAssetUrls['image-box'] = 'src';
      vueLoader.options.transformAssetUrls['work-page-renderer'] = 'thumbnail';

    } 

  },

};
