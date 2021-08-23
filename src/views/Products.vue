<template>
  <div>
    <ProductsList @open-product-details="openProductDetails"/>
    <ProductDetails @close-product-details="closeProductDetails" :productData="productDetailsData"/>
  </div>
</template>

<script>
import ProductDetails from '../components/ProductDetails.vue'
import ProductsList from '../components/ProductsList.vue'

export default {
  name: 'Products',
  components: {
    ProductsList,
    ProductDetails
  },
  data() {
    return {
      productDetailsData: null,
    }
  },
  methods: {
    openProductDetails(value) {
      this.productDetailsData = value
    },
    closeProductDetails() {
      this.productDetailsData = null
    }
  }
}
</script>
