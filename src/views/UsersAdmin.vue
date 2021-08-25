<template>
  <div>
    <UsersTable :users="users"/>
    <UserForm :showUserForm="showUserForm" @close-user-form="closeUserForm" @add-user="addUser" />
    <button @click="openUserForm">Add</button>
  </div>
</template>

<script>
import UserForm from '../components/users/UserForm.vue'
import UsersTable from '../components/users/UsersTable.vue'
import axios from 'axios'

export default {
  name: 'UsersAdmin',
  components: {
    UsersTable,
    UserForm
  },
  data() {
    return {
      showUserForm: false,
      users: []
    }
  },
  methods: {
    openUserForm() {
      this.showUserForm = true
    },
    closeUserForm() {
      this.showUserForm = false
    },
    addUser(user) {
      this.users.push(user)
    }
  },
  created() {
    axios.get(`http://localhost:5000/users`)
      .then(({data}) => {
        this.users = data
      })
  },
}
</script>
