// Register Vant UI components on the client only
import { defineNuxtPlugin } from '#app'
import Vant from 'vant'

export default defineNuxtPlugin((nuxtApp) => {
  // Install all Vant components for simplicity; tree-shake as needed later
  nuxtApp.vueApp.use(Vant)
})

