import axios from 'axios';
import { app } from 'electron';
import { menubar } from 'menubar';

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;
if (require('electron-squirrel-startup')) {
    app.quit();
}
const menu = menubar({
    index: MAIN_WINDOW_WEBPACK_ENTRY,
    browserWindow: {
        resizable: false,
        maxHeight: 310,
        webPreferences: {
            preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
        }
    },
    showDockIcon: false,
})

let result = `JPY Loading.. | USD Loading..`
const getCurrency = async () => {
    const { data } = await axios.get('http://localhost:3000/last')
    result = ` JPY ${data[0]['JPY']}  |  USD ${data[0]['USD']} `
}

app.on('ready', ()=>{
    
})

menu.on('ready', () => {
    setInterval(() => {
        getCurrency()
        return menu.tray.setTitle(result)
    }, 1000)
})

