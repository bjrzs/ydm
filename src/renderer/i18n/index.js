import Vue from 'vue'
import VueI18n from 'vue-i18n'
import { ipcRenderer } from 'electron'
import elementEnLocale from 'element-ui/lib/locale/lang/en'
import elementZhLocale from 'element-ui/lib/locale/lang/zh-CN'
import en from '../../locales/en.json'
import zhCN from '../../locales/zh-cn.json'

// 设置 element-ui 语言
import { locale } from 'element-ui'

Vue.use(VueI18n)

// 合并翻译
const messages = {
  en: {
    ...en,
    ...elementEnLocale
  },
  'zh-cn': {
    ...zhCN,
    ...elementZhLocale
  }
}

// 从localStorage获取保存的语言设置，默认为英文
const savedLanguage = localStorage.getItem('preferred-language') || 'en'

const i18n = new VueI18n({
  locale: savedLanguage,
  fallbackLocale: 'en',
  messages
})
locale.use(savedLanguage === 'zh-cn' ? elementZhLocale : elementEnLocale)

// 处理语言切换
export function changeLanguage (lang) {
  i18n.locale = lang
  // 同时切换 Element UI 的语言
  locale.use(lang === 'zh-cn' ? elementZhLocale : elementEnLocale)
  // 保存语言设置
  localStorage.setItem('preferred-language', lang)
  // 通知主进程更新菜�?
  ipcRenderer.send('mt::change-language', lang)
}

export default i18n
