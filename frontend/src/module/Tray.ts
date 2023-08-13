import axios from "axios";
import { BrowserWindow, Menu, Tray, ipcMain, nativeImage } from "electron";

let result = `JPY Loading.. | USD Loading..`;
const getCurrency = () => {
    axios.get('http://localhost:3000/last').then(res => {
        const data = res.data
        result = ` JPY ${data[0]['JPY']}  |  USD ${data[0]['USD']} `;
    })
};
export const TrayEvent = (win: BrowserWindow) => {
    let tray: Tray;
    const icon = nativeImage.createFromPath('./src/assets/IconTemplate.png');
    tray = new Tray(icon);
    tray.on('click', (event, bounds) => {
        const { x, y } = bounds
        win.setPosition(x, y);
        if (!win.isVisible()) {
            win.show();
        } else {
            win.hide();
        }
    });

    tray.on('right-click', (event, bounds) => {
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
