import { Hono } from 'hono'
import { CronController } from './cron'
import { CurrencyRouter } from './currency'

export const InitializeRouter = (app: Hono) => {
    CurrencyRouter(app)
    CronController(app)
}
