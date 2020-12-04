if (process.env.LOCAL_DEVELOPMENT === 'true') {
  const dotenv = require('dotenv');
  dotenv.config({ path: '.env.local' });
}

function getEnv(envName) {
  if (process.env.VERCEL_GIT_COMMIT_REF === 'master')
    envName = 'STAGE_' + envName;
  return process.env[envName];
}

// const webpack = require('webpack'); //_

export default {
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  mode: 'universal',
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: 'server',
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=375, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
   ** Global CSS
   */
  css: ['~/assets/sass/main.scss', { src: 'swiper/dist/css/swiper.css' }],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  styleResources: {
    scss: ['~/assets/sass/vars/*.scss']
  },
  plugins: [
    '~/plugins/axios.js',
    '~/plugins/app-link.js',
    { src: '~/plugins/youtube.js', ssr: false },
    '~/plugins/directives.js',
    '~/plugins/filters.js',
    '~/plugins/aos.js',
    { src: '~/plugins/vue-masonry', ssr: false },
    { src: '~plugins/swiper.js', ssr: false },
    {
      src: '~plugins/vue-scrollmagic.js',
      ssr: false
    },
    {
      src: '~plugins/gsap.js',
      ssr: false
    },
    '~/plugins/vue-flags.js',
    '~/plugins/scrollbar.js',
    { src: '~/plugins/vue-tel.js', ssr: false },
    { src: '~/plugins/modules/leaflet', ssr: false }
  ],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/stylelint-module
    '@nuxtjs/stylelint-module'
    // '@nuxtjs/svg'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/style-resources',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxt/http',
    // Doc: https://github.com/nuxt/content
    // '@nuxt/content',
    'nuxt-svg-loader',
    'cookie-universal-nuxt',
    // 'svg-inline-loader'
    // '@nuxtjs/style-resources'
    [
      'nuxt-leaflet',
      {
        /* module options */
      }
    ]
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** Content module configuration
   ** See https://content.nuxtjs.org/configuration
   */
  content: {},
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {
    vendor: ['swiper'],
    transpile: ['gsap'],
    postcss: {
      preset: {
        autoprefixer: {
          flexbox: true
        }
      }
    }
  },
  router: {
    middleware: ['locale', 'region', 'storeInit'],
    extendRoutes(routes, resolve) {
      routes.forEach((route) => {
        route.path = '/:language(en|ru|uk)?' + route.path;
      });
    }
  },
  serverMiddleware: [
    (req, res, next) => {
      if (req.method === 'GET') {
        // Enables Vercel caching for pages
        res.setHeader('cache-control', 's-maxage=60, stale-while-revalidate');
      }
      next();
    }
  ],
  render: {
    compressor: false // Disabling compression should speedup rendering a little. Compression will happen on Vercel CDN level
  },
  loaders: {
    vue: {
      transformAssetUrls: {
        video: 'src',
        source: 'src',
        object: 'src',
        embed: 'src'
      }
    }
  },
  svgLoader: {
    svgoConfig: {
      plugins: [
        { addClassesToSVGElement: { classNames: ['svg-icon'] } },
        { prefixIds: false },
        { removeUselessStrokeAndFill: true },
        { removeStyleElement: true },
        { cleanupIDs: false }
        // { minifyStyles: false },
        // { convertStyleToAttrs: true },
        // { sortAttrs: true }
      ]
    }
  },
  publicRuntimeConfig: {
    baseAPI: getEnv('BASE_API')
  },
  privateRuntimeConfig: {}
};
