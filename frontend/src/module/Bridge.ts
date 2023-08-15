import { contextBridge, ipcRenderer } from "electron";

const EVENTS = {
    show: () => ipcRenderer.send('appShow'),
    hide: () => ipcRenderer.send('appHide'),
    close: () => ipcRenderer.send('appClose'),
    github: () => ipcRenderer.send('github'),
    setCurrency: (list: string[]) => ipcRenderer.send('setCurrency', list),
    getCurrency: () => ipcRenderer.send('getCurrency'),
    currencyEventer: (fn: Function) => ipcRenderer.on('currency', (_, data) => fn(data)),
}

export const AppController = () => contextBridge.exposeInMainWorld(
    "app", EVENTS
)

export type AppControllerProps = {
    [KEY in keyof typeof EVENTS]: typeof EVENTS[KEY];
}