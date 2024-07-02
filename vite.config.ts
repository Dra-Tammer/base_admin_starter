import {fileURLToPath, URL} from 'node:url'

import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
    plugins: [
        vue(),
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    // 配置一个代理，跨域
    server: {
        host: '0.0.0.0',
        open: true,
        proxy: {
            '/api': {
                changeOrigin: true,
                target: 'https://api.realworld.io'
            }
        }
    }
})
