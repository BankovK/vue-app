<template>
  <div class="page-wrapper">
    <FilterPanel @change-search-params="changeSearchParams" />
    <OrdersTable :orders="orders" @open-review-form="openReviewForm"/>
    <ReviewForm :productId="reviewProductId" @close-review-form="closeReviewForm"/>
    <ExportButton @on-export="onExport" :exportData="exportData" />
  </div>
</template>

<script>
import ExportButton from '../components/ExportButton.vue'
import FilterPanel from '../components/FilterPanel.vue'
import OrdersTable from '../components/orders/OrdersTable.vue'
import ReviewForm from '../components/orders/ReviewForm.vue'

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
    OrdersTable,
    ReviewForm,
    FilterPanel,
    ExportButton
  },
  computed: {
    orders: function() {
      return this.$store.state.orders.data.filter(order => order.products.find(product => product.name.toLowerCase().includes(this.searchName.toLowerCase())))
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
