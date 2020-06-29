<template>
  <div>
    <v-row>
      <v-col cols="2" class="hidden-xs-only">
        <h1>{{ $t('title') }}</h1>
      </v-col>
      <v-col>
        <v-row justify="end">
          <v-form @submit.prevent="findMovie()">
            <v-text-field
              v-model.trim.lazy="findMovieField"
              :append-icon-cb="() => {}"
              :label="$t('findMovieField')"
              append-icon="mdi-magnify"
              color="blue-grey lighten-3"
              outlined
              hide-details
              background-color="blue-grey darken-4"
              clearable
            />
          </v-form>
        </v-row>
      </v-col>
    </v-row>
    <br />
    <br />
    <v-row>
      <v-col cols="1" />
      <v-col cols="4">
        <v-row>
          <v-select
            v-model.lazy="orderSelected"
            :items="orderByList"
            :label="$t('orderby')"
            @change="updateMoviesList"
            outlined
          />
        </v-row>
      </v-col>
      <v-col cols="2" />
      <v-col cols="4">
        <v-row>
          <v-select
            v-model.lazy="filterSelected"
            :items="filterByList"
            :label="$t('filterby')"
            @change="updateMoviesList"
            outlined
          />
        </v-row>
      </v-col>
      <v-col cols="1" />
    </v-row>
    <v-row dense>
      <v-col v-for="movie in Movies.movies" :key="movie.id + Math.random()">
        <v-lazy
          v-model="isActive"
          :options="{
            threshold: 0.5,
          }"
          min-height="200"
          transition="fade-transition"
        >
          <MovieCard :movie="movie" :viewed="movie.view" />
        </v-lazy>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import MovieCard from '../components/MovieCard'
import store from '../store'
import { mapState } from 'vuex'
// import { mapGetters } from 'vuex'
// import { mapActions } from 'vuex'

function getPageMovies(routeTo, next) {
  const currentPage = parseInt(routeTo.query.page) || 1
  store
    .dispatch('Movies/fetchMovies', currentPage)
    .then(() => {
      routeTo.params.page = currentPage
      next()
    })
    .catch(error => {
      if (error.response.status === 404) {
        next({ name: '404', params: { resource: 'movie' } })
      }
      next({ name: 'network-issue' })
    })
}

export default {
  components: { MovieCard },
  data() {
    return {
      isActive: false,
      bottom: false,
      findMovieField: '',
      filterSelected: '',
      filterByList: ['', 'date_added', 'download_count', 'title', 'rating'],
      orderSelected: '',
      orderByList: ['', 'desc', 'asc'],
      pageData: this.page,
    }
  },
  props: {
    page: {
      type: Number,
      default: 1,
    },
  },
  beforeRouteEnter(routeTo, routeFrom, next) {
    getPageMovies(routeTo, next)
  },
  beforeRouteUpdate(routeTo, routeFrom, next) {
    getPageMovies(routeTo, next)
  },
  computed: {
    ...mapState(['Movies']),
    // ...mapActions('Movies', ['addMovies', 'filteredFetchMovies', 'filteredAddMovies']),
    // ...mapGetters({
    //   storeViews: 'Movies/views',
    // }),
  },
  created() {
    window.addEventListener('scroll', () => {
      this.bottom = this.bottomVisible()
    })
  },
  methods: {
    addMovies() {
      this.pageData += 1
      if (this.findMovieField !== '') {
        // store.dispatch('Movies/searchAddMovies', {
        //   page: this.pageData,
        //   findMovieField: this.findMovieField,
        // })
      } else if (this.filterSelected !== '' || this.orderSelected !== '') {
        store.dispatch('Movies/filteredAddMovies', {
          page: this.pageData,
          filter: this.filterSelected,
          order: this.orderSelected,
        })
      } else {
        store.dispatch('Movies/addMovies', { page: this.pageData })
      }
    },
    bottomVisible() {
      const scrollY = Math.round(window.scrollY)
      const visible = document.documentElement.clientHeight
      const pageHeight = document.documentElement.scrollHeight
      const bottomOfPage = visible + scrollY >= pageHeight
      return bottomOfPage || pageHeight < visible
    },
    updateMoviesList() {
      store.dispatch('Movies/filteredFetchMovies', {
        page: this.pageData,
        filter: this.filterSelected,
        order: this.orderSelected,
      })
    },
    findMovie() {
      store.dispatch('Movies/searchFetchMovies', {
        findMovieField: this.findMovieField,
      })
    },
  },
  watch: {
    bottom(bottom) {
      if (bottom) {
        this.addMovies()
      }
    },
  },
}
</script>

<style></style>

<i18n>
{
  "en": {
    "title": "Movies",
    "orderby": "Order by",
    "filterby": "Filter",
    "findMovieField": "Title, Actor, Director"
  },
  "fr": {
    "title": "Films",
    "orderby": "Trier",
    "filterby": "Filtrer",
    "findMovieField": "Titre, Acteur, Réalisateur"
  }
}
</i18n>
