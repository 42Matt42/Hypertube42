import Vue from 'vue'
import Vuex from 'vuex'
import App from './modules/app.js'
import Movies from './modules/movies.js'
import Notifications from './modules/notifications.js'
import Registration from './modules/registration'
import Social from './modules/social.js'
import Email from './modules/email.js'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: { App, Movies, Notifications, Registration, Social, Email },
})
