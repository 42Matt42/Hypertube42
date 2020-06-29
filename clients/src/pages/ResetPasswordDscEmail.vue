<template>
  <v-container fluid class="background">
    <v-card width="80%" class="mx-auto mt-5">
      <v-card-title primary-title>
        <h1>{{ $t('title') }}</h1>
      </v-card-title>
      <v-card-text class="mt-5">
        <v-form @submit.prevent="">
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="email"
                  :error-messages="emailErrors"
                  :label="$t('email')"
                  @input="$v.email.$touch()"
                  @blur="$v.email.$touch()"
                  outlined
                  clearable
                  color="blue"
                  type="Email"
                />
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn
          @click="validDscNewPassword(email)"
          x-large
          color="blue"
          :disabled="$v.$invalid"
        >
          {{ $t('askResetPassword') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      email: '',
      emailToken: this.$route.params.resetemail,
      // valid: true,
    }
  },
  // props: {
  //   userInfo: {
  //     type: Object,
  //     required: true,
  //   },
  // },
  computed: {
    //   ...mapGetters({
    //     userProfile: 'App/storeUser',
    //   }),
    emailErrors() {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.required && errors.push(this.$t('emailRule'))
      !this.$v.email.email && errors.push(this.$t('emailRule'))
      return errors
    },
  },
  validations: {
    email: {
      email,
      required,
    },
  },
  methods: {
    ...mapActions('Email', ['sendResetPassLink']),
    validDscNewPassword(emailResetPassword) {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.sendResetPassLink(emailResetPassword)
      }
      this.email = ''
    },
  },
}
</script>

<style scoped></style>
<i18n>
{
  "en": {
    "title": "Forgot Password?",
    "email": "Email",
    "emailRule": "Email is required",
    "askResetPassword": "Ask for a password reset"
  },
  "fr": {
    "title": "Oubli de votre mot de passe?",
    "email": "Email",
    "emailRule": "Un email est requis",
    "askResetPassword": "Demandez une réinitialisation de mot de passe"
  }
}
</i18n>
