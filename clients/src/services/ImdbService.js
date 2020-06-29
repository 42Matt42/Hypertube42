import axios from 'axios'

const apiCLient = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  withCredentials: false, //default value
  timeout: 20000,
  headers: {
    Accept: 'application/json',
    'Content-type': 'application/json',
  },
})
export default {
  getMovies(page) {
    return apiCLient.get(
      `/discover/movie?api_key=7c32ac8203dada86f001cea872371ba3&page=${page}&sort_by=popularity.desc&primary_release_year=2017`
    )
  },
  getMovie(id) {
    return apiCLient.get(`/find/${id}?api_key=7c32ac8203dada86f001cea872371ba3`)
  },
  getMoviesSearch(findMovieField) {
    return apiCLient.get(
      `/search/movie?api_key=7c32ac8203dada86f001cea872371ba3&language=en-US&query=${findMovieField}&page=1`
    )
  },
}
