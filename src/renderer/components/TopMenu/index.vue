<template>
  <div class="top-menu">
    <el-menu mode="horizontal" :default-active="activeIndex" class="top-menu-bar">
      <el-submenu index="file">
        <template slot="title">{{ $t('menu.file.title') }}</template>
        <el-menu-item index="file.new" @click="handleCommand('file.new')">
          {{ $t('menu.file.new') }}
        </el-menu-item>
        <el-menu-item index="file.open" @click="handleCommand('file.open')">
          {{ $t('menu.file.open') }}
        </el-menu-item>
        <el-menu-item index="file.save" @click="handleCommand('file.save')">
          {{ $t('menu.file.save') }}
        </el-menu-item>
      </el-submenu>

      <el-submenu index="edit">
        <template slot="title">{{ $t('menu.edit.title') }}</template>
        <el-menu-item index="edit.undo" @click="handleCommand('edit.undo')">
          {{ $t('menu.edit.undo') }}
        </el-menu-item>
        <el-menu-item index="edit.redo" @click="handleCommand('edit.redo')">
          {{ $t('menu.edit.redo') }}
        </el-menu-item>
        <el-menu-item index="edit.cut" @click="handleCommand('edit.cut')">
          {{ $t('menu.edit.cut') }}
        </el-menu-item>
        <el-menu-item index="edit.copy" @click="handleCommand('edit.copy')">
          {{ $t('menu.edit.copy') }}
        </el-menu-item>
        <el-menu-item index="edit.paste" @click="handleCommand('edit.paste')">
          {{ $t('menu.edit.paste') }}
        </el-menu-item>
      </el-submenu>

      <el-submenu index="view">
        <template slot="title">{{ $t('menu.view.title') }}</template>
        <el-menu-item index="view.toggleSidebar" @click="handleCommand('view.toggleSidebar')">
          {{ $t('menu.view.toggleSidebar') }}
        </el-menu-item>
        <el-menu-item index="view.toggleFullscreen" @click="handleCommand('view.toggleFullscreen')">
          {{ $t('menu.view.toggleFullscreen') }}
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'TopMenu',
  data () {
    return {
      activeIndex: 'file'
    }
  },
  computed: {
    ...mapState('preferences', {
      currentLanguage: state => state.language || 'en',
      currentTheme: state => state.theme || 'light'
    })
  },
  watch: {
    currentLanguage: {
      immediate: true,
      handler (newLang) {
        this.$i18n.locale = newLang
        this.$nextTick(() => {
          this.$forceUpdate()
        })
      }
    }
  },
  methods: {
    ...mapActions('preferences', ['SET_SINGLE_PREFERENCE']),
    handleCommand (command) {
      this.$electron.ipcRenderer.send('menu-command', command)
    }
  }
}
</script>

<style>
.top-menu {
  border-bottom: 1px solid var(--border-color);
}

.top-menu-bar {
  background-color: var(--bg-color);
  border: none;
}

.el-menu--horizontal > .el-submenu .el-submenu__title {
  color: var(--text-color);
}

.el-menu--horizontal > .el-submenu:focus .el-submenu__title,
.el-menu--horizontal > .el-submenu:hover .el-submenu__title {
  color: var(--highlight-color);
}

.el-menu-item {
  color: var(--text-color);
}

.el-menu-item:hover {
  color: var(--highlight-color);
  background-color: var(--item-hover-bg-color);
}
</style>
