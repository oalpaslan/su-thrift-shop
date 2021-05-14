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
  <span>
    <home-hero></home-hero>
    <home-details></home-details>
  </span>
</template>

<script>
import HomeHero from "./Home/HomeHero.vue";
import HomeDetails from "./Home/HomeDetails.vue";
import { getAPI } from "../axios/axios-api";

export default {
  name: "HomePage",
  components: {
    HomeHero,
    HomeDetails,
  },
  mounted() {
    getAPI
      .get("http://127.0.0.1:8000/productList/", {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("Post API has received data");
        this.APIData = response.data;
      })
      .catch((error) => {
        if (!error.response) {
          // network error
          this.errorStatus = "Error: Network Error";
        } else {
          this.errorStatus = error.response.data.message;
        }
      });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.homepage {
  font-size: 35px;
  color: red;
  text-align: center;
  position: relative;
  top: 30px;
  text-shadow: 2px 2px 2px gray;
}
</style>
