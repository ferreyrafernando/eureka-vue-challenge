<template>
  <div class="container py-5">
    <div class="title_page">
        {{title_str}}
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title_str: {
      type: String,
      required: true,
      default: "Welcome to the Mum's Deals Page"
    }
  },

  data: () => ({
    items: []
  })
}
</script>

<style scoped>

.container {
  width: 100%;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
}

.title_page {
  font-weight: 600;
  font-size: 3vw;
  color: #ffffff;
}

@media (max-width: 800px) {
  .category {
    font-size: 22px;
  }
}

@media (max-width: 700px) {
  .title_page {
    font-size: 20px;
  }
}

</style>
