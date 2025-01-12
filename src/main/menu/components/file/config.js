import { app } from 'electron'
import * as actions from '../../actions/file'
import { userSetting } from '../../actions/marktext'
import { isOsx } from '../../../config'

export const getFileMenuConfig = (keybindings) => {
  return {
    id: 'fileMenu',
    label: 'menu.file.title',
    submenu: [{
      id: 'newFile',
      label: 'menu.file.newFile',
      accelerator: () => keybindings.getAccelerator('file.new-tab'),
      click: (menuItem, browserWindow) => actions.newBlankTab(browserWindow)
    }, {
      id: 'newWindow',
      label: 'menu.file.newWindow',
      accelerator: () => keybindings.getAccelerator('file.new-window'),
      click: () => actions.newEditorWindow()
    }, {
      type: 'separator'
    }, {
      id: 'openFile',
      label: 'menu.file.open',
      accelerator: () => keybindings.getAccelerator('file.open-file'),
      click: (menuItem, browserWindow) => actions.openFile(browserWindow)
    }, {
      id: 'openFolder',
      label: 'menu.file.openFolder',
      accelerator: () => keybindings.getAccelerator('file.open-folder'),
      click: (menuItem, browserWindow) => actions.openFolder(browserWindow)
    }, {
      id: 'save',
      label: 'menu.file.save',
      accelerator: () => keybindings.getAccelerator('file.save'),
      click: (menuItem, browserWindow) => actions.save(browserWindow)
    }, {
      id: 'saveAs',
      label: 'menu.file.saveAs',
      accelerator: () => keybindings.getAccelerator('file.save-as'),
      click: (menuItem, browserWindow) => actions.saveAs(browserWindow)
    }, {
      id: 'autoSave',
      label: 'menu.file.autoSave',
      type: 'checkbox',
      click: (menuItem, browserWindow) => actions.autoSave(menuItem, browserWindow)
    }, {
      type: 'separator'
    }, {
      id: 'moveTo',
      label: 'menu.file.moveTo',
      accelerator: () => keybindings.getAccelerator('file.move-file'),
      click: (menuItem, browserWindow) => actions.moveTo(browserWindow)
    }, {
      id: 'rename',
      label: 'menu.file.rename',
      accelerator: () => keybindings.getAccelerator('file.rename-file'),
      click: (menuItem, browserWindow) => actions.rename(browserWindow)
    }, {
      type: 'separator'
    }, {
      id: 'import',
      label: 'menu.file.import',
      click: (menuItem, browserWindow) => actions.importFile(browserWindow)
    }, {
      id: 'export',
      label: 'menu.file.export',
      submenu: [
        {
          label: 'HTML',
          click: (menuItem, browserWindow) => actions.exportFile(browserWindow, 'styledHtml')
        }, {
          label: 'PDF',
          click: (menuItem, browserWindow) => actions.exportFile(browserWindow, 'pdf')
        }
      ]
    }, {
      type: 'separator',
      visible: !isOsx
    }, {
      id: 'preferences',
      label: 'menu.file.preferences',
      accelerator: () => keybindings.getAccelerator('file.preferences'),
      visible: !isOsx,
      click: () => userSetting()
    }, {
      type: 'separator'
    }, {
      id: 'closeTab',
      label: 'menu.file.closeTab',
      accelerator: () => keybindings.getAccelerator('file.close-tab'),
      click: (menuItem, browserWindow) => actions.closeTab(browserWindow)
    }, {
      id: 'closeWindow',
      label: 'menu.file.closeWindow',
      accelerator: () => keybindings.getAccelerator('file.close-window'),
      click: (menuItem, browserWindow) => actions.closeWindow(browserWindow)
    }, {
      type: 'separator',
      visible: !isOsx
    }, {
      id: 'quit',
      label: 'menu.file.quit',
      accelerator: () => keybindings.getAccelerator('file.quit'),
      visible: !isOsx,
      click: () => app.quit()
    }]
  }
}
