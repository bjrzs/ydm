import zhCN from '../locales/zh-cn.json'
import enUS from '../locales/en.json'

const i18n = {
  locale: 'en',
  messages: {
    en: enUS,
    'zh-cn': zhCN
  },
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
    }
  }
}

export default i18n
