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
  <v-container fluid fill-height class="home-hero" style="max-height: 100vh">
    <v-layout justify-center align-center column pa-5>
      <div class="display-4 font-weight-black white--text text-xs-center">
        Sabanci University
      </div>
      <div class="display-4 font-weight-black white--text text-xs-center mb-3">
        Thrift Store
      </div>
      <div class="display-1 font-weight-bold black--text text-xs-center">
        Finally buy and sell stuff at your own convenience.
      </div>
      <div class="display-1 font-weight-bold black--text text-xs-center mt-5">
        Look below to shop
      </div>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "HomeHero",
};
</script>

<style scoped>
.home-hero {
  background: url("http://source.unsplash.com/wV7UfVeI84w");
  background-size: cover;
  width: 100%;
  height: 100%;
}
</style>
