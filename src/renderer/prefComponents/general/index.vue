<template>
  <div class="pref-general">
    <h4>{{ $t('menu.preferences.title') }}</h4>
    <compound>
      <template #head>
        <h6 class="title">{{ $t('menu.preferences.autoSave') }}:</h6>
      </template>
      <template #children>
        <bool
          :description="$t('menu.preferences.autoSaveDesc')"
          :bool="autoSave"
          :onChange="value => onSelectChange('autoSave', value)"
        ></bool>
        <range
          :description="$t('menu.preferences.autoSaveDelayDesc')"
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
        <h6 class="title">{{ $t('menu.preferences.startupAction') }}:</h6>
      </template>
      <template #children>
        <section class="startup-action-ctrl">
          <el-radio-group v-model="startUpAction">
            <el-radio label="folder" style="margin-bottom: 10px;">{{ $t('menu.preferences.openDefaultDir') }}<span>: {{defaultDirectoryToOpen}}</span></el-radio>
            <el-button size="small" @click="selectDefaultDirectoryToOpen">{{ $t('menu.preferences.selectFolder') }}</el-button>
            <el-radio label="blank">{{ $t('menu.preferences.openBlank') }}</el-radio>
          </el-radio-group>
        </section>
      </template>
    </compound>

    <compound>
      <template #head>
        <h6 class="title">{{ $t('menu.preferences.misc') }}:</h6>
      </template>
      <template #children>
        <cur-select
          :description="$t('menu.preferences.language')"
          :value="language"
          :options="languageOptions"
          :onChange="value => onSelectChange('language', value)"
        ></cur-select>
        <cur-select
          v-if="!isOsx"
          :description="$t('preferences.titleBarStyle')"
          :notes="$t('preferences.titleBarStyleDesc')"
          :value="titleBarStyle"
          :options="titleBarStyleOptions"
          :onChange="value => onSelectChange('titleBarStyle', value)"
        ></cur-select>
        <bool
          :title="$t('preferences.sideBarSave')"
          :desc="$t('preferences.sideBarSaveDesc')"
          :value="sideBarSave"
          @change="value => onSelectChange('sideBarSave', value)"
        />
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
import log from 'electron-log'
import {
  titleBarStyleOptions,
  zoomOptions,
  fileSortByOptions,
  languageOptions
} from './config'
import { changeLanguage } from '@/i18n'

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
      language: state => state.preferences.language,
      sideBarSave: state => state.preferences.sideBarSave
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
      console.log(`[Renderer] Changing ${type} to:`, value)
      this.$store.dispatch('SET_SINGLE_PREFERENCE', { type, value })
      if (type === 'language') {
        console.log('[Renderer] Current i18n locale:', this.$i18n.locale)
        console.log('[Renderer] Available translations:', Object.keys(this.$i18n.messages))
        changeLanguage(value)
      }
    },
    selectDefaultDirectoryToOpen () {
      this.$store.dispatch('SELECT_DEFAULT_DIRECTORY_TO_OPEN')
    }
  },
  mounted () {
    log.info('[Renderer] Component mounted')
    console.log('[Renderer] Component mounted')
  },
  beforeDestroy () {
    log.info('[Renderer] Component will be destroyed')
    console.log('[Renderer] Component will be destroyed')
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
