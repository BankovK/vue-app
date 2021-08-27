<template>
  <div class="page-wrapper">
    <FilterPanel @change-search-params="changeSearchParams" />
    <TagsTable :tags="filteredTags" @open-tag-form="openTagForm" @delete-tag="removeTag"/>
    <TagForm :tagFormData="tagFormData" :tagNames="tagNames" @close-tag-form="closeTagForm" @add-tag="addTag" @update-tag="updateTag" />
    <button @click="openTagForm()">Add</button>
    <ExportButton @on-export="onExport" :exportData="exportData" />
  </div>
</template>

<script>
import TagsTable from '../components/tags/TagsTable.vue'
import TagForm from '../components/tags/TagForm.vue'
import axios from 'axios'
import FilterPanel from '../components/FilterPanel.vue'
import ExportButton from '../components/ExportButton.vue'

export default {
  name: 'TagsAdmin',
  components: {
    TagsTable,
    TagForm,
    FilterPanel,
    ExportButton
  },
  data() {
    return {
      tagFormData: null,
      tags: [],
      searchName: '',
      exportData: null
    }
  },
  computed: {
    tagNames: function() {
      return this.tags.map(_tag => _tag.name)
    },
    filteredTags: function() {
      return this.tags.filter(tags => tags.name.toLowerCase().includes(this.searchName.toLowerCase()))
    },
  },
  methods: {
    onExport() {
      this.exportData = this.filteredTags.map(tag => ({
        [this.$t('name')]: tag.name,
        [this.$t('tags_admin.priority')]: tag.priority
      }))
    },
    changeSearchParams({name}) {
      this.searchName = name
    },
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
