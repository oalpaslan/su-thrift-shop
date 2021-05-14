/* eslint-disable */

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
    <v-container>
      <p class="display-3 font-weight-light text-center pa-4">
        <v-icon size="70">mdi-cart</v-icon>SHOPPING CART
      </p>
      <v-row>
        <v-col :cols="12" md="9" sm="12">
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="">ITEM</th>
                  <th class="">PRICE</th>
                  <th class="">TOTAL</th>
                  <th class=""></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <v-list-item key="1">
                      <v-list-item-avatar>
                        <v-img
                          :src="require('../assets/img/shop/1.jpg')"
                        ></v-img>
                      </v-list-item-avatar>

                      <v-list-item-content>
                        <v-list-item-title>T-shirt Alpha</v-list-item-title>
                        <v-list-item-subtitle>T-shirt</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </td>
                  <td>20.00TL</td>
                  <td>20.00TL</td>
                  <td><a>X</a></td>
                </tr>
                <tr>
                  <td>
                    <v-list-item key="1">
                      <v-list-item-avatar>
                        <v-img
                          :src="require('../assets/img/shop/2.jpg')"
                        ></v-img>
                      </v-list-item-avatar>

                      <v-list-item-content>
                        <v-list-item-title>T-shirt Beta</v-list-item-title>
                        <v-list-item-subtitle>T-shirt</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </td>
                  <td>15.00TL</td>
                  <td>15.00TL</td>
                  <td><a>X</a></td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-col>
        <v-col :cols="12" md="3" sm="12">
          <p class="headline">Order Summary</p>
          <p class="overline">
            Shipping and additional costs are calculated based on values you
            have entered.
          </p>
          <v-simple-table>
            <template v-slot:default>
              <tbody>
                <tr>
                  <td>Order Subtotal</td>
                  <td class="text-right" style="width: 50px">35.00TL</td>
                </tr>
                <tr>
                  <td>Shipping Charges</td>
                  <td class="text-right" style="width: 50px">10.00TL</td>
                </tr>
                <tr>
                  <td>Tax</td>
                  <td class="text-right" style="width: 50px">5.00TL</td>
                </tr>
                <tr>
                  <td>Total</td>
                  <td class="text-right" style="width: 50px"><b>50.00TL</b></td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
          <div class="text-center">
            <v-btn
              outlined
              block
              color="green"
              class="white--text mt-5"
              href="/confirmation"
              >PAY</v-btn
            >
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  data: () => ({
    rating: 4.5,
    breadcrums: [
      {
        text: "Home",
        disabled: false,
        href: "breadcrumbs_home",
      },
      {
        text: "Clothing",
        disabled: false,
        href: "breadcrumbs_clothing",
      },
      {
        text: "T-Shirts",
        disabled: true,
        href: "breadcrumbs_shirts",
      },
    ],
  }),
};
</script>
