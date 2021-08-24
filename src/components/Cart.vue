<template>
  <div class="cart-wrapper" :class="{ hidden: !show }">
    <input
      v-model="orderToDate"
      id="orderToDate"
      type="date"
      autoComplete="off"
      :min="getCurrentDate()"
      class="date-selector"
    />
    <table class="cart-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Amount</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(product, index) in contents" :key="index">
          <td>
            {{product.name}}
          </td>
          <td>
            <button
              @click="decreaseQuantity(index)"
            >
              -
            </button>
            {{product.quantity}}
            <button
              @click="increaseQuantity(index)"
            >
              +
            </button>
          </td>
          <td>{{product.price * product.quantity | formatCurrency}}</td>
        </tr>
      </tbody>
    </table>
    <div class="total-price">
      <div>Total: {{totalPrice | formatCurrency}}</div>
      <div>
        <button class="order-button" @click="order" :class="{'order-button--disabled': !orderToDate}" :disabled="!orderToDate">
          {{!!this.$route.query['order-id'] ? 'Submit Changes' : "Order"}}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import axios from 'axios';
import { mapActions } from 'vuex';

export default {
  name: 'Cart',
  data() {
    return {
      orderToDate: null
    }
  },
  methods: {
    ...mapActions([
      'increaseQuantity',
      'decreaseQuantity'
    ]),
    setOrderDate() {
      this.orderToDate = this.$route.query['order-time']
    },
    order() {
      const orderId = this.$route.query['order-id']
      const orderData = {
        products: [...this.contents],
        userId: this.currentUserId,
        totalPrice: this.totalPrice,
        orderToDate: this.orderToDate,
        status: "1"
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
    },
    getCurrentDate() {
      return moment().format('YYYY-MM-DD')
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
      return this.contents.reduce((sum, product) => sum + (+product.price * +product.quantity), 0)
    },
    currentUserId: function() {
      return this.$store.state.currentUser.id
    }
  },
  watch: {
    "$route": 'setOrderDate'
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

.date-selector {
  width: calc(100% - 20px);
  margin: 10px;
  border: 1px solid gray;
  font-size: 20px;
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
.order-button--disabled {
  background-color: red;
}
.order-button--disabled:hover {
  background-color: red;
}
</style>
