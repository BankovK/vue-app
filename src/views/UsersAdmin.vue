<template>
  <div class="page-wrapper">
    <FilterPanel @change-search-params="changeSearchParams" />
    <UsersTable :users="filteredUsers"/>
    <UserForm :users="users" :showUserForm="showUserForm" @close-user-form="closeUserForm" @add-user="addUser" />
    <button @click="openUserForm">Add</button>
    <ExportButton @on-export="onExport" :exportData="exportData" />
  </div>
</template>

<script>
import UserForm from '../components/users/UserForm.vue'
import UsersTable from '../components/users/UsersTable.vue'
import axios from 'axios'
import FilterPanel from '../components/FilterPanel.vue'
import ExportButton from '../components/ExportButton.vue'

export default {
  name: 'UsersAdmin',
  components: {
    UsersTable,
    UserForm,
    FilterPanel,
    ExportButton
  },
  data() {
    return {
      showUserForm: false,
      searchName: '',
      users: [],
      exportData: null
    }
  },
  computed: {
    filteredUsers: function() {
      return this.users.filter(users => users.name.toLowerCase().includes(this.searchName.toLowerCase()))
    },
  },
  methods: {
    onExport() {
      this.exportData = this.filteredUsers.map(user => ({
        [this.$t('name')]: user.name,
        [this.$t('created_at')]: user.created,
        [this.$t('users.role')]: user.role,
      }))
    },
    changeSearchParams({name}) {
      this.searchName = name
    },
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
