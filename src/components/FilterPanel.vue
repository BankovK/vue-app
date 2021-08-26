<template>
  <div class="form-wrapper">
    <div v-if="loading">Loading...</div>
    <form @submit.prevent="onSubmit" v-else class="form">
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
        <label htmlFor="tags">Tags</label>
        <select multiple id="tags" v-model="tags">
          <option v-for="tag in availableTags" :value="tag.id" :key="tag.id">{{tag.name}}</option>
        </select>
      </div>
      <button type="submit">Search</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'FilterPanel',
  data() {
    return {
      name: '',
      tags: [],
      availableTags: [],
      loading: false
    }
  },
  methods: {
    onSubmit() {
      this.$emit('change-search-params', {name: this.name, tags: this.tags})
    },
  },
  created() {
    this.loading = true
    axios.get(`http://localhost:5000/tags`)
      .then(({data}) => {
        this.availableTags = data
        this.loading = false
      })
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.form-wrapper {
  padding-top: 80px;
  display: flex;
  justify-content: center;
}

.form {
  display: flex;
  justify-items: center;
  align-items: center;
}

select {
  width: 100%;
  border: 1px solid gray;
}

.form-wrapper label {
  display: block;
}

.form-wrapper input {
  display: block;
  box-shadow: 0 0 3px black;
  width: 100%;
}

.form-wrapper small {
  font-size: 25px;
  color: red;
}

.form-wrapper button {
  margin-top: 30px;
}

</style>
