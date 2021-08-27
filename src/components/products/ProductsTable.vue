<template>
  <div class="product-table-wrapper">
    <table class="product-table">
      <thead>
        <tr>
          <th>{{$t('products.product')}}</th>
          <th>{{$t('products.price')}}</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td>{{product.name}}</td>
          <td>{{product.price | formatCurrency}}</td>
          <td>
            <button class="product-table__action-button" @click="editProduct(product.id)">{{$t('edit')}}</button>
            <button class="product-table__action-button" @click="deleteProduct(product.id)">{{$t('delete')}}</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import moment from 'moment';
import axios from 'axios'

export default {
  name: 'ProductsTable',
  props: {
    products: Array
  },
  methods: {
    deleteProduct(id) {
      axios.delete(`http://localhost:5000/products/${id}`)
        .then(() => this.$store.commit('deleteProduct', id))
    },
    editProduct(id) {
      this.$router.push(`product/${id}`);
    },
  },
  filters: {
    formatCurrency: function(value) {
      return `${value}$`
    },
    formatDateTime: function(value) {
      return moment(value).format('YYYY-MM-DD HH:mm')
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.product-table-wrapper {
  width: 80%;
  margin-left: 10%;
}

.product-table tbody {
  display: block;
  height: calc(100vh - 250px);
  overflow-y: auto;
}

.product-table th {
  background-color: burlywood;
}

.product-table tr {
  display: flex;
  text-align: center;
  border-bottom: 1px solid;
}

.product-table td,
.product-table th {
  flex-basis: 100%;
  flex-grow: 2;
  display: flex;
  justify-content: center;
}

.product-table__action-button {
  border-radius: 100px;
}

.product-table select {
  font-size: 28px;
}

.product-table {
  width: 100%;
  font-size: 32px;
}
</style>
