import { Currencies, CurrenciesMap } from '@src/constant'

export type CurrenciesList = {
    [key in (typeof Currencies)[number]]: number
}
export type CurrencyCode = keyof typeof CurrenciesMap
export type CurrencyTranslations = (typeof CurrenciesMap)[CurrencyCode]
export type CurrencyRates = { [key in CurrencyCode]: number }
