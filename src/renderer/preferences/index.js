import MenuPreferences from '../prefComponents/menu'
import SpellcheckPreferences from '../prefComponents/spellcheck'
import './style.css'

export default {
  name: 'Preferences',

  components: {
    MenuPreferences,
    SpellcheckPreferences
  },

  data() {
    return {
      activeTab: 'menu'
    }
  },

  created() {
    // Load initial preferences
    const preferences = this.$store.state.preferences
    this.activeTab = preferences.lastPreferencesTab || 'menu'

    // Listen for language changes
    this.$root.$on('language-changed', this.handleLanguageChange)
  },

  mounted() {
    // ... existing code ...
  },

  beforeDestroy() {
    this.$root.$off('language-changed', this.handleLanguageChange)
  },

  methods: {
    handleTabChange(tab) {
      this.activeTab = tab
      // Save last active tab
      this.$store.dispatch('preferences/setPreference', {
        key: 'lastPreferencesTab',
        value: tab
      })
    },

    handleLanguageChange() {
      // Force re-render of components
      this.$forceUpdate()
      this.$children.forEach(child => {
        if (child.$forceUpdate) {
          child.$forceUpdate()
        }
      })
    },

    updatePreferences() {
      // ... existing code ...
    }
  },

  template: `
    <div class="preferences-container">
      <div class="preferences-sidebar">
        <div 
          class="sidebar-item" 
          :class="{ active: activeTab === 'menu' }"
          @click="handleTabChange('menu')"
        >
          {{ $t('preferences.menu') }}
        </div>
        <div 
          class="sidebar-item" 
          :class="{ active: activeTab === 'spellcheck' }"
          @click="handleTabChange('spellcheck')"
        >
          {{ $t('preferences.spellcheck') }}
        </div>
      </div>
      <div class="preferences-content">
        <MenuPreferences v-if="activeTab === 'menu'" />
        <SpellcheckPreferences v-if="activeTab === 'spellcheck'" />
      </div>
    </div>
  `
} 
