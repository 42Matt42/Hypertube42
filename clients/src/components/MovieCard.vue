<template>
  <router-link
    class="movie-link"
    :to="{
      name: 'movie',
      params: { id: movie.id, src: movie.source, movie },
    }"
  >
    <v-card class="mx-auto" height="400px" width="300px">
      <v-img :src="movie.large_cover_image" height="400" contain>
        <v-card-actions>
          <v-icon
            v-if="viewed === true"
            class="blue--text text--lighten-5"
            large
            right
            color="blue-grey lighten-1"
            >mdi-check</v-icon
          >
        </v-card-actions>
        <v-list-item three-line>
          <v-list-item-content>
            <div class="overline mb-4"></div>
          </v-list-item-content>
        </v-list-item>
      </v-img>
    </v-card>
  </router-link>
</template>

<script>
export default {
  props: {
    movie: Object,
    viewed: Boolean,
  },
}
</script>
<style scoped>
.event-card {
  padding: 20px;
  margin-bottom: 24px;
  transition: all 0.2s linear;
  cursor: pointer;
}
.event-card:hover {
  transform: scale(1.01);
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2), 0 1px 15px 0 rgba(0, 0, 0, 0.19);
}
.event-card > .title {
  margin: 0;
}
.movie-link {
  color: black;
  text-decoration: none;
  font-weight: 100;
}
</style>
