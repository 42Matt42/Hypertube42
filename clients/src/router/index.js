import Vue from 'vue'
import VueRouter from 'vue-router'
import nprogress from 'nprogress'
import store from '../store/index'
import jacket from '../services/jacketService'

Vue.use(VueRouter)

let genres = {
  28: 'Action',
  12: 'Adventure',
  16: 'Animation',
  35: 'Comedy',
  80: 'Crime',
  99: 'Documentary',
  18: 'Drama',
  10751: 'Family',
  14: 'Fantasy',
  36: 'History',
  27: 'Horror',
  10402: 'Music',
  9648: 'Mystery',
  10749: 'Romance',
  878: 'Science Fiction',
  10770: 'TV Movie',
  53: 'Thriller',
  10752: 'War',
  37: 'Western',
}

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../pages/Home.vue'),
    beforeEnter(routeTo, routeFrom, next) {
      if (routeTo.query.code) {
        let code = routeTo.query.code
        store.dispatch('App/token', routeTo.query.code)
        store.commit('App/SET_AUTH', true)
        let info = code.split('.')
        let userInfo = JSON.parse(atob(info[1]))
        let exp = userInfo.exp
        // store.commit('App/PUT_USERNAME', userInfo.data.username)
        localStorage.setItem('hypertube', JSON.stringify({ code, exp }))
        store.commit(
          'App/RESET_LOCALSTORAGE_USERNAME',
          userInfo.data.username,
          userInfo.exp,
          routeTo.query.code
        )
        // store.dispatch('App/getUserAuth')
        store.dispatch('App/getUser', '')
      }
      if (routeFrom.name === 'home') {
        next(false)
      } else {
        next()
      }
    },
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../pages/Login.vue'),
    beforeEnter(routeTo, routeFrom, next) {
      if (store.getters['App/isAuth'] === true) {
        next({ name: 'home' })
      }
      next()
    },
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../pages/Registration.vue'),
    props: true,
  },
  {
    path: '/user/:username',
    name: 'user',
    component: () => import('../pages/User.vue'),
    props: true,
    meta: {
      requiresAuth: true,
    },
    // beforeEnter(routeTo, routeFrom, next) {
    //   store
    //     .dispatch('App/getUser', routeTo.params.username)
    //     .then(data => {
    //       routeTo.params.userInfo = data
    //       next()
    //     })
    //     .catch(error => {
    //       if (error.response.status === 404) {
    //         next({ name: '404', params: { resource: 'user' } })
    //       }
    //       next({ name: 'network-issue' })
    //     })
    // },
  },
  {
    path: '/profile/:profile',
    name: 'profile',
    component: () => import('../pages/Profile.vue'),
    props: true,
    meta: {
      requiresAuth: true,
    },
  },

  {
    path: '/movies',
    name: 'movies',
    component: () => import('../pages/Movies.vue'),
    props: true,
    meta: {
      requiresAuth: true,
    },
    beforeEnter(routeTo, routeFrom, next) {
      store.dispatch('Movies/getViews')
      next()
    },
  },
  {
    path: '/movie/:id',
    name: 'movie',
    component: () => import('../pages/Movie.vue'),
    props: true,
    meta: {
      requiresAuth: true,
    },
    async beforeEnter(routeTo, routeFrom, next) {
      let movie = routeTo.params.movie
      if (routeTo.params.src === 'imdb') {
        movie.torrents = []
        let torrents = await jacket
          .getMovie(movie.title)
          .then(data => data.data)
          .catch(error => {
            error
          })
        torrents.Results.forEach((element) => {
          movie.torrents.push({ hash: element.InfoHash, quality : 'link'})
        })
        if (movie.torrents.length > 5) {
          movie.torrents = movie.torrents.slice(0,4)
        }
        movie.rating = movie.vote_average
        movie.genres = []
        movie.year = movie.release_date.split('-')[0]
        movie.description_full = movie.overview
        movie.genre_ids.forEach(element => {
          movie.genres.push(genres[element])
        })
        routeTo.params.language = store.getters['App/storeLanguage']
        store.dispatch('Movies/getComments', routeTo.params.id)
        store.dispatch('Movies/getSubtitles', {
          imdbid: torrents.Results[0].Imdb,
          language: 'en',
        })
        store.dispatch('Movies/getSubtitles', {
          imdbid: torrents.Results[0].Imdb,
          language: 'fr',
        })
        next()
      } else {
        // store
        //   .dispatch('Movies/fetchMovie', routeTo.params.id)
        //   .then(movie => {
        if (parseInt(movie.id) === 0) {
          next({ name: '404', params: { resource: 'movie' } })
        }
        routeTo.params.movie = movie
        routeTo.params.language = store.getters['App/storeLanguage']
        store.dispatch('Movies/getComments', routeTo.params.id)

        // store.dispatch('Movies/sendView', routeTo.params.id)
        store.dispatch('Movies/getSubtitles', {
          imdbid: movie.imdb_code,
          language: 'en',
        })
        store.dispatch('Movies/getSubtitles', {
          imdbid: movie.imdb_code,
          language: 'fr',
        })
        for (let i = 0; i < parseInt(movie.torrents.length); i++) {
          store.dispatch('Movies/getStreamFormat', {
            magnetHash: movie.torrents[i].hash,
            id: movie.id,
            indice: i,
          })
        }

        // store.dispatch('Movies/sendView', routeTo.params.id)

        next()
        // })
        // .catch(error => {
        //   if (error.response) {
        //     if (error.response.status === 404) {
        //       next({ name: '404', params: { resource: 'movie' } })
        //     }
        //     next({ name: 'network-issue' })
        //   }
        // })
      }
    },
  },

  // Valid your new account by using the link in your mailbox:
  {
    path: '/signup/:signup',
    name: 'signup',
    component: () => import('../pages/Signup.vue'),
    beforeEnter(routeTo, routeFrom, next) {
      store.dispatch('Email/setActivationToken', routeTo.params.signup)
      store.dispatch('Email/getActivationToken')
      next()
    },
  },

  // Choose a profile picture on your first login (or until change):
  {
    path: '/setpicture',
    name: 'setpicture',
    component: () => import('../pages/SetPicture.vue'),
    meta: {
      requiresAuth: true,
    },
  },

  // Valid your email change by using the link in your mailbox:
  {
    path: '/resetemail/:resetemail',
    name: 'resetemail',
    component: () => import('../pages/Resetemail.vue'),
    props: true,
    beforeEnter(routeTo, routeFrom, next) {
      store.dispatch('Email/setEmailToken', routeTo.params.resetemail)
      store.dispatch('Email/getEmailToken')
      next()
    },
  },
  // Valid your password change online:
  {
    path: '/resetpasswordonline',
    name: 'resetpasswordonline',
    component: () => import('../pages/ResetPasswordOnline.vue'),
    meta: {
      requiresAuth: true,
    },
  },

  // Ask for a new password while disconnected,
  // the user receives a clikable link by email:
  {
    path: '/resetpassworddscemail',
    name: 'resetpassworddscemail',
    component: () => import('../pages/ResetPasswordDscEmail.vue'),
  },
  // should be closely followed by:
  //
  // Valid your password change while disconnected
  // by using the link in your mailbox:
  {
    path: '/resetpassworddscvalid/:resetpassword',
    name: 'resetpassworddscvalid',
    component: () => import('../pages/ResetPasswordDscValid.vue'),
    props: true,
    // beforeEnter(routeTo) {
    //   store.dispatch('Email/setPasswordToken', routeTo.params.resetpassword)
    // }
  },

  {
    // Always leave this as last one
    path: '/404',
    name: '404',
    component: () => import('../pages/404.vue'),
    props: true,
  },
  {
    // Always leave this as last one
    path: '/network-issue',
    name: 'network-issue',
    component: () => import('../pages/NetworkIssue.vue'),
    props: true,
  },
  {
    path: '*',
    redirect: { name: '404', params: { resource: 'page' } },
  },
]

const router = new VueRouter({
  mode: 'history',
  routes,
})

router.beforeEach((routeTo, routeFrom, next) => {
  nprogress.start()
  if (store.getters['Email/storeChecker'] === 'OK') {
    store.dispatch('Email/resetChecker')
  }
  if (routeTo.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters['App/isAuth']) {
      next()
    } else next({ name: 'login' })
  } else next()
})

router.afterEach(() => {
  nprogress.done()
})

// in test
router.onError(error => {
  store.dispatch('App/setError', error)
})

export default router
