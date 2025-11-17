// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxtjs/tailwindcss',
    'shadcn-nuxt',
  ],

  runtimeConfig: {
    // Private keys (solo disponibles en el servidor)
    // apiSecret: '',

    // Public keys (disponibles en cliente y servidor)
    public: {
      apiBaseUrl: process.env.NUXT_PUBLIC_API_BASE_URL || 'http://localhost:3001/api',
      appUrl: process.env.NUXT_PUBLIC_APP_URL || 'http://localhost:3000',
      whatsappNumber: process.env.NUXT_PUBLIC_WHATSAPP_NUMBER || '+17868391882',
      brandName: process.env.NUXT_PUBLIC_BRAND_NAME || 'Emigrantes FT',
      brandEmail: process.env.NUXT_PUBLIC_BRAND_EMAIL || 'emigrantesftllc@gmail.com',
      brandPhone: process.env.NUXT_PUBLIC_BRAND_PHONE || '+1 (786) 839-1882',
      brandAddress: process.env.NUXT_PUBLIC_BRAND_ADDRESS || '531 Palmetto Dr, Miami Springs, FL 33166',
    }
  },

  // Configuración de Nitro para proxy de API
  nitro: {
    devProxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        prependPath: true,
      }
    }
  },

  // Configuración de aplicación
  app: {
    head: {
      title: 'Emigrantes FT - Protegemos tu sacrificio',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content: 'Mantén poder y control total sobre tus bienes desde cualquier parte del mundo. Servicios de POA duradero para emigrantes.'
        },
        { name: 'theme-color', content: '#0A1F44' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },
})