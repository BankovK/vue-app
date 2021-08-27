<template>
  <div class="page-wrapper">
    <FilterPanel @change-search-params="changeSearchParams" />
    <ProductsTable :products="products" />
    <router-link to="/product/new" class="button">{{$t('navbar.add_product')}}</router-link>
    <ExportButton @on-export="onExport" :exportData="exportData" />
  </div>
</template>

<script>
import ExportButton from '../components/ExportButton.vue'
import FilterPanel from '../components/FilterPanel.vue'
import ProductsTable from '../components/products/ProductsTable.vue'

export default {
  name: 'ProductsAdmin',
  components: {
    ProductsTable,
    FilterPanel,
    ExportButton
  },
  data() {
    return {
      searchName: '',
      exportData: null
    }
  },
  computed: {
    products: function() {
      return this.$store.state.products.data.filter(product => product.name.toLowerCase().includes(this.searchName.toLowerCase()))
    }
  },
  methods: {
    onExport() {
      this.exportData = this.products.map(product => ({
        [this.$t('products.product')]: product.name,
        [this.$t('products.price')]: product.price,
      }))
    },
    changeSearchParams({name}) {
      this.searchName = name
    },
  }
}
</script>
