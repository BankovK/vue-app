<template>
  <div class="form-wrapper">
    <h1>{{this.isRegister ? $t('register') : $t('login')}}</h1>
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
        <b-form-group v-if="this.isRegister" id="password-repeat-group" :label="$t('users.repeat_password')" label-for="password-repeat">
          <b-form-input
            id="password-repeat"
            v-model="passwordRepeat"
            type="password"
            required
          ></b-form-input>
        </b-form-group>
      <div v-if="error">{{error}}</div>
      <b-button type="button" variant="secondary" @click="toggleMode">{{this.isRegister ? $t('login') : $t('register')}}</b-button>
      <b-button type="submit" variant="primary" :disabled="!isFormFilled">{{this.isRegister ? $t('register') : $t('users.sign_up')}}</b-button>
    </b-form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import axios from 'axios'
import moment from 'moment'

export default {
  name: 'LoginForm',
  methods: {
    ...mapActions([
      'fetchProducts',
      'setSnackbarMessage'
    ]),
    onSubmit() {
      if (this.isRegister) {
        if (this.password !== this.passwordRepeat) {
          this.error = this.$t('forms.passwords_do_not_match')
          return
        }
        if (this.users.find(_user => _user.name === this.name)) {
          this.error = this.$t('forms.name_exists')
          return
        }
        axios.post("http://localhost:5000/users", {
          name: this.name,
          password: this.password,
          role: 'USER',
          created: moment().toISOString()
        })
          .then(() => {
            this.setSnackbarMessage(this.$t('users.user_added'))
            this.isRegister = false;
          })
        return
      }

      axios.get("http://localhost:5000/users", {
        params: {
          name: this.name,
          password: this.password
        }
      })
        .then(({data}) => {
          if (data.length === 1) {
            this.$store.commit('login', data[0])
            if(!this.$store.state.products.wasRequested) {
                this.fetchProducts()
            }
            this.$router.push('products')
          } else {
            this.error = 'Wrong credentials'
          }
        })
    },
    toggleMode() {
      this.isRegister = !this.isRegister
    }
  },
  data() {
    return {
      name: '',
      password: '',
      passwordRepeat: '',
      error: '',
      isRegister: false,
      users: []
    }
  },
  computed: {
    isFormFilled: function() {
      return this.name.length !== 0 && this.password.length !== 0
    }
  },
  mounted() {
    axios.get(`http://localhost:5000/users`)
      .then(({data}) => {
        this.users = data
      })
  },
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
