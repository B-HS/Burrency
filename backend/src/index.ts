import { Hono } from 'hono'
import { RouterInitializer } from './controller'
import { InitializePages } from './page/page-routers'

const app = new Hono()

RouterInitializer(app)
InitializePages(app)

export default {
    port: 25252,
    fetch: app.fetch,
}
