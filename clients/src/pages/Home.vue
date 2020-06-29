<template>
  <v-container fluid class="background"> </v-container>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      email: '',
    }
  },
}
</script>

<style scoped></style>

<i18n>
{
  "en": {
    "email": "Email address",
    "register": "Register now !"
  },
  "fr": {
    "email": "Adresse email",
    "register": "Je m'inscris !"
  }
}
</i18n>
