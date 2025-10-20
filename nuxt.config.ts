// Nuxt 3/4 configuration for a mobile-first app using Vant
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  ssr: true,
  typescript: { strict: true },
  app: {
    head: {
      title: 'Mobile App',
      meta: [
        {
          name: 'viewport',
          content:
            'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
        },
        { name: 'format-detection', content: 'telephone=no' },
      ],
    },
  },
  // Load Vant styles globally
  css: ['vant/lib/index.css'],
})
