import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
        '@': path.resolve(__dirname, './src'),
        '@service': path.resolve(__dirname, './src/service'),
        '@features': path.resolve(__dirname, './src/features'),
        '@types': path.resolve(__dirname, './src/types'),
        '@components': path.resolve(__dirname, './src/components')

    },
  },
  server: {
    allowedHosts: ['localhost', 'app'],
  },
})

