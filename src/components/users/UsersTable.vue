<template>
  <div class="order-table-wrapper">
    <table class="order-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Created</th>
          <th>Role</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{user.name}}</td>
          <td>{{user.created | formatDateTime}}</td>
          <td>
            <select v-model="user.role" @change="(event) => changeRole(event, user.id)">
              <option value='USER'>Customer</option>
              <option value='ADMIN'>Admin</option>
              <option value='DELIVERY'>Delivery</option>
            </select>
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
  name: 'UsersTable',
  props: {
    users: Array
  },
  methods: {
    changeRole(event, id) {
      const { value } = event.target
      axios.patch(`http://localhost:5000/users/${id}`, {
        role: value,
      })
    }
  },
  filters: {
    formatDateTime: function(value) {
      return moment(value).format('YYYY-MM-DD HH:mm')
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.order-table-wrapper {
  padding-top: 80px;
  width: 80%;
  margin-left: 10%;
}

.order-table tbody {
  display: block;
  height: calc(100vh - 250px);
  overflow-y: auto;
}

.order-table th {
  background-color: burlywood;
}

.order-table tr {
  display: flex;
  text-align: center;
  border-bottom: 1px solid;
}

.order-table td,
.order-table th {
  flex-basis: 100%;
  flex-grow: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.order-table select {
  font-size: 28px;
}

.order-table {
  width: 100%;
  font-size: 32px;
}

.order-table__action-button {
  border-radius: 100px;
}
</style>
