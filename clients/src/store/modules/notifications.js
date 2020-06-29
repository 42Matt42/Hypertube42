const state = {
  notifications: [],
}
// getters
const getters = {}
// mutations
let nextId = 1
const mutations = {
  PUSH(state, notification) {
    state.notifications.push({ ...notification, id: nextId++ })
  },
  DELETE(state, notificationToRemove) {
    state.notifications = state.notifications.filter(
      notification => notification.id !== notificationToRemove.id
    )
  },
}
// actions
const actions = {
  add({ commit }, notification) {
    commit('PUSH', notification)
  },
  remove({ commit }, notificationToRemove) {
    commit('DELETE', notificationToRemove)
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
