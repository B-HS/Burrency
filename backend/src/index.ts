import { Hono } from 'hono'
import { InitializeRouter } from './controller'
import { InitializePages } from './page/page-routers'
import { InitializeMiddleware } from './middleware'

const app = new Hono()

InitializeMiddleware(app)
InitializeRouter(app)
InitializePages(app)

export default {
    port: 31513,
    fetch: app.fetch,
}
