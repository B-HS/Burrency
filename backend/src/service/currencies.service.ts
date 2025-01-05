import { Currencies } from '@src/constant'
import { db } from '@src/db'
import { CurrencyTables, master_record } from '@src/db/schema'
import { CurrenciesList, CurrencyCode, CurrencyRates } from '@src/types'
import { desc, eq } from 'drizzle-orm'
import { v4 as uuidv4 } from 'uuid'
import dayjs = require('dayjs')

export const getCurrenciesFromServer = async () => {
    try {
        const current = dayjs().add(9, 'hour')
        const checkLastRecord = await db.select().from(master_record).orderBy(desc(master_record.created_at)).limit(1).execute()
        const lastRecord = checkLastRecord.at(0)
        const lastRecordTime = dayjs(lastRecord?.created_at)
        if (current.diff(lastRecordTime, 'second') < 50 && lastRecord?.MASTER_RECORD_ID !== undefined) {
            const query = db.select().from(master_record)

            Object.keys(CurrencyTables).forEach(async (currency) => {
                currency !== 'KRW' &&
                    query.leftJoin(
                        CurrencyTables[currency as CurrencyCode],
                        eq(master_record.MASTER_RECORD_ID, CurrencyTables[currency as CurrencyCode].MASTER_RECORD_ID),
                    )
            })
            query.where(eq(master_record.MASTER_RECORD_ID, lastRecord.MASTER_RECORD_ID))
            const result: { [key: string]: any } = (await query.execute())[0]

            return Object.keys(result)
                .slice(1)
                .reduce((prev, next) => ({ ...prev, [next.split('CURRENCY_')[1]]: Number(result[next].Value) }), {}) as CurrencyRates
        } else {
            const baseCurrency = 'KRW'
            const fetchCurrency = async (currency: string) => {
                const url = `https://query1.finance.yahoo.com/v8/finance/chart/${currency}${baseCurrency}=X?interval=1m&range=1m`
                const response = await fetch(url)
                const json = await response.json()
                const price = json.chart?.result?.[0]?.meta?.regularMarketPrice
                return price || 0
            }

            const currencyPromises = Currencies.map((currency) => fetchCurrency(currency).then((price) => ({ [currency]: price })))
            const results = await Promise.all(currencyPromises)
            const parsedData = results.reduce((acc, cur) => ({ ...acc, ...cur }), {}) as CurrenciesList

            const [MASTER_RECORD] = await db
                .insert(master_record)
                .values({
                    InsertedID: uuidv4(),
                })
                .$returningId()
                .execute()

            const convertedData = {} as CurrencyRates
            await Promise.all(
                Object.keys(parsedData).map(async (currencyKey) => {
                    const Value = Number(String(parsedData[currencyKey as keyof typeof parsedData]).replaceAll(',', ''))
                    Object.assign(convertedData, { [currencyKey]: Value })
                    return (
                        currencyKey !== 'KRW' &&
                        db.insert(CurrencyTables[currencyKey as CurrencyCode]).values([
                            {
                                MASTER_RECORD_ID: MASTER_RECORD.MASTER_RECORD_ID,
                                Value,
                            },
                        ])
                    )
                }),
            )

            return Object.entries(parsedData).reduce(
                (prev, next) => ({ ...prev, [next[0]]: +String(next[1]).replaceAll(',', '') }),
                {},
            ) as CurrencyRates
        }
    } catch (error) {
        console.log('====================================')
        console.error('[Error in GetCurrenciesFromServer]')
        console.error(error)
        console.log('====================================')
        return {} as CurrencyRates
    }
}

export const getLatestUpdateRecord = async () => {
    try {
        return db.select().from(master_record).orderBy(desc(master_record.created_at)).limit(1).execute()
    } catch (error) {
        console.log('====================================')
        console.error('[Error in GetLatestUpdateRecord]')
        console.error(error)
        console.log('====================================')
        return {} as CurrencyRates
    }
}
