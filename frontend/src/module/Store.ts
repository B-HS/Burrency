import storage from 'electron-json-storage';

const getListConfiguration = () => {
    const result = storage.getSync('currencies') as string[]
    if (result.length === 0) {
        return []
    }
    return result
}
const setListConfiguration = (list: string[]) => {
    storage.set('currencies', list, () => { })
}

export { getListConfiguration, setListConfiguration };
