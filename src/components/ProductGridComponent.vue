<template>
    <v-card
    class="mx-auto my-2 py-3"
    >
        <v-img
        class="mx-auto my-auto"
        :contain="true"
        max-width="200"
        max-height="200"
        min-height="200"
        min-width="200"
        :src="product.image"
        ></v-img>

        <div class="product_title mt-2">{{product.title}}</div>

        <div class="product_desc mt-4 ml-5">
            <div class="mt-2">
                {{product.product_type | capitalizeFirst}}
            </div>
            <div class="my-2">
                Quantity Sold: {{product.quantitySold}} <!-- For test purposes only -- MinPrice: {{product.minPrice}} - MaxPrice: {{product.maxPrice}} -->
            </div>
        </div>
    </v-card>
</template>
<script>
export default {
  name: 'productgridcomponent',
  props: {
    product: {
      type: Object,
      required: true
    }
  },

  data: () => ({
    items: []
  })
}
</script>

<style scoped>

.product_title {
    font-size:1.35rem;
    font-weight: 600;
    width: 100%;
    height: 60px;
    line-height: 2rem;
    text-align: center;
}

.product_desc {
    font-size:1rem!important;
    font-weight: 400;
    line-height: 1.75rem;
    color: rgba(0,0,0,.6);
    width: 100%;
}

</style>
