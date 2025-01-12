import { ipcRenderer } from 'electron'
import menuBuilder from './menuBuilder'
import store from '../store'

// Initialize menu
export function initMenu () {
  menuBuilder.buildMenu()

  // Initialize language from preferences and update menu
  const initializeLanguage = () => {
    const currentLanguage = store.state.preferences.language
    if (currentLanguage) {
      // Simulate a language switch event
      store.dispatch('preferences/setLanguage', currentLanguage)
      menuBuilder.updateMenuTranslations()
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
      menuBuilder.updateMenuTranslations()
      // Save language preference
      store.dispatch('preferences/savePreferences')
      // Update menu item checked state
      ipcRenderer.send('mt::update-menu-item', { id: 'en', checked: newLanguage === 'en' })
      ipcRenderer.send('mt::update-menu-item', { id: 'zh-cn', checked: newLanguage === 'zh-cn' })
    }
  )

  // Listen for theme changes
  store.watch(
    state => state.preferences.theme,
    () => {
      menuBuilder.updateMenuTranslations()
    }
  )

  // Listen for auto save settings
  store.watch(
    state => state.preferences.autoSave,
    () => {
      menuBuilder.updateMenuTranslations()
    }
  )

  // Listen for recent files
  store.watch(
    state => state.preferences.recentlyFiles,
    (recentFiles) => {
      menuBuilder.updateRecentFiles(recentFiles)
    }
  )

  // Listen for menu item clicks
  ipcRenderer.on('mt::menu-item-clicked', (event, { id, checked }) => {
    menuBuilder.handleMenuClick(id, checked)
  })

  // Listen for editor state
  store.watch(
    state => state.editor.canUndo,
    (canUndo) => {
      ipcRenderer.send('mt::update-menu-item', { id: 'undo', enabled: canUndo })
    }
  )

  store.watch(
    state => state.editor.canRedo,
    (canRedo) => {
      ipcRenderer.send('mt::update-menu-item', { id: 'redo', enabled: canRedo })
    }
  )

  // Listen for file state
  store.watch(
    state => state.file.isSaved,
    (isSaved) => {
      ipcRenderer.send('mt::update-menu-item', { id: 'save', enabled: !isSaved })
    }
  )

  // Listen for selection state
  store.watch(
    state => state.editor.hasSelection,
    (hasSelection) => {
      const editActions = ['cut', 'copy', 'copyAsMarkdown', 'copyAsPlaintext']
      editActions.forEach(id => {
        ipcRenderer.send('mt::update-menu-item', { id, enabled: hasSelection })
      })
    }
  )
}

export default {
  initMenu
}
