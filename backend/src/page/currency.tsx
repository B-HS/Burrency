import { CurrencyCode, CurrencyRates } from '@src/types'
import { html } from 'hono/html'
import { FC } from 'hono/jsx'
import { CurrencyTable } from './components'

const Layout: FC = (props) => html`
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <link rel="stylesheet" href="/static/output.css" />
            <title>Burrency</title>
            <meta name="description" content="Currency Exchange Rates" />
            <meta name="author" content="B-HS" />
            <meta name="keywords" content="currency, exchange, rates" />
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </head>
        <body class="antialiased">
            ${props.children}
        </body>
    </html>
`
const CurrencyPage: FC<{ lang: 'EN' | 'KO' | 'JP'; data: CurrencyRates; base: CurrencyCode }> = ({ lang, data, base }) => {
    return (
        <Layout>
            <CurrencyTable data={data} lang={lang} base={base} />
        </Layout>
    )
}

export default CurrencyPage
