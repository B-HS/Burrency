import { Currencies } from "@src/constant";


export type CurrenciesList = {
    [key in (typeof Currencies)[number]]: number
}
