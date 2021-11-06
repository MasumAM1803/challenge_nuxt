<template>
  <v-form v-model="valid">
    <v-text-field
      v-model="userInfo.name"
      label="Nama"
      :rules="[required('name')]"
      v-if="hasName" />
    <v-text-field
      v-model="userInfo.email"
      label="Email"
      :rules="[required('email'), emailFormat()]" />
    <v-text-field
      v-model="userInfo.password"
      label="Kata Sandi"
      :type="showPassword ? 'text' : 'password'"
      :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
      @click:append="showPassword = !showPassword"
      counter=true
      :rules="[required('password'), minLength('password', 8)]" />
    <v-file-input
      v-model="userInfo.photo"
      accept="image/*"
      label="Foto Profil"
      prepend-icon="mdi-camera"
      outlined
      dense
      v-if="hasName"/>

    <v-btn @click="submitForm(userInfo)" :disabled="!valid">{{ buttonText }}</v-btn>
    <v-btn to="/register" v-if="!hasName">Daftar</v-btn>
    <v-divider class="mx-1" vertical></v-divider>
    <span v-if="hasName">
      Sudah punya akun? <NuxtLink to="/login" class="link_page">Masuk</NuxtLink>
    </span>
  </v-form>
</template>

<script>
import validations from "@/utils/validations";

export default {
  data() {
    return {
      valid: false,
      showPassword: false,
      userInfo: {
        name: '',
        email: '',
        password: '',
        photo: null,
      },

      ...validations
    }
  },
  props: ["submitForm", "buttonText", "hasName"]
}
</script>

<style lang="scss" scoped>
  .link_page {
    cursor: pointer;
    color: blue;
    text-decoration: none
  }
</style>
