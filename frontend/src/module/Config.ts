import axios from "axios";
import { BrowserWindow, app, ipcMain, shell } from "electron";
import { getListConfiguration, setListConfiguration } from "./Store";

export const AppClose = () => ipcMain.on('appClose', () => {
    app.quit();
});

export const AppShow = (window: BrowserWindow) => ipcMain.on('appShow', () => {
    axios.get('http://localhost:3000/range/7').then(res => {
        const data = res.data
        window.webContents.send("appShow", data);
    })
    app.show();
});

export const AppHide = () => ipcMain.on('appHide', () => {
    app.hide();
});

export const Github = () => ipcMain.on('github', () => {
    shell.openExternal('https://github.com/B-HS')
});

export const setCurrency = () => ipcMain.on('setCurrency', (_, data: string[]) => {
    setListConfiguration(data)
});

export const getCurrency = (win: BrowserWindow) => ipcMain.on('getCurrency', () => {
    win.webContents.send('currency', getListConfiguration());
})

