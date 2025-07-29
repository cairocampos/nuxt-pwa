import fs from 'node:fs'
import path from 'node:path'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@vite-pwa/nuxt'],
  ssr: false,
  devServer: {
    host: '0.0.0.0',
    port: 3000,
    https: {
      key: './certificates/localhost-key.pem',
      cert: './certificates/localhost.pem'
      // key: fs.readFileSync(path.resolve(__dirname, 'certificates', 'server.key')),
      // cert: fs.readFileSync(path.resolve(__dirname, 'certificates', 'server.crt'))
    }
  },
  // vite: {
  //   server: {
  //     host: '0.0.0.0',
  //     port: 3000,
  //     https: {
  //       key: fs.readFileSync('./certificates/server.key'),
  //       cert: fs.readFileSync('./certificates/server.crt')
  //     }
  //   }
  // },
  pwa: {
    registerType: 'autoUpdate', // autoUpdate, prompt ou null
    manifest: {
      name: 'Meu App',
      short_name: 'App',
      description: 'Meu aplicativo Nuxt 3 com PWA',
      theme_color: '#CC0000',
      background_color: '#ffffff',
      display: 'standalone',
      scope: '/',
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
      navigateFallback: "./",
      globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
    },
    client: {
      installPrompt: true,
      periodicSyncForUpdates: 20
    },
    devOptions: {
      enabled: true, // permite testar o PWA no modo dev
      suppressWarnings: true,
      navigateFallbackAllowlist: [/^\/$/],
      type: 'module'
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
