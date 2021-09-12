<template>
  <div class="page-wrapper" :class="{shrinked: isCartOpen}">
    <FilterPanel @change-search-params="changeSearchParams" :showTags="true" />
    <ProductsList @open-product-details="openProductDetails" :products="products" />
    <ProductDetails @close-product-details="closeProductDetails" :productData="productDetailsData"/>
  </div>
</template>

<script>
import FilterPanel from '../components/FilterPanel.vue'
import ProductDetails from '../components/products/ProductDetails.vue'
import ProductsList from '../components/products/ProductsList.vue'

export default {
  name: 'Products',
  components: {
    ProductsList,
    ProductDetails,
    FilterPanel
  },
  data() {
    return {
      productDetailsData: null,
      searchName: '',
      searchTags: [],
    }
  },
  computed: {
    products: function() {
      let checkTags = (arr, target) => target.every(v => arr.includes(v));
      return this.$store.state.products.data.filter(product => product.name.toLowerCase().includes(this.searchName.toLowerCase()) && checkTags(product.tags || [], this.searchTags))
    },
    isCartOpen: function() {
      return this.$store.state.showCart
    },
  },
  methods: {
    changeSearchParams({name, tags}) {
      this.searchName = name
      this.searchTags = tags
    },
    openProductDetails(value) {
      this.productDetailsData = value
    },
    closeProductDetails() {
      this.productDetailsData = null
    }
  }
}
</script>

<style>
  .shrinked {
    width: 70%;
    float: right;
  }
</style>
