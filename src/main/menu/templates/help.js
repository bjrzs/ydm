import { shell } from 'electron'
import * as actions from '../actions/help'
import { checkUpdates } from '../actions/marktext'
import { isUpdatable } from '../../utils'
import i18n from '../../old_i18n.js'

export default function () {
  const helpMenu = {
    label: i18n.t('menu.help.title'),
    role: 'help',
    submenu: [
      {
        label: i18n.t('menu.help.quickStart'),
        click () {
          shell.openExternal(
            'https://github.com/marktext/marktext/blob/master/docs/README.md'
          )
        }
      },
      {
        label: i18n.t('menu.help.markdownReference'),
        click () {
          shell.openExternal(
            'https://github.com/marktext/marktext/blob/master/docs/MARKDOWN_SYNTAX.md'
          )
        }
      },
      {
        label: i18n.t('menu.help.changelog'),
        click () {
          shell.openExternal(
            'https://github.com/marktext/marktext/blob/master/.github/CHANGELOG.md'
          )
        }
      },
      {
        type: 'separator'
      },
      {
        label: i18n.t('menu.help.website'),
        click () {
          shell.openExternal('https://github.com/marktext/marktext')
        }
      },
      {
        label: i18n.t('menu.help.about'),
        click (menuItem, browserWindow) {
          actions.showAboutDialog(browserWindow)
        }
      }
    ]
  }

  if (isUpdatable()) {
    helpMenu.submenu.push(
      {
        type: 'separator'
      },
      {
        label: i18n.t('menu.help.checkUpdates'),
        click (menuItem, browserWindow) {
          checkUpdates(browserWindow)
        }
      }
    )
  }

  if (process.platform !== 'darwin') {
    helpMenu.submenu.push(
      {
        type: 'separator'
      },
      {
        label: i18n.t('menu.help.about'),
        click (menuItem, browserWindow) {
          actions.showAboutDialog(browserWindow)
        }
      }
    )
  }
  return helpMenu
}
