<template>
  <div class="order-table-wrapper">
    <table class="order-table">
      <thead>
        <tr>
          <th>Products</th>
          <th>Order Time</th>
          <th>Ordered To Date</th>
          <th>Total Price</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orders" :key="order.id">
          <td>
            <span v-for="product in order.products" :key="product.id">
              {{`${product.name} (${product.quantity})`}} 
              <button v-if="checkIfReviewable(order)" class="order-table__action-button" @click="openReview(product.id)">Review</button>
            </span>
          </td>
          <td>{{order.orderTime | formatDateTime}}</td>
          <td>{{order.orderToDate | formatDate}}</td>
          <td>{{order.totalPrice | formatCurrency}}</td>
          <td>
            <div v-if="!isUserDelivery && checkIfEditable(order)" class="button-line">
              <button class="order-table__action-button" @click="editOrder(order.id)">Edit</button>
              <button class="order-table__action-button" @click="deleteOrder(order.id)">Delete</button>
            </div>
            <div v-if="isUserDelivery">
              <select v-model="order.status" @change="(event) => changeStatus(event, order.id)" :disabled="!checkIfAllowedForDelivery(order)">
                <option value='1'>To Do</option>
                <option value='2'>In Progress</option>
                <option value='3'>Delivered</option>
              </select>
            </div>
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
          this.$router.push(`products?order-id=${id}&order-time=${moment(data.orderToDate).format("YYYY-MM-DD")}`);
        })
    },
    changeStatus(event, id) {
      const { value } = event.target
      axios.patch(`http://localhost:5000/orders/${id}`, {
        status: +value,
        deliveryUserId: value !== "1" ? this.$store.state.currentUser.id : 0
      })
    },
    checkIfAllowedForDelivery(order) {
      return [undefined, 0, this.currentUser.id].includes(order.deliveryUserId)
    },
    checkIfEditable(order) {
      return moment().isBefore(order.orderToDate) && +order.status === 1
    },
    checkIfReviewable(order) {
      return moment().isAfter(order.orderToDate)
    },
    openReview(id) {
      this.$emit('open-review-form', id)
    }
  },
  computed: {
    orders: function() {
      return this.$store.state.orders.data
    },
    currentUser: function() {
      return this.$store.state.currentUser
    },
    isUserDelivery: function() {
      return this.$store.state.currentUser.role === 'DELIVERY'
    },
  },
  filters: {
    formatCurrency: function(value) {
      return `${value}$`
    },
    formatDateTime: function(value) {
      return moment(value).format('YYYY-MM-DD HH:mm')
    },
    formatDate: function(value) {
      return moment(value).format('YYYY-MM-DD')
    }
  },
  created() {
    this.fetchOrders(!['ADMIN', 'DELIVERY'].includes(this.currentUser.role) ? this.currentUser.id : undefined)
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
