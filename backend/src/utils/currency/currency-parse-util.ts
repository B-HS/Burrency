import { Currencies } from '@src/constant'
import type { CurrenciesList } from '@src/types'

export const parseHTML = (html: string) => {
    const exchangeData = [] as { country: string; AVG: string; BUY: string; SELL: string }[]
    const tableStart = '<table'
    const tableEnd = '</table>'
    const tableStartIndex = html.indexOf(tableStart)
    const tableEndIndex = html.indexOf(tableEnd, tableStartIndex)
    const tableContent = html.slice(tableStartIndex, tableEndIndex + tableEnd.length)
    const getCellValue = (column: string) => {
        const startTagIndex = column.indexOf('>') + 1
        const endTagIndex = column.indexOf('<', startTagIndex)
        return column.slice(startTagIndex, endTagIndex).trim()
    }

    tableContent.split('</tr>').forEach((row: string) => {
        if (row.includes('<td')) {
            const columns = row.split('</td>')
            const country = columns[0].trim().split('event);">')[1].split('</a>')[0].trim().split(' ')[1]
            const AVG = getCellValue(columns[1])
            const BUY = getCellValue(columns[2])
            const SELL = getCellValue(columns[3])
            exchangeData.push({ country, AVG, BUY, SELL })
        }
    })

    return Currencies.reduce((prev, next) => {
        const target = exchangeData.find((val) => val.country === next)
        return { ...prev, [next]: target && target.AVG ? target.AVG : 0 }
    }, {} as CurrenciesList)
}
