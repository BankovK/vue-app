<template>
  <div class="page-wrapper">
    <div class="notification-card" v-for="notification in notifications" :key="notification.id">
      <h3 class="notification-card__notification">
        {{notification.title}}
        <span v-if="isUserAdmin" class="button-line">
          <button type="button" @click="deleteNotification(notification)">{{$t('delete')}}</button>
        </span>
      </h3>
      <div>{{notification.text}}</div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapActions } from 'vuex'

export default {
  name: 'NotificationsList',
  props: {
    notifications: Array
  },
  methods: {
    ...mapActions([
      'setSnackbarMessage'
    ]),
    deleteNotification(notification) {
      axios.delete(`http://localhost:5000/notifications/${notification.id}`)
        .then(() => {
          this.setSnackbarMessage(this.$t('notifications.notification_deleted'))
          this.$emit('delete-notification', notification.id)
        })
    },
  },
  computed: {
    isUserAdmin: function() {
      return this.$store.state.currentUser.role === 'ADMIN'
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.page-wrapper {
  padding-top: 80px;
  font-size: 30px;
}
.notification-card {
  width: 100%;
  border: 4px solid black;
  border-radius: 100px;
  margin: 10px;
  text-align: center;
  overflow: hidden;
}
.notification-card__notification {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
