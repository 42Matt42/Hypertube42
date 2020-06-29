import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import '@fortawesome/fontawesome-free/css/all.css'
// import duoquadra from '../components/duoquadra.vue'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    dark: true,
  },
  icons: {
    iconfont: 'fa',
    // values: {
    //   duoquadra: {
    //     component: duoquadra,
    //   },
    // },
  },
})
