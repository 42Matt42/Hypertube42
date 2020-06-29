<template>
  <v-card>
    <v-card-title primary-title>
      <div class="headline">{{ $t('title') }}<br /><br /></div>
    </v-card-title>
    <v-container> {{ $t('emailActivation') }}<br /><br /> </v-container>
  </v-card>
</template>

<script>
export default {}
</script>

<style scoped></style>

<i18n>
{
  "en": {
    "title": "Email change confirmation",
    "error": "This link is invalid: already used or expired (10 min length)",
    "question": "Do you want a new link to activate your account ?",
    "emailActivation": "Your new email address was successfully activated !"
  },
  "fr": {
    "title": "Confirmation de changement d'email",
    "error": "Ce lien est expiré: déjà utilisé ou expiré (10 min de validité)",
    "question": "Voulez-vous un nouveau lien pour activer votre compte ?",
    "emailActivation": "Votre nouvel email a été activé !"
  }
}
</i18n>
