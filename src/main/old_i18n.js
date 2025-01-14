import { ipcMain, app } from 'electron'
import path from 'path'
import fs from 'fs'
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

// 添加新的 IPC 处理
ipcMain.on('mt::request-language-setting', (event) => {
  try {
    const userDataPath = app.getPath('userData')
    const preferencesPath = path.join(userDataPath, 'preferences.json')

    if (fs.existsSync(preferencesPath)) {
      const preferences = JSON.parse(fs.readFileSync(preferencesPath, 'utf8'))
      const lang = preferences.language || 'zh-cn'
      event.reply('mt::language-setting-reply', lang)
      // 同时设置主进程的语言
      i18n.setLocale(lang)
    }
  } catch (err) {
    console.error('Failed to read preferences.json:', err)
    event.reply('mt::language-setting-reply', 'zh-cn')
  }
})

ipcMain.on('mt::change-language', (event, locale) => {
  i18n.setLocale(locale)
})

export default i18n
