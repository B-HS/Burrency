import { BrowserWindow, Tray, app } from 'electron';
import { initWindow } from './module/Main';
import { initTray } from './module/Tray';
import { config } from 'dotenv'
let win: BrowserWindow;
let tray: Tray;

if (require('electron-squirrel-startup')) app.quit();

app.dock.hide()
app.on('ready', () => {
    config()
    win = initWindow(win);
    tray = initTray(win);
});