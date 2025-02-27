import { defineConfig } from 'vite'
import ElementPlus from 'unplugin-element-plus/vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  server: {
    port: 17980,
    proxy: {
      '/api': {
        target: 'http://localhost:32141',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  plugins: [vue(), ElementPlus()]
})
