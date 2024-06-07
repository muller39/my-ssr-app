import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig(({ command }) => {
  const isServer = command === 'build' && process.env.BUILD_TARGET === 'server'
  console.log(isServer)

  return {
    plugins: [vue()],
    build: {
      ssr: isServer ? resolve(__dirname, 'src/entry-server.ts') : undefined,
      rollupOptions: {
        input: resolve(__dirname, 'index.html'),
        output: {
          dir: isServer ? resolve(__dirname, 'dist/server') : resolve(__dirname, 'dist/client'),
          format: isServer ? 'cjs' : 'es'
        }
      }
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src')
      }
    }
  }
})
