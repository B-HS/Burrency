import { getSync, set } from 'electron-json-storage'
import { CURRENCIES } from './constant'

const getListConfiguration = () => {
    const result = getSync('currencies') as (typeof CURRENCIES)[number][]
    if (Object.keys(result).length === 0) return []
    return result
}
const setListConfiguration = (list: string[]) => set('currencies', list, undefined)

export { getListConfiguration, setListConfiguration }
