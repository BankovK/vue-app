<template>
  <div class="form-wrapper">
    <div>
      <h1>Create product</h1>
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
        <button type="submit" :disabled="!isFormFilled">Create</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductForm',
  methods: {
    onSubmit() {
      if (this.isFormFilled) {
        this.$store.commit('addProduct', {name: this.name, price: this.price})
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
    }
  },
  computed: {
    isFormFilled: function() {
      return this.name.length !== 0 && this.price !== 0
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
  margin: 10px;
  font-size: 50px;
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
