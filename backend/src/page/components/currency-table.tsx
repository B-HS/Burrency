import { CurrenciesMap } from '@src/constant'
import type { FC } from 'hono/jsx'

type Props = {
    data: Record<string, string>
    lang: 'EN' | 'KO' | 'JP'
}

const LANG_MAP = {
    TITLE: { EN: 'Currency Exchange Rates', KO: '환율 정보', JP: '為替レート' },
    LANG_BTN: { EN: 'English', KO: '한국어', JP: '日本語' },
    HEADERS: {
        EN: ['Country', 'Unit', 'Price'],
        KO: ['국가', '단위', '가격'],
        JP: ['国', '単位', '価格'],
    },
}

export const CurrencyTable: FC<Props> = ({ data, lang = 'KO' }) => (
    <section className='max-w-screen-sm container mx-auto p-10'>
        <header className='flex justify-between items-center mb-4'>
            <h1 className='text-2xl font-semibold'>{LANG_MAP.TITLE[lang]}</h1>
            <nav className='flex gap-2'>
                {Object.entries(LANG_MAP.LANG_BTN).map(([key, label]) => (
                    <a
                        key={key}
                        href={`/?lang=${key.toLowerCase()}`}
                        className='text-xs p-0.5 px-1 border rounded hover:bg-neutral-200 transition-all'>
                        {label}
                    </a>
                ))}
            </nav>
        </header>
        <table className='min-w-full divide-y divide-gray-200 dark:divide-neutral-700'>
            <thead>
                <tr>
                    {LANG_MAP.HEADERS[lang].map((header) => (
                        <th key={header} className='px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500'>
                            {header}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody className='divide-y divide-gray-200 dark:divide-neutral-700'>
                {Object.entries(data).map(([key, value]) => (
                    <tr key={key}>
                        <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200'>
                            {CurrenciesMap[key as keyof typeof CurrenciesMap][lang]}
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200'>{key}</td>
                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200'>{value}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </section>
)
