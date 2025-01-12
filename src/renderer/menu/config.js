// Menu configuration and translation keys
export const menuConfig = {
  marktext: {
    id: 'marktextMenu',
    label: 'menu.marktext.title',
    submenu: [
      {
        id: 'about',
        label: 'menu.marktext.about'
      },
      {
        id: 'preferences',
        label: 'menu.marktext.preferences',
        accelerator: 'CmdOrCtrl+,'
      },
      { type: 'separator' },
      {
        id: 'services',
        label: 'menu.marktext.services'
      },
      { type: 'separator' },
      {
        id: 'hide',
        label: 'menu.marktext.hide',
        accelerator: 'CmdOrCtrl+H'
      },
      {
        id: 'hideOthers',
        label: 'menu.marktext.hideOthers',
        accelerator: 'CmdOrCtrl+Alt+H'
      },
      {
        id: 'unhide',
        label: 'menu.marktext.unhide'
      },
      { type: 'separator' },
      {
        id: 'quit',
        label: 'menu.marktext.quit',
        accelerator: 'CmdOrCtrl+Q'
      }
    ]
  },
  file: {
    id: 'fileMenu',
    label: 'menu.file.title',
    submenu: [
      {
        id: 'newFile',
        label: 'menu.file.newFile',
        accelerator: 'CmdOrCtrl+N'
      },
      {
        id: 'newWindow',
        label: 'menu.file.newWindow',
        accelerator: 'CmdOrCtrl+Shift+N'
      },
      { type: 'separator' },
      {
        id: 'open',
        label: 'menu.file.open',
        accelerator: 'CmdOrCtrl+O'
      },
      {
        id: 'openFolder',
        label: 'menu.file.openFolder',
        accelerator: 'CmdOrCtrl+Shift+O'
      },
      {
        id: 'openRecent',
        label: 'menu.file.openRecent',
        submenu: []
      },
      { type: 'separator' },
      {
        id: 'save',
        label: 'menu.file.save',
        accelerator: 'CmdOrCtrl+S'
      },
      {
        id: 'saveAs',
        label: 'menu.file.saveAs',
        accelerator: 'CmdOrCtrl+Shift+S'
      },
      {
        id: 'autoSave',
        label: 'menu.file.autoSave',
        type: 'checkbox'
      },
      { type: 'separator' },
      {
        id: 'export',
        label: 'menu.file.export',
        submenu: [
          {
            id: 'exportHTML',
            label: 'menu.file.exportHTML'
          },
          {
            id: 'exportPDF',
            label: 'menu.file.exportPDF'
          },
          {
            id: 'exportImage',
            label: 'menu.file.exportImage'
          }
        ]
      },
      { type: 'separator' },
      {
        id: 'preferences',
        label: 'menu.file.preferences',
        accelerator: 'CmdOrCtrl+,'
      },
      { type: 'separator' },
      {
        id: 'language',
        label: 'menu.file.language',
        submenu: [
          {
            id: 'en',
            label: 'menu.file.language.en',
            type: 'radio'
          },
          {
            id: 'zh-cn',
            label: 'menu.file.language.zh-cn',
            type: 'radio'
          }
        ]
      },
      { type: 'separator' },
      {
        id: 'closeTab',
        label: 'menu.file.closeTab',
        accelerator: 'CmdOrCtrl+W'
      },
      {
        id: 'closeWindow',
        label: 'menu.file.closeWindow',
        accelerator: 'CmdOrCtrl+Shift+W'
      },
      { type: 'separator' },
      {
        id: 'quit',
        label: 'menu.file.quit',
        accelerator: 'CmdOrCtrl+Q'
      }
    ]
  },
  edit: {
    id: 'editMenu',
    label: 'menu.edit.title',
    submenu: [
      {
        id: 'undo',
        label: 'menu.edit.undo',
        accelerator: 'CmdOrCtrl+Z'
      },
      {
        id: 'redo',
        label: 'menu.edit.redo',
        accelerator: 'CmdOrCtrl+Shift+Z'
      },
      { type: 'separator' },
      {
        id: 'cut',
        label: 'menu.edit.cut',
        accelerator: 'CmdOrCtrl+X'
      },
      {
        id: 'copy',
        label: 'menu.edit.copy',
        accelerator: 'CmdOrCtrl+C'
      },
      {
        id: 'paste',
        label: 'menu.edit.paste',
        accelerator: 'CmdOrCtrl+V'
      },
      {
        id: 'copyAsMarkdown',
        label: 'menu.edit.copyAsMarkdown',
        accelerator: 'CmdOrCtrl+Shift+C'
      },
      {
        id: 'copyAsPlaintext',
        label: 'menu.edit.copyAsPlaintext',
        accelerator: 'CmdOrCtrl+Shift+V'
      },
      {
        id: 'selectAll',
        label: 'menu.edit.selectAll',
        accelerator: 'CmdOrCtrl+A'
      },
      { type: 'separator' },
      {
        id: 'find',
        label: 'menu.edit.find',
        accelerator: 'CmdOrCtrl+F'
      },
      {
        id: 'findNext',
        label: 'menu.edit.findNext',
        accelerator: 'CmdOrCtrl+G'
      },
      {
        id: 'findPrevious',
        label: 'menu.edit.findPrevious',
        accelerator: 'CmdOrCtrl+Shift+G'
      },
      {
        id: 'replace',
        label: 'menu.edit.replace',
        accelerator: 'CmdOrCtrl+R'
      }
    ]
  },
  paragraph: {
    id: 'paragraphMenu',
    label: 'menu.paragraph.title',
    submenu: [
      {
        id: 'heading1',
        label: 'menu.paragraph.heading1',
        accelerator: 'CmdOrCtrl+1'
      },
      {
        id: 'heading2',
        label: 'menu.paragraph.heading2',
        accelerator: 'CmdOrCtrl+2'
      },
      {
        id: 'heading3',
        label: 'menu.paragraph.heading3',
        accelerator: 'CmdOrCtrl+3'
      },
      {
        id: 'heading4',
        label: 'menu.paragraph.heading4',
        accelerator: 'CmdOrCtrl+4'
      },
      {
        id: 'heading5',
        label: 'menu.paragraph.heading5',
        accelerator: 'CmdOrCtrl+5'
      },
      {
        id: 'heading6',
        label: 'menu.paragraph.heading6',
        accelerator: 'CmdOrCtrl+6'
      },
      { type: 'separator' },
      {
        id: 'upgradeHeading',
        label: 'menu.paragraph.upgradeHeading',
        accelerator: 'CmdOrCtrl+Plus'
      },
      {
        id: 'degradeHeading',
        label: 'menu.paragraph.degradeHeading',
        accelerator: 'CmdOrCtrl+-'
      },
      { type: 'separator' },
      {
        id: 'table',
        label: 'menu.paragraph.table',
        accelerator: 'CmdOrCtrl+Shift+T'
      },
      {
        id: 'codeFence',
        label: 'menu.paragraph.codeFence',
        accelerator: 'CmdOrCtrl+Shift+K'
      },
      {
        id: 'quoteBlock',
        label: 'menu.paragraph.quoteBlock',
        accelerator: 'CmdOrCtrl+Shift+Q'
      },
      {
        id: 'mathBlock',
        label: 'menu.paragraph.mathBlock',
        accelerator: 'CmdOrCtrl+Shift+M'
      },
      { type: 'separator' },
      {
        id: 'orderList',
        label: 'menu.paragraph.orderList',
        accelerator: 'CmdOrCtrl+Shift+O'
      },
      {
        id: 'unorderList',
        label: 'menu.paragraph.unorderList',
        accelerator: 'CmdOrCtrl+Shift+U'
      },
      {
        id: 'taskList',
        label: 'menu.paragraph.taskList',
        accelerator: 'CmdOrCtrl+Shift+X'
      }
    ]
  },
  format: {
    id: 'formatMenu',
    label: 'menu.format.title',
    submenu: [
      {
        id: 'strong',
        label: 'menu.format.strong',
        accelerator: 'CmdOrCtrl+B'
      },
      {
        id: 'emphasis',
        label: 'menu.format.emphasis',
        accelerator: 'CmdOrCtrl+I'
      },
      {
        id: 'underline',
        label: 'menu.format.underline',
        accelerator: 'CmdOrCtrl+U'
      },
      {
        id: 'strike',
        label: 'menu.format.strike',
        accelerator: 'CmdOrCtrl+D'
      },
      { type: 'separator' },
      {
        id: 'inlineCode',
        label: 'menu.format.inlineCode',
        accelerator: 'CmdOrCtrl+`'
      },
      {
        id: 'inlineMath',
        label: 'menu.format.inlineMath',
        accelerator: 'CmdOrCtrl+Shift+I'
      },
      {
        id: 'link',
        label: 'menu.format.link',
        accelerator: 'CmdOrCtrl+L'
      },
      {
        id: 'image',
        label: 'menu.format.image',
        accelerator: 'CmdOrCtrl+Shift+I'
      }
    ]
  },
  view: {
    id: 'viewMenu',
    label: 'menu.view.title',
    submenu: [
      {
        id: 'sourceCode',
        label: 'menu.view.sourceCode',
        accelerator: 'CmdOrCtrl+/'
      },
      { type: 'separator' },
      {
        id: 'toggleSidebar',
        label: 'menu.view.toggleSidebar',
        accelerator: 'CmdOrCtrl+\\'
      },
      {
        id: 'toggleTabBar',
        label: 'menu.view.toggleTabBar',
        accelerator: 'CmdOrCtrl+Shift+B'
      },
      { type: 'separator' },
      {
        id: 'toggleFullScreen',
        label: 'menu.view.toggleFullScreen',
        accelerator: 'F11'
      }
    ]
  },
  theme: {
    id: 'themeMenu',
    label: 'menu.theme.title',
    submenu: [
      {
        id: 'light',
        label: 'menu.theme.light',
        type: 'radio'
      },
      {
        id: 'dark',
        label: 'menu.theme.dark',
        type: 'radio'
      },
      {
        id: 'graphite',
        label: 'menu.theme.graphite',
        type: 'radio'
      },
      {
        id: 'material',
        label: 'menu.theme.material',
        type: 'radio'
      },
      {
        id: 'ulysses',
        label: 'menu.theme.ulysses',
        type: 'radio'
      }
    ]
  },
  window: {
    id: 'windowMenu',
    label: 'menu.window.title',
    submenu: [
      {
        id: 'minimize',
        label: 'menu.window.minimize',
        accelerator: 'CmdOrCtrl+M'
      },
      {
        id: 'zoom',
        label: 'menu.window.zoom'
      }
    ]
  },
  help: {
    id: 'helpMenu',
    label: 'menu.help.title',
    submenu: [
      {
        id: 'about',
        label: 'menu.help.about'
      },
      {
        id: 'checkUpdates',
        label: 'menu.help.checkUpdates'
      },
      { type: 'separator' },
      {
        id: 'documentation',
        label: 'menu.help.documentation'
      },
      {
        id: 'changelog',
        label: 'menu.help.changelog'
      },
      { type: 'separator' },
      {
        id: 'feedback',
        label: 'menu.help.feedback'
      },
      {
        id: 'twitter',
        label: 'menu.help.twitter'
      },
      { type: 'separator' },
      {
        id: 'devTools',
        label: 'menu.help.devTools',
        accelerator: 'CmdOrCtrl+Alt+I'
      }
    ]
  }
}
