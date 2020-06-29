import emailService from '../../services/EmailService'
import router from '../../router/index'

const state = {
  messageToUser: '',
  checker: '',
  activationToken: '',
  emailToken: '',
  passwordToken: '',
}

// mutations
const mutations = {
  PUT_MESSAGE(state, message) {
    state.messageToUser = message
  },
  PUT_CHECKER(state, check) {
    state.checker = check
  },
  PUT_ACTIVATION_TOKEN: (state, accountToken) => {
    state.activationToken = accountToken
  },
  // PUT_ACTIVATION_TOKEN({ state }, activationToken) {
  //   state.activationToken = activationToken
  // },
  PUT_EMAIL_TOKEN: (state, emailToken) => {
    state.emailToken = emailToken
  },
  // PUT_EMAIL_TOKEN({ state }, emailToken) {
  //   state.emailToken = emailToken
  // },
  PUT_PASSWORD_TOKEN: (state, passwordToken) => {
    state.passwordToken = passwordToken
  },
}
// actions
const actions = {
  // Show a message on the user page
  setMessageToUser({ commit }, message) {
    commit('PUT_MESSAGE', message)
  },
  setChecker({ commit }, check) {
    commit('PUT_CHECKER', check)
  },
  resetChecker({ commit }) {
    commit('PUT_CHECKER', '')
  },

  // GET and save the account activation token
  setActivationToken({ commit }, activationToken) {
    commit('PUT_ACTIVATION_TOKEN', activationToken)
  },
  // New account activation with email validation
  getActivationToken({ getters, dispatch }) {
    emailService
      .getactivationtoken(getters.activationToken)
      .then(response => {
        if (response.status === 200) {
          dispatch('setChecker', 'OK')
          const notification = {
            type: 200,
            message: 'Your account was successfully activated !',
          }
          dispatch('Notifications/add', notification, { root: true })
        } else {
          router.push({
            name: 'home',
          })
        }
      })
      .catch(error => {
        if (error.response) {
          const notification = {
            type: error.response.status,
            message: error.response.data.error,
          }
          dispatch('Notifications/add', notification, { root: true })
          if (error.response.status === 403) {
            return
          }
          dispatch('Notifications/add', notification, { root: true })
          if (error.response.status === 404) {
            router.push({
              name: '404',
              params: { resource: 'Account link validation' },
            })
          }
          if (error.response.status === 500) {
            router.push({
              name: 'network-issue',
            })
          }
        }
        router.push({
          name: 'home',
        })
      })
  },
  // Replace account activation link with a new email
  // (replace the first token from registration)
  getActivationTokenAgain({ commit, dispatch }, activationEmail) {
    commit('PUT_ACTIVATION_TOKEN', '')
    emailService
      .putactivationtoken(activationEmail)
      .then(response => {
        if (response.status === 200) {
          const notification = {
            type: 200,
            message: 'Email received with a new activation link !',
          }
          dispatch('Notifications/add', notification, { root: true })
        } else {
          router.push({
            name: 'home',
          })
        }
      })
      .catch(error => {
        if (error.response) {
          const notification = {
            type: error.response.status,
            message: error.response.data.error,
          }
          dispatch('Notifications/add', notification, { root: true })
          if (error.response.status === 404) {
            router.push({
              name: '404',
              params: { resource: 'Send again an activation link' },
            })
          }
          if (error.response.status === 500) {
            router.push({
              name: 'network-issue',
            })
          }
        }
        router.push({
          name: 'home',
        })
      })
  },

  // Change email with new email address validation
  setEmailToken({ commit }, emailToken) {
    commit('PUT_EMAIL_TOKEN', emailToken)
  },
  getEmailToken({ getters, dispatch }) {
    emailService
      .getemailtoken(getters.emailToken)
      .then(response => {
        if (response.status === 200) {
          dispatch('setChecker', 'OK')
          const notification = {
            type: 200,
            message: 'Your email was successfully updated !',
          }
          dispatch('Notifications/add', notification, { root: true })
        } else {
          router.push({
            name: 'home',
          })
        }
      })
      .catch(error => {
        if (error.response) {
          const notification = {
            type: error.response.status,
            message: error.response.data.error,
          }
          dispatch('Notifications/add', notification, { root: true })
          if (error.response.status === 404) {
            router.push({
              name: '404',
              params: { resource: 'Account link validation' },
            })
          }
          if (error.response.status === 500) {
            router.push({
              name: 'network-issue',
            })
          }
        }
        router.push({
          name: 'home',
        })
      })
  },

  // Reset password while disconnected with a link sent to the user mailbox
  sendResetPassLink({ dispatch, commit }, emailResetPassword) {
    commit('PUT_PASSWORD_TOKEN', '')
    emailService
      .postresetpassword(emailResetPassword)
      .then(response => {
        if (response.status === 200) {
          const notification = {
            type: response.data.status,
            message: 'Email sent to you !',
          }
          dispatch('Notifications/add', notification, { root: true })
          router.push({
            name: 'home',
          })
        }
      })
      .catch(error => {
        if (error.response) {
          if (error.response.status === 404) {
            router.push({
              name: '404',
              params: { resource: 'Send email reset password link' },
            })
          } else if (error.response.status === 400) {
            const notification = {
              type: error.response.status,
              message: 'This email does not exist',
            }
            dispatch('Notifications/add', notification, { root: true })
            return
          }
        }
        router.push({
          name: 'home',
        })
      })
  },
  // Change email with new email address validation
  setPasswordToken({ commit }, passwordToken) {
    commit('PUT_PASSWORD_TOKEN', passwordToken)
  },
  // Valid password change in offline mode
  // (through a link sent by email leading to page/ResetPasswordDscValid.vue)
  putDscResetPassword({ dispatch }, { dscNewPassword }) {
    emailService
      .putdscresetpassword({ dscNewPassword })
      .then(response => {
        if (response.status === 200) {
          const notification = {
            type: response.data.status,
            message: 'Password updated successfully !',
          }
          dispatch('Notifications/add', notification, { root: true })
          router.push({
            name: 'home',
          })
        }
      })
      .catch(error => {
        if (error.response) {
          if (error.response.status === 404) {
            router.push({
              name: '404',
              params: { resource: 'Reset password link validation' },
            })
          }
          // else if (error.response.status === 400) {
          //   const notification = {
          //     type: error.response.status,
          //     message: 'The new password should be different than the previous one',
          //   }
          //   dispatch('Notifications/add', notification, { root: true })
          //   return
          // }
        }
        router.push({
          name: 'home',
        })
      })
  },
}

// getters
const getters = {
  storeMessageToUser(state) {
    return state.messageToUser
  },
  storeChecker(state) {
    return state.checker
  },
  activationToken(state) {
    return state.activationToken
    // const copyStr = Object.assign("", state.activationToken)
    // return copyStr
  },
  emailToken(state) {
    return state.emailToken
  },
  passwordToken(state) {
    return state.passwordToken
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
