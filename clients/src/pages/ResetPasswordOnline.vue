<template>
  <v-container fluid class="background">
    <v-card width="80%" class="mx-auto mt-5">
      <v-card-title class="pb-0">
        <h1>{{ $t('title') }}</h1>
      </v-card-title>
      <v-card-text class="mt-5">
        <v-form @submit.prevent="">
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="$v.password.$model"
                  :error-messages="passwordErrors"
                  :label="$t('password')"
                  :counter="15"
                  @blur="$v.password.$touch()"
                  class="ma-5"
                  outlined
                  clearable
                  color="primary"
                  type="Password"
                />
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="$v.newpassword.$model"
                  :error-messages="newpasswordErrors"
                  :label="$t('newpassword')"
                  :counter="15"
                  @blur="$v.newpassword.$touch()"
                  class="ma-5"
                  outlined
                  clearable
                  color="primary"
                  type="Password"
                />
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="$v.repeatpassword.$model"
                  :error-messages="repeatpasswordErrors"
                  :label="$t('repeatpassword')"
                  :counter="15"
                  @blur="$v.repeatpassword.$touch()"
                  class="ma-5"
                  outlined
                  clearable
                  color="primary"
                  type="Password"
                />
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn
          @click="validOnlinenewpassword()"
          x-large
          color="blue"
          :disabled="$v.$invalid"
        >
          {{ $t('changePassword') }}
        </v-btn>
      </v-card-actions>
    </v-card>
    <br /><br /><br />
  </v-container>
</template>

<script>
import {
  required,
  alphaNum,
  minLength,
  maxLength,
  helpers,
  sameAs,
  not,
} from 'vuelidate/lib/validators'
import { mapActions } from 'vuex'
import { mapGetters } from 'vuex'

const oneLower = helpers.regex('oneLower', /[a-z]+/)
const oneUpper = helpers.regex('oneUpper', /[A-Z]+/)
const oneDigit = helpers.regex('oneDigit', /[0-9]+/)

export default {
  data() {
    return {
      password: '',
      newpassword: '',
      repeatpassword: '',
    }
  },
  // props: {
  //   userInfo: {
  //     type: Object,
  //     required: true,
  //   },
  // },
  computed: {
    ...mapGetters({
      storeUsername: 'App/storeUsername',
    }),
    passwordErrors() {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      !this.$v.password.required && errors.push(this.$t('passwordRule'))
      !this.$v.password.alphaNum && errors.push(this.$t('alphaNumRule'))
      !this.$v.password.minLength && errors.push(this.$t('passwordRuleMin'))
      !this.$v.password.maxLength && errors.push(this.$t('passwordRuleMax'))
      return errors
    },
    newpasswordErrors() {
      const errors = []
      if (!this.$v.newpassword.$dirty) return errors
      !this.$v.newpassword.required && errors.push(this.$t('passwordRule'))
      !this.$v.newpassword.sameAsOldPassword &&
        errors.push(this.$t('passwordChangeRule'))
      !this.$v.newpassword.alphaNum && errors.push(this.$t('alphaNumRule'))
      !this.$v.newpassword.oneLower && errors.push(this.$t('lowerPasswordRule'))
      !this.$v.newpassword.oneUpper && errors.push(this.$t('upperPasswordRule'))
      !this.$v.newpassword.oneDigit && errors.push(this.$t('digitPasswordRule'))
      !this.$v.newpassword.minLength && errors.push(this.$t('passwordRuleMin'))
      !this.$v.newpassword.maxLength && errors.push(this.$t('passwordRuleMax'))
      return errors
    },
    repeatpasswordErrors() {
      const errors = []
      if (!this.$v.repeatpassword.$dirty) return errors
      !this.$v.repeatpassword.sameAsPassword &&
        errors.push(this.$t('repeatpasswordRule'))
      return errors
    },
  },
  validations: {
    password: {
      required,
      alphaNum,
      minLength: minLength(8),
      maxLength: maxLength(42),
    },
    newpassword: {
      required,
      sameAsOldPassword: not(sameAs('password')),
      alphaNum,
      minLength: minLength(8),
      maxLength: maxLength(42),
      oneLower,
      oneUpper,
      oneDigit,
    },
    repeatpassword: {
      sameAsPassword: sameAs('newpassword'),
    },
  },
  methods: {
    ...mapActions('App', ['putOnlineNewPassword']),
    validOnlinenewpassword() {
      const onlineNewPassword = {
        password: this.$v.password.$model,
        new_password: this.$v.newpassword.$model,
        username: this.storeUsername,
      }
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.putOnlineNewPassword({ onlineNewPassword })
      }
    },
  },
}
</script>

<style scoped></style>
<i18n>
{
  "en": {
    "title": "Choose a new password",
    "username": "Username",
    "alphaNumRule": "Must be alphanumeric characters [Abc123...]",

    "password": "Password",
    "newpassword": "New Password",
    "passwordChangeRule": "The new password should be different from the previous one",
    "passwordRule": "Password required",
    "passwordRuleMin": "Password must be at least 8 characters long",
    "passwordRuleMax": "Password must be at most 15 characters long",
    "repeatpassword": "Confirm Password",
    "repeatpasswordRule": "Both passwords should be identical",
    "lowerPasswordRule": "1 lowercase character minimum [abc...]",
    "upperPasswordRule": "1 uppercase character minimum [ABC...]",
    "digitPasswordRule": "1 digit minimum [123...]",
    "newpassword": "New Password",
    "changePassword": "Valid my new password !"
  },
  "fr": {
    "title": "Nouveau mot de passe",
    "username": "Nom d'utilisateur",
    "alphaNumRule": "Caractères alphanumérique [Abc123...] uniquement",

    "password": "Mot de passe",
    "newpassword": "Nouveau Password",
    "passwordChangeRule": "Le nouveau mot de passe doit être différent de l'ancien",
    "passwordRule": "Un mot de passe est requis",
    "passwordRuleMin": "8 caractères minimum",
    "passwordRuleMax": "15 caractères max",
    "repeatpassword": "Confirmation du mot de passe",
    "repeatpasswordRule": "Les mots de passe doivent être identiques",
    "lowerPasswordRule": "1 minuscule minimum [abc...]",
    "upperPasswordRule": "1 majuscule minimum [ABC...]",
    "digitPasswordRule": "1 chiffre minimum [123...]",
    "newpassword": "Nouveau mot de passe",
    "changePassword": "Valider !"
  }
}
</i18n>
