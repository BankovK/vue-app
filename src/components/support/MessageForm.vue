<template>
  <div class="form-wrapper">
    <div>
      <h1>{{$t('messages.message_form_title')}}</h1>
      <b-form @submit.prevent="onSubmit">
        <b-form-group id="title-group" :label="$t('messages.title')" label-for="title">
          <b-form-input
            id="title"
            v-model="title"
            type="text"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group id="type-group" :label="$t('messages.type')" label-for="type">
          <b-form-select
            id="type"
            class="mb-2 mr-sm-2 mb-sm-0"
            :options="typeOptions"
            v-model="type"
          ></b-form-select>
        </b-form-group>
        <b-form-group id="description-group" :label="$t('messages.description')" label-for="description">
          <b-form-textarea
            id="description"
            v-model="description"
          ></b-form-textarea>
        </b-form-group>
        <div v-if="error">{{error}}</div>
        <b-button type="submit" :disabled="!isFormFilled">{{$t('messages.send')}}</b-button>
      </b-form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment';

export default {
  name: 'MessageForm',
  methods: {
    onSubmit() {
      if (this.isFormFilled) {
        const messageData = {
          title: this.title,
          description: this.description,
          type: this.type,
          created: moment().toISOString(),
          status: '1',
          userId: this.currentUser.id,
          userName: this.currentUser.name,
        }
        axios.post(`http://localhost:5000/contact`, messageData)
          .then(() => {
            this.title = ''
            this.description = ''
            this.type = '1'
            this.error = ''
          })
      } else {
        this.error = this.$t('forms.fill_the_fields')
      }
    }
  },
  data() {
    return {
      title: '',
      description: '',
      type: 'Bug report',
      error: '',
      typeOptions: [
        {text: this.$t('messages.types.bug_report'), value: 'Bug report'},
        {text: this.$t('messages.types.complaint'), value: 'Complaint'},
        {text: this.$t('messages.types.other'), value: 'Other'}
      ]
    }
  },
  computed: {
    isFormFilled: function() {
      return this.title.length !== 0 && this.description.length !== 0
    },
    currentUser: function() {
      return this.$store.state.currentUser
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.form-wrapper {
  padding-top: 60px;
  font-size: 50px;
  display: flex;
  justify-content: center;
}

select {
  width: 100%;
  border: 1px solid gray;
  font-size: 50px;
}

textarea {
  border-radius: 4px;
  border: solid 1px black;
  min-height: 110px;
  color: black;
  width: 100%;
  resize: none;
  font-size: 15px;
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
