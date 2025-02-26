import i18n from '../../../old_i18n.js'
import { getFileMenuConfig } from './config'
import { openFileOrFolder, clearRecentlyUsed } from '../../actions/file'

export default function createFileMenu (
  keybindings,
  userPreference,
  recentlyUsedFiles
) {
  const config = getFileMenuConfig(keybindings)
  const { autoSave } = userPreference.getAll()

  // 构建菜单项
  const menuItems = config.items.map(item => {
    if (item.type === 'separator') {
      return item
    }
    return {
      ...item,
      label: i18n.t(item.label),
      accelerator:
        typeof item.accelerator === 'function'
          ? item.accelerator()
          : item.accelerator
    }
  })

  // 处理最近使用的文件
  const recentFilesIndex =
    menuItems.findIndex(item => item.id === 'openFolder') + 1
  if (recentlyUsedFiles && recentlyUsedFiles.length > 0) {
    menuItems.splice(recentFilesIndex, 0, {
      label: i18n.t('menu.file.openRecent'),
      submenu: [
        ...recentlyUsedFiles.map(file => ({
          label: file,
          click: (menuItem, browserWindow) =>
            openFileOrFolder(browserWindow, file)
        })),
        { type: 'separator' },
        {
          label: i18n.t('menu.file.clearRecentlyUsed'),
          click: (menuItem, browserWindow) => clearRecentlyUsed()
        }
      ]
    })
  }

  // 设置自动保存状态
  const autoSaveItem = menuItems.find(item => item.id === 'autoSave')
  if (autoSaveItem) {
    autoSaveItem.checked = autoSave
  }

  return {
    label: i18n.t('menu.file.title'),
    submenu: menuItems
  }
}
