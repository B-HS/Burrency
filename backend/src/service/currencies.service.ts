import { db } from '@src/db'
import { CurrencyTables, master_record } from '@src/db/schema'
import { parseHTML } from '@src/utils/currency/currency-parse-util'
import { desc, eq } from 'drizzle-orm'
import { v4 as uuidv4 } from 'uuid'
import dayjs = require('dayjs')

export const GetCurrenciesFromServer = async () => {
    try {
        const current = dayjs().add(9, 'hour')
        const checkLastRecord = await db.select().from(master_record).orderBy(desc(master_record.created_at)).limit(1).execute()
        const lastRecord = checkLastRecord.at(0)
        const lastRecordTime = dayjs(lastRecord?.created_at)

        if (current.diff(lastRecordTime, 'second') < 50 && lastRecord?.MASTER_RECORD_ID !== undefined) {
            const query = db.select().from(master_record)
            Object.keys(CurrencyTables).forEach(async (currency) => {
                query.leftJoin(
                    CurrencyTables[currency as keyof typeof CurrencyTables],
                    eq(master_record.MASTER_RECORD_ID, CurrencyTables[currency as keyof typeof CurrencyTables].MASTER_RECORD_ID),
                )
            })
            query.where(eq(master_record.MASTER_RECORD_ID, lastRecord.MASTER_RECORD_ID))
            const result: { [key: string]: any } = (await query.execute())[0]

            return Object.keys(result)
                .slice(1, -1)
                .reduce((prev, next) => ({ ...prev, [next.split('CURRENCY_')[1]]: Number(result[next].Value) }), {})
        } else {
            const response = await fetch('https://finance.naver.com/marketindex/exchangeList.naver')
            const HTMLDATA = await response.text()
            const parsedData = parseHTML(HTMLDATA)

            const [MASTER_RECORD] = await db
                .insert(master_record)
                .values({
                    InsertedID: uuidv4(),
                })
                .$returningId()
                .execute()

            await Promise.all(
                Object.keys(parsedData).map(async (currencyKey) => {
                    const Value = Number(String(parsedData[currencyKey as keyof typeof parsedData]).replaceAll(',', ''))

                    return db.insert(CurrencyTables[currencyKey as keyof typeof CurrencyTables]).values([
                        {
                            MASTER_RECORD_ID: MASTER_RECORD.MASTER_RECORD_ID,
                            Value,
                        },
                    ])
                }),
            )

            return Object.entries(parsedData).reduce((prev, next) => ({ ...prev, [next[0]]: String(next[1]).replaceAll(',', '') }), {})
        }
    } catch (error) {
        console.log('')
        console.error('[Error in GetCurrenciesFromServer]')
        console.error(error)
        console.log('')
        return []
    }
}
