<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-187904986-1"></script>
<script>
window.dataLayer = window.dataLayer || [];
function gtag() {
  dataLayer.push(arguments);
}
gtag("js", new Date());

gtag("config", "UA-187904986-1");
</script>
<template>
  <div id="app">
    <v-app id="login">
      <v-container class="brown lighten-2">
        <v-layout>
          <v-flex xs12 sm6 offset-sm3>
            <v-card
              class="pa-md-4 mx-lg-auto"
              color="white"
              width="500px"
              height="500px"
            >
              <v-container class="text-center">
                <h2 class="text-center">
                  <b>Login {{ info }} Page </b>
                </h2>
                <v-form ref="form" v-model="valid" lazy-validation>
                  <v-row>
                    <v-col>
                      <v-text-field
                        v-model="email"
                        label="Email"
                        clearable
                        name="Email"
                        :rules="emailRules"
                        hide-details="auto"
                      />
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <v-text-field
                        v-model="password"
                        :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                        :rules="passwRules"
                        :type="show ? 'text' : 'password'"
                        name="Password"
                        label="Password"
                        clearable
                        @click:append="show = !show"
                      ></v-text-field
                    ></v-col>
                  </v-row>
                  <v-alert v-if="incorrectAuth" type="error" dismissible>
                    Incorrect username or password entered - please try again
                  </v-alert>
                  <v-row
                    ><v-col style="font-size: 14px" class="text-right"
                      ><a href="/forgot-pass">Forgot your password?</a></v-col
                    ></v-row
                  >
                  <v-row>
                    <v-col class="text-center">
                      <v-btn
                        @click="login"
                        color="blue darken-4 white--text"
                        :disabled="!valid"
                        :v-if="!incorrectAuth"
                        >Login</v-btn
                      >
                    </v-col>
                  </v-row>
                </v-form>
              </v-container>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-app>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
import { EventBus } from "../event-bus";
export default {
  name: "LogInPage",

  computed: mapState(["APIData"]),
  data() {
    return {
      show: false,
      password: "",
      email: "",
      isConfd: null,
      valid: true,
      info: null,
      incorrectAuth: false,

      emailRules: [
        (value) => !!value || "E-mail is required",
        (value) => /.+@.+\..+/.test(value) || "E-mail must be valid",
      ],
      passwRules: [(value) => !!value || "Required."],
    };
  },
  methods: {
    login() {
      this.$store
        .dispatch("userLogin", {
          email: this.email,
          password: this.password,
        })
        .then(() => {
          this.$store.state.uid = this.email;
          this.$router.push("HomePage");
        })
        .catch((err) => {
          this.incorrectAuth = true;
        });
    },
  },
};
</script>

<style scoped>
.LoginPage {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.btntw {
  background: url("../assets/twitter1.svg");
  background-size: contain;
}
.btnfb {
  background: url("../assets/facebook.svg");
  background-size: contain;
}
.btngp {
  background: url("../assets/google-plus.svg");
  background-size: contain;
}
h1,
h2 {
  font-weight: normal;
}

#button {
  text-align: center;
  margin-top: 20px;
}
</style>
