import { CurrencyCode, CurrencyRates } from '@src/types'
import { html } from 'hono/html'
import { FC } from 'hono/jsx'
import { CurrencyTable } from './components'
import fs = require('fs')
import path = require('path')
const Layout: FC = (props) => html`
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <title>Burrency</title>
            <style>
                ${fs.readFileSync(path.resolve('./src/static/output.css'), 'utf8')}
            </style>
            <meta name="description" content="Currency Exchange Rates" />
            <meta name="author" content="B-HS" />
            <meta name="keywords" content="currency, exchange, rates" />
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <link rel="icon" href="https://blog.gumyo.net/favicon.ico" type="image/x-icon" sizes="64x64" />
        </head>
        <body class="antialiased">
            ${props.children}
        </body>
    </html>
`
const CurrencyPage: FC<{
    lang: 'EN' | 'KO' | 'JP'
    data: CurrencyRates
    base: CurrencyCode
    latestUpdate:
        | {
              MASTER_RECORD_ID: number
              InsertedID: string
              created_at: Date | null
          }[]
}> = ({ lang, data, base, latestUpdate }) => {
    return (
        <Layout>
            <CurrencyTable data={data} lang={lang} base={base} latestUpdate={latestUpdate} />
        </Layout>
    )
}

export default CurrencyPage
