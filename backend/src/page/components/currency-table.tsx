import { Currencies, CurrenciesMap } from '@src/constant'
import { CurrencyCode, CurrencyRates } from '@src/types'
import type { FC } from 'hono/jsx'
import { CurrencyFlags } from './flags'
import { GitHubLogo } from './github'
import dayjs = require('dayjs')

type CurrencyTableProps = {
    data: CurrencyRates
    lang: 'EN' | 'KO' | 'JP'
    base: CurrencyCode
    latestUpdate:
        | {
              MASTER_RECORD_ID: number
              InsertedID: string
              created_at: Date | null
          }[]
}

const LANG_MAP = (BASE?: CurrencyCode) => ({
    TITLE: { EN: 'Currency Exchange Rates', KO: '환율 정보', JP: '為替レート' },
    LANG_BTN: { EN: 'English', KO: '한국어', JP: '日本語' },
    HEADERS: {
        EN: ['Country', 'Unit', 'Price'],
        KO: ['국가', '단위', '가격'],
        JP: ['国', '単位', '価格'],
    },
    TEXT_LATEST_UPDATE: {
        EN: 'Latest Update ##STRING##',
        KO: '최근 업데이트 ##STRING##',
        JP: '最新の更新 ##STRING##',
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

export const CurrencyTable: FC<CurrencyTableProps> = ({ data: rawData, lang = 'KO', base, latestUpdate }) => {
    const data = transformRatesByBaseCurrency(rawData, base)

    const options = {
        timeZone: 'Asia/Seoul',
        year: 'numeric' as 'numeric',
        month: '2-digit' as '2-digit',
        day: '2-digit' as '2-digit',
        hour: '2-digit' as '2-digit',
        minute: '2-digit' as '2-digit',
        second: '2-digit' as '2-digit',
        hour12: false,
    }
    const latestUpdateDate = new Intl.DateTimeFormat('en-US', options).format(
        new Date(dayjs(latestUpdate.at(0)?.created_at).subtract(9, 'hour').toDate()),
    )
    return (
        <section className='max-w-screen-sm container mx-auto p-10'>
            <section className='bg-white dark:bg-neutral-800 shadow-sm rounded p-3 mb-3 border'>
                <header className='flex flex-col justify-between items-start mb-3 gap-2'>
                    <section className='flex items-center gap-4 mb-4 sm:mb-0'>
                        <h1 className='text-2xl font-semibold text-neutral-900 dark:text-white'>{LANG_MAP().TITLE[lang]}</h1>
                        <a
                            href='https://github.com/B-HS'
                            className='text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white transition-colors duration-200'
                            aria-label="BHS's GitHub">
                            <GitHubLogo width={24} />
                        </a>
                    </section>
                    <nav className='flex flex-wrap gap-2'>
                        {Object.entries(LANG_MAP().LANG_BTN).map(([key, label]) => (
                            <a
                                key={key}
                                href={`/?lang=${key.toLowerCase()}&base=${base || 'KRW'}`}
                                className='text-xs px-3 py-1 border border-neutral-300 dark:border-neutral-600 rounded text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-all duration-200'>
                                {label}
                            </a>
                        ))}
                    </nav>
                </header>
                <section className='text-sm text-neutral-600 dark:text-neutral-400 space-y-2'>
                    <p>- {LANG_MAP(CurrenciesMap[base][lang] as CurrencyCode).TEXT_BASED_ON[lang]}</p>
                    <p>- {LANG_MAP().TEXT_EXPLAINATION_1[lang]}</p>
                    <p>- {LANG_MAP().TEXT_LATEST_UPDATE[lang].replace('##STRING##', latestUpdateDate)}</p>
                </section>
            </section>
            <div className='overflow-x-auto bg-white dark:bg-neutral-800 shadow-sm rounded border'>
                <table className='min-w-full divide-y divide-neutral-200 dark:divide-neutral-700'>
                    <thead className='bg-neutral-100 dark:bg-neutral-700 border-b'>
                        <tr>
                            {LANG_MAP().HEADERS[lang].map((header) => (
                                <th
                                    key={header}
                                    className='px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-300 tracking-wider'>
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className='bg-white dark:bg-neutral-800 divide-y divide-neutral-200 dark:divide-neutral-700 border-collapse border-neutral-200 dark:border-neutral-700'>
                        {Object.entries(data).map(([key, value]) => (
                            <tr key={key} className='hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors duration-200 border-b'>
                                <td className='px-6 py-4 whitespace-nowrap'>
                                    <div className='flex items-center gap-2'>
                                        <div className='aspect-[4/3] w-8 rounded-sm'>{CurrencyFlags[key as keyof typeof CurrencyFlags]()}</div>
                                        <div className='text-sm font-medium text-neutral-900 dark:text-white'>
                                            <a
                                                href={`/?lang=${lang.toLowerCase()}&base=${key}`}
                                                className='hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200'>
                                                {CurrenciesMap[key as keyof typeof CurrenciesMap][lang]}
                                            </a>
                                        </div>
                                    </div>
                                </td>
                                <td className='px-6 py-4 whitespace-nowrap'>
                                    <a
                                        href={`/?lang=${lang.toLowerCase()}&base=${key}`}
                                        className='text-sm text-neutral-700 dark:text-neutral-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200'>
                                        {key}
                                    </a>
                                </td>
                                <td className='px-6 py-4 whitespace-nowrap'>
                                    <a
                                        href={`/?lang=${lang.toLowerCase()}&base=${key}`}
                                        className='text-sm text-neutral-700 dark:text-neutral-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200'>
                                        {+value.toFixed(5)}
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    )
}
