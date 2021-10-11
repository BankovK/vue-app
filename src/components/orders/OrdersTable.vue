<template>
  <div class="order-table-wrapper">
    <b-table small :fields="fields" :items="orders">
      <template #cell(products)="data">
        <span v-for="product in data.value" :key="product.id">
          {{`${product.name} (${product.quantity})`}} 
          <b-button v-if="checkIfReviewable(data.item)" class="order-table__action-button" @click="openReview(product.id)">Review</b-button>
        </span>
      </template>
      <template #cell(orderTime)="data">
        {{data.value | formatDateTime}}
      </template>
      <template #cell(orderToDate)="data">
        {{data.value | formatDate}}
      </template>
      <template #cell(totalPrice)="data">
        {{data.value | formatCurrency}}
      </template>
      <template #cell(actions)="data">
        <div v-if="!isUserDelivery && checkIfEditable(data.item)" class="button-line">
          <b-button class="order-table__action-button" @click="editOrder(data.item.id)">Edit</b-button>
          <b-button class="order-table__action-button" @click="deleteOrder(data.item.id)">Delete</b-button>
        </div>
        <div v-if="isUserDelivery">
          <b-form-select
            id="status"
            class="mb-2 mr-sm-2 mb-sm-0"
            :options="statusOptions"
            v-model="data.item.status"
            @change="(value) => changeStatus(value, data.item.id)"
            :disabled="!checkIfAllowedForDelivery(data.item)"
          ></b-form-select>
        </div>
      </template>
    </b-table>
  </div>
</template>

<script>
import moment from 'moment';
import axios from 'axios'
import { mapActions } from 'vuex'

export default {
  name: 'ProductsList',
  props: {
    orders: Array
  },
  data() {
    return {
      fields: [
        {
          key: 'products',
          label: this.$t('orders.products'),
          sortable: true
        },
        {
          key: 'orderTime',
          label: this.$t('orders.order_time'),
          sortable: true
        },
        {
          key: 'orderToDate',
          label: this.$t('orders.ordered_to_date'),
          sortable: true
        },
        {
          key: 'totalPrice',
          label: this.$t('orders.total_price'),
          sortable: true
        },
        {
          key: 'actions',
          label: '',
          sortable: false
        }
      ],
      statusOptions: [
        {value: '1', text: this.$t('statuses.to_do')},
        {value: '2', text: this.$t('statuses.in_progress')},
        {value: '3', text: this.$t('statuses.delivered')}
      ]
    }
  },
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
  width: 80%;
  margin-left: 10%;
}

.order-table__action-button {
  border-radius: 100px;
}
</style>
