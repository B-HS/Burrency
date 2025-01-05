import { getCurrenciesFromServer } from '@src/service'

let intervalIds: NodeJS.Timer[] = []

const requestGetCurrencies = async ({ interval = 1000 }: { interval?: number }) => {
    try {
        stopCronjob()
        const intervalId: NodeJS.Timer = setInterval(() => {
            getCurrenciesFromServer()
        }, interval)
        intervalIds.push(intervalId)
    } catch (error) {
        console.error('[BURRENCY] Error in requestGetCurrencies:', error)
        stopCronjob()
    }
}

export const startCronjob = ({ currency }: { currency: number }) => {
    requestGetCurrencies({ interval: currency })
}

export const stopCronjob = () => {
    intervalIds.forEach((intervalId) => clearInterval(intervalId))
    intervalIds = []
}

export const getCurrentIntervals = () => intervalIds
