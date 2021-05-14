<template>
  <span class="posts">
    <v-navigation-drawer
      app
      v-model="drawer"
      class="brown lighten-2"
      dark
      disable-resize-watcher
    >
      <v-list>
        <template v-for="(item, index) in items">
          <v-list-item-title :key="index">
            <v-list-item-subtitle>
              {{ item.title }}
            </v-list-item-subtitle>
          </v-list-item-title>
          <v-divider :key="`divider-${index}`"></v-divider>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app color="brown darken-4" dark hide-on-scroll>
      <v-app-bar-nav-icon
        class="hidden-md-and-up"
        @click="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <v-spacer class="hidden-md-and-up"></v-spacer>
      <router-link to="/">
        <v-toolbar-title to="/">{{ appTitle }}</v-toolbar-title>
      </router-link>

      <v-spacer class="hidden-sm-and-down"></v-spacer>

      <v-text-field
        placeholder="Search"
        prepend-inner-icon="mdi-magnify"
        class="hidden-sm-and-down mt-6"
        filled
        dense
        v-model="search"
        @keyup.enter="search1"
      />
      <v-spacer class="hidden-sm-and-down"></v-spacer>

      <v-btn text class="hidden-sm-and-down" to="/">HOME</v-btn>
      <v-btn
        v-if="!this.$store.getters.loggedIn"
        text
        class="hidden-sm-and-down"
        to="/login-page"
        >LOGIN</v-btn
      >
      <v-btn
        v-if="!this.$store.getters.loggedIn"
        text
        class="hidden-sm-and-down"
        to="/signup-page"
        >Sign UP</v-btn
      >
      <v-btn text class="hidden-sm-and-down" to="/cart"
        ><v-icon>mdi-cart</v-icon>CART</v-btn
      >
      <v-btn text class="hidden-sm-and-down" to="/products"> PRODUCTS </v-btn>

      <v-btn
        v-if="this.$store.getters.loggedIn"
        text
        class="hidden-sm-and-down"
        to="/user/profile"
        >Profile</v-btn
      ><v-btn
        v-if="this.$store.getters.loggedIn"
        text
        class="hidden-sm-and-down"
        to="/logout"
        >Logout</v-btn
      >
    </v-app-bar>
  </span>
</template>
<script>
import { EventBus } from "../event-bus.js";
import { getAPI } from "../axios/axios-api.js";

export default {
  name: "Navbar",
  data() {
    return {
      appTitle: "SU-THRIFT STORE",
      drawer: false,
      value: null,
      items: [
        { title: "Home" },
        { title: "Login" },
        { title: "Sign Up" },
        { title: "Cart" },
        { title: "Profile" },
        { title: "Logout" },
      ],
      search: "",
      APIData: [],
      isLogged: null,
    };
  },
  created: {
    onLogin() {
      EventBus.$on("log", (loggedIn) => {
        this.$store.getters.loggedIn = loggedIn;
      });
    },
  },

  computed: {
    isLogged1() {
      this.isLogged = this.$store.getters.loggedIn;
      console.log(this.isLogged);
      return this.isLogged;
    },
  },
  methods: {
    search1() {
      this.$store.dispatch("search", { searched: this.search }).catch((err) => {
        console.log(err);
      });
    },
  },
};
</script>
<style scoped>
a {
  color: white;
  text-decoration: none;
}
</style>
