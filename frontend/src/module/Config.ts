import { app, ipcMain, shell } from "electron";

export const AppClose = () => ipcMain.on('appClose', () => {
    app.quit();
});

export const AppShow = () => ipcMain.on('appShow', () => {
    app.show();
});

export const AppHide = () => ipcMain.on('appHide', () => {
    app.hide();
});

export const Github = () => ipcMain.on('github', () => {
    shell.openExternal('https://github.com/B-HS')
});

