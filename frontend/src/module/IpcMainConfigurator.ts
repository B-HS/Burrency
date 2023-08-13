import { BrowserWindow } from "electron";
import { AppClose } from "./Config";


const IpcMainConfigurator = (window: BrowserWindow) => {
    AppClose()
}

export { IpcMainConfigurator }