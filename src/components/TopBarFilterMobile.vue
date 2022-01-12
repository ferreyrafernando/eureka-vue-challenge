<template>
    <div class="container">
        <div class="category mb-2">Available Deals: {{deals}}</div>
        <div class="category-btns d-flex justify-space-around py-2">
            <div class="btns">
                <v-btn text block @click="emitFilterClick">
                Filter
                <v-icon>mdi-filter-outline</v-icon>
                </v-btn>
            </div>
            <v-divider vertical></v-divider>
            <div class="btns">
                <v-menu offset-y>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                        text block
                        v-bind="attrs"
                        v-on="on"
                        >
                        Sort
                        <v-icon>mdi-sort-ascending</v-icon>
                        </v-btn>
                    </template>
                    <v-list>
                        <v-list-item
                        v-for="(item, index) in items"
                        :key="index"
                        @click="emitSortClick(item)"
                        >
                        <v-list-item-title>{{ item.name }}</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  name: 'topfiltermob',
  props: {
    deals: {
      type: Number,
      required: true
    },
    items: {
      type: Array,
      required: true
    }
  },

  data: () => ({
    //
  }),

  methods: {
    emitFilterClick () {
      this.$emit('clickOnFilter')
    },
    emitSortClick (item) {
      this.$emit('clickOnSort', item)
    }
  }
}
</script>

<style scoped>

.container {
    width: 100%;
}
.category {
    width: 100%;
    text-align: center;
    font-weight: 600;
    font-size: 5vw;
    color: #483153;
}

@media (max-width: 800px) {
  .category {
    font-size: 18px;
  }
}

@media (max-width: 400px) {
  .category {
    font-size: 14px;
  }
}

.category-btns {
  width: 100%;
  background-color: #e1dedb;
}
.btns {
  display: inline-block;
  width: 100%;
}

</style>
