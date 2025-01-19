import { app } from 'electron'
import { showAboutDialog } from '../actions/help'
import * as actions from '../actions/marktext'
import i18n from '../../old_i18n.js'

// macOS only menu.

export default function (keybindings) {
  return {
    label: 'MarkText',
    submenu: [
      {
        label: i18n.t('menu.marktext.about'),
        click (menuItem, focusedWindow) {
          showAboutDialog(focusedWindow)
        }
      },
      {
        label: i18n.t('menu.marktext.checkUpdates'),
        click (menuItem, focusedWindow) {
          actions.checkUpdates(focusedWindow)
        }
      },
      {
        label: i18n.t('menu.marktext.preferences'),
        accelerator: keybindings.getAccelerator('file.preferences'),
        click () {
          actions.userSetting()
        }
      },
      {
        type: 'separator'
      },
      {
        label: i18n.t('menu.marktext.services'),
        role: 'services',
        submenu: []
      },
      {
        type: 'separator'
      },
      {
        label: i18n.t('menu.marktext.hide'),
        accelerator: keybindings.getAccelerator('mt.hide'),
        click () {
          actions.osxHide()
        }
      },
      {
        label: i18n.t('menu.marktext.hideOthers'),
        accelerator: keybindings.getAccelerator('mt.hide-others'),
        click () {
          actions.osxHideAll()
        }
      },
      {
        label: i18n.t('menu.marktext.showAll'),
        click () {
          actions.osxShowAll()
        }
      },
      {
        type: 'separator'
      },
      {
        label: i18n.t('menu.marktext.quit'),
        accelerator: keybindings.getAccelerator('file.quit'),
        click: app.quit
      }
    ]
  }
}
