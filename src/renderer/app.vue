<template>
  <div id="app">
    <TopMenu v-if="showTopMenu"/>
    <!-- 其他组件 -->
  </div>
</template>

<script>
import TopMenu from './components/TopMenu'
import { mapState } from 'vuex'
import { DEFAULT_STYLE } from './config'
import { addThemeStyle } from './util/theme'

export default {
  name: 'MarkText',
  components: {
    TopMenu
  },
  computed: {
    ...mapState('preferences', ['language']),
    showTopMenu () {
      return true
    }
  },
  created () {
    this.$nextTick(() => {
      const state = global.marktext.initialState || DEFAULT_STYLE
      addThemeStyle(state.theme)

      this.$store.dispatch('ASK_FOR_USER_PREFERENCE')

      this.$store.watch(
        state => state.preferences,
        (newPreferences) => {
          const userLanguage = newPreferences.language

          let menuLanguage = 'zh-cn'
          if (userLanguage && userLanguage.toLowerCase().startsWith('en')) {
            menuLanguage = 'en'
          }

          const { menu } = require('./menu')
          menu.init(menuLanguage)

          this.hideLoadingPage()
        },
        { immediate: false }
      )
    })
  }
}
</script>
