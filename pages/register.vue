<template>
  <v-container>
    <h1>DAFTAR</h1>

    <UserAuthForm buttonText="Daftar" :submitForm="registerUser" hasName=true />
  </v-container>
</template>

<script>
import UserAuthForm from '@/components/UserAuthForm'

export default {
  components: {
    UserAuthForm
  },

  methods: {
     registerUser(registerInfo) {
      try {
        this.$axios.post("/api/v2/auth/register", {
          name: registerInfo.name,
          email: registerInfo.email,
          password: registerInfo.password,
          photo_profile: registerInfo.photo
        });
        this.$auth.loginWith("local", {
          data: {
            'email': registerInfo.email,
            'password': registerInfo.password
          }
        });
        // this.$router.replace("/")
      } catch (err) {
        console.log(err);
      }
    }
  },
};
</script>
