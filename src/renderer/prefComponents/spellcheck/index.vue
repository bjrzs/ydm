<template>
  <div class="spellcheck-preferences">
    <h4>{{ $t('spellcheck.title') }}</h4>
    <div class="spellcheck-settings">
      <div class="form-item">
        <label>{{ $t('spellcheck.enable') }}</label>
        <input type="checkbox" v-model="enableSpellcheck" @change="handleSpellcheckChange">
      </div>
      <div class="form-item" v-if="enableSpellcheck">
        <label>{{ $t('spellcheck.language') }}</label>
        <select v-model="selectedLanguage" @change="handleLanguageChange">
          <option value="en">English</option>
          <option value="zh-cn">简体中文</option>
        </select>
      </div>
      <div class="form-item" v-if="enableSpellcheck">
        <label>{{ $t('spellcheck.autoDetect') }}</label>
        <input type="checkbox" v-model="autoDetectLanguage" @change="handleAutoDetectChange">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SpellcheckPreferences',
  
  data () {
    return {
      enableSpellcheck: false,
      selectedLanguage: this.$i18n.locale,
      autoDetectLanguage: false
    }
  },

  created () {
    // Load initial settings from preferences
    const preferences = this.$store.state.preferences
    this.enableSpellcheck = preferences.enableSpellcheck || false
    this.selectedLanguage = preferences.spellcheckLanguage || 'en'
    this.autoDetectLanguage = preferences.autoDetectLanguage || false
  },

  methods: {
    handleSpellcheckChange () {
      this.$store.dispatch('preferences/setPreference', {
        key: 'enableSpellcheck',
        value: this.enableSpellcheck
      })
      ipcRenderer.send('mt::update-spellcheck', {
        enabled: this.enableSpellcheck
      })
    },

    handleLanguageChange () {
      const lang = this.selectedLanguage
      this.$store.dispatch('preferences/setSpellcheckLanguage', lang)
    },

    handleAutoDetectChange () {
      this.$store.dispatch('preferences/setPreference', {
        key: 'autoDetectLanguage',
        value: this.autoDetectLanguage
      })
      ipcRenderer.send('mt::update-spellcheck', {
        autoDetect: this.autoDetectLanguage
      })
    }
  }
}
</script>

<style scoped>
.spellcheck-preferences {
  padding: 20px;
}

.spellcheck-settings {
  margin-top: 20px;
}

.form-item {
  margin-bottom: 15px;
  display: flex;
  align-items: center;
}

.form-item label {
  width: 120px;
  margin-right: 10px;
}

select {
  padding: 5px;
  width: 200px;
}

input[type="checkbox"] {
  width: 16px;
  height: 16px;
}
</style>
