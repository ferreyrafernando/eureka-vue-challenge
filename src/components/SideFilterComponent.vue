<template>
    <div
        class="mx-auto"
        max-width="500"
        height="100%"
        color="#f4f2f0"
    >
        <div class="header_filter my-5">
            Filter Results
        </div>
        <v-divider></v-divider>
        <div class="sub_header_filter ml-5 mt-3">
            Product Type
        </div>
        <v-list class="ml-5">
            <v-list-item-group
                v-model="types_selected"
                multiple
                @change="emitChanges()"
            >
                <template v-for="type in types">
                <v-list-item
                    :key="type"
                    :value="type"
                >
                    <template v-slot:default="{ active }">
                    <v-list-item-action>
                        <v-checkbox
                        :input-value="active"
                        ></v-checkbox>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title v-text="capitalizedText(type)"></v-list-item-title>
                    </v-list-item-content>
                    </template>
                </v-list-item>
                </template>
            </v-list-item-group>
        </v-list>

    </div>
</template>

<script>
export default {
  name: 'sidefilter',
  props: {
    types: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    types_selected: []
  }),
  methods: {
    emitChanges () {
      this.$emit('checkedsTypes', this.types_selected)
    },
    capitalizedText (text) {
      return this.$options.filters.capitalizeFirst(text)
    }
  }
}
</script>

<style scoped>
.header_filter {
  color: #696265;
  font-size: 16px;
  font-weight: bold;
  width: 100%;
  text-align: center;
}
.sub_header_filter {
  color: #696265;
  font-size: 16px;
}
</style>
