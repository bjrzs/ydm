import path from 'path'
import { ipcRenderer } from 'electron'
import log from 'electron-log'
import RendererPaths from './node/paths'

let exceptionLogger = s => console.error(s)

function configureLogger () {
  try {
    // Ensure transports exist
    if (!log.transports) {
      log.transports = {}
    }
    // Ensure file transport exists
    if (!log.transports.file) {
      log.transports.file = {}
    }
    // Ensure console transport exists
    if (!log.transports.console) {
      log.transports.console = {}
    }
    // Set log levels
    log.transports.file.level = 'debug'
    log.transports.console.level = 'debug'

    // Set log file path
    const userDataPath = process.env.APPDATA || (process.platform === 'darwin' ? path.join(process.env.HOME, 'Library/Application Support') : path.join(process.env.HOME, '.config'))
    const logPath = path.join(userDataPath, 'MarkText', 'logs')

    // Ensure log directory exists
    try {
      require('fs').mkdirSync(logPath, { recursive: true })
    } catch (err) {
      console.error('Failed to create log directory:', err)
    }

    // Set file path resolver
    log.transports.file.resolvePathFn = () => {
      const logFile = path.join(logPath, 'renderer.log')
      console.log('Log file path:', logFile)
      return logFile
    }

    // Add initial logs
    log.info('Log system initialization completed')
    log.info('Log path:', logPath)
  } catch (error) {
    console.error('Error configuring logger:', error)
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
    console.error('Initializing renderer process failed:', error)
  }
}

export default bootstrapRenderer
