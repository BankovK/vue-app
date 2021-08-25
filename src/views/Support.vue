<template>
  <div>
    <MessagesTable @open-reply-form="openReplyForm"/>
    <NotificationForm :showNotificationForm="replyMessageData !== null" :replyUserId="replyMessageData ? replyMessageData.userId : null" @close-notification-form="closeReplyForm" />
  </div>
</template>

<script>
import NotificationForm from '../components/notifications/NotificationForm.vue'
import MessagesTable from '../components/support/MessagesTable.vue'

export default {
  name: 'Support',
  components: {
    MessagesTable,
    NotificationForm
  },
  data() {
    return {
      replyMessageData: null 
    }
  },
  methods: {
    openReplyForm(messageData) {
      this.replyMessageData = messageData
    },
    closeReplyForm() {
      this.replyMessageData = null
    },
  }
}
</script>
