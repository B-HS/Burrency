import axios from 'axios';
import { BrowserWindow, Menu, Tray, app, nativeImage, shell } from 'electron';
import { IpcMainConfigurator } from './module/IpcMainConfigurator';

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;
if (require('electron-squirrel-startup')) {
    app.quit();
}

let win: BrowserWindow;
let tray: Tray;
const createWindow = () => {
    win = new BrowserWindow({
        maxHeight: 310,
        maxWidth: 400,
        frame:false,
        webPreferences: {
            preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
        },
        show: false,
    });
    win.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
    IpcMainConfigurator(win);
    // win.webContents.openDevTools();
};

let result = `JPY Loading.. | USD Loading..`;
const getCurrency = async () => {
    const { data } = await axios.get('http://localhost:3000/last');
    result = ` JPY ${data[0]['JPY']}  |  USD ${data[0]['USD']} `;
};

app.on('ready', () => {
    createWindow();
});

let isHide: boolean = true;
app.whenReady().then(() => {
    const icon = nativeImage.createFromPath('./src/assets/IconTemplate.png');
    tray = new Tray(icon);

    tray.on('click', (event, bounds) => {
        const { x, y } = bounds        
        if (isHide) {
            win.setPosition(x, y);
            win.show();
            isHide = false;
        } else {
            win.hide();
            isHide = true;
        }
    });

    tray.on('right-click', () => {
        const contextMenu = Menu.buildFromTemplate([
            isHide ? { label: 'Show', type: 'normal', click: () => { isHide = false; win.show() } } : { label: 'Hide', type: 'normal', click: () => { isHide = true; win.hide() } },
            { label: 'Github', type: 'normal', click: () => shell.openExternal('https://github.com/B-HS') },
            { type: 'separator' },
            { label: 'Close', type: 'normal', click: () => app.quit() },
        ]);
        tray.popUpContextMenu(contextMenu);
    })

    setInterval(() => {
        getCurrency();
        tray.setTitle(result);
    }, 1000);
});