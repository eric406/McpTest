import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/cwa-api': {
        target: 'https://opendata.cwa.gov.tw',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/cwa-api/, '/api/v1/rest/datastore/F-C0032-001'),
      },
    },
  },
})
