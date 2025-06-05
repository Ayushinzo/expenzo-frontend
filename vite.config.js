import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['logo.png'],
      manifest: {
        name: 'Expenzo',
        short_name: 'Expenzo',
        description: 'A simple expense tracker app to manage your finances. Track your income and expenses, set budgets, and analyze your spending habits. Available on web, iOS, and Android. Sign in with Google or Facebook. Open source and free to use. Built with React, Tailwind CSS, and Vite.',
        start_url: '/',
        orientation: 'portrait',
        scope: '/',
        display: 'standalone',
        background_color: 'white',
        theme_color: 'white',
        icons: [
          {
            src: '/logo-192-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/logo-512-512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
})
