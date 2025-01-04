export const Currencies = [
    'KRW',
    'USD',
    'EUR',
    'JPY',
    'CNY',
    'HKD',
    'TWD',
    'GBP',
    'CAD',
    'CHF',
    'SEK',
    'AUD',
    'NZD',
    'DKK',
    'AED',
    'THB',
    'SGD',
    'MYR',
    'IDR',
    'INR',
    'PKR',
    'PHP',
    'BRL',
] as const

export const CurrenciesMap = {
    KRW: { EN: 'Korean Won', KO: '원', JP: '韓国ウォン' },
    USD: { EN: 'US Dollar', KO: '달러', JP: 'ドル' },
    EUR: { EN: 'Euro', KO: '유로', JP: 'ユーロ' },
    JPY: { EN: 'Japanese Yen', KO: '엔', JP: '円' },
    CNY: { EN: 'Chinese Yuan', KO: '위안', JP: '元' },
    HKD: { EN: 'Hong Kong Dollar', KO: '홍콩 달러', JP: '香港ドル' },
    TWD: { EN: 'New Taiwan Dollar', KO: '대만 달러', JP: 'ニュー台湾ドル' },
    GBP: { EN: 'British Pound', KO: '파운드', JP: 'ポンド' },
    CAD: { EN: 'Canadian Dollar', KO: '캐나다 달러', JP: 'カナダドル' },
    CHF: { EN: 'Swiss Franc', KO: '스위스 프랑', JP: 'スイスフラン' },
    SEK: { EN: 'Swedish Krona', KO: '스웨덴 크로나', JP: 'スウェーデンクローナ' },
    AUD: { EN: 'Australian Dollar', KO: '호주 달러', JP: '豪ドル' },
    NZD: { EN: 'New Zealand Dollar', KO: '뉴질랜드 달러', JP: 'ニュージーランドドル' },
    DKK: { EN: 'Danish Krone', KO: '덴마크 크로네', JP: 'デンマーククローネ' },
    AED: { EN: 'United Arab Emirates Dirham', KO: '아랍에미리트 디르함', JP: 'UAEディルハム' },
    THB: { EN: 'Thai Baht', KO: '태국 바트', JP: 'タイバーツ' },
    SGD: { EN: 'Singapore Dollar', KO: '싱가포르 달러', JP: 'シンガポールドル' },
    MYR: { EN: 'Malaysian Ringgit', KO: '말레이시아 링깃', JP: 'マレーシアリンギット' },
    IDR: { EN: 'Indonesian Rupiah', KO: '인도네시아 루피아', JP: 'インドネシアルピア' },
    INR: { EN: 'Indian Rupee', KO: '인도 루피', JP: 'インドルピー' },
    PKR: { EN: 'Pakistani Rupee', KO: '파키스탄 루피', JP: 'パキスタンルピー' },
    PHP: { EN: 'Philippine Peso', KO: '필리핀 페소', JP: 'フィリピンペソ' },
    BRL: { EN: 'Brazilian Real', KO: '브라질 헤알', JP: 'ブラジルレアル' },
} as const

export const CurrencyUnits = {
    USD: 1,
    KRW: 1000,
    JPY: 100,
    CNY: 1,
    EUR: 1,
    GBP: 1,
    HKD: 1,
    TWD: 1,
    CAD: 1,
    CHF: 1,
    AUD: 1,
    NZD: 1,
    SGD: 1,
    INR: 1,
    SEK: 1,
    DKK: 1,
    BRL: 1,
    MYR: 1,
    THB: 1,
    IDR: 100,
    PHP: 1,
    PKR: 1,
    AED: 1,
}

export const normalizationCurrencyFactors = {
    KRW: 1000, // Korean Won (based on 1000 KRW)
    JPY: 1, // Japanese Yen (based on 1 JPY)
    USD: 1, // US Dollar (based on 1 USD)
    EUR: 1, // Euro (based on 1 EUR)
    CNY: 1, // Chinese Yuan (based on 1 CNY)
    HKD: 1, // Hong Kong Dollar (based on 1 HKD)
    TWD: 1, // Taiwan Dollar (based on 1 TWD)
    GBP: 1, // British Pound (based on 1 GBP)
    CAD: 1, // Canadian Dollar (based on 1 CAD)
    CHF: 1, // Swiss Franc (based on 1 CHF)
    SEK: 1, // Swedish Krona (based on 1 SEK)
    AUD: 1, // Australian Dollar (based on 1 AUD)
    NZD: 1, // New Zealand Dollar (based on 1 NZD)
    DKK: 1, // Danish Krone (based on 1 DKK)
    AED: 1, // UAE Dirham (based on 1 AED)
    THB: 1, // Thai Baht (based on 1 THB)
    SGD: 1, // Singapore Dollar (based on 1 SGD)
    MYR: 1, // Malaysian Ringgit (based on 1 MYR)
    IDR: 1, // Indonesian Rupiah (based on 1 IDR)
    INR: 1, // Indian Rupee (based on 1 INR)
    PKR: 1, // Pakistani Rupee (based on 1 PKR)
    PHP: 1, // Philippine Peso (based on 1 PHP)
    BRL: 1, // Brazilian Real (based on 1 BRL)
}
