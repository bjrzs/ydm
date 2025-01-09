import { ipcMain, app, BrowserWindow } from 'electron'
import { markTextAsarTranslate } from '../../marktext_asar_translate'
import path from 'path'
import log from 'electron-log'

// 配置日志
const userDataPath = app.getPath('userData')
const logPath = path.join(userDataPath, 'logs')

log.transports.file.resolvePathFn = () => path.join(logPath, 'main.log')
log.transports.file.level = 'debug'
log.transports.console.level = 'debug'

// 添加一个辅助函数来显示日志
function showLog(message) {
  log.info(message)
  console.log(message)
}

// 在应用启动时添加日志
app.on('ready', () => {
  showLog('应用已启动')
  showLog('日志路径: ' + logPath)
})

// Add language change handler
ipcMain.on('mt::change-language', (event, data) => {
  showLog('===============================')
  showLog('主进程: 收到语言切换请求')
  showLog('数据: ' + JSON.stringify(data, null, 2))
  showLog('===============================')
  
  try {
    const { lang, resourcePath } = data
    
    // 使用绝对路径
    const appPath = app.getAppPath()
    const mainJsPath = path.join(appPath, 'dist/electron', 'main.js')
    const rendererJsPath = path.join(appPath, 'dist/electron', 'renderer.js')
    
    showLog('主进程文件路径: ' + mainJsPath)
    showLog('渲染进程文件路径: ' + rendererJsPath)
    
    // 调用翻译函数
    const success = markTextAsarTranslate(
      resourcePath,
      lang,
      mainJsPath,
      mainJsPath + '.translated',
      rendererJsPath,
      rendererJsPath + '.translated'
    )
    
    showLog('翻译结果: ' + (success ? '成功' : '失败'))
    
    // 发送结果回渲染进程
    event.reply('mt::language-changed', { 
      success: success,
      message: success ? '语言切换成功' : '语言切换失败'
    })
    
    // 如果成功，重新加载窗口
    if (success) {
      showLog('正在重新加载窗口...')
      BrowserWindow.getAllWindows().forEach(win => {
        win.reload()
      })
    }
  } catch (error) {
    showLog('错误: ' + error.message)
    event.reply('mt::language-changed', { 
      success: false, 
      error: error.message || '未知错误' 
    })
  }
}) 
