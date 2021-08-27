<template>
  <div class="navbar">
    <div v-if="cartCount" :class="{active: isCartOpen}" class="navbar-element cart" @click="toggleCart">{{!!this.$route.query['order-id'] ? $t('navbar.order_products') : $t('navbar.cart')}} {{cartCount}}</div>
    <router-link to="/products" class="navbar-element">{{$t('navbar.products')}}</router-link>
    <router-link v-if="isUserAdmin" to="/products-admin" class="navbar-element">{{$t('navbar.products_admin')}}</router-link>
    <router-link v-if="isUserAdmin" to="/tags-admin" class="navbar-element">{{$t('tags')}}</router-link>
    <router-link to="/orders" class="navbar-element">{{$t('navbar.orders')}}</router-link>
    <router-link v-if="isUserAdmin" to="/users-admin" class="navbar-element">{{$t('navbar.users')}}</router-link>
    <router-link to="/contact-us" class="navbar-element">{{$t('navbar.contact_us')}}</router-link>
    <router-link to="/notifications" class="navbar-element">{{$t('navbar.notifications')}}</router-link>
    <router-link v-if="isUserAdmin || isUserSupport" to="/support-admin" class="navbar-element">{{$t('navbar.support_requests')}}</router-link>
    <router-link to="/faq" class="navbar-element">{{$t('navbar.faq')}}</router-link>
    <div class="navbar-element right-side-button" @click="logout">{{$t('navbar.logout')}}</div>
    <div class="navbar-element right-side-button" @click="switchLanguages">{{this.$i18n.locale === 'en' ? 'ru' : 'en'}}</div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Navbar',
  methods: {
    ...mapActions([
      'changeLocale'
    ]),
    switchLanguages() {
      const newLocale = localStorage.getItem('locale') === 'en' ? 'ru' : 'en'
      localStorage.setItem('locale', newLocale)
      this.$i18n.locale = newLocale
    },
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

.right-side-button {
  float: right;
  margin-left: 0;
  margin-right: 10px;
  user-select: none;
}

.right-side-button:active,
.right-side-button:hover {
  background-color: greenyellow;
  color: black;
  cursor: pointer;
}
</style>
