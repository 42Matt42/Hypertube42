<template>
  <v-container fluid class="background">
    <v-card width="80%" class="mx-auto mt-5">
      <br />
      <v-card-title class="pb-0">
        <h1>{{ $t('title') }}</h1>
      </v-card-title>
      <v-card-text class="mt-5">
        <v-form ref="signUpForm">
          <br />
          <v-text-field
            v-model="$v.email.$model"
            :error-messages="emailErrors"
            :label="$t('email')"
            @blur="$v.email.$touch()"
            class="ma-5"
            outlined
            clearable
            color="primary"
            type="text"
          />

          <v-text-field
            v-model="$v.username.$model"
            :error-messages="usernameErrors"
            :label="$t('username')"
            @blur="$v.username.$touch()"
            class="ma-5"
            outlined
            clearable
            color="primary"
            type="text"
          />

          <v-text-field
            v-model="$v.firstName.$model"
            :error-messages="firstNameErrors"
            :label="$t('firstName')"
            @blur="$v.firstName.$touch()"
            class="ma-5"
            outlined
            clearable
            color="primary"
            type="text"
          />

          <v-text-field
            v-model="$v.lastName.$model"
            :error-messages="lastNameErrors"
            :label="$t('lastName')"
            @blur="$v.lastName.$touch()"
            class="ma-5"
            outlined
            clearable
            color="primary"
            type="text"
          />

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

          <v-checkbox
            v-model="agreeToTerms"
            :label="$t('agree')"
            class="ma-5"
          />

          <v-btn
            class="ma-5"
            @click="validRegister()"
            :disabled="$v.$invalid || !agreeToTerms"
            x-large
            color="primary"
          >
            {{ $t('register') }}
          </v-btn>
        </v-form>
      </v-card-text>
      <br />
    </v-card>
  </v-container>
</template>

<script>
import {
  required,
  alpha,
  alphaNum,
  minLength,
  maxLength,
  email,
  helpers,
  sameAs,
} from 'vuelidate/lib/validators'
import { mapActions } from 'vuex'

const oneLower = helpers.regex('oneLower', /[a-z]+/)
const oneUpper = helpers.regex('oneUpper', /[A-Z]+/)
const oneDigit = helpers.regex('oneDigit', /[0-9]+/)

export default {
  data() {
    return {
      agreeToTerms: false,
      email: '',
      username: '',
      firstName: '',
      lastName: '',
      password: '',
      repeatpassword: '',
    }
  },
  methods: {
    ...mapActions('Registration', ['register']),
    // autofill() {
    //   ;(this.agreeToTerms = true),
    //     (this.$v.email.$model = 'chroniclesofselene@gmail.com'),
    //     (this.$v.username.$model = 'test9'),
    //     (this.$v.lastName.$model = 'Duoquadra'),
    //     (this.$v.password.$model = '1Qqwerty'),
    //     (this.$v.repeatpassword.$model = '1Qqwerty')(
    //       (this.$v.firstName.$model = 'Student')
    //     )
    // },
    validRegister() {
      const object = {
        email: this.$v.email.$model,
        username: this.$v.username.$model,
        firstName: this.$v.firstName.$model,
        lastName: this.$v.lastName.$model,
        password: this.$v.password.$model,
      }
      this.register(object)
      ;(this.$v.email.$model = ''),
        (this.$v.username.$model = ''),
        (this.$v.firstName.$model = ''),
        (this.$v.lastName.$model = ''),
        (this.$v.password.$model = '')
    },
  },
  computed: {
    emailErrors() {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.required && errors.push(this.$t('emailRule'))
      !this.$v.email.email && errors.push(this.$t('emailRule'))
      return errors
    },
    usernameErrors() {
      const errors = []
      if (!this.$v.username.$dirty) return errors
      !this.$v.username.required && errors.push(this.$t('usernameRuleRequired'))
      !this.$v.username.alphaNum && errors.push(this.$t('alphaNumRule'))
      !this.$v.username.minLength && errors.push(this.$t('usernameRuleMin'))
      !this.$v.username.maxLength && errors.push(this.$t('usernameRuleMax'))
      return errors
    },
    firstNameErrors() {
      const errors = []
      if (!this.$v.firstName.$dirty) return errors
      !this.$v.firstName.required && errors.push(this.$t('firstNameRule'))
      !this.$v.firstName.alpha && errors.push(this.$t('alphaRule'))
      !this.$v.firstName.minLength && errors.push(this.$t('nameRuleMin'))
      !this.$v.firstName.maxLength && errors.push(this.$t('nameRuleMax'))
      return errors
    },
    lastNameErrors() {
      const errors = []
      if (!this.$v.lastName.$dirty) return errors
      !this.$v.lastName.required && errors.push(this.$t('lastNameRule'))
      !this.$v.lastName.alpha && errors.push(this.$t('alphaRule'))
      !this.$v.lastName.minLength && errors.push(this.$t('nameRuleMin'))
      !this.$v.lastName.maxLength && errors.push(this.$t('nameRuleMax'))
      return errors
    },
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
    email: {
      email,
      required,
    },
    username: {
      required,
      alphaNum,
      minLength: minLength(4),
      maxLength: maxLength(15),
    },
    firstName: {
      required,
      alpha,
      minLength: minLength(2),
      maxLength: maxLength(15),
    },
    lastName: {
      required,
      alpha,
      minLength: minLength(2),
      maxLength: maxLength(15),
    },
    password: {
      required,
      alphaNum,
      minLength: minLength(8),
      maxLength: maxLength(42),
      oneLower,
      oneUpper,
      oneDigit,
    },
    repeatpassword: {
      sameAsPassword: sameAs('password'),
    },
  },
}
</script>

<style scoped></style>
<i18n>
{
  "en": {
    "title": "Registration",

    "alphaRule": "Must be alphabet characters [Abc...]",
    "alphaNumRule": "Must be alphanumeric characters [Abc123...]",
    
    "email": "Email address",
    "emailRule": "Email is required",
    
    "username": "Username",
    "usernameRule": "Username is required",
    "usernameRuleMin": "Username must be at least 4 characters long",
    "usernameRuleMax": "Username must be at most 15 characters long",
    "usernameRuleRequired": "Username is required",
    
    "firstName": "First name",
    "firstNameRule": "First Name is required",
    "nameRuleMin": "Must be at least 4 characters long",
    "nameRuleMax": "Must be at most 15 characters long",
    
    "lastName": "Last name",
    "lastNameRule": "Last Name is required",
    
    "password": "Password",
    "passwordRule": "Password is required",
    "passwordRuleMin": "Password must be at least 8 characters long",
    "passwordRuleMax": "Password must be at most 15 characters long",
    "repeatpassword": "Confirm Password",
    "repeatpasswordRule": "Both passwords should be identical",
    "lowerPasswordRule": "1 lowercase character minimum [abc...]",
    "upperPasswordRule": "1 uppercase character minimum [ABC...]",
    "digitPasswordRule": "1 digit minimum [123...]",
    
    "agree": "Agree to terms and conditions",
    "agreeRule": "You must agree to create an account",
    
    "register": "Register !",
    
    "autofill": "Test_42_AUTOFILL"
  },
  "fr": {
    "title": "Inscription",

    "alphaRule": "Caractères alphabétiques [Abc...] uniquement",
    "alphaNumRule": "Caractères alphanumérique [Abc123...] uniquement",
    
    "email": "Adresse email",
    "emailRule": "Un email est requis",
    
    "username": "Pseudo",
    "usernameRule": "Un pseudo est requis",
    "usernameRuleMin": "Le nom d'utilisateur doit avoir 4 caractères minimum",
    "usernameRuleMax": "Le nom d'utilisateur doit avoir 15 caractères maximum",
    "usernameRuleRequired": "Le nom d'utilisateur est requis",
    
    "firstName": "Prénom",
    "firstNameRule": "Prénom requis",
    "nameRuleMin": "2 caractères minimum",
    "nameRuleMax": "15 caractères maximum",
    
    "lastName": "Nom de famille",
    "lastNameRule": "Nom requis",
    
    "password": "Mot de passe",
    "passwordRule": "Un mot de passe est requis",
    "passwordRuleMin": "8 caractères minimum",
    "passwordRuleMax": "15 caractères max",
    "repeatpassword": "Confirmation du mot de passe",
    "repeatpasswordRule": "Les mots de passe doivent être identiques",
    "lowerPasswordRule": "1 minuscule minimum [abc...]",
    "upperPasswordRule": "1 majuscule minimum [ABC...]",
    "digitPasswordRule": "1 chiffre minimum [123...]",
    
    "agree": "Accepter les termes et conditions",
    "agreeRule": "Vous devez accepter les termes et conditions pour créer un compte",
    
    "register": "Enregistrer !",
    "autofill": "Test_42_AUTOFILL"
  }
}
</i18n>
