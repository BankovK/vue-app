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
          {{!!this.$route.query['order-id'] ? 'Submit Changes' : "Order"}}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import axios from 'axios'

export default {
  name: 'Cart',
  methods: {
    removeFromCart(index) {
      this.$store.commit('removeFromCart', index)
    },
    order() {
      const orderId = this.$route.query['order-id']
      const orderData = {
        products: [...this.contents],
        userId: this.currentUserId,
        totalPrice: this.contents.reduce((sum, product) => sum + +product.price, 0)
      }
      if (orderId) {
        axios.patch(`http://localhost:5000/orders/${orderId}`, orderData)
          .then(({data}) => {
            this.$store.commit('editOrder', data)
            this.$router.push('/products');
          })
      } else {
        axios.post("http://localhost:5000/orders", {
          ...orderData,
          orderTime: moment().toISOString()
        })
          .then(({data}) => this.$store.commit('makeOrder', data))
      }
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
    currentUserId: function() {
      return this.$store.state.currentUser.id
    }
  },
  filters: {
    formatCurrency: function(value) {
      return `${value}$`
    }
  }
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
