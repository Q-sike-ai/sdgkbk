import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/sdgkbk/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@layouts': path.resolve(__dirname, './src/layouts')
    }
  },
  server: {
    port: 3000,
    host: true
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'antd',
      '@ant-design/icons',
      '@emotion/react',
      '@emotion/styled',
      'framer-motion',
      'recharts',
      'dayjs',
      'rc-picker',
      'rc-util',
      'classnames',
      '@emotion/is-prop-valid'
    ],
    esbuildOptions: {
      target: 'es2020'
    }
  },
  build: {
    target: 'es2020',
    commonjsOptions: {
      include: [/node_modules/]
    },
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          antd: ['antd', '@ant-design/icons'],
          charts: ['recharts']
        }
      }
    }
  }
})