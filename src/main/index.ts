import { ipcMain, app, BrowserWindow } from 'electron'
import { markTextAsarTranslate } from '../../marktext_asar_translate'
import path from 'path'

// 创建窗口时打开开发者工具
const openDevTools = (win) => {
  if (!win.webContents.isDevToolsOpened()) {
    win.webContents.openDevTools()
    // 发送测试消息到渲染进程
    setTimeout(() => {
      console.log('Sending test message to renderer...')
      win.webContents.send('mt::test-message', 'Hello from main process!')
    }, 2000)
  }
}

// 监听新窗口创建
app.on('browser-window-created', (event, win) => {
  console.log('New window created')
  openDevTools(win)
})

// 添加测试事件监听
ipcMain.on('mt::test-response', (event, message) => {
  console.log('Received test response from renderer:', message)
})

// 添加简单的测试消息监听
ipcMain.on('mt::test-hello', (event, message) => {
  console.log('Received test message:', message)
  // 回复消息
  event.reply('mt::test-hello-reply', 'Main process received: ' + message)
})

// Add language change handler
console.log('Setting up language change handler in main process')
ipcMain.on('mt::change-language', (event, { lang, resourcePath, dictFiles }) => {
  console.log('Main process received language change request:', { lang, resourcePath, dictFiles })
  
  try {
    // 使用绝对路径
    const appPath = 'M:/cm/ydm'
    console.log('App path:', appPath)
    
    // 检查文件是否存在
    const mainJsPath = path.join(appPath, 'dist/electron', 'main.js')
    const rendererJsPath = path.join(appPath, 'dist/electron', 'renderer.js')
    console.log('Checking files:', {
      mainJsPath,
      rendererJsPath
    })
    
    // Use the translation files
    console.log('Calling markTextAsarTranslate...')
    const success = markTextAsarTranslate(
      resourcePath,
      lang,
      mainJsPath,
      mainJsPath + '.translated',
      rendererJsPath,
      rendererJsPath + '.translated'
    )
    
    console.log('Translation result:', success)
    
    if (success) {
      console.log('Translation successful, notifying renderer process')
      // Notify renderer process
      event.reply('mt::language-changed', { success: true })
      // 重新加载所有窗口
      BrowserWindow.getAllWindows().forEach(win => {
        console.log('Reloading window...')
        win.reload()
        // 重新打开开发者工具
        setTimeout(() => {
          console.log('Reopening DevTools...')
          openDevTools(win)
        }, 1000)
      })
    } else {
      console.error('Translation failed')
      event.reply('mt::language-changed', { 
        success: false, 
        error: 'Failed to translate files' 
      })
    }
  } catch (error) {
    console.error('Error in language change handler:', error)
    event.reply('mt::language-changed', { 
      success: false, 
      error: error.message || 'Unknown error occurred' 
    })
  }
}) 
