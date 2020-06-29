<template>
  <v-app>
    <v-app-bar hide-on-scroll color="secondary" app>
      <v-container fluid>
        <v-row align="center" justify="space-around">
          <v-col cols="md-auto lg-auto">
            <v-toolbar-title>
              <v-row justify="start">
                <v-btn
                  class="mx-5"
                  color="primary"
                  :label="$t('home')"
                  :to="{
                    name: 'home',
                  }"
                >
                  <v-icon class="blue--text text--lighten-5">
                    mdi-home
                  </v-icon>
                </v-btn>
              </v-row>
            </v-toolbar-title>
          </v-col>
          <v-col v-if="userApp.auth === true" cols="md-auto hidden-sm-and-down">
            <v-row align="center">
              <v-form @submit.prevent="keySearchUser()">
                <v-text-field
                  v-model.trim.lazy="searchProfile"
                  :append-icon-cb="() => {}"
                  :label="$t('search_box_label')"
                  append-icon="mdi-account-search"
                  color="light-blue lighten-5"
                  outlined
                  hide-details
                  background-color="blue"
                  clearable
                />
              </v-form>
            </v-row>
          </v-col>
          <v-col cols="md-auto 	hidden-sm-and-down">
            <v-btn
              v-if="userApp.auth === true"
              class="mx-5"
              color="primary"
              :label="$t('movies')"
              :to="{
                name: 'movies',
                params: { page: 1 },
              }"
            >
              <i class="fas fa-film fa-2x" />
            </v-btn>
            <v-btn
              v-if="userApp.auth === true"
              class="mx-5"
              color="primary"
              :label="$t('user')"
              :to="{
                name: 'user',
                params: { username: userApp.username || 'none' },
              }"
            >
              <i class="fas fa-cog fa-lg" />
            </v-btn>
            <v-btn
              v-show="userApp.auth === false"
              color="primary"
              class="mx-5"
              :to="{ name: 'register' }"
            >
              <div class="hidden-xs-only">
                {{ $t('register') }}
                &nbsp;
              </div>
              <v-icon class="blue--text text--lighten-5">
                mdi-content-save
              </v-icon>
            </v-btn>
            <v-btn
              @click="logout()"
              class="mx-5"
              color="primary"
              v-show="userApp.auth === true"
              :label="$t('sign out')"
              :to="{ name: 'home' }"
            >
              <v-icon class="blue--text text--lighten-5">
                mdi-power
              </v-icon>
            </v-btn>
            <v-btn
              color="primary"
              class="mx-5"
              v-show="userApp.auth === false"
              :to="{ name: 'login' }"
            >
              <div class="hidden-xs-only">
                {{ $t('sign in') }}
                &nbsp;
              </div>
              <v-icon class="blue--text text--lighten-5">
                mdi-login
              </v-icon>
            </v-btn>
            <v-avatar
              class="ma-5 hidden-xs-only"
              v-show="userApp.auth === true"
            >
              <img
                v-if="userApp.avatar"
                :src="`data:image/*;base64,${userApp.avatar}`"
              />
            </v-avatar>
          </v-col>
          <v-col cols="md-auto hidden-md-and-up">
            <v-row justify="end">
              <v-menu allow-overflow offset-y bottom>
                <template v-resize v-slot:activator="{ on }">
                  <v-btn color="primary" dark v-on="on">
                    Menu
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item v-if="userApp.auth === true">
                    <v-btn
                      class="mx-5"
                      color="primary"
                      :label="$t('movies')"
                      :to="{
                        name: 'movies',
                        params: { page: 1 },
                      }"
                    >
                      <i class="fas fa-film fa-2x" />
                    </v-btn>
                  </v-list-item>
                  <v-list-item v-if="userApp.auth === true">
                    <v-btn
                      class="mx-5"
                      color="primary"
                      :label="$t('user')"
                      :to="{
                        name: 'user',
                        params: { username: userApp.username || 'none' },
                      }"
                    >
                      <i class="fas fa-cog fa-lg" />
                    </v-btn>
                  </v-list-item>
                  <v-list-item v-show="userApp.auth === false">
                    <v-btn
                      color="primary"
                      class="mx-5"
                      :to="{ name: 'register' }"
                    >
                      <div class="hidden-xs-only">
                        {{ $t('register') }}
                        &nbsp;
                      </div>
                      <v-icon class="blue--text text--lighten-5">
                        mdi-content-save
                      </v-icon>
                    </v-btn>
                  </v-list-item>
                  <v-list-item v-show="userApp.auth === true">
                    <v-btn
                      @click="logout()"
                      class="mx-5"
                      color="primary"
                      :label="$t('sign out')"
                      :to="{ name: 'home' }"
                    >
                      <v-icon class="blue--text text--lighten-5">
                        mdi-power
                      </v-icon>
                    </v-btn>
                  </v-list-item>
                  <v-list-item v-show="userApp.auth === false">
                    <v-btn color="primary" class="mx-5" :to="{ name: 'login' }">
                      <div class="hidden-xs-only">
                        {{ $t('sign in') }}
                        &nbsp;
                      </div>
                      <v-icon class="blue--text text--lighten-5">
                        mdi-login
                      </v-icon>
                    </v-btn>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>

    <!-- Sizes your content based upon application components -->
    <v-content>
      <!-- Provides the application the proper gutter -->
      <v-container fluid class="fill-height">
        <v-row align="end" justify="center">
          <v-col cols="12">
            <router-view :key="$route.fullPath"></router-view>
          </v-col>
        </v-row>
      </v-container>
    </v-content>

    <v-footer app max-height="60px">
      <div>
        <v-select v-model="$root.$i18n.locale" :items="langs" />
      </div>
      <v-spacer></v-spacer>
      <NotificationContainer />
    </v-footer>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
// import { mapState, mapActions, mapGetters } from 'vuex'
import NotificationContainer from './components/NotificationContainer'
export default {
  name: 'App',
  components: { NotificationContainer },
  data: () => ({
    searchProfile: '',
  }),
  methods: {
    ...mapActions('Social', ['putSearchProfile', 'getSearchProfile']),
    ...mapActions('App', ['resetState']),
    logout() {
      if (this.storeDefaultPicture && this.isAuth) {
        this.resetState()
        this.$router.push({ name: 'home' })
      } else {
        this.resetState()
      }
    },
    keySearchUser() {
      this.putSearchProfile(this.searchProfile)
      this.getSearchProfile()
    },
  },
  computed: {
    // ...mapState(['searchProfile']),
    //   searchProfile: {
    // get() {
    //   return this.searchProfile
    // },
    // set() {
    //   this.$store.commit('PUT_SEARCH_PROFILE', "yoo")
    // }
    // get: function () {
    //   return this.searchProfile
    // },
    //   set: function() {
    //     this.searchProfile = "yoo"
    //   }
    // },
    ...mapGetters({
      userApp: 'App/storeUser',
      langs: 'App/storeLangs',
      appName: 'App/storeAppName',
      storeDefaultPicture: 'App/storeDefaultPicture',
      isAuth: 'App/isAuth',
    }),
    fullName: {
      // getter
      get: function() {
        return this.firstName + ' ' + this.lastName
      },
      // setter
      set: function(newValue) {
        var names = newValue.split(' ')
        this.firstName = names[0]
        this.lastName = names[names.length - 1]
      },
    },
  },
}
</script>

<style>
.center {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
</style>

<i18n>
{
  "en": {
    "home": "Home",
    "sign in": "Login",
    "user": "Settings",
    "register": "Register",
    "movies": "Movies",
    "sign out": "Log out",
    "search_box_label": "Check a profile"
  },
  "fr": {
    "home": "Accueil",
    "sign in": "Connexion",
    "user": "Paramètres",
    "register": "S'inscrire",
    "movies": "Films",
    "sign out": "Déconnexion",
    "search_box_label": "Consulter un profil"
  }
}
</i18n>
