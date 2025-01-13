import { ipcRenderer } from 'electron'
import menuBuilder from './menuBuilder'
import store from '../store'

// Initialize menu
export function initMenu () {
  // Build initial menu
  menuBuilder.buildMenu()

  // Initialize language from preferences and update menu
  const initializeLanguage = () => {
    const currentLanguage = store.state.preferences.language
    if (currentLanguage) {
      // 通知主进程更新语言
      ipcRenderer.send('mt::change-language', currentLanguage)
      // 更新菜单翻译
      menuBuilder.updateMenuTranslations()
      // 更新菜单项选中状态
      ipcRenderer.send('mt::update-menu-item', { id: 'en', checked: currentLanguage === 'en' })
      ipcRenderer.send('mt::update-menu-item', { id: 'zh-cn', checked: currentLanguage === 'zh-cn' })
    }
  }

  // Initial language setup
  initializeLanguage()

  // Listen for preferences loaded event
  ipcRenderer.on('mt::preferences-loaded', () => {
    initializeLanguage()
  })

  // Listen for language changes
  store.watch(
    state => state.preferences.language,
    (newLanguage) => {
      // 通知主进程更新语言
      ipcRenderer.send('mt::change-language', newLanguage)
      // 更新菜单翻译
      menuBuilder.updateMenuTranslations()
      // 保存语言偏好
      store.dispatch('preferences/savePreferences')
      // 更新菜单项选中状态
      ipcRenderer.send('mt::update-menu-item', { id: 'en', checked: newLanguage === 'en' })
      ipcRenderer.send('mt::update-menu-item', { id: 'zh-cn', checked: newLanguage === 'zh-cn' })
    }
  )
}

export default {
  initMenu
}
