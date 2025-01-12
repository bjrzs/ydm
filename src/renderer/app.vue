<template>
  <div id="app">
    <TopMenu v-if="showTopMenu"/>
    <!-- 其他组件 -->
  </div>
</template>

<script>
import TopMenu from './components/TopMenu'
import { mapState } from 'vuex'

export default {
  name: 'MarkText',
  components: {
    TopMenu
  },
  computed: {
    ...mapState('preferences', ['language']),
    showTopMenu() {
      // 根据需要控制顶部菜单的显示
      return true
    }
  }
}
</script> 
