<template>
  <div class="form-wrapper" v-if="showNotificationForm" >
    <div>
      <h1>{{replyUserId ? 'Reply' : 'New Notification'}}</h1>
      <form @submit.prevent="onSubmit">
        <div>
          <label htmlFor="title">Title</label>
          <input
            v-model="title"
            id="title"
            type="text"
            autoComplete="off"
          />
        </div>
        <div>
          <label htmlFor="text">Text</label>
          <textarea
            v-model="text"
            id="text"
          />
        </div>
        <div v-if="error">{{error}}</div>
        <button type="button" @click="closeForm">Cancel</button>
        <button type="submit">Submit</button>
      </form>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import axios from 'axios';

export default {
  name: 'NotificationForm',
  props: {
    showNotificationForm: Boolean,
    replyUserId: Number
  },
  data() {
    return {
      error: '',
      title: '',
      text: ''
    }
  },
  methods: {
    onSubmit() {
      if (!this.title || !this.text) {
        this.error = 'Fill the fields'
        return
      }
      const notificationData = {
        title: this.title,
        text: this.text,
        userId: 0
      }
      if (this.replyUserId) {
        notificationData.userId = this.replyUserId
      }
      notificationData.creationTime = moment().toISOString()
      axios.post("http://localhost:5000/notifications", notificationData)
        .then(({data}) => {
          this.title = ''
          this.text = ''
          this.error = ''
          this.$emit('add-notification', data)
          this.closeForm()
        })
    },
    closeForm() {
      this.error = ''
      this.$emit('close-notification-form')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
textarea {
  border-radius: 4px;
  border: solid 1px black;
  min-height: 110px;
  color: black;
  width: 100%;
  resize: none;
  font-size: 15px;
}

.form-wrapper {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid black;
  border-radius: 30px;
  overflow: hidden;
  font-size: 30px;
  background-color: white;
  padding: 10px;
}

.form-wrapper h1 {
  text-align: center;
}

.form-wrapper label {
  display: block;
}

.form-wrapper .input-invalid {
  background-color: red;
}

.form-wrapper input {
  display: block;
  box-shadow: 0 0 3px black;
  font-size: 50px;
  width: 100%;
}

.form-wrapper small {
  font-size: 25px;
  color: red;
}

.form-wrapper .request-message-loading {
  background-color: yellow;
  border-radius: 10px;
  text-align: center;
}

.form-wrapper .request-message-failed {
  background-color: red;
  border-radius: 10px;
  text-align: center;
}

.form-wrapper button {
  margin-top: 30px;
  font-size: 50px;
}

.form-wrapper button:last-child {
  float: right;
}

</style>
