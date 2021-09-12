<template>
  <div class="list-wrapper">
    <div class="products-wrapper">
      <div class="product-card" v-for="product in products" :key="product.id" draggable @dragstart="setProductInTransfer(product)">
        <img class="product-card__image" :src="product.imageUrl" @click="openDetails(product)"/>
        <div>{{product.name}}</div>
        <div>{{product.price | formatCurrency}}</div>
        <div><button class="product-card__order-button" type="button" @click="addToCart(product)">{{$t('products.order')}}</button></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'ProductsList',
  props: {
    products: Array
  },
  methods: {
    ...mapActions([
      'addToCart'
    ]),
    setProductInTransfer(product) {
      this.$store.commit('setProductInTransfer', product)
    },
    openDetails(product) {
      this.$emit('open-product-details', product)
    },
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
.list-wrapper {
  font-size: 50px;
  display: flex;
  justify-content: center;
}
.products-wrapper {
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
