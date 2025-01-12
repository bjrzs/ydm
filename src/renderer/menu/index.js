import { ipcRenderer } from 'electron'
import menuBuilder from './menuBuilder'
import store from '../store'

// Initialize menu
export function initMenu () {
  menuBuilder.buildMenu()

  // Listen for language changes
  store.watch(
    state => state.preferences.language,
    () => {
      menuBuilder.updateMenuTranslations()
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
