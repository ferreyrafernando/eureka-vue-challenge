<template class="container">
  <div class="container d-flex justify-space-between ">
    <div class="category mb-2">Available Deals: {{deals_result}}</div>
    <div class="container-view-sort d-flex justify-end mr-2">
      <div class="views_btn mr-5">
        <v-btn-toggle
          v-model="toggle_exclusive"
          mandatory
          @change="emitToggleChange()"
          >
          <v-btn small>
              <v-icon>mdi-view-grid</v-icon>
          </v-btn>
          <v-btn small>
              <v-icon>mdi-view-list</v-icon>
          </v-btn>
          </v-btn-toggle>
      </div>
      <div class="sort_text mx-2">Sort results:</div>
      <div class="sort_select">
        <v-select
          dense
          v-model="sorting_type"
          :items="default_sort"
          item-text="name"
          item-value="code"
          return-object
          @change="emitSortingChange()"
          outlined
        ></v-select>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'viewandsorting',
  props: {
    deals_result: {
      type: Number,
      required: true
    },
    sort_items: {
      type: Array,
      required: true,
      default: this.default_sort
    }
  },
  data: () => ({
    default_sort: [{ code: 'AZ', name: 'A-Z' }, { code: 'HL', name: 'Price: High to Low' }, { code: 'LH', name: 'Price: Low to High' }],
    toggle_exclusive: undefined,
    sorting_type: undefined
  }),
  methods: {
    emitToggleChange () {
      this.$emit('clickedToggle', this.toggle_exclusive)
    },

    emitSortingChange () {
      this.$emit('changeSort', this.sorting_type)
    }
  }
}
</script>
<style  scoped>
.container {
  width: 100%;
}
.container-view-sort {
  width: 70%;
}
.category {
    font-weight: 600;
    font-size: 22px;
    color: #483153;
    width: 50%;
}
.sort_text {
    color:#828385!important;
    font-size: 18px;
    font-weight: 600;
    letter-spacing: .75px;
}

.sort_select {
  max-width: 40%;
  min-width: 40%;
}

</style>
