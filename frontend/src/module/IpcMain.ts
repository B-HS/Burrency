import { BrowserWindow } from "electron";
import { AppClose, AppHide, AppShow, Github, getCurrency, setCurrency } from "./Config";


const IpcMainConfigurator = (window: BrowserWindow) => {
    AppClose()
    AppShow(window)
    AppHide()
    Github()
    setCurrency()
    getCurrency(window)
}

export { IpcMainConfigurator }