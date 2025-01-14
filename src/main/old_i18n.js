import { ipcMain } from 'electron'
import zhCN from '../locales/zh-cn.json'
import enUS from '../locales/en.json'

// 主进程i18n实现
const i18n = {
  locale: 'en',
  messages: {
    en: enUS,
    'zh-cn': zhCN
  },

  // 主进程翻译函数
  t (key) {
    const keys = key.split('.')
    let value = this.messages[this.locale]
    for (const k of keys) {
      if (!value) break
      value = value[k]
    }
    return value || key
  },

  setLocale (locale) {
    if (this.messages[locale]) {
      this.locale = locale
      global.mainWindow?.webContents.send('mt::set-language', locale)
    }
  }
}

ipcMain.on('mt::change-language', (event, locale) => {
  i18n.setLocale(locale)
})

export default i18n
