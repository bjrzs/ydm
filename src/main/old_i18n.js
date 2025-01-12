import Vue from 'vue'
import VueI18n from 'vue-i18n'
import { app } from 'electron'

// Initialize Vue in the main process
if (!global.Vue) {
  global.Vue = Vue
}

Vue.use(VueI18n)

const messages = {
  en: require('../locales/en.json'),
  'zh-cn': require('../locales/zh-cn.json')
}

// Create VueI18n instance
const i18n = new VueI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages,
  silentTranslationWarn: true
})

// Export translation function that uses i18n instance
const t = (key, options) => {
  return i18n.t(key, options)
}

// Export language setting function
const setLanguage = (lang) => {
  if (lang && messages[lang]) {
    i18n.locale = lang
    return true
  }
  return false
}

// Initialize with system locale
const locale = app.getLocale().toLowerCase()
setLanguage(locale.startsWith('zh') ? 'zh-cn' : 'en')

// Export i18n instance for use in other parts of the app
export default i18n

export { t, setLanguage }
