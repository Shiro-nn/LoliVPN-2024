export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: false },

  devServer: {
    port: 3000
  },

  modules: [
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@nuxt/image',
    '@nuxt/ui'
  ],

  css: [
    '~/assets/css/variables.css',
    '~/assets/css/base.css',
    '~/assets/css/animations.css'
  ],

  app: {
    baseURL: './',
    buildAssetsDir: '_nuxt/',

    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'LoliVPN - Modern VPN Client',
      meta: [
        { name: 'description', content: 'Secure, fast, and modern VPN client built with Tauri and Vue' },
        { name: 'theme-color', content: '#ff80c7' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap' }
      ]
    }
  },

  vite: {
    clearScreen: false
  },

  nitro: {
    output: {
      publicDir: '.output/public'
    }
  },

  build: {
    transpile: ['@tauri-apps/api']
  },

  typescript: {
    typeCheck: false
  },
})