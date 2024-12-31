import { GetCurrenciesFromServer } from '@src/service'
import { Hono } from 'hono'
import { serveStatic } from 'hono/bun'
import CurrencyPage from './currency'

export const InitializePages = (app: Hono) => {
    app.use('/static/*', serveStatic({ root: './src' }))
    app.get('/', async (c) => {
        const lang = String(c.req.query('lang') || 'EN').toUpperCase() as 'EN' | 'KO' | 'JP'
        const data = await GetCurrenciesFromServer()
        return c.html(<CurrencyPage data={data || {}} lang={lang} />)
    })
}
