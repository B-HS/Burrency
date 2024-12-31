import { CURRENCIES } from '@/constant'
import { AppEventsType } from '@/events/bridge'
import React, { useEffect, useState } from 'react'
import { Button } from './components/ui/button'

declare global {
    interface Window {
        app?: AppEventsType
    }
}

export const App = () => {
    const [selectedCurrency, setSelectedCurrency] = useState<string[]>([])

    const setCurrency = (currency: string) => {
        if (selectedCurrency.includes(currency)) {
            setSelectedCurrency((prev) => prev.filter((val) => val !== currency))
        } else {
            setSelectedCurrency((prev) => [...prev, currency])
        }
    }

    useEffect(() => {
        window.app.currencyEventer((currentCurrencies: string[]) =>
            setSelectedCurrency(() => (Array.isArray(currentCurrencies) ? [...currentCurrencies] : [])),
        )
        window.app.getCurrency()
    }, [])

    useEffect(() => {
        window.app.setCurrency(selectedCurrency)
    }, [selectedCurrency])

    return (
        <section>
            {selectedCurrency.map((currency) => (
                <Button className='w-10' key={currency} variant='outline' onClick={() => setCurrency(currency)}>
                    {currency}
                </Button>
            ))}
            {CURRENCIES.filter((currency) => !selectedCurrency.includes(currency)).map((currency) => (
                <Button className='w-10' key={currency} onClick={() => setCurrency(currency)}>
                    {currency}
                </Button>
            ))}
        </section>
    )
}
