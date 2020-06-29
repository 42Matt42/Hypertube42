<template>
  <v-container fluid class="background">
    <v-card width="80%" class="mx-auto mt-5">
      <br />
      <v-card-title class="pb-0">
        <h1>{{ $t('title') }}</h1>
      </v-card-title>
      <v-card-text class="mt-5">
        <v-form @submit.prevent="submit(username, password)">
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="username"
                  @input="$v.username.$touch()"
                  @blur="$v.username.$touch()"
                  @keyup.enter="submit(username, password)"
                  :error-messages="usernameErrors"
                  :label="$t('username')"
                  :counter="15"
                  outlined
                  clearable
                  color="blue"
                  type="text"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="password"
                  @input="$v.password.$touch()"
                  @blur="$v.password.$touch()"
                  @keyup.enter="submit(username, password)"
                  :error-messages="passwordErrors"
                  :label="$t('password')"
                  :counter="15"
                  outlined
                  clearable
                  color="blue"
                  type="Password"
                />
              </v-col>
            </v-row>
            <router-link :to="{ name: 'resetpassworddscemail' }">
              {{ $t('Reset password') }}<br /><br />
            </router-link>
            <router-link
              :to="{ name: 'register', params: { username: username } }"
            >
              {{ $t('New account') }}<br /><br />
            </router-link>
          </v-container>
        </v-form>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-container fluid>
          <v-btn
            @click="submit(username, password)"
            x-large
            color="blue"
            :disabled="$v.$invalid"
          >
            {{ $t('login') }} </v-btn
          >&nbsp;

          <v-btn :href="links.qd" x-large color="blue">
            <v-icon x-large>mdi-numeric-4-box</v-icon
            ><v-icon x-large>mdi-numeric-2-box</v-icon> </v-btn
          >&nbsp;

          <v-btn :href="links.github" x-large color="blue">
            <i class="fab fa-github fa-2x" /> </v-btn
          >&nbsp;

          <v-btn :href="links.facebook" x-large color="blue">
            <i class="fab fa-facebook fa-2x" />
          </v-btn>
        </v-container>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import {
  required,
  alphaNum,
  minLength,
  maxLength,
} from 'vuelidate/lib/validators'
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      username: '',
      password: '',
      token: '',
      links: {
        github: `https://github.com/login/oauth/authorize?client_id=d2c25f95cfaddbb9f2a7&redirect_uri=${process.env.VUE_APP_BACKEND_URL}oauth/gh`,
        qd: `https://api.intra.42.fr/oauth/authorize?client_id=a403255ef57b13e9a31155d4aa015ced40fab62d5617749dbf9f36f518fbee06&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Foauth%2F42&response_type=code`,
        facebook: `https://www.facebook.com/v6.0/dialog/oauth?client_id=1245062255689643&redirect_uri=${process.env.VUE_APP_BACKEND_URL}oauth/fb&response_type=code`,
      },
    }
  },
  methods: {
    ...mapActions('App', ['login']),
    submit(username, password) {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.login({ username, password })
      }
    },
  },
  computed: {
    usernameErrors() {
      const errors = []
      if (!this.$v.username.$dirty) return errors
      !this.$v.username.required && errors.push(this.$t('usernameRuleRequired'))
      !this.$v.username.alphaNum && errors.push(this.$t('alphaNumRule'))
      !this.$v.username.minLength && errors.push(this.$t('usernameRuleMin'))
      !this.$v.username.maxLength && errors.push(this.$t('usernameRuleMax'))
      return errors
    },
    passwordErrors() {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      !this.$v.password.required && errors.push(this.$t('passwordRule'))
      !this.$v.password.minLength && errors.push(this.$t('passwordRuleMin'))
      !this.$v.password.maxLength && errors.push(this.$t('passwordRuleMax'))
      return errors
    },
  },
  validations: {
    username: {
      required,
      alphaNum,
      minLength: minLength(4),
      maxLength: maxLength(15),
    },
    password: {
      required,
      alphaNum,
      minLength: minLength(8),
      maxLength: maxLength(42),
    },
  },
}
</script>

<style scoped></style>
<i18n>
{
  "en": {
    "title": "Login",

    "alphaNumRule": "Must be alphanumeric characters [Abc123...]",

    "username": "Username",
    "usernameRuleMin": "Username must be at least 4 characters long",
    "usernameRuleMax": "Username must be at most 15 characters long",
    "usernameRuleRequired": "Username is required",

    "password": "Password",
    "passwordRule": "Password is required",
    "passwordRuleMin": "Password must be at least 8 characters long",
    "passwordRuleMax": "Password must be at most 15 characters long",
    "Reset password": "Reset password",

    "New account": "New account",
    "login":"Log in"
  },
  "fr": {
    "title": "Connexion",

    "alphaNumRule": "Caractères alphanumérique [Abc123...] uniquement",

    "username": "Nom d'utilisateur",
    "usernameRuleMin": "Le nom d'utilisateur doit avoir 4 caractères minimum",
    "usernameRuleMax": "Le nom d'utilisateur doit avoir 15 caractères maximum",
    "usernameRuleRequired": "Le nom d'utilisateur est requis",

    "password": "Mot de passe",
    "passwordRule": "Un mot de passe est requis",
    "passwordRuleMin": "8 caractères minimum",
    "passwordRuleMax": "15 caractères max",
    "Reset password": "J'ai oublié mon mot de passe",

    "New account": "Créer un nouveau compte",
    "login":"Connexion"
  }
}
</i18n>
