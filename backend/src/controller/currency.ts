import { GetCurrenciesFromServer } from '@src/service'
import { Hono } from 'hono'

export const CurrencyRouter = (app: Hono) => {
    app.get('/', async (c) => {
        return c.json(await GetCurrenciesFromServer())
    })
}
