<template>
  <v-container fluid class="background">
    <v-card width="80%" class="mx-auto mt-5">
      <v-card-title primary-title>
        <div class="headline">
          {{ $t('title') }}
          <br />
        </div>
      </v-card-title>
      <v-container v-if="storeChecker === 'OK'">
        <v-card-title subtitle>
          {{ $t('accountCreationConfirmation') }}<br /><br />
          <br />
        </v-card-title>
      </v-container>
      <v-container v-else>
        <v-form>
          <v-row>
            <v-col cols="12">
              {{ $t('error') }}<br /><br />
              {{ $t('question') }}<br /><br />
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
          <v-btn
            @click="validActivationAccountAgain(email)"
            x-large
            color="blue"
            :disabled="$v.$invalid"
          >
            {{ $t('askActivationAccountAgain') }}
          </v-btn>
        </v-form>
      </v-container>
    </v-card>
  </v-container>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'
import { mapActions } from 'vuex'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      email: '',
    }
  },
  computed: {
    ...mapGetters({
      storeChecker: 'Email/storeChecker',
    }),
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
    ...mapActions('Email', ['getActivationTokenAgain']),
    validActivationAccountAgain(activationEmail) {
      if (!this.$v.$invalid) {
        this.getActivationTokenAgain(activationEmail)
      }
    },
  },
}
</script>

<style scoped></style>
<i18n>
{
  "en": {
    "title": "Account Validation",
    "error": "This link is invalid: already used or expired (10 min length)",
    "question": "Do you want a new link to activate your account ?",
    "email": "Email",
    "emailRule": "Email is required",
    "askActivationAccountAgain": "Resend link",
    "accountCreationConfirmation": "Your account was successfully activated !"
  },
  "fr": {
    "title": "Activation de votre compte",
    "error": "Ce lien est expiré: déjà utilisé ou expiré (10 min de validité)",
    "question": "Voulez-vous un nouveau lien pour activer votre compte ?",
    "email": "Email",
    "emailRule": "Email is required",
    "askActivationAccountAgain": "Valider",
    "accountCreationConfirmation": "Votre compte a été activé avec succès !"
  }
}
</i18n>
