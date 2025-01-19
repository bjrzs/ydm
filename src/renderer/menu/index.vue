<template>
  <div class="app-menu">
    <el-menu
      mode="horizontal"
      :default-active="activeIndex"
      @select="handleSelect"
      class="main-menu"
    >
      <template v-for="(menu, key) in menuConfig">
        <el-submenu :key="key" :index="key">
          <template slot="title">{{ $t(menu.label) }}</template>
          <template v-for="item in menu.submenu">
            <el-menu-item-group v-if="item.type !== 'separator'" :key="item.id">
              <el-menu-item :index="item.id">
                <span>{{ $t(item.label) }}</span>
                <span class="shortcut" v-if="item.shortcut">{{
                  item.shortcut
                }}</span>
              </el-menu-item>
            </el-menu-item-group>
            <el-divider v-else :key="'sep-' + key" />
          </template>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>

<script>
import { ipcRenderer } from 'electron'
import { mapState } from 'vuex'
import { menuConfig } from './config'

export default {
  name: 'AppMenu',
  data () {
    return {
      menuConfig,
      activeIndex: ''
    }
  },
  computed: {
    ...mapState({
      filename: state => state.editor.currentFile.filename,
      pathname: state => state.editor.currentFile.pathname,
      autoSave: state => state.preferences.autoSave,
      isModified: state => state.editor.currentFile.isSaved === false,
      theme: state => state.preferences.theme
    })
  },
  methods: {
    handleSelect (key) {
      switch (key) {
        // 文件菜单
        case 'newFile':
          ipcRenderer.send('mt::new-tab')
          break
        case 'newWindow':
          ipcRenderer.send('mt::new-window')
          break
        case 'open':
          ipcRenderer.send('mt::open-file')
          break
        case 'openFolder':
          ipcRenderer.send('mt::open-folder')
          break
        case 'save':
          if (!this.pathname) {
            ipcRenderer.send('mt::save-as')
          } else {
            ipcRenderer.send('mt::save-file')
          }
          break
        case 'saveAs':
          ipcRenderer.send('mt::save-as')
          break

        // 编辑菜单
        case 'undo':
          document.execCommand('undo')
          break
        case 'redo':
          document.execCommand('redo')
          break
        case 'cut':
          document.execCommand('cut')
          break
        case 'copy':
          document.execCommand('copy')
          break
        case 'paste':
          document.execCommand('paste')
          break

        // 段落菜单
        case 'heading1':
        case 'heading2':
        case 'heading3':
          ipcRenderer.send('mt::paragraph', key)
          break

        // 格式菜单
        case 'strong':
        case 'emphasis':
        case 'underline':
          ipcRenderer.send('mt::format', key)
          break

        // 视图菜单
        case 'sourceCode':
          ipcRenderer.send('mt::view-source-code')
          break
        case 'toggleSidebar':
          ipcRenderer.send('mt::toggle-sidebar')
          break

        // 主题菜单
        case 'light':
        case 'dark':
          this.$store.dispatch('SET_SINGLE_PREFERENCE', {
            type: 'theme',
            value: key
          })
          break

        // 帮助菜单
        case 'about':
          ipcRenderer.send('mt::about')
          break
        case 'checkUpdates':
          ipcRenderer.send('mt::check-updates')
          break
      }
    }
  },
  mounted () {
    // 监听主进程的菜单状态更新
    ipcRenderer.on('mt::update-menu', (e, { type, value }) => {
      switch (type) {
        case 'theme':
          this.$store.dispatch('SET_SINGLE_PREFERENCE', {
            type: 'theme',
            value
          })
          break
        // 可以添加其他状态更新处理
      }
    })
  },
  beforeDestroy () {
    ipcRenderer.removeAllListeners('mt::update-menu')
  }
}
</script>

<style>
.app-menu {
  -webkit-app-region: drag;
  background: var(--menuBarBgColor);
  border-bottom: 1px solid var(--menuBarBorderColor);
}

.main-menu {
  -webkit-app-region: no-drag;
  background: transparent;
  border-bottom: none;
  user-select: none;
}

.el-menu--horizontal > .el-submenu .el-submenu__title {
  height: 30px;
  line-height: 30px;
  color: var(--menuBarTextColor);
}

.el-menu--horizontal > .el-submenu:focus .el-submenu__title,
.el-menu--horizontal > .el-submenu:hover .el-submenu__title {
  color: var(--menuBarHoverTextColor);
}

.el-menu-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 32px;
  line-height: 32px;
  color: var(--menuBarTextColor);
}

.shortcut {
  margin-left: 20px;
  color: var(--menuBarShortcutColor);
  font-size: 12px;
}

.el-divider {
  margin: 4px 0;
}

/* 禁用菜单项的样式 */
.el-menu-item.is-disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
