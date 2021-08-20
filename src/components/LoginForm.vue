<template>
  <div class="form-wrapper">
    <h1>Log In</h1>
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
      <div v-if="error">{{error}}</div>
      <button type="submit" :disabled="!isFormFilled">Sign up</button>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'LoginForm',
  methods: {
    ...mapActions([
      'fetchProducts'
    ]),
    onSubmit() {
      const userData = this.users.find(user => user.name === this.name && user.password === this.password)
      if (userData) {
        this.$store.commit('login', userData)
        if(!this.$store.state.products.wasRequested) {
            this.fetchProducts()
        }
        this.$router.push('products');
      } else {
        this.error = 'Wrong credentials'
      }
    }
  },
  data() {
    return {
      name: '',
      password: '',
      error: '',
      users: [
        {id: 1, name: 'test', password: 'test', role: 'ADMIN'},
        {id: 2, name: 'test2', password: 'test2', role: 'USER'}
      ]
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
  font-size: 50px;
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
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
