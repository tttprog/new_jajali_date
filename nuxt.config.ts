import tailwindcss from "@tailwindcss/vite";
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },
  modules: ['@nuxt/icon', '@nuxt/ui', '@pinia/nuxt'],
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  app: {
    head: {
      title: "تقویم اتحادیه کشباف",
    },
    rootAttrs: {
      dir: "rtl",
      lang: "fa-IR"
    }
  },
  runtimeConfig: {
    public: {
      dateApiUrl: "https://pnldev.com/api/calender",
      ReligiousTimesApiUrl: "https://api.keybit.ir/owghat",
    }
  }
})