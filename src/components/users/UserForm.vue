<template>
  <div class="form-wrapper" :class="{ hidden: !showUserForm }">
    <h1>{{$t('register')}}</h1>
    <b-form @submit.prevent="onSubmit">
      <b-form-group id="username-register-group" :label="$t('name')" label-for="username-register">
        <b-form-input
          id="username-register"
          v-model="name"
          type="text"
          autoComplete="off"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group id="password-register-group" :label="$t('users.password')" label-for="password-register">
        <b-form-input
          id="password-register"
          v-model="password"
          type="password"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group id="password-repeat-group" :label="$t('users.repeat_password')" label-for="password-repeat">
        <b-form-input
          id="password-repeat"
          v-model="passwordRepeat"
          type="password"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group id="role-group" label="" label-for="role">
        <b-form-select
          id="role"
          class="mb-2 mr-sm-2 mb-sm-0"
          :options="roleOptions"
          v-model="role"
        ></b-form-select>
      </b-form-group>
      <div v-if="error">{{error}}</div>
      <b-button type="button" @click="closeForm">{{$t('cancel')}}</b-button>
      <b-button type="submit" :disabled="!isFormFilled">{{$t('submit')}}</b-button>
    </b-form>
  </div>
</template>

<script>
import moment from 'moment';
import { mapActions } from 'vuex'
import axios from 'axios'

export default {
  name: 'UserForm',
  props: {
    showUserForm: Boolean,
    users: Array
  },
  methods: {
    ...mapActions([
      'fetchProducts',
      'setSnackbarMessage'
    ]),
    onSubmit() {
      if (!this.name || !this.password) {
        this.error = this.$t('forms.fill_the_fields')
        return
      }
      if (this.users.find(_user => _user.name === this.name)) {
        this.error = this.$t('forms.name_exists')
        return
      }
      if (this.password !== this.passwordRepeat) {
        this.error = this.$t('forms.passwords_do_not_match')
        return
      }
      axios.post("http://localhost:5000/users", {
        name: this.name,
        password: this.password,
        role: this.role,
        created: moment().toISOString()
      })
        .then(({data}) => {
          this.setSnackbarMessage(this.$t('users.user_added'))
          this.$emit('add-user', data)
          this.closeForm()
        })
    },
    closeForm() {
      this.$emit('close-user-form')
    },
    resetForm() {
      this.name = ''
      this.password = ''
      this.passwordRepeat = ''
      this.role = 'USER'
      this.error = ''
    }
  },
  data() {
    return {
      name: '',
      password: '',
      passwordRepeat: '',
      role: 'USER',
      error: '',
      roleOptions: [
        {value: 'USER', text: this.$t('users.roles.customer')},
        {value: 'ADMIN', text: this.$t('users.roles.admin')},
        {value: 'DELIVERY', text: this.$t('users.roles.delivery')},
        {value: 'SUPPORT', text: this.$t('users.roles.support')}
      ]
    }
  },
  computed: {
    isFormFilled: function() {
      return this.name.length !== 0 && this.password.length !== 0 && this.passwordRepeat.length !== 0
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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

select {
  width: calc(100% - 20px);
  margin: 10px;
  font-size: 50px;
}

.form-wrapper h1 {
  text-align: center;
}

.form-wrapper .input-invalid {
  background-color: red;
}

.form-wrapper input {
  display: block;
  box-shadow: 0 0 3px black;
  font-size: 50px;
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
