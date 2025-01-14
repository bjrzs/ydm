import Vue from 'vue'
import VueI18n from 'vue-i18n'
import locale from 'element-ui/lib/locale'
import en from '../../locales/en.json'
import zhCN from '../../locales/zh-cn.json'
import { ipcRenderer } from 'electron'

Vue.use(VueI18n)

const messages = {
  en: {
    ...en
  },
  'zh-cn': {
    ...zhCN
  }
}

const savedLanguage = localStorage.getItem('preferred-language') || 'en'
console.log('Saved language:', savedLanguage)

const i18n = new VueI18n({
  locale: savedLanguage,
  fallbackLocale: 'en',
  silentTranslationWarn: true,
  messages
})

locale.use(savedLanguage === 'zh-cn' ? zhCN : en)

// 通知主进程语言变更
if (savedLanguage) {
  ipcRenderer.send('mt::change-language', savedLanguage)
}

// 处理语言切换
export function changeLanguage (lang) {
  i18n.locale = lang
  locale.use(lang === 'zh-cn' ? zhCN : en)
  localStorage.setItem('preferred-language', lang)
  ipcRenderer.send('mt::change-language', lang)
}

export default i18n
