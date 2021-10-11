<template>
  <div class="order-table-wrapper">
    <b-table small :fields="fields" :items="users">
      <template #cell(created)="data">
        {{data.value | formatDateTime}}
      </template>
      <template #cell(role)="data">
        {{data.item.role}}
        <b-form-select
          id="role"
          class="mb-2 mr-sm-2 mb-sm-0"
          :options="roleOptions"
          v-model="data.item.role"
          @change="(value) => changeRole(value, data.item.id)"
        ></b-form-select>
      </template>
    </b-table>
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
  data() {
    return {
      fields: [
        {
          key: 'name',
          label: this.$t('name'),
          sortable: true
        },
        {
          key: 'created',
          label: this.$t('created_at'),
          sortable: true
        },
        {
          key: 'role',
          label: this.$t('users.role'),
          sortable: true
        }
      ],
      roleOptions: [
        {value: 'USER', text: this.$t('users.roles.customer')},
        {value: 'ADMIN', text: this.$t('users.roles.admin')},
        {value: 'DELIVERY', text: this.$t('users.roles.delivery')},
        {value: 'SUPPORT', text: this.$t('users.roles.support')}
      ]
    }
  },
  methods: {
    changeRole(value, id) {
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
  width: 80%;
  margin-left: 10%;
}

.order-table__action-button {
  border-radius: 100px;
}
</style>
