<template>
  <v-app dark>
    <!-- Sidebar -->
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
      hide-overlay
      temporary
    >
      <v-list>
        <v-list-item v-if="$auth.loggedIn">
          <v-list-item-avatar>
            <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title v-text="username" />
          </v-list-item-content>
        </v-list-item>

        <div class="pa-2" v-else>
          <v-btn block dark color="orange" class="mb-1" to="/login">
            <v-icon left>mdi-lock</v-icon> Masuk
          </v-btn>
        </div>

        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <template v-slot:append v-if="$auth.loggedIn">
        <div class="pa-2">
          <v-btn block color="red" dark @click="$auth.logout()">
            <v-icon left>mdi-lock</v-icon>
            Logout
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <!-- Topnav -->
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon
        class="hidden-md-and-up"
        @click.stop="drawer = !drawer"
      />
      <v-toolbar-title v-text="title" style="margin-right: 20px" />
      <div class="hidden-sm-and-down">
        <v-list class="d-flex" style="background-color: rgba(255, 255, 255, 0);">
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
            :to="item.to"
            router
            exact
          >
            <v-list-item-content>
              <v-list-item-title v-text="item.title" />
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </div>
      <v-spacer />
      <div class="hidden-sm-and-down">
        <v-list-item v-if="$auth.loggedIn">
          <v-menu left bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on">
                <v-list-item-avatar>
                  <v-img
                    src="https://randomuser.me/api/portraits/men/78.jpg"
                  ></v-img>
                </v-list-item-avatar>
              </v-btn>
            </template>

            <v-list>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>
                    {{ $auth.user.email}}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>
                  <v-btn block dark @click="$auth.logout()">
                    <v-icon left>mdi-lock</v-icon>
                    Keluar
                  </v-btn>
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-list-item>
        <div class="pa-1 d-flex align-center" v-else>
          <v-btn to="/login" text large> Masuk </v-btn>
        </div>
      </div>
    </v-app-bar>

    <!-- Main -->
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer :absolute="fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      guest: true,
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: "mdi-apps",
          title: "Beranda",
          to: "/",
        },
        {
          icon: "mdi-chart-bubble",
          title: "Daftar Barang",
          to: "/itemList",
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "CyberArmyID Challenge",
      username: '',
      email: '',
      password: '',
      showPassword: false,
    };
  },

  methods: {
    login() {
      this.registerDialog = false
      this.loginDialog = true
    },

    submit() {
      const config = {
        data: {
          'email': this.email,
          'password': this.password
        }
      }

      this.guest = false
      this.closeDialog()
    },

    register() {
      this.loginDialog= false
      this.registerDialog = true
    },

    submitRegister() {
    this.guest = false
     this.closeDialog()
    },

    logout() {
      this.guest = true
    },

    closeDialog() {
      this.loginDialog = false
      this.registerDialog = false
    },
  },
};
</script>
<style>
.v-main {
  background-color: rgb(237, 238, 250);
}
</style>
