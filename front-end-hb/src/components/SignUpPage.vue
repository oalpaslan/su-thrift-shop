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
  <div class="signup">
    <v-container class="brown lighten-2">
      <v-layout>
        <v-flex xs12 sm6 offset-sm3>
          <v-card
            class="pa-md-4 ma-5"
            color="white"
            width="500px"
            height="650px"
          >
            <v-container class="text-center">
              <h2 class="text-center"><b>Sign-Up Page</b></h2>
              <v-form ref="form" v-model="valid" lazy-validation>
                <v-row>
                  <v-col>
                    <v-text-field
                      v-model="username"
                      label="Username"
                      clearable
                      :rules="genRules"
                      hide-details="auto"
                    />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="fname"
                      label="First Name"
                      clearable
                      :rules="genRules"
                      hide-details="auto"
                    />
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="lname"
                      label="Last Name"
                      clearable
                      :rules="genRules"
                      hide-details="auto"
                    />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-text-field
                      v-model="email"
                      label="Email"
                      name="Email"
                      clearable
                      :rules="emailRules"
                      hide-details="auto"
                    />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-menu
                      ref="menu"
                      v-model="menu"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="date"
                          label="Date of Birth"
                          prepend-icon="mdi-calendar"
                          hint="You have to be at least 18."
                          readonly
                          :rules="genRules"
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        ref="picker"
                        v-model="date"
                        :max="maxDate()"
                        min="1930-01-01"
                        @change="save"
                      ></v-date-picker>
                    </v-menu>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="password"
                      label="Password"
                      :rules="passwRules"
                      :type="show ? 'text' : 'password'"
                      @click:append="show = !show"
                      clearable
                      counter
                    />
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="passwordc"
                      label="Re-enter password"
                      :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                      :rules="[passwcRules1()]"
                      :type="show ? 'text' : 'password'"
                      @click:append="show = !show"
                      clearable
                      counter
                    />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col class="text-center">
                    <v-btn
                      @click="validate"
                      class="blue darken-4 white--text"
                      :disabled="!valid"
                      >Sign-Up</v-btn
                    >
                  </v-col>
                </v-row>
              </v-form>
            </v-container>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { getAPI } from "../axios/axios-reg";
export default {
  name: "SignUpPage",
  data() {
    return {
      date: null,
      menu: false,
      show: false,
      isDisabled: false,
      valid: true,
      fname: "",
      lname: "",
      username: "",
      password: "",
      passwordc: "",
      email: "",
      APIData: [],
      genRules: [(value) => !!value || "Required"],
      userRules: [
        (value) => !!value || "Required",
        (value) => value.length >= 8 || "At least 8 characters.",
      ],
      emailRules: [
        (value) => !!value || "Required",
        (value) =>
          /.+@.+\..+/.test(value) || "Please enter a proper email address.",
      ],
      passwRules: [
        (value) => !!value || "Required",
        (value) => value.length >= 8 || "At least 8 characters.",
        (value) => /[A-Z]/.test(value) || "At least 1 uppercase letter",
        (value) => /[a-z]/.test(value) || "At least 1 lowercase letter",
        (value) => /[0-9]/.test(value) || "At least 1 number",
      ],
    };
  },
  methods: {
    save(date) {
      this.$refs.menu.save(date);
    },
    maxDate() {
      const date = new Date();
      date.setFullYear(date.getFullYear() - 18);
      return date.toISOString().substr(0, 10);
    },
    async validate() {
      this.$refs.form.validate();
      if (this.$refs.form.validate()) {
        const response = await getAPI
          .post("http://127.0.0.1:8000/authentication/register", {
            headers: {
              "Content-Type": "application/json",
            },
            email: this.email,
            username: this.username,
            first_name: this.fname,
            last_name: this.lname,
            date_of_birth: this.date,
            password: this.password,
          })
          .then(() => {
            this.$router.push = "Auth";
          })
          .catch((error) => {
            if (!error.response) {
              // network error
              this.errorStatus = "Error: Network Error";
            } else {
              this.errorStatus = error.response.data.message;
              console.log(error.response.status);
              console.log(error.response.headers);
            }
          });
      }
    },
  },
  computed: {
    passwcRules1() {
      return () => this.password === this.passwordc || "Password must match";
    },
  },
  watch: {
    menu(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = "YEAR"));
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.signup {
  text-align: center;
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
</style>
