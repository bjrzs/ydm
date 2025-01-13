import path from 'path'
import log from 'electron-log'
import RendererPaths from './node/paths'

// Improve error logging with more details
let exceptionLogger = error => {
  console.error('Error Details:')
  console.error('- Message:', error.message)
  console.error('- Name:', error.name)
  console.error('- Stack:', error.stack)
  if (log && log.error) {
    log.error(error)
  }
}

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
      // If we can't create log directory, disable file logging
      log.transports.file = null
      return false
    }

    // Use new resolvePathFn API instead of deprecated resolvePath
    log.transports.file.resolvePathFn = () => {
      const logFile = path.join(logPath, 'renderer.log')
      return logFile
    }

    // Add initial logs
    log.info('Log system initialization completed')
    log.info('Log path:', logPath)
    return true
  } catch (error) {
    console.error('Error configuring logger:', error)
    return false
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

  // Check required parameters
  if (!userDataPath) {
    throw new Error('Error while parsing URL arguments: userDataPath is required!')
  }
  if (Number.isNaN(windowId)) {
    throw new Error('Error while parsing URL arguments: windowId is invalid!')
  }
  if (!type) {
    throw new Error('Error while parsing URL arguments: type is required!')
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
    const loggerInitialized = configureLogger()
    if (!loggerInitialized) {
      console.warn('Logger initialization failed, continuing with console logging only')
    }

    // Register renderer exception handler
    window.addEventListener('error', event => {
      if (event.error) {
        exceptionLogger(event.error)
      } else {
        console.error('Unhandled error event:', event)
      }
    })

    // Register unhandled rejection handler
    window.addEventListener('unhandledrejection', event => {
      exceptionLogger(event.reason)
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
    exceptionLogger(error)
  }
}

export default bootstrapRenderer
