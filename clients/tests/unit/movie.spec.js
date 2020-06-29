import Movie from '../../src/pages/Movie.vue'
import { mount } from '@vue/test-utils'
import Vue from 'vue'
import Vuetify from 'vuetify'

Vue.use(Vuetify)

const validMovie = {
  id: 5,
  url: 'https://yts.mx/movie/100-bloody-acres-2012',
  imdb_code: 'tt2290065',
  title: '100 Bloody Acres',
  title_english: '100 Bloody Acres',
  title_long: '100 Bloody Acres (2012)',
  slug: '100-bloody-acres-2012',
  year: 2012,
  rating: 6,
  runtime: 91,
  genres: ['Action', 'Comedy', 'Horror'],
  download_count: 47405,
  like_count: 89,
  description_intro:
    "The use of dead car crash victims in the Morgan Brothers' \"Blood and Bone\" fertiliser has been a huge boon to business. But it's been months since their last find and an important new customer is waiting on a delivery. When Reg Morgan, the junior partner in the business, comes across three young people stranded on a remote country road, he sees a radical solution to their supply problems, and a way of finally gaining the respect of his bossy big brother, Lindsay. But things don't quite go to plan when Reg starts forming an attachment with one of their captives, Sophie. Reg must now make a decision: go through with the plan and finally win Lindsay's approval, or save the kids and destroy everything the brothers have worked for. They're not psycho killers... they're just small business operators.",
  description_full:
    "The use of dead car crash victims in the Morgan Brothers' \"Blood and Bone\" fertiliser has been a huge boon to business. But it's been months since their last find and an important new customer is waiting on a delivery. When Reg Morgan, the junior partner in the business, comes across three young people stranded on a remote country road, he sees a radical solution to their supply problems, and a way of finally gaining the respect of his bossy big brother, Lindsay. But things don't quite go to plan when Reg starts forming an attachment with one of their captives, Sophie. Reg must now make a decision: go through with the plan and finally win Lindsay's approval, or save the kids and destroy everything the brothers have worked for. They're not psycho killers... they're just small business operators.",
  yt_trailer_code: 'DQ36cx2KoCc',
  language: 'English',
  mpa_rating: '',
  background_image:
    'https://yts.mx/assets/images/movies/100_Bloody_Acres_2012/background.jpg',
  background_image_original:
    'https://yts.mx/assets/images/movies/100_Bloody_Acres_2012/background.jpg',
  small_cover_image:
    'https://yts.mx/assets/images/movies/100_Bloody_Acres_2012/small-cover.jpg',
  medium_cover_image:
    'https://yts.mx/assets/images/movies/100_Bloody_Acres_2012/medium-cover.jpg',
  large_cover_image:
    'https://yts.mx/assets/images/movies/100_Bloody_Acres_2012/large-cover.jpg',
  torrents: [
    {
      url:
        'https://yts.mx/torrent/download/1B1F3FD7D1D019BE38F71A9117FC7D3ED5F730C1',
      hash: '1B1F3FD7D1D019BE38F71A9117FC7D3ED5F730C1',
      quality: '720p',
      type: 'bluray',
      seeds: 6,
      peers: 1,
      size: '704.79 MB',
      size_bytes: 739025879,
      date_uploaded: '2015-10-31 19:26:32',
      date_uploaded_unix: 1446315992,
    },
    {
      url:
        'https://yts.mx/torrent/download/3D3C86813FA8EF5D9CE9F8D1659BF869EAEE7E89',
      hash: '3D3C86813FA8EF5D9CE9F8D1659BF869EAEE7E89',
      quality: '1080p',
      type: 'bluray',
      seeds: 4,
      peers: 7,
      size: '1.25 GB',
      size_bytes: 1342177280,
      date_uploaded: '2015-10-31 19:27:56',
      date_uploaded_unix: 1446316076,
    },
  ],
  date_uploaded: '2015-10-31 19:26:32',
  date_uploaded_unix: 1446315992,
}

describe('Movie Pages', () => {
  test('If an Movie Object is passed it display movie information', () => {
    const wrapper = mount(Movie, { Vuetify, propsData: { movie: validMovie } })
    expect(wrapper.mounted()).toBe(true)
  })

  test("If an Movie id isn't passed it should return an error page ", () => {
    const wrapper = mount(Movie, { Vuetify, propsData: { movie: validMovie } })
    expect(wrapper).toBe(true)
  })
})
