import userService from '../../services/UserService'
import router from '../../router/index'

const state = {
  searchProfile: '',
  searchProfileData: {},
}

// mutations
const mutations = {
  // PUT_SEARCH_PROFILE({ state }, searchBox) {
  //   state.searchProfile = searchBox
  // },
  PUT_SEARCH_PROFILE: (state, searchBox) => {
    state.searchProfile = searchBox
  },
  PUT_SEARCH_PROFILE_DATA: (state, payload) => {
    state.searchProfileData = payload
  },
}
// actions
const actions = {
  putSearchProfile({ commit }, searchProfile) {
    commit('PUT_SEARCH_PROFILE', searchProfile)
  },
  getSearchProfile({ getters, dispatch, commit }) {
    const userSearched = getters.storeSearchProfile

    userService
      .searchProfile(userSearched)
      .then(response => {
        commit('PUT_SEARCH_PROFILE_DATA', response.data.user)
        const notification = {
          type: response.data.status,
          message: 'User profile found !',
        }
        dispatch('Notifications/add', notification, { root: true })
        router.push({
          name: 'profile',
          params: { profile: userSearched || '' },
        })
      })
      .catch(error => {
        const notification = {
          type: 'error',
          message: 'This user does not exist',
        }
        if (error.response) {
          if (error.response.status === 404) {
            dispatch('Notifications/add', notification, {
              root: true,
            })
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
      })
  },
}

// getters
const getters = {
  storeSearchProfile: state => {
    return state.searchProfile
  },
  storeSearchProfileData: state => {
    return state.searchProfileData
  },
  // storeSearchProfile(state) {
  //   const copyStr = Object.assign('', state.searchProfile)
  //   return copyStr
  // },
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
