<template>
  <div class="page-wrapper">
    <div class="products-wrapper">
      <div class="product-card" v-for="product in products" :key="product.id">
        <img class="product-card__image" :src="product.imageUrl" />
        <div>{{product.name}}</div>
        <div>{{product.price | formatCurrency}}</div>
        <div><button class="product-card__order-button" type="button" @click="addToCart(product)">Order</button></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductsList',
  methods: {
    addToCart(product) {
      this.$store.commit('addToCart', product)
    },
  },
  computed: {
    products: function() {
      return this.$store.state.products.data
    }
  },
  filters: {
    formatCurrency: function(value) {
      return `${value}$`
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.page-wrapper {
  font-size: 50px;
  display: flex;
  justify-content: center;
}
.products-wrapper {
  margin-top: 100px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}
.product-card {
  width: calc(25% - 20px);
  border: 4px solid black;
  border-radius: 100px;
  margin: 10px;
  text-align: center;
  overflow: hidden;
}
.product-card__image {
  max-width: 100%;
}
.product-card__order-button {
  background-color: black;
  padding: 10px;
  font-size: 40px;
  color: white;
  text-decoration: none;
  text-align: center;
  border: 0;
  width: 100%;
}
.product-card__order-button:active,
.product-card__order-button:hover {
  background-color: greenyellow;
  color: black;
  cursor: pointer;
}
</style>
