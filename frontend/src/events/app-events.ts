import { app, BrowserWindow, ipcMain, shell } from 'electron'
import { getListConfiguration, setListConfiguration } from '../store'

export const AppClose = () => ipcMain.on('appClose', () => app.quit())
export const AppShow = () => ipcMain.on('appShow', () => app.show())
export const AppHide = () => ipcMain.on('appHide', () => app.hide())
export const Redirect = () => ipcMain.on('redirect', (_, url: string) => shell.openExternal(url))

export const setCurrency = () => ipcMain.on('setCurrency', (_, data: string[]) => setListConfiguration(data))
export const getCurrency = (win: BrowserWindow) => ipcMain.on('getCurrency', () => win.webContents.send('currency', getListConfiguration()))
