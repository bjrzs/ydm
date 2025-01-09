<template>
  <div class="pref-general">
    <h4>General</h4>
    <compound>
      <template #head>
        <h6 class="title">Auto Save:</h6>
      </template>
      <template #children>
        <bool
          description="Automatically save document changes"
          :bool="autoSave"
          :onChange="value => onSelectChange('autoSave', value)"
        ></bool>
        <range
          description="Delay following document edit before automatically saving"
          :value="autoSaveDelay"
          :min="1000"
          :max="10000"
          unit="ms"
          :step="100"
          :onChange="value => onSelectChange('autoSaveDelay', value)"
        ></range>
      </template>
    </compound>

    <compound>
      <template #head>
        <h6 class="title">Action on startup:</h6>
      </template>
      <template #children>
        <section class="startup-action-ctrl">
          <el-radio-group v-model="startUpAction">
            <el-radio label="folder" style="margin-bottom: 10px;">Open the default directory<span>: {{defaultDirectoryToOpen}}</span></el-radio>
            <el-button size="small" @click="selectDefaultDirectoryToOpen">Select Folder</el-button>
            <el-radio label="blank">Open a blank page</el-radio>
          </el-radio-group>
        </section>
      </template>
    </compound>

    <compound>
      <template #head>
        <h6 class="title">Misc:</h6>
      </template>
      <template #children>
        <cur-select
          description="User interface language"
          :value="language"
          :options="languageOptions"
          :onChange="value => onSelectChange('language', value)"
        ></cur-select>
      </template>
    </compound>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Compound from '../common/compound'
import Range from '../common/range'
import CurSelect from '../common/select'
import Bool from '../common/bool'
import Separator from '../common/separator'
import { isOsx } from '@/util'
import { ipcRenderer } from 'electron'
import log from 'electron-log'
import path from 'path'
import fs from 'fs'

import {
  titleBarStyleOptions,
  zoomOptions,
  fileSortByOptions,
  languageOptions
} from './config'

export default {
  components: {
    Compound,
    Bool,
    Range,
    CurSelect,
    Separator
  },
  data () {
    this.titleBarStyleOptions = titleBarStyleOptions
    this.zoomOptions = zoomOptions
    this.fileSortByOptions = fileSortByOptions
    this.languageOptions = languageOptions
    this.isOsx = isOsx
    return {}
  },
  computed: {
    ...mapState({
      autoSave: state => state.preferences.autoSave,
      autoSaveDelay: state => state.preferences.autoSaveDelay,
      titleBarStyle: state => state.preferences.titleBarStyle,
      defaultDirectoryToOpen: state => state.preferences.defaultDirectoryToOpen,
      openFilesInNewWindow: state => state.preferences.openFilesInNewWindow,
      openFolderInNewWindow: state => state.preferences.openFolderInNewWindow,
      zoom: state => state.preferences.zoom,
      hideScrollbar: state => state.preferences.hideScrollbar,
      wordWrapInToc: state => state.preferences.wordWrapInToc,
      fileSortBy: state => state.preferences.fileSortBy,
      language: state => state.preferences.language
    }),
    startUpAction: {
      get: function () {
        return this.$store.state.preferences.startUpAction
      },
      set: function (value) {
        const type = 'startUpAction'
        this.$store.dispatch('SET_SINGLE_PREFERENCE', { type, value })
      }
    }
  },
  methods: {
    onSelectChange (type, value) {
      this.$store.dispatch('SET_SINGLE_PREFERENCE', { type, value })
      if (type === 'language') {
        log.info('[Renderer] Switching language to:', value)
        console.log('[Renderer] Switching language to:', value)
        const resourcePath = path.join(process.cwd(), 'translate-resources')
        log.info('[Renderer] Resource path:', resourcePath)
        console.log('[Renderer] Resource path:', resourcePath)
        if (!fs.existsSync(resourcePath)) {
          const error = `Translation resources directory not found at: ${resourcePath}`
          log.error('[Renderer] ' + error)
          console.error('[Renderer] ' + error)
          window.alert(error)
          return
        }
        const mainLabelDict = path.join(resourcePath, `main_label_dict_${value}.txt`)
        const mainDict = path.join(resourcePath, `main_dict_${value}.txt`)
        const rendererDict = path.join(resourcePath, `renderer_dict_${value}.txt`)
        const missingFiles = []
        if (!fs.existsSync(mainLabelDict)) {
          missingFiles.push(`main_label_dict_${value}.txt`)
          log.error(`[Renderer] Missing file: ${mainLabelDict}`)
        }
        if (!fs.existsSync(mainDict)) {
          missingFiles.push(`main_dict_${value}.txt`)
          log.error(`[Renderer] Missing file: ${mainDict}`)
        }
        if (!fs.existsSync(rendererDict)) {
          missingFiles.push(`renderer_dict_${value}.txt`)
          log.error(`[Renderer] Missing file: ${rendererDict}`)
        }
        if (missingFiles.length > 0) {
          const error = `Missing translation files:\n${missingFiles.join('\n')}`
          log.error('[Renderer] ' + error)
          console.error('[Renderer] ' + error)
          window.alert(error)
          return
        }
        const emptyFiles = []
        const checkFileSize = (file) => {
          const stats = fs.statSync(file)
          if (stats.size === 0) {
            emptyFiles.push(path.basename(file))
            log.error(`[Renderer] Empty file: ${file}`)
          }
        }
        try {
          checkFileSize(mainLabelDict)
          checkFileSize(mainDict)
          checkFileSize(rendererDict)
          if (emptyFiles.length > 0) {
            const error = `Translation files are empty:\n${emptyFiles.join('\n')}`
            log.error('[Renderer] ' + error)
            console.error('[Renderer] ' + error)
            window.alert(error)
            return
          }
        } catch (err) {
          const error = `Error checking translation files: ${err.message}`
          log.error('[Renderer] ' + error)
          console.error('[Renderer] ' + error)
          window.alert(error)
          return
        }
        log.info('[Renderer] Sending language change request...')
        console.log('[Renderer] Language change request details:', {
          lang: value,
          resourcePath: resourcePath
        })
        ipcRenderer.send('mt::change-language', {
          lang: value,
          resourcePath: resourcePath
        })
        log.info('[Renderer] Language change request sent')
        console.log('[Renderer] Language change request sent')
      }
    },
    selectDefaultDirectoryToOpen () {
      this.$store.dispatch('SELECT_DEFAULT_DIRECTORY_TO_OPEN')
    }
  },
  mounted () {
    log.info('[Renderer] Component mounted')
    console.log('[Renderer] Component mounted')
    ipcRenderer.on('mt::language-changed', (event, data) => {
      log.info('[Renderer] Received response from main process:', data)
      console.log('[Renderer] Language change response details:', {
        success: data.success,
        error: data.error,
        data: data
      })
      if (data.success) {
        window.alert('Language switched successfully!')
      } else {
        const errorMsg = data.error || 'Unknown error'
        log.error('[Renderer] Language switch failed:', errorMsg)
        console.error('[Renderer] Language switch failed:', errorMsg)
        window.alert('Failed to switch language: ' + errorMsg)
      }
    })
  },
  beforeDestroy () {
    log.info('[Renderer] Component will be destroyed')
    console.log('[Renderer] Component will be destroyed')
    ipcRenderer.removeAllListeners('mt::language-changed')
  }
}
</script>

<style scoped>
.pref-general {
  & .startup-action-ctrl {
    font-size: 14px;
    user-select: none;
    color: var(--editorColor);
    & .el-button--small {
      margin-left: 25px;
    }
    & label {
      display: block;
      margin: 20px 0;
    }
  }
}
</style>
