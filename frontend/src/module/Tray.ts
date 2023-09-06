import axios from "axios";
import { config } from 'dotenv';
import { BrowserWindow, Menu, Tray, ipcMain, nativeImage } from "electron";
import path from "path";
import { getListConfiguration } from "./Store";

config({ path: path.join(__dirname, 'assets/.env') })

const LOADING = ` Loading...`
let result = LOADING

axios.interceptors.request.use((config) => {
    result = LOADING
    return config;
}, (error) => {
    result = ' Failed to get information from server.'
    return Promise.reject(error);
});

const getInformation = (tray: Tray) => {
    axios.get(process.env.API_URL + '/last').then(res => {
        const data = res.data
        const savedList = getListConfiguration()
        if (savedList.length > 0) {
            const text = savedList.map((val) => {
                if (data[0][val]) {
                    return `${val} ${data[0][val]}`
                }
                return `${val}: 0`
            })
            result = ` ${text.join(" | ")}`
        }
        else {
            result = ` Please set the target currencies.`;
        }
    })
    tray.setTitle(result);
    tray.setToolTip(result)
}

export const initTray = (win: BrowserWindow) => {
    let tray: Tray;
    const icon = nativeImage.createFromPath(path.join(__dirname, 'assets/IconTemplate.png'))
    tray = new Tray(icon);
    tray.on('click', (_, bounds) => {
        const { x, y } = bounds
        win.setPosition(x, y);
        if (!win.isVisible()) {
            win.show();
        } else {
            win.hide();
        }
    });

    tray.on('right-click', (_, bounds) => {
        const { x, y } = bounds
        win.setPosition(x, y)
        const contextMenu = Menu.buildFromTemplate([
            !win.isVisible()
                ? { label: 'Show', type: 'normal', click: () => { win.show(); } }
                : { label: 'Hide', type: 'normal', click: () => { win.hide(); } },
            { label: 'Github', type: 'normal', click: () => ipcMain.emit('github') },
            { type: 'separator' },
            { label: 'Close', type: 'normal', click: () => ipcMain.emit('appClose') },
        ]);
        tray.popUpContextMenu(contextMenu);
    })
    getInformation(tray)
    setInterval(() => {
        getInformation(tray);
    }, 1000);

    return tray
}
