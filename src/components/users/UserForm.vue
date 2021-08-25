<template>
  <div class="form-wrapper" :class="{ hidden: !showUserForm }">
    <h1>Register</h1>
    <form @submit.prevent="onSubmit">
      <div>
        <label htmlFor="username-register">Username</label>
        <input
          v-model="name"
          id="username-register"
          type="text"
          autoComplete="off"
        />
      </div>
      <div>
        <label htmlFor="password-register">Password</label>
        <input
          v-model="password"
          id="password-register"
          type="password"
        />
      </div>
      <div>
        <label htmlFor="password-repeat">Repeat Password</label>
        <input
          v-model="passwordRepeat"
          id="password-repeat"
          type="password"
        />
      </div>
      <div>
        <select v-model="role">
          <option value='USER'>Customer</option>
          <option value='ADMIN'>Admin</option>
          <option value='DELIVERY'>Delivery</option>
          <option value='SUPPORT'>Support</option>
        </select>
      </div>
      <div v-if="error">{{error}}</div>
      <button type="button" @click="closeForm">Cancel</button>
      <button type="submit" :disabled="!isFormFilled">Submit</button>
    </form>
  </div>
</template>

<script>
import moment from 'moment';
import { mapActions } from 'vuex'
import axios from 'axios'

export default {
  name: 'UserForm',
  props: {
    showUserForm: Boolean
  },
  methods: {
    ...mapActions([
      'fetchProducts'
    ]),
    onSubmit() {
      if (!this.name) {
        this.error = 'Name is mandatory'
        return
      }
      if (this.password !== this.passwordRepeat) {
        this.error = 'Passwords do not match'
        return
      }
      axios.post("http://localhost:5000/users", {
        name: this.name,
        password: this.password,
        role: this.role,
        created: moment().toISOString()
      })
        .then(({data}) => {

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
    }
  },
  computed: {
    isFormFilled: function() {
      return this.name.length !== 0 && this.password.length !== 0
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
  border: 1px solid gray;
  font-size: 50px;
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
  margin: 10px;
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
