import { Currencies } from '@src/constant'
import { CurrenciesList } from '@src/types'
import { decimal, int, mysqlTable, timestamp, varchar } from 'drizzle-orm/mysql-core'

export const master_record = mysqlTable('master_record', {
    MASTER_RECORD_ID: int('MASTER_RECORD_ID').primaryKey().autoincrement(),
    InsertedID: varchar('InsertedID', { length: 255 }).notNull(),
    created_at: timestamp('created_at').defaultNow(),
})

const createCurrencyTable = (currency: keyof CurrenciesList) =>
    mysqlTable(`CURRENCY_${currency}`, {
        [`${currency}ID`]: int(`${currency}ID`).primaryKey().autoincrement(),
        MASTER_RECORD_ID: int('MASTER_RECORD_ID')
            .notNull()
            .references(() => master_record.MASTER_RECORD_ID, { onDelete: 'cascade' }),
        Value: decimal('Value', { precision: 15, scale: 4 }).notNull(),
        created_at: timestamp('created_at').defaultNow(),
    })

const currencyTablesEntries = Currencies.map((currency) => [currency, createCurrencyTable(currency)])

export const CurrencyTables = Object.fromEntries(currencyTablesEntries) as {
    [K in (typeof Currencies)[number]]: ReturnType<typeof createCurrencyTable>
}

export const {
    KRW: CurrencyKRW,
    USD: CurrencyUSD,
    EUR: CurrencyEUR,
    JPY: CurrencyJPY,
    CNY: CurrencyCNY,
    HKD: CurrencyHKD,
    TWD: CurrencyTWD,
    GBP: CurrencyGBP,
    CAD: CurrencyCAD,
    CHF: CurrencyCHF,
    SEK: CurrencySEK,
    AUD: CurrencyAUD,
    NZD: CurrencyNZD,
    DKK: CurrencyDKK,
    AED: CurrencyAED,
    THB: CurrencyTHB,
    SGD: CurrencySGD,
    MYR: CurrencyMYR,
    IDR: CurrencyIDR,
    INR: CurrencyINR,
    PKR: CurrencyPKR,
    PHP: CurrencyPHP,
    BRL: CurrencyBRL,
} = CurrencyTables
