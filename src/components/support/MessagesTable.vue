<template>
  <div class="messages-table-wrapper">

    <b-table small :fields="fields" :items="messages">
      <template #cell(created)="data">
        {{data.value | formatDateTime}}
      </template>
      <template #cell(status)="data">
        <b-form-select
          id="status"
          class="mb-2 mr-sm-2 mb-sm-0"
          :options="statusOptions"
          v-model="data.item.status"
          @change="(value) => changeStatus(value, data.item.id)"
          :disabled="!checkIfAllowedToChangeStatus(data.item)"
        ></b-form-select>
      </template>
      <template #cell(actions)="data">
        <b-button class="messages-table__action-button" @click="replyToMessage(data.item)">{{$t('messages.reply')}}</b-button>
      </template>
    </b-table>
  </div>
</template>

<script>
import moment from 'moment';
import axios from 'axios';
import { mapActions } from 'vuex';

export default {
  name: 'MessagesTable',
  props: {
    messages: Array
  },
  data() {
    return {
      fields: [
        {
          key: 'title',
          label: this.$t('messages.title'),
          sortable: true
        },
        {
          key: 'type',
          label: this.$t('messages.type'),
          sortable: true
        },
        {
          key: 'created',
          label: this.$t('created_at'),
          sortable: true
        },
        {
          key: 'userName',
          label: this.$t('messages.created_by'),
          sortable: true
        },
        {
          key: 'status',
          label: this.$t('status'),
          sortable: true
        },
        {
          key: 'actions',
          label: '',
          sortable: false
        }
      ],
      statusOptions: [
        {value: '1', text: this.$t('statuses.to_do')},
        {value: '2', text: this.$t('statuses.in_progress')},
        {value: '3', text: this.$t('statuses.resolved')}
      ]
    }
  },
  methods: {
    ...mapActions([
      'setSnackbarMessage'
    ]),
    changeStatus(event, id) {
      const { value } = event.target
      axios.patch(`http://localhost:5000/contact/${id}`, {
        status: +value,
        lockedByUserId: value !== "1" ? this.currentUser.id : 0
      }).then(() => {
        this.setSnackbarMessage(this.$t('messages.status_changed'))
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
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.messages-table-wrapper {
  width: 80%;
  margin-left: 10%;
}

.messages-table__action-button {
  border-radius: 100px;
}
</style>
