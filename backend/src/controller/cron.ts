import { getCurrentIntervals, startCronjob, stopCronjob } from '@src/cron'
import { Hono } from 'hono'

const SECOND = 1000
const MINUTE = 60 * SECOND

export const CronController = (app: Hono) => {
    app.get('/start-currency-cron', async (c) => {
        startCronjob({ currency: MINUTE/2 })
        return c.text('Cronjob started')
    })

    app.get('/stop-currency-cron', async (c) => {
        stopCronjob()
        return c.text('Cronjob stopped')
    })

    app.get('/current-intervals', async (c) => {
        return c.json(getCurrentIntervals())
    })
}
