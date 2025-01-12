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

  // 设置语言
  setLocale (locale) {
    if (this.messages[locale]) {
      this.locale = locale
      // 通知所有渲染进程切换语言
      global.mainWindow?.webContents.send('mt::set-language', locale)
    }
  }
}

// 监听渲染进程的语言切换事件
ipcMain.on('mt::change-language', (event, locale) => {
  i18n.setLocale(locale)
})

export default i18n
