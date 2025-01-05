import { getCurrenciesFromServer } from '@src/service'
import { Hono } from 'hono'
import { serveStatic } from 'hono/bun'
import CurrencyPage from './currency'
import { CurrencyCode } from '@src/types'

export const InitializePages = (app: Hono) => {
    app.use('/static/*', serveStatic({ root: './src' }))
    app.get('/', async (c) => {
        const lang = String(c.req.query('lang') || 'EN').toUpperCase() as 'EN' | 'KO' | 'JP'
        const baseCurrency = String(c.req.query('base') || 'KRW').toUpperCase() as CurrencyCode
        const data = await getCurrenciesFromServer()
        return c.html(<CurrencyPage data={{ ...data, KRW: 1 }} lang={lang} base={baseCurrency} />)
    })
}
