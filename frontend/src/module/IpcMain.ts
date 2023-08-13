import { BrowserWindow } from "electron";
import { AppClose, AppHide, AppShow, Github } from "./Config";


const IpcMainConfigurator = (window: BrowserWindow) => {
    AppClose()
    AppShow()
    AppHide()
    Github()
}

export { IpcMainConfigurator }