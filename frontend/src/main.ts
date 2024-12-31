import { app, BrowserWindow } from 'electron'
import started from 'electron-squirrel-startup'
import path from 'path'
import { InitializeEvents } from './events'
import { initTray } from './tray'

declare const MAIN_WINDOW_VITE_DEV_SERVER_URL: string
declare const MAIN_WINDOW_VITE_NAME: string

const createWindow = () => {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 450,
        show: false,
        frame: false,
        webPreferences: {
            contextIsolation: true,
            preload: path.join(__dirname, '/index.js'),
        },
    })

    MAIN_WINDOW_VITE_DEV_SERVER_URL
        ? mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL)
        : mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`))

    // Open DEV TOOLS
    mainWindow.webContents.openDevTools()
    return mainWindow
}

started && app.quit()

app.on('ready', () => {
    const win = createWindow()
    initTray(win)
    InitializeEvents(win)
})

app.on('window-all-closed', () => process.platform !== 'darwin' && app.quit())
app.on('activate', () => BrowserWindow.getAllWindows().length === 0 && createWindow())
