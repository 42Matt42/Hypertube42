import emailService from '../../services/EmailService.js'
import router from '../../router/index'

const state = {}

// getters
const getters = {}
// mutations
const mutations = {}
// actions
const actions = {
  register({ dispatch }, { username, email, firstName, lastName, password }) {
    emailService
      .register({ username, email, firstName, lastName, password })
      .then(response => {
        const notification = {
          type: response.data.status,
          message: 'Check your email !',
        }
        dispatch('Notifications/add', notification, { root: true })
        router.push({ name: 'home' })
      })
      .catch(error => {
        const notification = {
          type: 'error',
          message: 'Error on registration, please try again !',
        }
        if (error.response) {
          if (error.response.status === 404) {
            dispatch('Notifications/add', notification, {
              root: true,
            })
            router.push({ name: '404' })
          } else if (error.response.status === 403) {
            dispatch('Notifications/add', notification, {
              root: true,
            })
          }
        } else {
          dispatch('Notifications/add', notification, {
            root: true,
          })
        }
        router.push({ name: 'home' })
      })
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
