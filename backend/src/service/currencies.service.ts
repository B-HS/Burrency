import { parseHTML } from '@src/utils/currency/currency-parse-util'

export const GetCurrenciesFromServer = async () => {
    try {
        const response = await fetch('https://finance.naver.com/marketindex/exchangeList.naver')
        const HTMLDATA = await response.text()
        return parseHTML(HTMLDATA)
    } catch (error) {
        console.error(error)
        return null
    }
}
