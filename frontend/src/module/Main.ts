import { BrowserWindow } from "electron";
import { IpcMainConfigurator } from "./IpcMain";

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

export const initWindow = (win: BrowserWindow) => {
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
    return win
};
