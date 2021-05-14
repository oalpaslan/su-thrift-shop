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
  <v-container grid-list-lg class="posts">
    <v-layout row>
      <v-flex xs12 class="text-xs-center display-1 font-weight-black my-5"
        >Available Items</v-flex
      >
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12 sm12 md4 v-for="posts in APIData.results" :key="posts.id">
        <v-card>
          <v-img :src="posts.imagePath" height="500px">
            <v-container fill-height fluid>
              <v-layout fill-height>
                <v-flex xs12 align-end flexbox> </v-flex>
              </v-layout>
            </v-container>
          </v-img>

          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">{{ posts.productName }}</h3>
              <h2 class="headline mb-0">Price: {{ posts.price }} TL</h2>
              <h1 class="headline mb-0">Category: {{ posts.category }}</h1>
              <div>
                {{ posts.shortDescription }}
              </div>
            </div>
          </v-card-title>
          <v-card-actions class="float-right">
            <span class="grey--text caption mb-0 pl-2"> ({{ rating }}) </span>
            <v-rating
              v-model="rating"
              background-color="white"
              color="yellow accent-4"
              dense
              half-increments
              size="18"
            ></v-rating>
          </v-card-actions>
          <v-card-actions>
            <v-btn class="white--text" block color="green" href="/cart"
              ><v-icon>mdi-cart</v-icon>Add to Cart</v-btn
            >
          </v-card-actions>
          <v-card-actions>
            <v-btn
              class="white--text"
              block
              color="green"
              @click="goToPage(posts.id)"
              >VIEW
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { getAPI } from "../../axios/axios-api";
export default {
  name: "HomePlans",
  data: () => ({
    rating: 4.3,
    APIData: [],
  }),
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
  methods: {
    goToPage(prodId) {
      let proId = prodId;
      this.$router.push({ name: "Product", params: { Pid: proId } });
    },
  },
};
</script>

<style scoped></style>
