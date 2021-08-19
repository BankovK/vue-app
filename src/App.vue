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

export default {
  name: 'App',
  components: {
    Login,
    Cart,
    Navbar,
  },
  computed: {
    notLoggedIn: function() {
      return !this.$store.state.currentUser
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
* {
  margin: 0;
  padding: 0;
}
</style>
