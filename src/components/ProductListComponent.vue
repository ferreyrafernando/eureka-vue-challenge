<template>
    <v-card
    class="mx-auto my-1"
    min-width="360"
  >

  <div class="d-flex flex-no-wrap justify-start align-center">
     <v-img
      class="mx-2 my-auto"
      :contain="true"
      max-width="200"
      max-height="200"
      min-height="200"
      min-width="200"
      :src="product.image"
    ></v-img>

    <div>
      <div class="product_title ml-4">{{product.title}}</div>

        <div class="product_desc mt-4 ml-4">
            <div class="mt-2">
                {{product.product_type | capitalizeFirst}}
            </div>
            <div class="my-2">
                Quantity Sold: {{product.quantitySold}}
            </div>
        </div>
    </div>
  </div>
    </v-card>
</template>
<script>
export default {
  name: 'productlistcomponent',
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
    font-size:1.25rem;
    font-weight: 600;
    width: 100%;
    line-height: 2rem;
}

.product_desc {
    font-size:1rem!important;
    font-weight: 400;
    line-height: 1.75rem;
    color: rgba(0,0,0,.6);
    width: 100%;
}

</style>
