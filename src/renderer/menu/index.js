import { ipcRenderer } from 'electron'
import store from '../store'

export function initMenu () {
  // 初始化菜单
  // 注意：不再直接更新菜单，仅发送指令给主进程

  // 初始化语言设置
  const initializeLanguage = () => {
    const currentLanguage = store.state.preferences.language
    console.log(`[Renderer] Current language from store: ${currentLanguage}`)
    if (currentLanguage) {
      // 发送指令给主进程更新菜单翻译
      ipcRenderer.send('mt::update-menu-translations', currentLanguage)
    } else {
      console.log(
        '[Renderer] No language found in store, defaulting to English'
      )
    }
  }

  // 初始语言设置
  initializeLanguage()

  // 监听偏好设置加载事件
  ipcRenderer.on('mt::preferences-loaded', () => {
    initializeLanguage()
  })

  // 监听语言变化
  store.watch(
    state => state.preferences.language,
    newLanguage => {
      // 发送指令给主进程更新菜单翻译
      ipcRenderer.send('mt::update-menu-translations', newLanguage)
    }
  )
}
