// menu/index.js
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
    console.log(`[Renderer] Current language from store: ${currentLanguage}`) // 添加日志
    if (currentLanguage) {
      // 更新菜单翻译
      menuBuilder.updateMenuTranslations()
      console.log('[Renderer] Updated menu translations') // 添加日志
      // 更新菜单项选中状态
      ipcRenderer.send('mt::update-menu-item', { id: 'en', checked: currentLanguage === 'en' })
      ipcRenderer.send('mt::update-menu-item', { id: 'zh-cn', checked: currentLanguage === 'zh-cn' })
      console.log(`[Renderer] Updated menu item checked status for en: ${currentLanguage === 'en'}`) // 添加日志
      console.log(`[Renderer] Updated menu item checked status for zh-cn: ${currentLanguage === 'zh-cn'}`) // 添加日志
    } else {
      console.log('[Renderer] No language found in store, defaulting to English') // 添加日志
    }
  }

  // Initial language setup
  initializeLanguage()

  // Listen for preferences loaded event
  ipcRenderer.on('mt::preferences-loaded', () => {
    console.log('[Renderer] Received mt::preferences-loaded event') // 添加日志
    initializeLanguage()
  })

  // Listen for language changes
  store.watch(
    state => state.preferences.language,
    (newLanguage) => {
      menuBuilder.updateMenuTranslations()
      console.log('[Renderer] Updated menu translations') // 添加日志
      // 保存语言偏好
      store.dispatch('preferences/savePreferences')
      console.log('[Renderer] Saved language preferences') // 添加日志
      // 更新菜单项选中状态
      ipcRenderer.send('mt::update-menu-item', { id: 'en', checked: newLanguage === 'en' })
      ipcRenderer.send('mt::update-menu-item', { id: 'zh-cn', checked: newLanguage === 'zh-cn' })
      console.log(`[Renderer] Updated menu item checked status for en: ${newLanguage === 'en'}`) // 添加日志
      console.log(`[Renderer] Updated menu item checked status for zh-cn: ${newLanguage === 'zh-cn'}`) // 添加日志
    }
  )
}

export default {
  initMenu
}
