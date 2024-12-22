import { Hono } from 'hono'
import { RouterInitializer } from './controller'

const app = new Hono()

RouterInitializer(app)

export default {
    port: 25252,
    fetch: app.fetch,
}
