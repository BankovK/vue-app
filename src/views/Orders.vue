<template>
  <div>
    <OrdersTable @open-review-form="openReviewForm"/>
    <ReviewForm :productId="reviewProductId" @close-review-form="closeReviewForm"/>
  </div>
</template>

<script>
import OrdersTable from '../components/orders/OrdersTable.vue'
import ReviewForm from '../components/orders/ReviewForm.vue'

export default {
  name: 'Orders',
  data() {
    return {
      reviewProductId: null,
    }
  },
  components: {
    OrdersTable,
    ReviewForm
  },
  methods: {
    openReviewForm(value) {
      this.reviewProductId = value
    },
    closeReviewForm() {
      this.reviewProductId = null
    }
  }
}
</script>
