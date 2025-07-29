// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@vite-pwa/nuxt'],
  pwa: {
    registerType: 'autoUpdate', // autoUpdate, prompt ou null
    manifest: {
      name: 'Meu App',
      short_name: 'App',
      description: 'Meu aplicativo Nuxt 3 com PWA',
      theme_color: '#CC0000',
      background_color: '#ffffff',
      display: 'standalone',
      start_url: '/',
      icons: [
        {
          src: '/icons/icon-192x192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: '/icons/icon-512x512.png',
          sizes: '512x512',
          type: 'image/png'
        }
      ]
    },
    workbox: {
      // configurações de cache se necessário
    },
    client: {
      installPrompt: true,
    },
    devOptions: {
      enabled: true // permite testar o PWA no modo dev
    }
  },
  // ssr: true,
  devtools: { enabled: false },

  $development: {
    vite: {
      html: {
        cspNonce: "VAI_TOMAR_NO_CU",
      },
    },
  },

  vite: {
    html: {
      cspNonce: "PLACEHOLDER_NONCE",
    },
  },

  compatibilityDate: "2025-04-07",
});