import Vue from 'vue'
import VueI18n from 'vue-i18n'
import locale from 'element-ui/lib/locale'
import elementEnLocale from 'element-ui/lib/locale/lang/en'
import elementZhLocale from 'element-ui/lib/locale/lang/zh-CN'
import en from '../../locales/en.json'
import zhCN from '../../locales/zh-cn.json'

Vue.use(VueI18n)

// 调试用：打印翻译内容
console.log('English translations:', en)
console.log('Chinese translations:', zhCN)

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
console.log('Saved language:', savedLanguage)

const i18n = new VueI18n({
  locale: savedLanguage,
  fallbackLocale: 'en',
  silentTranslationWarn: true,
  messages
})

// 设置 element-ui 语言
locale.use(savedLanguage === 'zh-cn' ? elementZhLocale : elementEnLocale)

// 处理语言切换
export function changeLanguage (lang) {
  console.log('[Renderer] Switching language to:', lang)
  console.log('[Renderer] Current messages:', messages[lang])
  i18n.locale = lang
  // 同时切换 Element UI 的语言
  locale.use(lang === 'zh-cn' ? elementZhLocale : elementEnLocale)
  // 保存语言设置
  localStorage.setItem('preferred-language', lang)
  // 调试用：确认切换后的语言
  console.log('[Renderer] New locale:', i18n.locale)
  console.log('[Renderer] Available translations:', Object.keys(i18n.messages))
}

export default i18n
