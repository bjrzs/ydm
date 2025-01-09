import path from 'path'
import { ipcRenderer } from 'electron'
import log from 'electron-log'
import RendererPaths from './node/paths'

let exceptionLogger = s => console.error(s)

function configureLogger () {
  try {
    // 确保transports存在
    if (!log.transports) {
      log.transports = {}
    }
    // 确保file transport存在
    if (!log.transports.file) {
      log.transports.file = {}
    }
    // 确保console transport存在
    if (!log.transports.console) {
      log.transports.console = {}
    }
    // 设置日志级别
    log.transports.file.level = 'debug'
    log.transports.console.level = 'debug'

    // 设置日志文件路径
    const userDataPath = process.env.APPDATA || (process.platform === 'darwin' ? path.join(process.env.HOME, 'Library/Application Support') : path.join(process.env.HOME, '.config'))
    const logPath = path.join(userDataPath, 'MarkText', 'logs')
    
    // 确保日志目录存在
    try {
      require('fs').mkdirSync(logPath, { recursive: true })
    } catch (err) {
      console.error('创建日志目录失败:', err)
    }

    // 设置文件路径解析函数
    log.transports.file.resolvePathFn = () => {
      const logFile = path.join(logPath, 'renderer.log')
      console.log('日志文件路径:', logFile)
      return logFile
    }

    // 添加初始日志
    log.info('日志系统初始化完成')
    log.info('日志路径:', logPath)
  } catch (error) {
    console.error('配置日志时出错:', error)
  }
}

const parseUrlArgs = () => {
  const params = new URLSearchParams(window.location.search)
  const codeFontFamily = params.get('cff')
  const codeFontSize = params.get('cfs')
  const debug = params.get('debug') === '1'
  const hideScrollbar = params.get('hsb') === '1'
  const theme = params.get('theme')
  const titleBarStyle = params.get('tbs')
  const userDataPath = params.get('udp')
  const windowId = Number(params.get('wid'))
  const type = params.get('type')

  if (Number.isNaN(windowId)) {
    throw new Error('Error while parsing URL arguments: windowId!')
  }

  return {
    type,
    debug,
    userDataPath,
    windowId,
    initialState: {
      codeFontFamily,
      codeFontSize,
      hideScrollbar,
      theme,
      titleBarStyle
    }
  }
}

const bootstrapRenderer = () => {
  try {
    configureLogger()
    // Register renderer exception handler
    window.addEventListener('error', event => {
      if (event.error) {
        const { message, name, stack } = event.error
        const copy = {
          message,
          name,
          stack
        }

        exceptionLogger(event.error)

        // Pass exception to main process exception handler to show a error dialog.
        ipcRenderer.send('mt::handle-renderer-error', copy)
      } else {
        console.error(event)
      }
    })

    const {
      debug,
      initialState,
      userDataPath,
      windowId,
      type
    } = parseUrlArgs()
    const paths = new RendererPaths(userDataPath)
    const marktext = {
      initialState,
      env: {
        debug,
        paths,
        windowId,
        type
      },
      paths
    }
    global.marktext = marktext
  } catch (error) {
    console.error('初始化渲染进程时出错:', error)
  }
}

export default bootstrapRenderer
