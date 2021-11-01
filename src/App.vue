<template>
  <div id="app">
    <div v-if="notLoggedIn">
      <Login />
    </div>
    <div v-else>
      <Navbar />
      <Cart />
      <div class="snackbar" v-if="snackbarMessage" @click="clearSnackbar">
        {{snackbarMessage}}
      </div>
      <router-view/>
    </div>
  </div>
</template>

<script>
import Login from './views/Login.vue'
import Cart from './components/Cart.vue'
import Navbar from './components/Navbar.vue'
import { mapActions } from 'vuex'

export default {
  name: 'App',
  components: {
    Login,
    Cart,
    Navbar,
  },
  methods: {
    ...mapActions([
      'fetchProducts',
      'clearSnackbar'
    ]),
  },
  computed: {
    notLoggedIn: function() {
      return !this.$store.state.currentUser
    },
    snackbarMessage: function() {
      return this.$store.state.snackbarMessage
    }
  },
  created() {
    if (!this.notLoggedIn) {
      this.fetchProducts()
    }
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.page-wrapper {
  padding-top: 80px;
}
.hidden {
  display: none !important;
}
button, .button {
  text-decoration: none;
  border: 4px solid black;
  background-color: black;
  color: white;
  padding: 4px;
  user-select: none;
}
button:hover {
  background-color: white;
  color: black;
  cursor: pointer;
}
.button-line {
  display: flex;
}
.snackbar {
  position: fixed;
  bottom: 10px;
  left: 20px;
  z-index: 10;

  border: 5px solid black;
  border-radius: 50px;
  background-color: green;
  color: white;
  padding: 10px;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
