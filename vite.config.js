import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import fs from 'fs';

// https://vitejs.dev/config/
export default defineConfig({
    disableHostCheck: true,
    base: process.env.NODE_ENV === 'production' ? './' : '/',
    plugins: [vue(), vueJsx()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src',
                import.meta.url))
        }
    },
    server: {
        https: {
            key: fs.readFileSync('keys/127.0.0.1-key.pem'),
            cert: fs.readFileSync('keys/127.0.0.1.pem'),
        },
        proxy: {
            '/api': {
                target: 'https://ageapi.omwjhz.com:18888/v2',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ""),
            },
        },
    },
})