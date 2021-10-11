<template>
  <div class="form-wrapper">
    <div v-if="loading">{{$t('loading')}}</div>
    <b-form @submit.prevent="onSubmit" v-else class="form">
      <b-form-input
        id="product-name"
        v-model="name"
        class="m-2 mr-sm-2 mb-sm-0"
        :placeholder="$t('name')"
      ></b-form-input>

      <div v-if="showTags">
        <label class="mr-sm-2" for="tags">{{$t('tags')}}</label>
        <b-form-select
          id="tags"
          class="mb-2 mr-sm-2 mb-sm-0"
          :options="tagOptions"
          v-model="tags"
          multiple
        ></b-form-select>
      </div>
    </b-form>
  </div>
</template>

<script>

export default {
  name: 'FilterPanel',
  props: {
    showTags: Boolean,
    availableTags: Array,
    loading: Boolean,
    selectedTags: Array,
  },
  data() {
    return {
      name: '',
      tags: []
    }
  },
  computed: {
    tagOptions: function() {
      return this.availableTags.map(tag => ({value: tag.id, text: tag.name}))
    }
  },
  watch: {
    'name': 'onSubmit',
    'tags': 'onSubmit',
    'selectedTags': 'selectTags'
  },
  methods: {
    onSubmit() {
      this.$emit('change-search-params', {name: this.name, tags: this.tags})
    },
    selectTags() {
      this.tags = this.selectedTags
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.form-wrapper {
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
