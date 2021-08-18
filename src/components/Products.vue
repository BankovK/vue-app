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
  name: 'Products',
  methods: {
    onSubmit() {
      const userData = this.users.find(user => user.name === this.name && user.password === this.password)
      if (userData) {
        this.$emit('login-sumbitted', userData)
      } else {
        this.error = 'Wrong credentials'
      }
    },
    addToCart(product) {
      this.$emit('add-product-to-cart', product)
    },
  },
  data() {
    return {
      products: [
        {id: 1, name: 'Product1', price: '87', imageUrl: 'https://blogs.uoregon.edu/natewoodburyaad250/files/2012/10/PSD_Food_illustrations_3190_pancakes_with_butter-1wi1tz5.jpg'},
        {id: 2, name: 'Product2', price: '87', imageUrl: 'https://blogs.uoregon.edu/natewoodburyaad250/files/2012/10/PSD_Food_illustrations_3190_pancakes_with_butter-1wi1tz5.jpg'},
        {id: 3, name: 'Product3', price: '87', imageUrl: 'https://blogs.uoregon.edu/natewoodburyaad250/files/2012/10/PSD_Food_illustrations_3190_pancakes_with_butter-1wi1tz5.jpg'},
        {id: 4, name: 'Product4', price: '87', imageUrl: 'https://blogs.uoregon.edu/natewoodburyaad250/files/2012/10/PSD_Food_illustrations_3190_pancakes_with_butter-1wi1tz5.jpg'},
        {id: 5, name: 'Product5', price: '87', imageUrl: 'https://blogs.uoregon.edu/natewoodburyaad250/files/2012/10/PSD_Food_illustrations_3190_pancakes_with_butter-1wi1tz5.jpg'},
        {id: 6, name: 'Product6', price: '87', imageUrl: 'https://blogs.uoregon.edu/natewoodburyaad250/files/2012/10/PSD_Food_illustrations_3190_pancakes_with_butter-1wi1tz5.jpg'}
      ]
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
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}
.product-card {
  width: calc(25% - 28px);
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
  border-radius: 100px;
  font-size: 14px;
  color: white;
  text-decoration: none;
  text-align: center;
  border: 0;
}
.product-card__order-button:active,
.product-card__order-button:hover {
  background-color: greenyellow;
  color: black;
  cursor: pointer;
}
</style>
