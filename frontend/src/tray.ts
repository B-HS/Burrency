import { BrowserWindow, ipcMain, Menu, nativeImage, Tray } from 'electron'
import path from 'path'

const setTrayText = (tray: Tray) => {
    tray.setTitle(new Date().toLocaleTimeString())
    tray.setToolTip(new Date().toLocaleTimeString())
}

export const initTray = (win: BrowserWindow) => {
    const iconPath = path.join(
        process.env.NODE_ENV === 'development'
            ? path.resolve(__dirname, 'assets/IconTemplate.png') // Development mode
            : path.join(process.resourcesPath, 'assets/IconTemplate.png'), // Production mode
    )

    const icon = nativeImage.createFromPath(iconPath)
    icon.setTemplateImage(true)
    const tray = new Tray(icon)
    tray.on('click', (_, bounds) => {
        const { x, y } = bounds
        win.setPosition(x, y)
        if (!win.isVisible()) {
            win.show()
        } else {
            win.hide()
        }
    })

    tray.on('right-click', (_, bounds) => {
        const { x, y } = bounds
        win.setPosition(x, y)
        const contextMenu = Menu.buildFromTemplate([
            !win.isVisible()
                ? {
                      label: 'Show',
                      type: 'normal',
                      click: () => {
                          win.show()
                      },
                  }
                : {
                      label: 'Hide',
                      type: 'normal',
                      click: () => {
                          win.hide()
                      },
                  },
            { type: 'separator' },
            { label: 'Close', type: 'normal', click: () => ipcMain.emit('appClose') },
        ])
        tray.popUpContextMenu(contextMenu)
    })

    setInterval(() => setTrayText(tray), 1000)

    return tray
}
