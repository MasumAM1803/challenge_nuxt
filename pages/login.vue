<template>
  <v-container>
    <h1>MASUK</h1>

    <UserAuthForm buttonText="Masuk" :submitForm="loginUser" />
  </v-container>
</template>

<script>
import UserAuthForm from '@/components/UserAuthForm'

export default {
  components: {
    UserAuthForm
  },

  methods: {
    async loginUser(loginInfo) {
      try {
        const response =  this.$auth.loginWith("local", {
          data: {
            'email': loginInfo.email,
            'password': loginInfo.password
          }
        })
        // this.$router.replace("/")
        console.log(response)
      } catch (error) {
        console.log(error)
        alert('error')
      }
    }
  },
};
</script>
