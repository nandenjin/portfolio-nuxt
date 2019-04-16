
const axios = require( 'axios' );

const cmsDomain = 'cms-dot-nandenjinlab.appspot.com';
const cmsPath = 'wp-json/wp/v2';

module.exports = {

  srcDir: 'src',

  env: {
    cmsDomain,
    cmsPath,
  },

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

  layoutTransition: {

    name: 'page-fade',
    mode: 'out-in',

  },

  css: [

    'material-design-icons-iconfont/dist/material-design-icons.css',
    '~/assets/style/global.sass',

  ],

  modules: [
    // __dirname + '/../nuxt-cache-payload/index.js',
    'nuxt-cache-payload',
  ],

  generate: {

    dir: 'dist',
    routes: async () => {

      const [ worksReq, newsReq ] = await Promise.all( [
        axios.get( `https://${ cmsDomain }/${ cmsPath }/works?_embed&per_page=100` ),
        axios.get( `https://${ cmsDomain }/${ cmsPath }/posts?_embed&per_page=100` ),
      ] );

      const works = worksReq.data;
      const news = newsReq.data;

      const routes = [
        {
          route: '/',
          payload: news[ 0 ],
        }, {
          route: '/works',
          payload: works,
        }, {
          route: '/news',
          payload: news,
        },
        ...works.map( w => ( {
          route: `/works/${ w.slug }`,
          payload: w,
        } ) ),
        ...news.map( n => ( {
          route: `/news/${ n.slug }`,
          payload: n,
        } ) ),
      ];

      return routes;

    },

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
