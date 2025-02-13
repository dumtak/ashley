import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [{ find: '@', replacement: '/src' }],  // '@'를 '/src' 폴더로 대체
  },
  server: {
    proxy: {
      '/auth': {
        target: 'http://port-0-ashley-server-m68t82tub8d34ceb.sel4.cloudtype.app',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
