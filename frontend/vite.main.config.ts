import { defineConfig } from 'vite'

export default defineConfig(async () => {
    const { viteStaticCopy } = await import('vite-plugin-static-copy')

    return {
        plugins: [
            viteStaticCopy({
                targets: [
                    {
                        src: 'src/assets/**/*',
                        dest: 'assets',
                    },
                ],
            }),
        ],
    }
})
