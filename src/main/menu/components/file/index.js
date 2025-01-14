import i18n from '../../../old_i18n.js'
import { getFileMenuConfig } from './config'
import * as actions from '../../actions/file'

export default function createFileMenu (keybindings, userPreference, recentlyUsedFiles) {
  const config = getFileMenuConfig(keybindings)
  const { autoSave } = userPreference.getAll()

  const menuItems = config.submenu.map(item => {
    if (item.type === 'separator') {
      return item
    }
    return {
      ...item,
      label: i18n.t(item.label),
      accelerator: typeof item.accelerator === 'function' ? item.accelerator() : item.accelerator
    }
  })

  const recentFilesIndex = menuItems.findIndex(item => item.id === 'openFolder') + 1
  if (recentlyUsedFiles && recentlyUsedFiles.length > 0) {
    menuItems.splice(recentFilesIndex, 0, {
      label: i18n.t('menu.file.openRecent'),
      submenu: [
        ...recentlyUsedFiles.map(file => ({
          label: file,
          click: (menuItem, browserWindow) => actions.openFileOrFolder(browserWindow, file)
        })),
        { type: 'separator' },
        {
          label: i18n.t('menu.file.clearRecentlyUsed'),
          click: (menuItem, browserWindow) => actions.clearRecentlyUsed()
        }
      ]
    })
  }

  const autoSaveItem = menuItems.find(item => item.id === 'autoSave')
  if (autoSaveItem) {
    autoSaveItem.checked = autoSave
  }

  return {
    id: config.id,
    label: i18n.t(config.label),
    submenu: menuItems
  }
}
