<template>
  <div class="page-wrapper">
    <div v-if="loading">{{$t('loading')}}</div>
    <div v-else>
      <FilterPanel @change-search-params="changeSearchParams" />
      <MessagesTable :messages="filteredMessages" @open-reply-form="openReplyForm"/>
      <NotificationForm :showNotificationForm="replyMessageData !== null" :replyUserId="replyMessageData ? replyMessageData.userId : null" @close-notification-form="closeReplyForm" />
    </div>
  </div>
</template>

<script>
import FilterPanel from '../components/FilterPanel.vue'
import NotificationForm from '../components/notifications/NotificationForm.vue'
import MessagesTable from '../components/support/MessagesTable.vue'
import axios from 'axios'

export default {
  name: 'Support',
  components: {
    MessagesTable,
    NotificationForm,
    FilterPanel
  },
  data() {
    return {
      replyMessageData: null,
      searchName: '',
      loading: false,
      messages: []
    }
  },
  computed: {
    filteredMessages: function() {
      return this.messages.filter(message => message.title.toLowerCase().includes(this.searchName.toLowerCase()))
    },
  },
  methods: {
    changeSearchParams({name}) {
      this.searchName = name
    },
    openReplyForm(messageData) {
      this.replyMessageData = messageData
    },
    closeReplyForm() {
      this.replyMessageData = null
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
