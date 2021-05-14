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
  <div class="posts">
    <v-card class="mx-auto" max-width="800" tile>
      <v-img
        max-height="300"
        src="http://source.unsplash.com/wV7UfVeI84w"
      ></v-img>
      <v-col cols="12">
        <v-avatar size="150" style="position: absolute; top: 230px">
          <v-img
            src="https://cdn.vuetifyjs.com/images/profiles/marcus.jpg"
          ></v-img>
        </v-avatar>
      </v-col>
      <v-btn absolute right rounded icon href="/user/profedit">
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
      <v-col sm="4" cols="12" class="mt-10">
        <v-flex xs12 sm12 md4>
          {{ APIDataU.results.email }}
          <v-list-item color="rgba(0, 0, 0, .4)">
            <v-list-item-content>
              <v-list-item-title class="title"> aaa</v-list-item-title>
              <v-list-item-subtitle>{{}}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-flex>
      </v-col>
      <v-divider />

      <v-tabs v-model="tab" background-color="transparent" grow>
        <v-tab v-for="item in items" :key="item">
          {{ item }}
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item v-model="info">
          <v-card flat>
            <v-card-text>{{ text }}</v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
            <v-card-text>{{ text }}</v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
            <v-card-text
              ><v-flex
                xs12
                sm12
                md4
                v-for="posts in APIDataP.results"
                :key="posts.id"
              >
                <!-- We can show the user's items with this v-if-->
                <v-card v-if="posts.id == 4">
                  <v-img :src="posts.imagePath" height="500px">
                    <v-container fill-height fluid>
                      <v-layout fill-height>
                        <v-flex xs12 align-end flexbox> </v-flex>
                      </v-layout>
                    </v-container>
                  </v-img>

                  <v-card-title primary-title>
                    <div v-if="posts.category == selected">
                      <h3 class="headline mb-0">{{ posts.productName }}</h3>
                      <h2 class="headline mb-0">Price: {{ posts.price }} TL</h2>
                      <h1 class="headline mb-0">
                        Category: {{ posts.category }}
                      </h1>
                      <div>
                        {{ posts.shortDescription }}
                      </div>
                    </div>
                  </v-card-title>
                  <v-card-actions class="float-right">
                    <span class="grey--text caption mb-0 pl-2">
                      ({{ rating }})
                    </span>
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
                    <v-btn class="white--text" block color="green"
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
              </v-flex></v-card-text
            >
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </div>
</template>

<script>
import axios from "axios";

let user = "http://127.0.0.1:8000/authentication/userList";
let product = "http://127.0.0.1:8000/productList/";

const userReq = axios.get(user);
const prodReq = axios.get(product);
export default {
  name: "Profile",
  data() {
    return {
      APIDataP: [],
      APIDataU: [],
      tab: null,
      name: "",
      selected: null,
      items: ["info", "on sale", "sold"],
      text:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      email: this.$store.state.uid,
    };
  },
  mounted() {
    axios
      .all(
        axios.get(product, {
          headers: {
            "Content-Type": "application/json",
          },
        }),
        axios.get(user, {
          headers: {
            "Content-Type": "application/json",
          },
        })
      )
      .then(
        axios.spread((product, user) => {
          this.APIDataP = product.data;
          this.APIDataU = user.data;
        })
      )
      .catch((error) => {
        if (!error.product || !error.user) {
          // network error
          this.errorStatus = "Error: Network Error";
        } else {
          this.errorStatus = error.product.data.message;
          this.errorStatus = error.user.data.message;
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.profile {
  font-size: 35px;
  color: red;
  text-align: center;
  position: relative;
  top: 30px;
  text-shadow: 2px 2px 2px gray;
}
</style>
