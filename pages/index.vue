<template>
  <v-main>
    <v-container>
      <v-row>
        <v-col>
          <v-card max-width="240" class="pa-2">
            <div class="text-center">
              <NuxtLogo />
            </div>
            <v-card-title class="justify-center" outlined>
              {{ name }}
            </v-card-title>
            <v-card-actions>
              <v-btn nuxt to="/" plain>Beranda</v-btn>
            </v-card-actions>
            <v-card-actions>
              <v-btn nuxt to="/itemList" plain>Daftar Barang</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col cols="12" md="9">
          <v-card class="pa-2">
            <v-card-title class="headline">
              Selamat Datang {{ name }}
            </v-card-title>
            <v-card-text>
              <p>Tetap semangat untuk bekerja untuk mencapai tujuan bersama</p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
export default {
  data() {
    return {
      name: "Masum Abdul Matin",
      profilepic: "",
    };
  },
};
</script>
