<template>
  <v-container fluid class="background">
    <v-card>
      <v-card-title primary-title>
        <div class="headline">
          <br />{{ $t('titlea') + userProfile.username + $t('title_b') }}
        </div>
      </v-card-title>
      <div>
        <div>
          <v-container>
            <v-row>
              <v-col cols="7">
                <v-card
                  :hover="true"
                  v-ripple="{ class: `blue--text` }"
                  color="deep-blue lighten-5"
                >
                  <v-img
                    aspect-ratio="2"
                    class="spacer blue lighten-2"
                    no-gutters
                  >
                    <v-row align="center" class="fill-height">
                      <v-col align="center" class="pa-0" cols="12">
                        <br />
                        <v-avatar class="profile indigo accent-4" size="164">
                          <v-img
                            :src="`data:image/*;base64,${userProfile.photo}`"
                          />
                        </v-avatar>
                        <v-card-subtitle>
                          <div>
                            <div
                              class="headline font-weight-bold blue--text text--accent-4"
                            >
                              {{ userProfile.username }}
                            </div>
                            <a
                              class="title font-italic blue--text text--accent-3"
                            >
                              {{ userProfile.firstName }}
                            </a>
                            <a
                              class="title font-italic blue--text text--accent-3"
                            >
                              {{ userProfile.lastName }}
                            </a>
                            <div class="title blue--text text--accent-3">
                              {{ $t('language') }} {{ userProfile.language }}
                            </div>
                          </div>
                        </v-card-subtitle>
                      </v-col>
                    </v-row>
                  </v-img>
                  <br /><br />
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </div>
      </div>
    </v-card>
  </v-container>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      target: this.$route.params.profile,
      // username: 'test_username',
      // password: 'test_password',
      // lastName: 'test_lastname',
      // firstName: 'test_firstname'
    }
  },
  computed: {
    ...mapGetters({
      userProfile: 'Social/storeSearchProfileData',
    }),
  },
}
</script>

<style scoped></style>
<i18n>
{
  "en": {
    "titlea": " ",
    "title_b": "’s profile",
    "username": "Username",
    "firstname": "First Name",
    "lastname": "Last Name",
    "language": "Language preference: "
  },
  "fr": {
    "titlea": "Profil de ",
    "title_b": " ",
    "username": "Nom d'utilisateur",
    "firstname": "Prénom",
    "lastname": "Nom",
    "language": "Langue préférée: "
  }
}
</i18n>
