import Vue from 'vue'
import VueI18n from 'vue-i18n'
import { ipcRenderer } from 'electron'
import elementEnLocale from 'element-ui/lib/locale/lang/en'
import elementZhLocale from 'element-ui/lib/locale/lang/zh-CN'
import en from '../../locales/en.json'
import zhCN from '../../locales/zh-cn.json'
import store from '../store'

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

// 从store获取默认语言，如果没有则使用中文
const defaultLanguage = store.state.preferences.language || 'zh-cn'

// 确保语言设置同步
if (localStorage.getItem('preferred-language') !== defaultLanguage) {
  localStorage.setItem('preferred-language', defaultLanguage)
}

const i18n = new VueI18n({
  locale: defaultLanguage,
  fallbackLocale: 'en',
  messages,
  silentTranslationWarn: process.env.NODE_ENV === 'production'
})

// 初始化时就设置Element UI的语言
locale.use(defaultLanguage === 'zh-cn' ? elementZhLocale : elementEnLocale)

// 处理语言切换
export function changeLanguage (lang) {
  i18n.locale = lang
  // 同时切换 Element UI 的语言
  locale.use(lang === 'zh-cn' ? elementZhLocale : elementEnLocale)
  // 保存语言设置
  localStorage.setItem('preferred-language', lang)
  // 通知主进程更新菜单
  ipcRenderer.send('mt::change-language', lang)
}

export default i18n
