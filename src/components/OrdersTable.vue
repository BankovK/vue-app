<template>
  <div class="order-table-wrapper">
    <table class="order-table">
      <thead>
        <tr>
          <th>Products</th>
          <th>Order Time</th>
          <th>Total Price</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orders" :key="order.id">
          <td><div v-for="product in order.products" :key="product.id">{{product.name}}</div></td>
          <td>{{order.orderTime | formatDateTime}}</td>
          <td>{{order.totalPrice | formatCurrency}}</td>
          <td>
            <button class="order-table__action-button" @click="editOrder(order.id)">Edit</button>
            <button class="order-table__action-button" @click="deleteOrder(order.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import moment from 'moment';
import axios from 'axios'
import { mapActions } from 'vuex'

export default {
  name: 'ProductsList',
  methods: {
    ...mapActions([
      'fetchOrders'
    ]),
    deleteOrder(id) {
      axios.delete(`http://localhost:5000/orders/${id}`)
        .then(() => this.$store.commit('deleteOrder', id))
    },
    editOrder(id) {
      axios.get(`http://localhost:5000/orders/${id}`)
        .then(({data}) => {
          this.$store.commit('setCart', data.products)
          this.$router.push(`products?order-id=${id}`);
        })
    },
  },
  computed: {
    orders: function() {
      return this.$store.state.orders.data
    },
    currentUser: function() {
      return this.$store.state.currentUser
    }
  },
  filters: {
    formatCurrency: function(value) {
      return `${value}$`
    },
    formatDateTime: function(value) {
      return moment(value).format('YYYY-MM-DD HH:mm')
    }
  },
  created() {
    this.fetchOrders(this.currentUser.role !== 'ADMIN' ? this.currentUser.id : undefined)
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.order-table-wrapper {
  padding-top: 80px;
  width: 80%;
  margin-left: 10%;
}

.order-table tbody {
  display: block;
  height: calc(100vh - 250px);
  overflow-y: auto;
}

.order-table th {
  background-color: burlywood;
}

.order-table tr {
  display: flex;
  text-align: center;
  border-bottom: 1px solid;
}

.order-table td,
.order-table th {
  flex-basis: 100%;
  flex-grow: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.order-table select {
  font-size: 28px;
}

.order-table {
  width: 100%;
  font-size: 32px;
}

.order-table__action-button {
  border-radius: 100px;
}
</style>
