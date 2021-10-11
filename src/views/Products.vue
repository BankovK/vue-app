<template>
  <div class="page-wrapper" :class="{shrinked: isCartOpen}">
    <FilterPanel @change-search-params="changeSearchParams" :showTags="true" :availableTags="tags" :loading="tagsLoading" :selectedTags="searchTags" />
    <ProductsList @open-product-details="openProductDetails" @change-search-tag="setFilterTag" :products="products" :tags="tags" />
    <ProductDetails @close-product-details="closeProductDetails" :productData="productDetailsData"/>
  </div>
</template>

<script>
import FilterPanel from '../components/FilterPanel.vue'
import ProductDetails from '../components/products/ProductDetails.vue'
import ProductsList from '../components/products/ProductsList.vue'
import axios from 'axios'

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
      tags: [],
      tagsLoading: false
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
    setFilterTag(tag) {
      this.searchTags = [tag]
    },
    openProductDetails(value) {
      this.productDetailsData = value
    },
    closeProductDetails() {
      this.productDetailsData = null
    }
  },
  created() {
    this.tagsLoading = true
    axios.get(`http://localhost:5000/tags`)
      .then(({data}) => {
        this.tags = data.sort((a, b) => +b.priority - +a.priority)
        this.tagsLoading = false
      })
  }
}
</script>

<style>
  .shrinked {
    width: 70%;
    float: right;
  }
</style>
