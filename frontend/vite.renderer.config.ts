import path from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@renderer': path.resolve(__dirname, './src/renderer'),
            '@assets': path.resolve(__dirname, './src/assets'),
        },
    },
})
