<template>
  <div class="navbar">
    <div v-if="cartCount" :class="{active: isCartOpen}" class="navbar-element cart" @click="toggleCart">{{!!this.$route.query['order-id'] ? 'Order Products:' : "Cart:"}} {{cartCount}}</div>
    <router-link to="/products" class="navbar-element">Products</router-link>
    <router-link v-if="isUserAdmin" to="/product/new" class="navbar-element">Add product</router-link>
    <router-link v-if="isUserAdmin" to="/products-admin" class="navbar-element">Products Admin</router-link>
    <router-link v-if="isUserAdmin" to="/tags-admin" class="navbar-element">Tags</router-link>
    <router-link to="/orders" class="navbar-element">Orders</router-link>
    <router-link v-if="isUserAdmin" to="/users-admin" class="navbar-element">Users</router-link>
    <router-link to="/contact-us" class="navbar-element">Contact Us</router-link>
    <router-link to="/notifications" class="navbar-element">Notifications</router-link>
    <router-link v-if="isUserAdmin || isUserSupport" to="/support-admin" class="navbar-element">Support Requests</router-link>
    <router-link to="/faq" class="navbar-element">FAQ</router-link>
    <div class="navbar-element logout-button" @click="logout">LogOut</div>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  methods: {
    logout() {
      this.$store.commit('logout')
    },
    toggleCart() {
      this.$store.commit('toggleShowCart')
    }
  },
  computed: {
    cartCount: function() {
      return this.$store.state.cart.length
    },
    isUserAdmin: function() {
      return this.$store.state.currentUser.role === 'ADMIN'
    },
    isUserSupport: function() {
      return this.$store.state.currentUser.role === 'SUPPORT'
    },
    isCartOpen: function() {
      return this.$store.state.showCart
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.navbar {
  position: fixed;
  width: 100%;
  display: block;
  overflow: hidden;
  background: black;
  padding: 10px;
}

.navbar-element {
  display: block;
  float: left;
  background-color: white;
  padding: 10px;
  border-radius: 100px;
  font-size: 30px;
  color: black;
  text-decoration: none;
  margin-left: 10px;
}

.navbar-element.router-link-active {
  background-color: burlywood;
}

.cart {
  user-select: none;
  background-color: black;
   color: white;
}

.cart.active,
.cart:hover {
  background-color: greenyellow;
  color: black;
  cursor: pointer;
}

.logout-button {
  float: right;
  margin-left: 0;
  margin-right: 10px;
  user-select: none;
}

.logout-button:active,
.logout-button:hover {
  background-color: greenyellow;
  color: black;
  cursor: pointer;
}
</style>
