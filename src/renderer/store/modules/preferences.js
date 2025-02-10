import { ipcRenderer } from 'electron'

const state = {
  theme: 'light',
  autoSave: false,
  sideBarSave: false
  // 添加其他必要的初始状态...
}

const mutations = {
  SET_PREFERENCE (state, { key, value }) {
    if (key in state) { // 只更新已定义的状态
      state[key] = value
    }
  }
}

const actions = {
  SET_SINGLE_PREFERENCE ({ commit, state }, { key, value }) {
    if (key in state) { // 检查键是否有效
      commit('SET_PREFERENCE', { key, value })
      // 只发送已定义的状态变化
      ipcRenderer.send('broadcast-preferences-changed', { [key]: value })
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
