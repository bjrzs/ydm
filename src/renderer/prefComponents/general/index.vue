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
        <h6 class="title">Window:</h6>
      </template>
      <template #children>
        <cur-select
          v-if="!isOsx"
          description="Title bar style"
          notes="Requires restart."
          :value="titleBarStyle"
          :options="titleBarStyleOptions"
          :onChange="value => onSelectChange('titleBarStyle', value)"
        ></cur-select>
        <bool
          description="Hide scrollbars"
          :bool="hideScrollbar"
          :onChange="value => onSelectChange('hideScrollbar', value)"
        ></bool>
        <bool
          description="Open files in new window"
          :bool="openFilesInNewWindow"
          :onChange="value => onSelectChange('openFilesInNewWindow', value)"
        ></bool>
        <bool
          description="Open folders in new window"
          :bool="openFolderInNewWindow"
          :onChange="value => onSelectChange('openFolderInNewWindow', value)"
        ></bool>
        <cur-select
          description="Zoom"
          :value="zoom"
          :options="zoomOptions"
          :onChange="value => onSelectChange('zoom', value)"
        ></cur-select>
      </template>
    </compound>

    <compound>
      <template #head>
        <h6 class="title">Sidebar:</h6>
      </template>
      <template #children>
        <bool
          description="Wrap text in table of contents"
          :bool="wordWrapInToc"
          :onChange="value => onSelectChange('wordWrapInToc', value)"
        ></bool>

        <!-- TODO: The description is very bad and the entry isn't used by the editor. -->
        <cur-select
          description="Sort field for files in open folders"
          :value="fileSortBy"
          :options="fileSortByOptions"
          :onChange="value => onSelectChange('fileSortBy', value)"
        ></cur-select>
      </template>
    </compound>

    <compound>
      <template #head>
        <h6 class="title">Action on startup:</h6>
      </template>
      <template #children>
        <section class="startup-action-ctrl">
          <el-radio-group v-model="startUpAction">
            <!--
              Hide "lastState" for now (#2064).
            <el-radio class="ag-underdevelop" label="lastState">Restore last editor session</el-radio>
            -->
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
        log.info('渲染进程: 正在切换语言到', value)
        console.log('渲染进程: 正在切换语言到', value)
        // 发送语言切换请求
        ipcRenderer.send('mt::change-language', {
          lang: value,
          resourcePath: 'M:/cm/ydm/translate-resources'
        })
        log.info('渲染进程: 已发送语言切换请求')
        console.log('渲染进程: 已发送语言切换请求')
      }
    },
    selectDefaultDirectoryToOpen () {
      this.$store.dispatch('SELECT_DEFAULT_DIRECTORY_TO_OPEN')
    }
  },
  mounted () {
    log.info('渲染进程: 组件已加载')
    console.log('渲染进程: 组件已加载')
    ipcRenderer.on('mt::language-changed', (event, data) => {
      log.info('渲染进程: 收到主进程响应', data)
      console.log('渲染进程: 收到主进程响应', data)
      if (data.success) {
        window.alert('语言切换成功！')
      } else {
        window.alert('语言切换失败：' + (data.error || '未知错误'))
      }
    })
  },
  beforeDestroy () {
    log.info('渲染进程: 组件即将销毁')
    console.log('渲染进程: 组件即将销毁')
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
