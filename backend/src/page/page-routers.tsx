import { getCurrenciesFromServer, getLatestUpdateRecord } from '@src/service'
import { CurrencyCode } from '@src/types'
import { Hono } from 'hono'
import { serveStatic } from 'hono/bun'
import CurrencyPage from './currency'

export const InitializePages = (app: Hono) => {
    app.use('/static/*', serveStatic({ root: './src' }))
    app.get('/', async (c) => {
        const lang = String(c.req.query('lang') || 'EN').toUpperCase() as 'EN' | 'KO' | 'JP'
        const baseCurrency = String(c.req.query('base') || 'KRW').toUpperCase() as CurrencyCode
        const data = await getCurrenciesFromServer()
        const latestUpdateRecord = (await getLatestUpdateRecord()) as {
            MASTER_RECORD_ID: number
            InsertedID: string
            created_at: Date | null
        }[]
        return c.html(<CurrencyPage data={{ ...data, KRW: 1 }} lang={lang} base={baseCurrency} latestUpdate={latestUpdateRecord} />)
    })
}
