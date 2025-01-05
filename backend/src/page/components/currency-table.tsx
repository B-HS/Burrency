import { Currencies, CurrenciesMap } from '@src/constant'
import { CurrencyCode, CurrencyRates } from '@src/types'
import 'flag-icons/css/flag-icons.min.css'
import type { FC } from 'hono/jsx'
import { CurrencyFlags } from './flags'
import { GitHubLogo } from './github'

type CurrencyTableProps = {
    data: CurrencyRates
    lang: 'EN' | 'KO' | 'JP'
    base: CurrencyCode
}

const LANG_MAP = (BASE?: CurrencyCode) => ({
    TITLE: { EN: 'Currency Exchange Rates', KO: '환율 정보', JP: '為替レート' },
    LANG_BTN: { EN: 'English', KO: '한국어', JP: '日本語' },
    HEADERS: {
        EN: ['Country', 'Unit', 'Price'],
        KO: ['국가', '단위', '가격'],
        JP: ['国', '単位', '価格'],
    },
    TEXT_BASED_ON: {
        EN: (
            <span>
                The exchange rate is based on <span className='font-bold text-neutral-800 underline underline-offset-2'>{BASE}</span>.
            </span>
        ),
        KO: (
            <span>
                환율은 <span className='font-bold text-neutral-800 underline underline-offset-2'>{BASE}</span>을(를) 기준으로 계산됩니다.
            </span>
        ),
        JP: (
            <span>
                為替レートは<span className='font-bold text-neutral-800 underline underline-offset-2'>{BASE}</span>に基づいて計算されています。
            </span>
        ),
    },
    TEXT_EXPLAINATION_1: {
        EN: 'Click an item to view exchange rates for that currency.',
        KO: '항목을 클릭하면 해당 통화의 환율을 확인할 수 있습니다.',
        JP: 'アイテムをクリックすると、その通貨の為替レートが確認できます。',
    },
})

const transformRatesByBaseCurrency = (rates: CurrencyRates, baseCurrency: CurrencyCode): CurrencyRates => {
    const { [baseCurrency]: baseRate, ...filteredRates } = rates
    if (baseCurrency === 'KRW' || !baseRate) return filteredRates as CurrencyRates

    return Object.fromEntries(
        Object.entries(filteredRates)
            .map(([curr, rate]) => [curr, (rate as number) / baseRate])
            .sort(([curA], [curB]) => Currencies.indexOf(curA as CurrencyCode) - Currencies.indexOf(curB as CurrencyCode)),
    ) as CurrencyRates
}

export const CurrencyTable: FC<CurrencyTableProps> = ({ data: rawData, lang = 'KO', base }) => {
    const data = transformRatesByBaseCurrency(rawData, base)

    return (
        <section className='max-w-screen-sm container mx-auto p-10'>
            <section className='flex flex-col gap-2 py-2'>
                <header className='flex justify-between items-center'>
                    <section className='flex gap-2'>
                        <h1 className='text-2xl font-semibold'>{LANG_MAP().TITLE[lang]}</h1>
                        <a href='https://github.com/B-HS'>
                            <GitHubLogo width={20} />
                        </a>
                    </section>
                    <nav className='flex gap-2'>
                        {Object.entries(LANG_MAP().LANG_BTN).map(([key, label]) => (
                            <a
                                key={key}
                                href={`/?lang=${key.toLowerCase()}&base=${base || 'KRW'}`}
                                className='text-xs p-0.5 px-1 border rounded hover:bg-neutral-200 transition-all'>
                                {label}
                            </a>
                        ))}
                    </nav>
                </header>
                <section className='text-xs text-neutral-500 font-medium'>
                    <p>- {LANG_MAP(CurrenciesMap[base][lang] as CurrencyCode).TEXT_BASED_ON[lang]}</p>
                    <p>- {LANG_MAP().TEXT_EXPLAINATION_1[lang]}</p>
                </section>
            </section>
            <table className='min-w-full divide-y divide-gray-200 dark:divide-neutral-700'>
                <thead>
                    <tr>
                        {LANG_MAP().HEADERS[lang].map((header) => (
                            <th key={header} className='px-6 py-3 text-start text-xs font-medium text-gray-500 dark:text-neutral-500'>
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className='divide-y divide-gray-200 dark:divide-neutral-700'>
                    {Object.entries(data).map(([key, value]) => (
                        <tr key={key}>
                            <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200'>
                                <section className='flex gap-2 items-center'>
                                    <div className='w-6 h-6'>{CurrencyFlags[key as keyof typeof CurrencyFlags]()}</div>
                                    <a href={`/?lang=${lang.toLowerCase()}&base=${key}`}>{CurrenciesMap[key as keyof typeof CurrenciesMap][lang]}</a>
                                </section>
                            </td>
                            <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200'>
                                <a href={`/?lang=${lang.toLowerCase()}&base=${key}`}>{key}</a>
                            </td>
                            <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200'>
                                <a href={`/?lang=${lang.toLowerCase()}&base=${key}`}>{+value.toFixed(5)}</a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    )
}
