import { BrowserWindow } from 'electron'
import { AppClose, AppHide, AppShow, getCurrency, setCurrency } from './app-events'

export const InitializeEvents = (win: BrowserWindow) => {
    AppClose()
    AppShow()
    AppHide()
    setCurrency()
    getCurrency(win)
}
