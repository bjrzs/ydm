<template>
  <div class="pref-menu">
    <div class="form-item">
      <label>{{ $t('menu.language') }}</label>
      <select v-model="selectedLanguage" @change="handleLanguageChange">
        <option value="en">English</option>
        <option value="zh-cn">简体中文</option>
      </select>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MenuPreferences',
  data () {
    return {
      selectedLanguage: this.$i18n.locale
    }
  },
  methods: {
    handleLanguageChange () {
      const lang = this.selectedLanguage
      this.$i18n.locale = lang
      this.$electron.ipcRenderer.send('mt::set-language', lang)
      this.$store.dispatch('preferences/setLanguage', lang)
    }
  }
}
</script>

<style scoped>
.pref-menu {
  padding: 20px;
}
.form-item {
  margin-bottom: 15px;
}
</style> 
