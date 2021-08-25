<template>
  <div class="messages-table-wrapper">
    <div v-if="loading">Loading...</div>
    <table class="messages-table" v-else>
      <thead>
        <tr>
          <th>Title</th>
          <th>Type</th>
          <th>Created At</th>
          <th>Created By</th>
          <th>Status</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="message in messages" :key="message.id">
          <td>{{message.title}}</td>
          <td>{{message.type}}</td>
          <td>{{message.created | formatDateTime}}</td>
          <td>{{message.userName}}</td>
          <td>
            <select v-model="message.status" @change="(event) => changeStatus(event, message.id)" :disabled="!checkIfAllowedToChangeStatus(message)">
              <option value='1'>To Do</option>
              <option value='2'>In Progress</option>
              <option value='3'>Resolved</option>
            </select>
          </td>
          <td>
            <button class="messages-table__action-button" @click="replyToMessage(message)">Reply</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import moment from 'moment';
import axios from 'axios'

export default {
  name: 'MessagesTable',
  data() {
    return {
      messages: [],
      loading: false
    }
  },
  methods: {
    changeStatus(event, id) {
      const { value } = event.target
      axios.patch(`http://localhost:5000/contact/${id}`, {
        status: +value,
        lockedByUserId: value !== "1" ? this.currentUser.id : 0
      })
    },
    checkIfAllowedToChangeStatus(message) {
      return [undefined, 0, this.currentUser.id].includes(message.lockedByUserId)
    },
    replyToMessage(message) {
      this.$emit('open-reply-form', message)
    }
  },
  computed: {
    currentUser: function() {
      return this.$store.state.currentUser
    },
  },
  filters: {
    formatDateTime: function(value) {
      return moment(value).format('YYYY-MM-DD HH:mm')
    },
  },
  created() {
    this.loading = true
    axios.get(`http://localhost:5000/contact`)
      .then(({data}) => {
        this.messages = data
        this.loading = false
      })
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.messages-table-wrapper {
  padding-top: 80px;
  width: 80%;
  margin-left: 10%;
}

.messages-table tbody {
  display: block;
  height: calc(100vh - 250px);
  overflow-y: auto;
}

.messages-table th {
  background-color: burlywood;
}

.messages-table tr {
  display: flex;
  text-align: center;
  border-bottom: 1px solid;
}

.messages-table td,
.messages-table th {
  flex-basis: 100%;
  flex-grow: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.messages-table select {
  font-size: 28px;
}

.messages-table {
  width: 100%;
  font-size: 32px;
}

.messages-table__action-button {
  border-radius: 100px;
}
</style>
