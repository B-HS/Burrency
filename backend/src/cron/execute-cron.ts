import { getCurrenciesFromServer } from '@src/service'
let intervalMap = {
    GET_CURRENCY: false,
}
let intervalIds: NodeJS.Timer[] = []

const requestGetCurrencies = async ({ interval = 1000 }: { interval?: number }) => {
    await getCurrenciesFromServer()
    if (intervalMap.GET_CURRENCY) return
    intervalMap.GET_CURRENCY = true
    try {
        const intervalId: NodeJS.Timer = setInterval(async () => {
            await getCurrenciesFromServer()
            console.log('[BURRENCY] Currencies updated' + new Date().toISOString())
        }, interval)
        intervalIds.push(intervalId)
    } catch (error) {
        console.error('[BURRENCY] Error in requestGetCurrencies:', error)
        stopCronjob()
    }
}

export const startCronjob = ({ currency }: { currency: number }) => {
    console.log('[BURRENCY] Starting cronjob')
    requestGetCurrencies({ interval: currency })
}

export const stopCronjob = () => {
    intervalIds.forEach((intervalId) => clearInterval(intervalId))
    intervalIds = []
}

export const getCurrentIntervals = () => intervalIds
