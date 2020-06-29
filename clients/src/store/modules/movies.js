import movieService from '../../services/MovieService.js'
import userService from '../../services/UserService'
import streamService from '../../services/StreamService'
import router from '../../router/index'
import nProgress from 'nprogress'
import ImdbService from '../../services/ImdbService.js'

const state = {
  movies: [],
  movie: {},
  perPage: 10,
  page: 1,
  movieTotal: 0,
  comments: {},
  views: {},
  stream: {},
  formats: [],
  subtitles: {},
}

// mutations
const mutations = {
  FETCH_MOVIES(state, movies) {
    for (let i = 0; i < parseInt(movies.length); i++) {
      for (let j = 0; j < parseInt(state.views.length); j++) {
        if (movies[i].id == state.views[j].filmRef) {
          movies[i].view = true
        }
      }
    }
    state.movies = movies
  },
  ADD_MOVIES(state, movies) {
    state.movies = state.movies.concat(movies)
  },
  FETCH_MOVIE(state, movie) {
    state.movie = movie
  },
  SET_MOVIES_TOTAL(state, moviesTotal) {
    state.movieTotal = moviesTotal
  },
  PUT_COMMENTS(state, com) {
    state.comments = com
  },
  PUT_VIEWS(state, views) {
    // for (let i = 0; i < parseInt(views.length); i++) {
    //   for (let j = 0; j < parseInt(state.movies.length); j++) {
    //     if (state.movies[j].id === views[i].filmRef) {
    //       state.movies[j].view = true
    //     }
    //   }
    // }
    state.views = views
  },
  PUT_STREAM(state, stream) {
    state.stream = stream
  },
  PUT_STREAM_FORMAT(state, { format, indice }) {
    state.formats[indice] = format
  },
  PUT_SUBTITLES(state, { url, language }) {
    if (language === 'en') state.subtitles.en = url
    if (language === 'fr') state.subtitles.fr = url
  },
}
// actions
const actions = {
  // A) Movies API:
  // A.1.a) GET movies with standard search paramaters
  async fetchMovies({ commit, state }, page) {
    await movieService
      .getMovies(state.perPage, page)
      .then(response => {
        commit('FETCH_MOVIES', response.data.data.movies)
        commit('SET_MOVIES_TOTAL', parseInt(response.data.data.movie_count))
        response.data.data.movies
      })
      .catch(error => {
        if (error) {
          //
        }
      })
    ImdbService.getMovies(page)
      .then(response => {
        let movies = response.data.results
        for (const element of movies) {
          element.source = 'imdb'
          element.large_cover_image =
            'https://image.tmdb.org/t/p/w300_and_h450_bestv2' +
            element.poster_path
        }
        commit('ADD_MOVIES', movies.slice(5))
      })
      .catch(error => {
        if (error) {
          //
        }
      })
  },

  // A.1.b) Follow up action of 'fetchMovies' (1.a) to GET the next page of movies
  async addMovies({ commit, state }, { page }) {
    nProgress.start()
    await movieService
      .getMovies(state.perPage, page)
      .then(response => {
        response.data.data.movies.shift()
        commit('ADD_MOVIES', response.data.data.movies)
      })
      .catch(error => {
        if (error) {
          //
        }
      })
    await ImdbService.getMovies(page)
      .then(response => {
        let movies = response.data.results
        for (const element of movies) {
          element.source = 'imdb'
          element.large_cover_image =
            'https://image.tmdb.org/t/p/w300_and_h450_bestv2' +
            element.poster_path
        }
        commit('ADD_MOVIES', movies.slice(5))
      })
      .catch(error => {
        if (error) {
          //
        }
      })
    nProgress.done()
    return
  },
  // A.1.c) GET the specific movie details from the api
  fetchMovie({ commit }, id) {
    return movieService.getMovie(id).then(response => {
      commit('FETCH_MOVIE', response.data.data.movie)
      return response.data.data.movie
    })
  },

  // A.2.a) get movies with standard search paramaters
  filteredFetchMovies({ commit, state }, { page, filter, order }) {
    movieService
      .getMoviesFilterBy({ perPage: state.perPage, page, filter, order })
      .then(response => {
        commit('FETCH_MOVIES', response.data.data.movies)
        commit('SET_MOVIES_TOTAL', parseInt(response.data.data.movie_count))
        return response.data.data.movies
      })
      .catch(error => {
        if (error.message) {
          //
        }
      })
  },
  // A.2.b) Follow up action of 'filteredFetchMovies' (2.a) to GET the next page of movies
  // It is the equivalent to 'addMovies' (1.b) but filtered
  filteredAddMovies({ commit, state }, { page, filter, order }) {
    nProgress.start()
    return movieService
      .getMoviesFilterBy({ perPage: state.perPage, page, filter, order })
      .then(response => {
        commit('ADD_MOVIES', response.data.data.movies)
        nProgress.done()
        return response.data.data.movies
      })
  },

  // A.3.a) get movies with specific search paramaters
  async searchFetchMovies({ commit }, { findMovieField }) {
    await movieService
      .getMoviesSearch({ findMovieField })
      .then(response => {
        commit('FETCH_MOVIES', response.data.data.movies)
        commit('SET_MOVIES_TOTAL', parseInt(response.data.data.movie_count))
        return response.data.data.movies
      })
      .catch(error => {
        if (error.message) {
          //
        }
      })
    return await ImdbService.getMoviesSearch({ commit }, findMovieField)
      .then(response => {
        console.log(response.data)
        let movies = response.data.results
        for (const element of movies) {
          element.source = 'imdb'
          element.large_cover_image =
            'https://image.tmdb.org/t/p/w300_and_h450_bestv2' +
            element.poster_path
        }
        commit('ADD_MOVIES', movies.slice(5))
      })
      .catch(error => {
        if (error) {
          //
        }
      })
  },
  // A.3.b) Follow up action of 'searchFetchMovies' (3.a) to GET the next page of movies
  // It is the equivalent to 'addMovies' (1.b) but for a search
  // searchAddMovies({ commit, state }, { page, findMovieField }) {
  //   nProgress.start()
  //   return movieService
  //     .getMoviesSearch({ perPage: state.perPage, page, findMovieField })
  //     .then(response => {
  //       commit('ADD_MOVIES', response.data.data.movies)
  //       nProgress.done()
  //       return response.data.data.movies
  //     })
  // },

  // B) Comments:
  // B.1) POST movie comment
  sendComment: ({ dispatch }, { ref, text }) => {
    userService
      .postcomment({ ref, text })
      .then(response => {
        const notification = {
          type: response.data.status,
          message: 'Your comment was successfully sent !',
        }
        dispatch('Notifications/add', notification, { root: true })
        dispatch('getComments', ref)
        // router.push({
        //   name: 'movie',
        //   params: { id: ref || '' },
        // })
      })
      .catch(error => {
        const notification = {
          type: 'error',
          message: 'There was an issue while sending your comment',
        }
        if (error.response) {
          if (error.response.status === 404) {
            dispatch('Notifications/add', notification, {
              root: true,
            })
            router.push({
              name: '404',
              params: { resource: 'sending comment' },
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
  // B.2) GET movie comments
  getComments: ({ dispatch, commit }, ref) => {
    userService
      .getcomment(ref)
      .then(response => {
        commit('PUT_COMMENTS', response.data.comments)
        // const notification = {
        //   type: response.data.status,
        //   message: 'TEST ONLY_Comments loaded',
        // }
        // dispatch('Notifications/add', notification, { root: true })
      })
      .catch(error => {
        const notification = {
          type: 'error',
          message: 'There was an issue while loading comments',
        }
        if (error.response) {
          if (error.response.status === 404) {
            dispatch('Notifications/add', notification, {
              root: true,
            })
            router.push({
              name: '404',
              params: { resource: 'getting comments' },
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

  // C) Views:
  // C.1) POST movie view
  sendView: ({ dispatch }, filmRef) => {
    userService
      .postview(filmRef)
      .then(response => {
        const notification = {
          type: response.data.status,
          message: 'Movie viewed !',
        }
        dispatch('Notifications/add', notification, { root: true })
      })
      .catch(error => {
        const notification = {
          type: 'error',
          message: 'Error from Movie view',
        }
        if (error.response) {
          if (error.response.status === 404) {
            dispatch('Notifications/add', notification, {
              root: true,
            })
            router.push({ name: '404', params: { resource: 'new movie view' } })
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
  // C.2) GET movie views
  getViews: ({ dispatch, commit }) => {
    userService
      .getview()
      .then(response => {
        commit('PUT_VIEWS', response.data.views)
        // const notification = {
        //   type: response.data.status,
        //   message: 'TEST ONLY_Views loaded',
        // }
        // dispatch('Notifications/add', notification, { root: true })
      })
      .catch(error => {
        const notification = {
          type: 'error',
          message: 'There was an issue while loading views',
        }
        if (error.response) {
          if (error.response.status === 404) {
            dispatch('Notifications/add', notification, {
              root: true,
            })
            router.push({ name: '404', params: { resource: 'getting views' } })
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

  // D) Streaming:
  // D.1) GET video and sound stream
  getStream: ({ dispatch, commit }, { magnetHash, id }) => {
    streamService
      .getstream({ magnetHash, id })
      .then(response => {
        commit('PUT_STREAM', response.data)
        const notification = {
          type: response.data.status,
          message: 'Streaming...',
        }
        dispatch('Notifications/add', notification, { root: true })
      })
      .catch(error => {
        const notification = {
          type: 'error',
          message: 'There was an issue while loading the stream',
        }
        if (error.response) {
          if (error.response.status === 404) {
            dispatch('Notifications/add', notification, {
              root: true,
            })
            router.push({ name: '404', params: { resource: 'getting stream' } })
            // } else if (error.response.status === 403) {
            //   dispatch('Notifications/add', notification, {
            //     root: true,
            //   })
          }
        } else {
          dispatch('Notifications/add', notification, {
            root: true,
          })
        }
      })
  },
  // D.2) GET stream formats
  getStreamFormat: ({ dispatch, commit }, { magnetHash, id, indice }) => {
    streamService
      .getstreamformats({ magnetHash, id })
      .then(response => {
        commit('PUT_STREAM_FORMAT', {
          format: response.data.mimetype,
          indice: indice,
        })
        // const notification = {
        //   type: response.data.status,
        //   message: 'Stream format received',
        // }
        // dispatch('Notifications/add', notification, { root: true })
      })
      .catch(error => {
        const notification = {
          type: 'error',
          message: 'There was an issue detecting stream format',
        }
        if (error.response) {
          if (error.response.status === 404) {
            dispatch('Notifications/add', notification, {
              root: true,
            })
            router.push({ name: '404', params: { resource: 'getting stream' } })
            // } else if (error.response.status === 403) {
            //   dispatch('Notifications/add', notification, {
            //     root: true,
            //   })
          }
        } else {
          dispatch('Notifications/add', notification, {
            root: true,
          })
        }
      })
  },
  // D.3) GET subtitles
  getSubtitles: ({ dispatch, commit }, { imdbid, language }) => {
    userService
      .getsubs({ imdbid, language })
      .then(response => {
        commit('PUT_SUBTITLES', { url: response.data.file, language: language })
        // const notification = {
        //   type: response.data.status,
        //   message: 'Subtitles ready',
        // }
        // dispatch('Notifications/add', notification, { root: true })
      })
      .catch(error => {
        const notification = {
          type: 'error',
          message: 'No subtitles available',
        }
        if (error.response) {
          if (error.response.status === 404) {
            dispatch('Notifications/add', notification, {
              root: true,
            })
            router.push({ name: '404', params: { resource: 'getting stream' } })
            // } else if (error.response.status === 403) {
            //   dispatch('Notifications/add', notification, {
            //     root: true,
            //   })
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
  storeComments(state) {
    return state.comments
  },
  storeMovies: state => {
    return state.movies
  },
  storeMovieMeta: state => {
    return state.movie
  },
  storeFormats: state => {
    return state.formats
  },
  storeSubtitles: state => {
    return state.subtitles
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
