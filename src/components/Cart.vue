<template>
  <div class="cart-wrapper" :class="{ hidden: !show }">
    <table class="cart-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(product, index) in contents" :key="index">
          <td>{{product.name}} <button @click="removeFromCart(index)">X</button></td>
          <td>{{product.price | formatCurrency}}</td>
        </tr>
      </tbody>
    </table>
    <div class="total-price">
      <div>Total: {{totalPrice | formatCurrency}}</div>
      <div @click="order">
        <span class="order-button">
          Order
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Cart',
  methods: {
    removeFromCart(index) {
      this.$store.commit('removeFromCart', index)
    },
    order() {
      this.$store.commit('makeOrder', this.contents)
    }
  },
  computed: {
    show: function() {
      return this.$store.state.showCart
    },
    contents: function() {
      return this.$store.state.cart
    },
    totalPrice: function() {
      return this.contents.reduce((sum, product) => sum + +product.price, 0)
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
.hidden {
  display: none !important;
}

.cart-wrapper {
  font-size: 20px;
  width: 30%;
  position: fixed;
  left: 0;
  bottom: 0;
  top: 74px;
  background-color: white;
  border-right: 4px solid black;
}

.cart-table {
  width: 100%;
}

.cart-table td {
  text-align: center;
}

.total-price {
  font-size: 30px;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
}

.order-button {
  width: 100%;
  padding: 10px 0;
  display: block;
  background-color: black;
  color: white;
  font-size: 30px;
  user-select: none;
}
.order-button:active,
.order-button:hover {
  background-color: greenyellow;
  color: black;
  cursor: pointer;
}
</style>
