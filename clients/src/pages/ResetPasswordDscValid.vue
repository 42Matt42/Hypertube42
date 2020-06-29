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
              <v-col>
                <v-text-field
                  v-model="password"
                  @blur="$v.password.$touch()"
                  :error-messages="passwordErrors"
                  :label="$t('password')"
                  :counter="15"
                  outlined
                  clearable
                  color="blue"
                  type="Password"
                  required
                />
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <v-text-field
                  v-model="repeatpassword"
                  @blur="$v.repeatpassword.$touch()"
                  :error-messages="repeatpasswordErrors"
                  :label="$t('repeatpassword')"
                  :counter="15"
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
          @click="validDscNewPassword(password)"
          x-large
          color="blue"
          :disabled="$v.$invalid"
        >
          {{ $t('changePassword') }}
        </v-btn>
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
  helpers,
  sameAs,
} from 'vuelidate/lib/validators'
// import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'

const oneLower = helpers.regex('oneLower', /[a-z]+/)
const oneUpper = helpers.regex('oneUpper', /[A-Z]+/)
const oneDigit = helpers.regex('oneDigit', /[0-9]+/)

export default {
  data() {
    return {
      passToken: this.$route.params.resetpassword,
      password: '',
      repeatpassword: '',
    }
  },
  computed: {
    passwordErrors() {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      !this.$v.password.required && errors.push(this.$t('passwordRule'))
      !this.$v.password.alphaNum && errors.push(this.$t('alphaNumRule'))
      !this.$v.password.oneLower && errors.push(this.$t('lowerPasswordRule'))
      !this.$v.password.oneUpper && errors.push(this.$t('upperPasswordRule'))
      !this.$v.password.oneDigit && errors.push(this.$t('digitPasswordRule'))
      !this.$v.password.minLength && errors.push(this.$t('passwordRuleMin'))
      !this.$v.password.maxLength && errors.push(this.$t('passwordRuleMax'))
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
      maxLength: maxLength(15),
      oneLower,
      oneUpper,
      oneDigit,
    },
    repeatpassword: {
      sameAsPassword: sameAs('password'),
    },
  },
  methods: {
    // message to myself, try to refacto by using prop in the routing rather than the store
    ...mapActions('Email', ['putDscResetPassword']),
    validDscNewPassword(password) {
      const dscNewPassword = {
        token: this.passToken,
        new_password: password,
      }
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.putDscResetPassword({ dscNewPassword })
      }
      this.password = ''
      this.repeatpassword = ''
    },
  },
}
</script>

<style scoped></style>
<i18n>
{
  "en": {
    "title": "You may choose a new password !",
    "username": "Username",
    "alphaNumRule": "Must be alphanumeric characters [Abc123...]",

    "password": "Password",
    "passwordRule": "Password is required",
    "passwordRuleMin": "Password must be at least 8 characters long",
    "passwordRuleMax": "Password must be at most 15 characters long",
    "repeatpassword": "Confirm Password",
    "repeatpasswordRule": "Both passwords should be identical",
    "lowerPasswordRule": "1 lowercase character minimum [abc...]",
    "upperPasswordRule": "1 uppercase character minimum [ABC...]",
    "digitPasswordRule": "1 digit minimum [123...]",
    "new_password": "New Password",
    "changePassword": "Valid new password !"
  },
  "fr": {
    "title": "Vous pouvez choisir un nouveau mot de passe !",
    "username": "Nom d'utilisateur",
    "alphaNumRule": "Caractères alphanumérique [Abc123...] uniquement",
    
    "password": "Mot de passe",
    "passwordRule": "Un mot de passe est requis",
    "passwordRuleMin": "8 caractères minimum",
    "passwordRuleMax": "15 caractères max",
    "repeatpassword": "Confirmation du mot de passe",
    "repeatpasswordRule": "Les mots de passe doivent être identiques",
    "lowerPasswordRule": "1 minuscule minimum [abc...]",
    "upperPasswordRule": "1 majuscule minimum [ABC...]",
    "digitPasswordRule": "1 chiffre minimum [123...]",
    "new_password": "Nouveau Mot de Passe",
    "changePassword": "Valider !"
  }
}
</i18n>
