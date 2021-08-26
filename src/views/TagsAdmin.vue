<template>
  <div class="page-wrapper">
    <TagsTable :tags="tags" @open-tag-form="openTagForm" @delete-tag="removeTag"/>
    <TagForm :tagFormData="tagFormData" :tagNames="tagNames" @close-tag-form="closeTagForm" @add-tag="addTag" @update-tag="updateTag" />
    <button @click="openTagForm()">Add</button>
  </div>
</template>

<script>
import TagsTable from '../components/tags/TagsTable.vue'
import TagForm from '../components/tags/TagForm.vue'
import axios from 'axios'

export default {
  name: 'TagsAdmin',
  components: {
    TagsTable,
    TagForm
  },
  data() {
    return {
      tagFormData: null,
      tags: []
    }
  },
  computed: {
    tagNames: function() {
      return this.tags.map(_tag => _tag.name)
    }
  },
  methods: {
    openTagForm(data) {
      if (!data) {
        this.tagFormData = {
          name: '',
          priority: 1
        }
        return
      }
      this.tagFormData = data
    },
    closeTagForm() {
      this.tagFormData = null
    },
    addTag(tag) {
      this.tags.push(tag)
    },
    updateTag(tag) {
      const allTags = [...this.tags]
      allTags[allTags.findIndex(_tag => _tag.id === tag.id)] = tag
      this.tags = allTags
    },
    removeTag(id) {
      this.tags = this.tags.filter(tag => tag.id !== id)
    }
  },
  created() {
    axios.get(`http://localhost:5000/tags`)
      .then(({data}) => {
        this.tags = data
      })
  },
}
</script>

<style scoped>
  .page-wrapper {
    padding-top: 80px;
  }
</style>
