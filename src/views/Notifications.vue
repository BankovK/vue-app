<template>
  <div>
    <NotificationsList :notifications="notifications" @delete-notification="removeNotification"/>
    <NotificationForm :showNotificationForm="showNotificationForm" @close-notification-form="closeNotificationForm" @add-notification="addNotification" />
    <button @click="openNotificationForm()">Add</button>
  </div>
</template>

<script>
import axios from 'axios'
import NotificationsList from '../components/notifications/NotificationsList.vue'
import NotificationForm from '../components/notifications/NotificationForm.vue'

export default {
  name: 'Notifications',
  components: {
    NotificationsList,
    NotificationForm
  },
  data() {
    return {
      showNotificationForm: null,
      notifications: []
    }
  },
  methods: {
    openNotificationForm() {
      this.showNotificationForm = true
    },
    closeNotificationForm() {
      this.showNotificationForm = null
    },
    addNotification(notification) {
      this.notifications.push(notification)
    },
    removeNotification(id) {
      this.notifications = this.notifications.filter(notification => notification.id !== id)
    }
  },
  computed: {
    currentUser: function() {
      return this.$store.state.currentUser
    },
  },
  created() {
    axios.get(`http://localhost:5000/notifications?userId=0&userId=${this.currentUser.id}`)
      .then(({data}) => {
        this.notifications = data
      })
  },
}
</script>
