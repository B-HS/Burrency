import { getCurrenciesFromServer } from '@src/service'
import { Hono } from 'hono'

export const CurrencyRouter = (app: Hono) => {
    app.get('/json', async (c) => {
        return c.json(await getCurrenciesFromServer())
    })
}
