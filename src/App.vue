<template>
  <div id="app">
    <div v-if="notLoggedIn">
      <Login />
    </div>
    <div v-else>
      <Navbar />
      <Cart />
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
      'fetchProducts'
    ]),
  },
  computed: {
    notLoggedIn: function() {
      return !this.$store.state.currentUser
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
button {
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
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
