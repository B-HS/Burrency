import { contextBridge, ipcRenderer } from "electron";

const events = {
    show: () => ipcRenderer.send('appShow'),
    hide: () => ipcRenderer.send('appHide'),
    close: () => ipcRenderer.send('appClose'),
    github: () => ipcRenderer.send('github')
}

export const AppController = () => contextBridge.exposeInMainWorld(
    "app", events
)

export type AppControllerProps = {
    [Key in keyof typeof events]: () => void;
}