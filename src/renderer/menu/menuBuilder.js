import { ipcRenderer } from 'electron'
import { menuConfig } from './config'
import i18n from '../i18n'
import store from '../store'

class MenuBuilder {
  constructor () {
    this.menuTemplate = []
  }

  // Handle menu item click
  handleMenuClick (menuId) {
    const actions = {
      // MarkText menu
      about: () => ipcRenderer.send('mt::show-about-dialog'),
      preferences: () => ipcRenderer.send('mt::show-preferences'),
      services: () => ipcRenderer.send('mt::services'),
      hide: () => ipcRenderer.send('mt::hide-window'),
      hideOthers: () => ipcRenderer.send('mt::hide-others'),
      unhide: () => ipcRenderer.send('mt::show-all'),
      quit: () => ipcRenderer.send('mt::quit'),

      // File menu
      newFile: () => store.dispatch('file/newFile'),
      newTab: () => store.dispatch('file/newTab'),
      openFile: () => store.dispatch('file/openFile'),
      openFolder: () => store.dispatch('file/openFolder'),
      save: () => store.dispatch('file/save'),
      saveAs: () => store.dispatch('file/saveAs'),
      autoSave: (checked) => store.dispatch('file/setAutoSave', checked),
      exportHTML: () => store.dispatch('file/exportFile', 'html'),
      exportPDF: () => store.dispatch('file/exportFile', 'pdf'),
      exportImage: () => store.dispatch('file/exportFile', 'image'),
      closeTab: () => store.dispatch('file/closeTab'),
      closeWindow: () => ipcRenderer.send('mt::close-window'),

      // Edit menu
      undo: () => store.dispatch('editor/undo'),
      redo: () => store.dispatch('editor/redo'),
      cut: () => store.dispatch('editor/cut'),
      copy: () => store.dispatch('editor/copy'),
      paste: () => store.dispatch('editor/paste'),
      copyAsMarkdown: () => store.dispatch('editor/copyAsMarkdown'),
      copyAsPlaintext: () => store.dispatch('editor/copyAsPlaintext'),
      selectAll: () => store.dispatch('editor/selectAll'),
      find: () => store.dispatch('editor/find'),
      findNext: () => store.dispatch('editor/findNext'),
      findPrevious: () => store.dispatch('editor/findPrevious'),
      replace: () => store.dispatch('editor/replace'),

      // Paragraph menu
      heading1: () => store.dispatch('paragraph/heading', 1),
      heading2: () => store.dispatch('paragraph/heading', 2),
      heading3: () => store.dispatch('paragraph/heading', 3),
      heading4: () => store.dispatch('paragraph/heading', 4),
      heading5: () => store.dispatch('paragraph/heading', 5),
      heading6: () => store.dispatch('paragraph/heading', 6),
      upgradeHeading: () => store.dispatch('paragraph/upgradeHeading'),
      degradeHeading: () => store.dispatch('paragraph/degradeHeading'),
      table: () => store.dispatch('paragraph/table'),
      codeFence: () => store.dispatch('paragraph/codeFence'),
      quoteBlock: () => store.dispatch('paragraph/quoteBlock'),
      mathBlock: () => store.dispatch('paragraph/mathBlock'),
      orderList: () => store.dispatch('paragraph/orderList'),
      unorderList: () => store.dispatch('paragraph/unorderList'),
      taskList: () => store.dispatch('paragraph/taskList'),

      // Format menu
      strong: () => store.dispatch('format/strong'),
      emphasis: () => store.dispatch('format/emphasis'),
      underline: () => store.dispatch('format/underline'),
      strike: () => store.dispatch('format/strike'),
      inlineCode: () => store.dispatch('format/inlineCode'),
      inlineMath: () => store.dispatch('format/inlineMath'),
      link: () => store.dispatch('format/link'),
      image: () => store.dispatch('format/image'),

      // View menu
      sourceCode: () => store.dispatch('view/toggleSourceCode'),
      toggleSidebar: () => store.dispatch('view/toggleSidebar'),
      toggleTabBar: () => store.dispatch('view/toggleTabBar'),
      toggleFullScreen: () => ipcRenderer.send('mt::toggle-full-screen'),

      // Theme menu
      light: () => store.dispatch('theme/setTheme', 'light'),
      dark: () => store.dispatch('theme/setTheme', 'dark'),
      graphite: () => store.dispatch('theme/setTheme', 'graphite'),
      material: () => store.dispatch('theme/setTheme', 'material'),
      ulysses: () => store.dispatch('theme/setTheme', 'ulysses'),

      // Window menu
      minimize: () => ipcRenderer.send('mt::minimize-window'),
      zoom: () => ipcRenderer.send('mt::zoom-window'),

      // Help menu
      documentation: () => ipcRenderer.send('mt::open-url', 'documentation'),
      changelog: () => ipcRenderer.send('mt::open-url', 'changelog'),
      feedback: () => ipcRenderer.send('mt::open-url', 'feedback'),
      twitter: () => ipcRenderer.send('mt::open-url', 'twitter'),
      devTools: () => ipcRenderer.send('mt::toggle-dev-tools'),

      // Language menu
      en: () => {
        store.dispatch('preferences/setLanguage', 'en')
        this.updateMenuTranslations()
      },
      'zh-cn': () => {
        store.dispatch('preferences/setLanguage', 'zh-cn')
        this.updateMenuTranslations()
      }
    }

    const action = actions[menuId]
    if (action) {
      action()
    }
  }

  // Build menu item
  buildMenuItem (menuItem) {
    const translatedItem = {
      ...menuItem,
      label: i18n.t(menuItem.label, menuItem.label)
    }

    if (menuItem.submenu) {
      translatedItem.submenu = menuItem.submenu.map(item => this.buildMenuItem(item))
    }

    if (menuItem.id && !menuItem.submenu) {
      translatedItem.click = () => {
        this.handleMenuClick(menuItem.id)
      }
    }

    if (menuItem.type === 'checkbox') {
      translatedItem.checked = store.state.preferences[menuItem.id] || false
    }

    if (menuItem.type === 'radio') {
      if (menuItem.id === 'en' || menuItem.id === 'zh-cn') {
        translatedItem.checked = store.state.preferences.language === menuItem.id
      } else if (menuItem.id === 'light' || menuItem.id === 'dark' || menuItem.id === 'graphite' || menuItem.id === 'material' || menuItem.id === 'ulysses') {
        translatedItem.checked = store.state.preferences.theme === menuItem.id
      }
    }

    return translatedItem
  }

  // Build complete menu
  buildMenu () {
    this.menuTemplate = Object.values(menuConfig).map(menu => this.buildMenuItem(menu))
    return this.menuTemplate
  }

  // Update menu translations
  updateMenuTranslations () {
    this.buildMenu()
    ipcRenderer.send('update-menu', this.menuTemplate)
  }

  // Update recent files
  updateRecentFiles (recentFiles) {
    const openRecentMenu = this.menuTemplate.find(menu => menu.id === 'fileMenu')
      ?.submenu.find(item => item.id === 'openRecent')

    if (openRecentMenu) {
      openRecentMenu.submenu = recentFiles.map(file => ({
        label: file,
        click: () => store.dispatch('file/openFile', file)
      }))

      if (recentFiles.length > 0) {
        openRecentMenu.submenu.push(
          { type: 'separator' },
          {
            label: i18n.t('menu.file.clearRecentFiles'),
            click: () => store.dispatch('file/clearRecentFiles')
          }
        )
      }

      this.updateMenuTranslations()
    }
  }
}

export default new MenuBuilder()
