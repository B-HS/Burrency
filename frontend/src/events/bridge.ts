import { CURRENCIES } from '@/constant'
import { contextBridge, ipcRenderer } from 'electron'

type EVENTS_TYPE = {
    close: () => void
    show: () => void
    hide: () => void
    redirect: (link: string) => void
    setCurrency: (list: string[]) => void
    getCurrency: () => (typeof CURRENCIES)[number][]
    currencyEventer: (fn: (data: unknown) => void) => void
}

const EVENTS: EVENTS_TYPE = {
    close: () => ipcRenderer.send('appClose'),
    show: () => ipcRenderer.send('appShow'),
    hide: () => ipcRenderer.send('appHide'),
    redirect: (link: string) => ipcRenderer.send('redirect', link),
    setCurrency: (list: string[]) => ipcRenderer.send('setCurrency', list),
    getCurrency: () => ipcRenderer.send('getCurrency') as unknown as (typeof CURRENCIES)[number][],
    currencyEventer: (fn: (data: unknown) => void) => ipcRenderer.on('currency', (_, data) => fn(data)),
}

export const exposingAPI = () => contextBridge.exposeInMainWorld('app', EVENTS)

export type AppEventsType = {
    [KEY in keyof typeof EVENTS]: (typeof EVENTS)[KEY]
}
