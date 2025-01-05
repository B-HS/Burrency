import { Hono } from 'hono'
import { compress } from './compress'

export const InitializeMiddleware = async (app: Hono) => {
    app.use('*', compress())
    app.use('*', async (c, next) => {
        c.header('Cache-Control', 'public, max-age=31536000, immutable')
        await next()
    })
}
