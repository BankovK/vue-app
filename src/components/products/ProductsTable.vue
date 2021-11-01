<template>
  <div class="product-table-wrapper">
    <b-table small :fields="fields" :items="products">
      <template #cell(price)="data">
        {{data.value | formatCurrency}}
      </template>
      <template #cell(actions)="data">
        <b-button class="product-table__action-button" @click="openDetails(data.item)">{{$t('products.details')}}</b-button>
        <b-button class="product-table__action-button" @click="editProduct(data.item.id)">{{$t('edit')}}</b-button>
        <b-button class="product-table__action-button" @click="deleteProduct(data.item.id)">{{$t('delete')}}</b-button>
      </template>
    </b-table>
  </div>
</template>

<script>
import moment from 'moment';
import axios from 'axios';
import { mapActions } from 'vuex';

export default {
  name: 'ProductsTable',
  props: {
    products: Array
  },
  data() {
    return {
      fields: [
        {
          key: 'name',
          label: this.$t('products.product'),
          sortable: true
        },
        {
          key: 'price',
          label: this.$t('products.price'),
          sortable: true
        },
        {
          key: 'actions',
          label: '',
          sortable: false
        }
      ]
    }
  },
  methods: {
    ...mapActions([
      'setSnackbarMessage'
    ]),
    deleteProduct(id) {
      axios.delete(`http://localhost:5000/products/${id}`)
        .then(() => {
          this.setSnackbarMessage(this.$t('products.product_deleted'))
          this.$store.commit('deleteProduct', id)
        })
    },
    editProduct(id) {
      this.$router.push(`product/${id}`);
    },
    openDetails(product) {
      this.$emit('open-product-details', product)
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

.product-table__action-button {
  border-radius: 100px;
}
</style>
