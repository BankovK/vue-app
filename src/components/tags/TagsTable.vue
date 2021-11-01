<template>
  <div class="tags-table-wrapper">
    <b-table small :fields="fields" :items="tags">
      <template #cell(actions)="data">
        <b-button class="tags-table__action-button" @click="editTag(data.item)">{{$t('edit')}}</b-button>
        <b-button class="tags-table__action-button" @click="deleteTag(data.item.id)">{{$t('delete')}}</b-button>
      </template>
    </b-table>
  </div>
</template>

<script>
import axios from 'axios'
import { mapActions } from 'vuex'

export default {
  name: 'TagsTable',
  props: {
    tags: Array
  },
  data() {
    return {
      fields: [
        {
          key: 'name',
          label: this.$t('name'),
          sortable: true
        },
        {
          key: 'priority',
          label: this.$t('tags_admin.priority'),
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
    deleteTag(id) {
      axios.delete(`http://localhost:5000/tags/${id}`)
        .then(() => {
          this.setSnackbarMessage(this.$t('tags_admin.tag_deleted'))
          this.$emit('delete-tag', id)
        })
    },
    editTag(tag) {
      this.$emit('open-tag-form', tag)
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.tags-table-wrapper {
  width: 80%;
  margin-left: 10%;
}

.tags-table__action-button {
  border-radius: 100px;
}
</style>
