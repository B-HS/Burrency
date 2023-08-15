import axios from "axios";
import { BrowserWindow, Menu, Tray, ipcMain, nativeImage } from "electron";
import { getListConfiguration } from "./Store";
import path from "path"

let result = ` Loading...`;
const getCurrency = () => {
    axios.get('http://localhost:3000/last').then(res => {
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
};
export const TrayEvent = (win: BrowserWindow) => {
    let tray: Tray;
    const icon = nativeImage.createFromPath(path.join(__dirname, 'assets/IconTemplate.png'));
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

    setInterval(() => {
        getCurrency();
        tray.setTitle(result);
    }, 1000);

}
