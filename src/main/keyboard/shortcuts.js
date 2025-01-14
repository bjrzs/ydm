import i18n from '../old_i18n.js'

export function getKeyboardShortcuts () {
  return {
    'file.new': {
      label: i18n.t('shortcuts.file.new'),
      accelerator: 'CmdOrCtrl+N'
    }
    // ... existing code ...
  }
}
