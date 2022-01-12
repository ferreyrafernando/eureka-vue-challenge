<template>
    <div>
        <div class="sub_header_filter ml-5 mt-3 mb-8">
            Price Range
        </div>
        <v-range-slider
        class="mx-5"
        v-model="price_r"
        thumb-label="always"
        :thumb-size="28"
        track-color="#d8d8d8"
        :min="minPrice"
        :max="maxPrice"
        @change="emitRangeChanges()"
        >
            <template v-slot:prepend>
                <span class="min-max-range mb-5">{{minPrice}}</span>
            </template>
            <template v-slot:append>
                <span class="min-max-range">{{maxPrice}}</span>
            </template>
        </v-range-slider>
    </div>
</template>

<script>
export default {
  name: 'pricerange',
  props: {

    minPrice: {
      type: Number,
      required: true
    },
    maxPrice: {
      type: Number,
      required: true
    }
  },
  data: () => ({
    types_selected: [],
    price_r: [33, 142]
  }),
  /*
  mounted () {
    this.$nextTick(() => {
      this.price_range = [this.minPrice, this.maxPrice]
    })
  },
  */
  methods: {
    emitRangeChanges () {
      this.$emit('selectedRanges', this.price_range)
    }
  }
}
</script>

<style scoped>

.min-max-range {
  font-size: 10px;
}
</style>
