<template>
  <div class="page-wrapper">
    <FilterPanel @change-search-params="changeSearchParams" />
    <OrdersTable :orders="orders" @open-review-form="openReviewForm"/>
    <ReviewForm :productId="reviewProductId" @close-review-form="closeReviewForm"/>
    <div class="chart">
      <OrdersChart :chart-data="chartData" />
    </div>
    <ExportButton @on-export="onExport" :exportData="exportData" />
  </div>
</template>

<script>
import OrdersChart from '../components/orders/OrdersChart.vue'
import ExportButton from '../components/ExportButton.vue'
import FilterPanel from '../components/FilterPanel.vue'
import OrdersTable from '../components/orders/OrdersTable.vue'
import ReviewForm from '../components/orders/ReviewForm.vue'
import moment from 'moment';

export default {
  name: 'Orders',
  data() {
    return {
      reviewProductId: null,
      searchName: '',
      exportData: null
    }
  },
  components: {
    OrdersChart,
    OrdersTable,
    ReviewForm,
    FilterPanel,
    ExportButton
  },
  computed: {
    orders: function() {
      return this.$store.state.orders.data.filter(order => order.products.find(product => product.name.toLowerCase().includes(this.searchName.toLowerCase())))
    },
    chartData: function() {
      const products = []
      this.orders.forEach(order => order.products.forEach(product => {
        const productIndex = products.findIndex(_product => _product.id === product.id)
        if (productIndex === -1) {
          products.push({...product, data: []})
        }
      }))
      this.orders.forEach(order => products.forEach(product => {
        const quantity = order.products.find(_product => _product.id === product.id)?.quantity
        products[products.findIndex(_product => _product.id === product.id)].data.push(quantity || 0)
      }))
      return {
        labels: this.orders.map(order => moment(order.orderToDate).format('YYYY-MM-DD')),
        datasets: products.map(product => ({
                    label: product.name,
                    backgroundColor: "#" + ((1<<24)*Math.random() | 0).toString(16),
                    data: product.data
                  }))
      }
    },
  },
  methods: {
    onExport() {
      this.exportData = this.orders.map(order => ({
        [this.$t('orders.products')]: order.products.reduce(
          (str, products) => `${str && `${str}, `}${products.name}`,
          ""
        ),
        [this.$t('orders.order_time')]: order.orderTime,
        [this.$t('orders.ordered_to_date')]: order.orderToDate,
        [this.$t('orders.total_price')]: order.totalPrice
      }))
    },
    changeSearchParams({name}) {
      this.searchName = name
    },
    openReviewForm(value) {
      this.reviewProductId = value
    },
    closeReviewForm() {
      this.reviewProductId = null
    }
  }
}
</script>

<style>
  .chart {
    height: 400px !important;
  }
</style>
