<template>
  <div class="form-wrapper">
    <div>
      <h1>{{this.isEdit ? $t('products.form_title.edit') : $t('products.form_title.new')}}</h1>
      <div v-if="loading">{{$t('loading')}}</div>
      <b-form @submit.prevent="onSubmit" v-else>
        <b-form-group id="product-name-group" :label="$t('name')" label-for="product-name">
          <b-form-input
            id="product-name"
            v-model="name"
            type="text"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group id="product-price-group" :label="$t('products.price')" label-for="product-price">
          <b-form-input
            id="product-price"
            v-model="price"
            type="number"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group id="tags-group" :label="$t('tags')" label-for="tags">
          <b-form-select
            id="tags"
            class="mb-2 mr-sm-2 mb-sm-0"
            :options="tagOptions"
            v-model="tags"
            multiple
          ></b-form-select>
        </b-form-group>
        <b-form-group id="description-group" :label="$t('products.description')" label-for="description">
          <b-form-input
            id="description"
            v-model="description"
            type="text"
            required
          ></b-form-input>
        </b-form-group>
        <div v-if="error">{{error}}</div>
        <b-button type="submit" :disabled="!isFormFilled">{{this.isEdit ? $t('edit') : $t('submit')}}</b-button>
      </b-form>
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
          description: this.description,
          tags: this.tags,
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
        this.error = this.$t('forms.fill_the_fields')
      }
    }
  },
  data() {
    return {
      name: '',
      price: '',
      error: '',
      description: '',
      tags: [],
      productId: null,
      availableTags: [],
      loading: false
    }
  },
  computed: {
    isFormFilled: function() {
      return this.name.length !== 0 && this.price !== 0
    },
    isEdit: function() {
      return this.productId !== 'new'
    },
    tagOptions: function() {
      return this.availableTags.map(tag => ({value: tag.id, text: tag.name}))
    }
  },
  mounted() {
    this.productId = this.$route.params.id
    if (this.productId !== 'new') {
      this.loading = true
      axios.get(`http://localhost:5000/products/${this.productId}`)
        .then(({data}) => {
          this.name = data.name
          this.price = data.price
          this.tags = data.tags
          this.loading = false
        })
    }
  },
  created() {
    axios.get(`http://localhost:5000/tags`)
      .then(({data}) => {
        this.availableTags = data
      })
  },
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

select {
  width: 100%;
  border: 1px solid gray;
  font-size: 50px;
}

textarea {
  border-radius: 4px;
  border: solid 1px black;
  min-height: 110px;
  color: black;
  width: 100%;
  resize: none;
  font-size: 15px;
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
