<template>
  <div class="tags-table-wrapper">
    <table class="tags-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Priority</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="tag in tags" :key="tag.id">
          <td>{{tag.name}}</td>
          <td>{{tag.priority}}</td>
          <td>
            <button class="tags-table__action-button" @click="editTag(tag)">Edit</button>
            <button class="tags-table__action-button" @click="deleteTag(tag.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'TagsTable',
  props: {
    tags: Array
  },
  methods: {
    deleteTag(id) {
      axios.delete(`http://localhost:5000/tags/${id}`)
        .then(() => this.$emit('delete-tag', id))
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

.tags-table tbody {
  display: block;
  height: calc(100vh - 250px);
  overflow-y: auto;
}

.tags-table th {
  background-color: burlywood;
}

.tags-table tr {
  display: flex;
  text-align: center;
  border-bottom: 1px solid;
}

.tags-table td,
.tags-table th {
  flex-basis: 100%;
  flex-grow: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.tags-table select {
  font-size: 28px;
}

.tags-table {
  width: 100%;
  font-size: 32px;
}

.tags-table__action-button {
  border-radius: 100px;
}
</style>
