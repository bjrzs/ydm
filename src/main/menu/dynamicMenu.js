import { Menu, ipcMain } from 'electron'

export function createDynamicMenu (menuTemplate) {
  const menu = Menu.buildFromTemplate(menuTemplate)
  Menu.setApplicationMenu(menu)
}

export function handleMenuClick (window, actionId) {
  window.webContents.send('menu-action', actionId)
}

export function initializeMainMenu (windows) {
  ipcMain.on('update-menu', (event, menuTemplate) => {
    createDynamicMenu(menuTemplate)
  })

  ipcMain.on('menu-click', (event, actionId) => {
    const window = windows.get(event.sender.id)
    if (window) {
      handleMenuClick(window, actionId)
    }
  })
}
