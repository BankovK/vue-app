<template>
  <div class="navbar">
    <div v-if="cartCount" class="navbar-element cart" @click="toggleCart">Cart: {{cartCount}}</div>
    <div class="navbar-element logout-button" @click="logout">LogOut</div>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  props: {
    cartCount: Number
  },
  methods: {
    logout() {
      this.$emit('logout')
    },
    toggleCart() {
      this.$emit('toggle-cart')
    }
  },
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

.cart {
  user-select: none;
  background-color: black;
   color: white;
}

.cart:active,
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
