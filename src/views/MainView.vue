<template>
    <v-app>
        <v-system-bar
            app
            height="100vh"
            flat
            color="#8d8c8c">
            <HeaderComponent  title_str="Welcome to the Mum's Deals Page!"/>
        </v-system-bar>
        <div class="d-none d-md-flex">
          <v-app-bar app class="app-bar">
              <TopViewAndSortingComponent :deals_result="number_results" :sort_items="sort_array" @clickedToggle="setViewType" @changeSort="setSorting"/>
          </v-app-bar>
        </div>
        <v-navigation-drawer app v-model="drawer"  bottom :mobile-breakpoint="960" >
          <SideFilterComponent :types="types" @checkedsTypes="set_checkeds_Types"/>
          <v-divider></v-divider>
          <div class="sub_header_filter ml-5 mt-3 mb-8">
              Price Range
          </div>
            <v-range-slider
            class="mx-5"
            v-model="price_r"
            thumb-label="always"
            :thumb-size="28"
            track-color="#d8d8d8"
            :min="prices_min"
            :max="prices_max"
            @end="filter_products()"
            >
            </v-range-slider>
        </v-navigation-drawer>
        <v-main>
            <template v-if="loadingData">
              <div class="container d-flex justify-center align-center">
                <v-progress-circular
                  :size="70"
                  :width="7"
                  color="#73bb90"
                  indeterminate
                ></v-progress-circular>
              </div>
            </template>
            <template v-else>
              <div class="d-flex d-md-none filter-mobile">
                  <TopBarFilterMobile :deals="number_results" :items="sort_array" @clickOnFilter="showFilters()" @clickOnSort="setSorting"/>
              </div>
              <v-container fluid>
                  <template v-if="view_type == 0">
                      <v-row>
                          <v-col cols="12" lg="4" md="4" sm="6" xs="12" v-for="product in this.filtered_products" :key="product.id" >
                              <ProductGridComponent :product="product" />
                          </v-col>
                      </v-row>
                  </template>
                  <template v-else >
                      <v-row v-for="product in this.filtered_products" :key="product.id">
                          <v-col cols="10" class="col_product">
                              <ProductListComponent :product="product" />
                              <v-divider class="mt-2"></v-divider>
                          </v-col>
                      </v-row>
                  </template>
              </v-container>
            </template>
        </v-main>
    </v-app>
</template>

<script>
import HeaderComponent from '../components/HeaderComponent.vue'
import ProductGridComponent from '../components/ProductGridComponent.vue'
import ProductListComponent from '../components/ProductListComponent.vue'
import SideFilterComponent from '../components/SideFilterComponent.vue'
import TopViewAndSortingComponent from '../components/TopViewAndSortingComponent.vue'
import TopBarFilterMobile from '../components/TopBarFilterMobile.vue'

import { mapState, mapActions } from 'vuex'
import _ from 'lodash'
export default {
  components: { HeaderComponent, SideFilterComponent, TopViewAndSortingComponent, ProductGridComponent, ProductListComponent, TopBarFilterMobile },
  data: () => ({
    group: null,
    drawer: undefined,
    filtered_products: [],
    price_r: [],
    products: [],
    types: [],
    prices: [],
    prices_min: 0,
    prices_max: 0,
    checked_filters_types: [],
    sort_array: [{ code: 'AZ', name: 'A-Z' }, { code: 'HL', name: 'Price: High to Low' }, { code: 'LH', name: 'Price: Low to High' }],
    deals_total: 0,
    view_type: 0,
    sortedBy: {},
    price_min_selected: 0,
    price_max_selected: 0
  }),
  watch: {
    group () {
      this.drawer = false
    },

    checked_filters_types () {
      console.log('Watcher Check Tipo')
      this.filter_products()
    }
  },

  created () {
    this.fetchProducts()
  },

  computed: {
    ...mapState('deals', ['dataStatus', 'loadingData', 'data']),
    number_results () {
      return this.products.length
      // return this.filtered_products.length
    }
  },

  methods: {
    ...mapActions({ getProducts: 'deals/getProducts' }),

    showFilters () {
      this.drawer = !this.drawer
    },

    async fetchProducts () {
      await this.getProducts()
      // TODO chequear que no venga vacio antes del foreach
      let variantsPrices = []
      let pricesBetween = {}

      this.data.forEach(element => {
        variantsPrices = element.variants
        _.each(variantsPrices, item => { item.price = parseFloat(item.price) })

        let priceMinProd = parseFloat(_.minBy(variantsPrices, 'price').price)
        let priceMaxProd = parseFloat(_.maxBy(variantsPrices, 'price').price)

        pricesBetween = {
          minPrice: priceMinProd,
          maxPrice: priceMaxProd
        }

        let product = {
          id: element.id,
          title: element.title,
          product_type: element.product_type,
          image: element.image,
          quantitySold: element.quantitySold,
          variants: element.variants,
          minPrice: priceMinProd,
          maxPrice: priceMaxProd
        }

        this.prices.push(pricesBetween)
        this.products.push(product)
      })

      this.types = [...new Set(this.products.map(t => t.product_type))]
      this.filtered_products = this.products
      this.deals_total = this.products.length

      this.prices_min = Math.floor(_.minBy(this.prices, 'minPrice').minPrice)
      this.prices_max = Math.ceil(_.maxBy(this.prices, 'maxPrice').maxPrice)

      this.price_r = [this.prices_min, this.prices_max]
    },

    set_checkeds_Types (value) {
      if (typeof value !== 'undefined') {
        this.checked_filters_types = value
      } else {
        this.checked_filters_types = []
      }
    },

    filter_products () {
      console.log('filter_prod')
      this.price_min_selected = this.price_r[0]
      this.price_max_selected = this.price_r[1]

      if (this.checked_filters_types.length || this.price_r !== []) {
        switch (true) {
          case (this.checked_filters_types.length && this.price_r !== []):
            this.filtered_products = this.products.filter((item) => {
              return (this.checked_filters_types.includes(item.product_type) && (item.minPrice >= this.price_min_selected && item.maxPrice <= this.price_max_selected))
            })
            break
          case (this.checked_filters_types.length && this.price_r === []):
            this.filtered_products = this.products.filter((item) => { return this.checked_filters_types.includes(item.product_type) })
            break
          case (!this.checked_filters_types.length && this.price_r !== []):
            this.filtered_products = this.products.filter((item) => {
              return (item.minPrice >= this.price_min_selected && item.maxPrice <= this.price_max_selected)
            })
            break
          default:
            this.filtered_products = this.products
            break
        }
      } else {
        this.filtered_products = this.products
      }
      this.setSorting()
    },

    setViewType (value) {
      if (typeof value !== 'undefined') {
        this.view_type = value
      }
    },

    setSorting (value) {
      if (typeof value !== 'undefined') {
        this.sortedBy = value
      }

      switch (this.sortedBy.code) {
        case 'AZ':
          this.filtered_products.sort((a, b) => {
            if (a.title < b.title) { return -1 }
            if (a.title > b.title) { return 1 }
            return 0
          })
          break
        case 'HL':
          this.filtered_products.sort((a, b) => { return b.maxPrice - a.maxPrice })
          break
        case 'LH':
          this.filtered_products.sort((a, b) => { return a.minPrice - b.minPrice })
          break
      }
    }

  }
}
</script>

<style scoped>

.col_product {
  margin:5px auto;
  padding: 0;
}

.filter-bar {
  margin-top: 90px;
  max-height:0vw;
  width: 100%;
}
.container {
  width: 100%;
  height: 100%;
}
</style>
