<template>
  <div class="form-wrapper" v-if="productData">
    <div>
      <h1>{{productData.name}} Details</h1>
      <div v-if="averageRating">
        Average rating: {{averageRating | formatRating}}<b-icon icon="star-fill"></b-icon>
      </div>
      <div>
        <p>{{productData.description}}</p>
      </div>
      <div v-if="loading">Loading...</div>
      <table class="reviews-table" v-else>
        <thead>
          <tr>
            <th>User Name</th>
            <th>Rating</th>
            <th>Comment</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="review in reviews" :key="review.id">
            <td>{{review.userName}}</td>
            <td><b-icon v-for="value in [1,2,3,4,5]" :key="value" :icon="review.rating >= value ? 'star-fill' : 'star'"></b-icon></td>
            <td>{{review.comment}}</td>
            <td>{{review.creationTime | formatDate}}</td>
          </tr>
        </tbody>
      </table>
      <button type="button" @click="closeForm">Close</button>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import axios from 'axios';
import 'bootstrap-vue/dist/bootstrap-vue-icons.min.css'
import { BIcon } from 'bootstrap-vue'

export default {
  name: 'ProductDetails',
  components: {
    BIcon
  },
  props: {
    productData: Object
  },
  data() {
    return {
      loading: false,
      reviews: []
    }
  },
  methods: {
    closeForm() {
      this.$emit('close-product-details')
    },
    fetchReviews() {
      this.loading = true
      axios.get(`http://localhost:5000/reviews`, {
        params: {
          productId: this.productData.id
        }
      })
        .then(({data}) => {
          this.reviews = data
          this.loading = false
        })
    },
  },
  computed: {
    averageRating() {
      return this.reviews.reduce((sum, review) => +sum + +review.rating, 0) / this.reviews.length
    }
  },
  filters: {
    formatRating(value) {
      return value.toFixed(2)
    },
    formatDate: function(value) {
      return moment(value).format('YYYY-MM-DD')
    }
  },
  watch: {
    'productData': 'fetchReviews'
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.form-wrapper {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid black;
  border-radius: 30px;
  overflow: hidden;
  font-size: 30px;
  background-color: white;
  padding: 10px;
  min-width: 750px;
}

.form-wrapper h1 {
  text-align: center;
}

.reviews-table {
  width: 100%;
  text-align: center;
}

.form-wrapper button {
  margin-top: 30px;
  font-size: 50px;
}

.form-wrapper button:last-child {
  float: right;
}

</style>
