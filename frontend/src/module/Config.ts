import { app, ipcMain } from "electron";

export const AppClose = () => ipcMain.on('appClose', () => {
    app.quit();
});


