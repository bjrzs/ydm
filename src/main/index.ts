import { ipcMain, app, BrowserWindow } from 'electron'
import { markTextAsarTranslate } from '../../marktext_asar_translate'
import path from 'path'
import fs from 'fs'

// 立即执行的测试代码
console.log('Main process starting...')
try {
  const testDir = path.join(process.cwd(), 'test-logs')
  const testFile = path.join(testDir, 'startup.log')
  
  // 创建测试目录
  if (!fs.existsSync(testDir)) {
    fs.mkdirSync(testDir, { recursive: true })
  }
  
  // 写入测试文件
  fs.writeFileSync(testFile, `Main process started at ${new Date().toISOString()}\n`)
  fs.appendFileSync(testFile, `Current working directory: ${process.cwd()}\n`)
  fs.appendFileSync(testFile, `Node version: ${process.version}\n`)
  fs.appendFileSync(testFile, `Electron version: ${process.versions.electron}\n`)
  
  console.log('Test file written:', testFile)
} catch (err) {
  console.error('Failed to write test file:', err)
}

// 监听未捕获的错误
process.on('uncaughtException', (err) => {
  console.error('Uncaught exception:', err)
  try {
    const errorFile = path.join(process.cwd(), 'test-logs', 'error.log')
    fs.appendFileSync(errorFile, `\n[${new Date().toISOString()}] Uncaught exception:\n${err.stack}\n`)
  } catch (e) {
    console.error('Failed to write error log:', e)
  }
})

// 监听未处理的Promise拒绝
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled rejection:', reason)
  try {
    const errorFile = path.join(process.cwd(), 'test-logs', 'error.log')
    fs.appendFileSync(errorFile, `\n[${new Date().toISOString()}] Unhandled rejection:\n${reason}\n`)
  } catch (e) {
    console.error('Failed to write error log:', e)
  }
})

// 配置日志
const userDataPath = app.getPath('userData')
const logPath = path.join(userDataPath, 'logs')
const mainLogFile = path.join(logPath, 'main.log')

// 添加一个辅助函数来显示日志
function showLog(message) {
  const timestamp = new Date().toISOString()
  const logMessage = `[${timestamp}] ${message}\n`
  
  // 确保日志目录存在
  try {
    if (!fs.existsSync(logPath)) {
      fs.mkdirSync(logPath, { recursive: true })
    }
    
    // 写入日志文件
    fs.appendFileSync(mainLogFile, logMessage)
    
    // 输出到控制台
    console.log(message)
  } catch (err) {
    console.error('Failed to write log:', err)
  }
}

// 在应用启动时添加日志
app.whenReady().then(() => {
  showLog('=== Application Started ===')
  showLog('Log path: ' + logPath)
  showLog('User data path: ' + userDataPath)
  showLog('App version: ' + app.getVersion())
  showLog('Electron version: ' + process.versions.electron)
  showLog('Platform: ' + process.platform)
  showLog('Architecture: ' + process.arch)
  showLog('===========================')
  
  // 设置IPC监听器
  showLog('Setting up IPC listeners...')
  
  ipcMain.on('mt::change-language', (event, data) => {
    showLog('=== Language Change Request Received ===')
    showLog('Request data: ' + JSON.stringify(data, null, 2))
    showLog('Current working directory: ' + process.cwd())
    
    try {
      // Validate input data
      if (!data || !data.lang || !data.resourcePath) {
        const error = 'Invalid request data: missing required fields'
        showLog('Error: ' + error)
        event.reply('mt::language-changed', { 
          success: false,
          error: error
        })
        return
      }
      
      const { lang, resourcePath } = data
      showLog('Language: ' + lang)
      showLog('Resource path: ' + resourcePath)
      
      // Check resource path
      if (!fs.existsSync(resourcePath)) {
        const error = `Resource path does not exist: ${resourcePath}`
        showLog('Error: ' + error)
        showLog('Attempted to access: ' + resourcePath)
        showLog('Directory contents: ' + fs.readdirSync(path.dirname(resourcePath)).join(', '))
        event.reply('mt::language-changed', { 
          success: false,
          error: error
        })
        return
      }
      
      // Check translation files
      const mainLabelDict = path.join(resourcePath, `main_label_dict_${lang}.txt`)
      const mainDict = path.join(resourcePath, `main_dict_${lang}.txt`)
      const rendererDict = path.join(resourcePath, `renderer_dict_${lang}.txt`)
      
      showLog('Translation files:')
      showLog(`- Main label dict: ${mainLabelDict} (${fs.existsSync(mainLabelDict) ? 'exists' : 'missing'})`)
      showLog(`- Main dict: ${mainDict} (${fs.existsSync(mainDict) ? 'exists' : 'missing'})`)
      showLog(`- Renderer dict: ${rendererDict} (${fs.existsSync(rendererDict) ? 'exists' : 'missing'})`)
      
      // Get app paths
      const appPath = app.getAppPath()
      showLog('App path: ' + appPath)
      
      const distPath = path.join(appPath, 'dist/electron')
      const mainJsPath = path.join(distPath, 'main.js')
      const rendererJsPath = path.join(distPath, 'renderer.js')
      const mainJsTranslatedPath = mainJsPath + '.translated'
      const rendererJsTranslatedPath = rendererJsPath + '.translated'
      
      showLog('Starting translation process...')
      showLog('Main JS path: ' + mainJsPath)
      showLog('Renderer JS path: ' + rendererJsPath)
      
      const success = markTextAsarTranslate(
        resourcePath,
        lang,
        mainJsPath,
        mainJsTranslatedPath,
        rendererJsPath,
        rendererJsTranslatedPath
      )
      
      showLog('Translation result: ' + (success ? 'Success' : 'Failed'))
      
      if (success) {
        // Create backups
        fs.copyFileSync(mainJsPath, mainJsPath + '.backup')
        fs.copyFileSync(rendererJsPath, rendererJsPath + '.backup')
        showLog('Backups created')
        
        // Replace files
        fs.copyFileSync(mainJsTranslatedPath, mainJsPath)
        fs.copyFileSync(rendererJsTranslatedPath, rendererJsPath)
        showLog('Files replaced')
        
        // Clean up
        fs.unlinkSync(mainJsTranslatedPath)
        fs.unlinkSync(rendererJsTranslatedPath)
        showLog('Cleanup completed')
        
        event.reply('mt::language-changed', { 
          success: true,
          message: 'Language switched successfully',
          lang: lang
        })
        
        // Reload windows
        showLog('Reloading windows...')
        BrowserWindow.getAllWindows().forEach(win => {
          win.reload()
        })
      } else {
        event.reply('mt::language-changed', { 
          success: false,
          message: 'Translation failed'
        })
      }
    } catch (error) {
      showLog('Error: ' + error.message)
      showLog('Stack trace: ' + error.stack)
      event.reply('mt::language-changed', { 
        success: false,
        error: error.message || 'Unknown error'
      })
    }
    showLog('=== Language Change Request End ===')
  })
  
  showLog('IPC listeners setup completed')
}).catch(err => {
  console.error('Error during startup:', err)
}) 
