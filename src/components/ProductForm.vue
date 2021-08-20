<template>
  <div class="form-wrapper">
    <div>
      <h1>{{this.isEdit ? 'Edit Product' : 'Create Product'}}</h1>
      <form @submit.prevent="onSubmit">
        <div>
          <label htmlFor="product-name">Name</label>
          <input
            v-model="name"
            id="product-name"
            type="text"
            autoComplete="off"
          />
        </div>
        <div>
          <label htmlFor="product-price">Price</label>
          <input
            v-model="price"
            id="product-price"
            type="number"
          />
        </div>
        <div v-if="error">{{error}}</div>
        <button type="submit" :disabled="!isFormFilled">{{this.isEdit ? 'Edit' : 'Create'}}</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'ProductForm',
  methods: {
    onSubmit() {
      if (this.isFormFilled) {
        const productData = {
          name: this.name,
          price: this.price,
          imageUrl: 'https://blogs.uoregon.edu/natewoodburyaad250/files/2012/10/PSD_Food_illustrations_3190_pancakes_with_butter-1wi1tz5.jpg'
        }
        if(!this.isEdit) {
          axios.post("http://localhost:5000/products", productData)
            .then(({data}) => {
              this.$store.commit('addProduct', data)
              this.$router.push('/products');
            })
        } else {
          axios.put(`http://localhost:5000/products/${this.productId}`, productData)
            .then(({data}) => {
              this.$store.commit('updateProduct', data)
              this.$router.push('/products');
            })
          }
      } else {
        this.error = 'Fill the form!'
      }
    }
  },
  data() {
    return {
      name: '',
      price: '',
      error: '',
      productId: null
    }
  },
  computed: {
    isFormFilled: function() {
      return this.name.length !== 0 && this.price !== 0
    },
    isEdit: function() {
      return this.productId !== 'new'
    },
  },
  mounted() {
    this.productId = this.$route.params.id
    if (this.productId !== 'new') {
      axios.get(`http://localhost:5000/products/${this.productId}`)
        .then(({data}) => {
          this.name = data.name
          this.price = data.price
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.form-wrapper {
  padding-top: 60px;
  font-size: 50px;
  display: flex;
  justify-content: center;
}

.form-wrapper h1 {
  text-align: center;
}

.form-wrapper label {
  display: block;
}

.form-wrapper .input-invalid {
  background-color: red;
}

.form-wrapper input {
  display: block;
  box-shadow: 0 0 3px black;
  font-size: 50px;
  width: 100%;
}

.form-wrapper small {
  font-size: 25px;
  color: red;
}

.form-wrapper .request-message-loading {
  background-color: yellow;
  border-radius: 10px;
  text-align: center;
}

.form-wrapper .request-message-failed {
  background-color: red;
  border-radius: 10px;
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
