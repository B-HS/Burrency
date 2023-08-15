import { BrowserWindow, app, nativeImage } from 'electron';
import { IpcMainConfigurator } from './module/IpcMain';
import { TrayEvent } from './module/Tray';

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;
if (require('electron-squirrel-startup')) {
    app.quit();
}

let win: BrowserWindow;
const createWindow = () => {
    win = new BrowserWindow({
        maxHeight: 370,
        maxWidth: 400,
        frame: false,
        webPreferences: {
            preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
        },
        show: false,
    });
    win.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
    IpcMainConfigurator(win);
    win.webContents.openDevTools();
};
app.dock.hide()
app.on('ready', () => {
    createWindow();
    TrayEvent(win);
});