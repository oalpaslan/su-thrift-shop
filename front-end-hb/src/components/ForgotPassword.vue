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
    <v-container class="brown lighten-2">
      <v-layout>
        <v-flex xs12 sm6 offset-sm3>
          <v-card
            class="pa-md-4 mx-lg-auto text-center"
            color="white"
            width="500px"
            height="300px"
          >
            <v-container class="mt-10">
              <h2 class="text-center"><b>Recover your password</b></h2>
              <v-row>
                <v-col>
                  <v-text-field
                    label="Please enter your email"
                    clearable
                    name="Email"
                    v-model="email"
                    hide-details="auto"
                    :rules="emailRules"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-btn
                    @click="submit"
                    :class="{
                      'blue darken-4 white--text ': valid,
                      disabled: !valid,
                    }"
                    >Recover</v-btn
                  >
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
export default {
  name: "ForgotPassword",
  data() {
    return {
      email: "",
      emailRules: [(value) => !!value || "Required"],
    };
  },
};
</script>
<style scoped>
.ForgotPassword {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
