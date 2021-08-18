<template>
  <div id="app">
    <div v-if="!currentUser">
      <Login @login-sumbitted="onLogin" />
    </div>
    <div v-else>
      <Navbar :cartCount="cart.length" @logout="onLogout" @toggle-cart="onToggleCart"/>
      <Cart :show="showCart" :contents="cart" @remove-form-cart="onRemoveFromCart"/>
      <Products @add-product-to-cart="onAddToCart" />
    </div>
  </div>
</template>

<script>
import Login from './components/Login.vue'
import Navbar from './components/Navbar.vue'
import Cart from './components/Cart.vue'
import Products from './components/Products.vue'

export default {
  name: 'App',
  components: {
    Login,
    Cart,
    Navbar,
    Products
  },
  methods: {
    onLogin(user) {
      this.currentUser = user
    },
    onLogout() {
      this.currentUser = null
    },
    onAddToCart(product) {
      this.cart.push(product)
    },
    onRemoveFromCart(id) {
      this.cart = this.cart.filter(product => product.id !== id)
      if (this.cart.length === 0) {
        this.showCart = false
      }
    },
    onToggleCart() {
      this.showCart = !this.showCart
    }
  },
  data() {
    return {
      currentUser: null,
      cart: [],
      showCart: false
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
