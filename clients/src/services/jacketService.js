import axios from 'axios'

const URL = 'https://jackett.yolvhi.net/api/v2.0/indexers/all/results'
const API_KEY = 'd2va19dq6dbehhsy3at19dano368p6gr'

export default {
  getMovie(title) {
    title = encodeURI(title)
    return axios.get(
      `${URL}?apikey=${API_KEY}&Query=${title}&Category%5B%5D=2030&Category%5B%5D=2040&Category%5B%5D=2045&Tracker%5B%5D=rarbg&Tracker%5B%5D=yts`
    )
  },
}
//https://jackett.yolvhi.net/api/v2.0/indexers/all/results?apikey=d2va19dq6dbehhsy3at19dano368p6gr&Query=America&Category%5B%5D=2030&Category%5B%5D=2040&Category%5B%5D=2045&Tracker%5B%5D=rarbg&Tracker%5B%5D=yts
//https://jackett.yolvhi.net/api/v2.0/indexers/rarbg/results?apikey=d2va19dq6dbehhsy3at19dano368p6gr&Query={QUERY}&Category%5B%5D=2030&Category%5B%5D=2040&Category%5B%5D=2045
