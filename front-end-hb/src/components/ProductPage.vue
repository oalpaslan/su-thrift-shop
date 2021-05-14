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
  <div>
    <div v-for="posts in APIData.results" :key="posts.id">
      <v-container v-if="getId().proId == posts.id">
        <div class="row">
          <div class="col-md-5 col-sm-5 col-xs-12">
            <v-carousel>
              <v-carousel-item :src="posts.imagePath"> </v-carousel-item>
            </v-carousel>
          </div>
          <div class="col-md-7 col-sm-7 col-xs-12">
            <div class="pl-6">
              <p class="display-1 mb-0">{{ posts.productName }}</p>
              <v-card-actions class="pa-0">
                <p class="headline font-weight-light pt-3">
                  {{ posts.price }}TL
                </p>
                <v-spacer></v-spacer>
                <span class="grey--text caption mb-0 pl-2">
                  ({{ rating }})
                </span>
                <v-rating
                  v-model="rating"
                  class=""
                  readonly
                  background-color="white"
                  color="yellow accent-4"
                  dense
                  size="20"
                  halfincrement
                ></v-rating>
                <span class="body-2 font-weight-thin"> REVIEWS</span>
              </v-card-actions>
              <p class="subtitle-1 font-weight-thin">
                {{ posts.shortDescription }}
              </p>
              <v-btn class="ma-2 white--text" color="green"
                ><v-icon>mdi-cart</v-icon>Add to Cart</v-btn
              >
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12 col-xs-12 col-md-12">
            <v-tabs>
              <v-tab>Description</v-tab>
              <v-tab>REVIEWS</v-tab>
              <v-tab-item>
                <p class="pt-10 subtitle-1 font-weight-thin">
                  {{ posts.longDescription }}
                </p>
              </v-tab-item>
              <v-tab-item>
                <v-list three-line="true" avatar="true">
                  <v-list-item-group v-model="item" color="primary">
                    <v-list-item
                      v-for="(item, i) in items"
                      :key="i"
                      inactive="true"
                    >
                      <v-list-item-avatar>
                        <v-img :src="item.avatar"></v-img>
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title
                          v-html="item.title"
                        ></v-list-item-title
                        ><v-rating
                          v-model="rating"
                          class=""
                          background-color="warning lighten-3"
                          color="warning"
                          dense
                        ></v-rating>
                        <v-list-item-subtitle
                          v-html="item.subtitle"
                        ></v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list-item-group>
                </v-list>
              </v-tab-item>
            </v-tabs>
          </div>
        </div>
      </v-container>
    </div>
  </div>
</template>
<script>
import { getAPI } from "../axios/axios-api";
export default {
  data: () => ({
    rating: 4.5,
    item: 1,
    APIData: [],
    id: 2,
    items: [
      {
        avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
        title: "Lorem ipsum dolor?",
        subtitle:
          "<span class='text--primary'>Ali Connors</span> &mdash; Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nisl tincidunt eget nullam non. Tincidunt arcu non sodales neque sodales ut etiam. Lectus arcu bibendum at varius vel pharetra. Morbi tristique senectus et netus et malesuada.\n" +
          "\n",
      },
    ],
  }),
  mounted() {
    getAPI
      .get("http://127.0.0.1:8000/productList/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer ${this.$store.state.accessToken}",
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
  watch: {
    search(value) {
      this.doSearch(value);
    },
  },
  methods: {
    getId() {
      return {
        proId: this.$route.params.Pid,
      };
    },
    doSearch(value) {
      getAPI
        .get("http://127.0.0.1:8000/productList/search=" + this.search)
        .then((response) => {
          this.APIData = response.data;
        })
        .catch((e) => console.log(e));
    },
  },
};
</script>
