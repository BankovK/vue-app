import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    currentUser: null,
    products: {
      data: [],
      wasRequested: false
    },
    orders: {
      data: [],
      wasRequested: false
    },
    cart: [],
    snackbarMessage: null,
    showCart: false,
    productInTransfer: null
  },
  actions: {
    addToCart: ({ commit, state }, payload) => {
      const productIndex = state.cart.findIndex(_product => _product.id === payload.id)
      if (productIndex !== -1) {
        commit('increaseQuantity', productIndex)
      } else {
        commit('addToCart', payload)
      }
    },
    increaseQuantity: ({ commit }, payload) => {
      commit('increaseQuantity', payload)
    },
    decreaseQuantity: ({ commit, state }, payload) => {
      const changedItem = state.cart[payload]
      if (changedItem.quantity > 1) {
        commit('decreaseQuantity', payload)
      } else {
        commit('removeFromCart', payload)
      }
    },
    fetchProducts: ({ commit }) => {
      async function fetchProducts() {
        const { data } = await axios.get("http://localhost:5000/products")
        commit('setProducts', data)
      }
      fetchProducts()
    },
    fetchOrders: ({ commit }, payload) => {
      async function fetchProducts() {
        const userId = payload
        const { data } = await axios.get("http://localhost:5000/orders", {
          params: {
            userId
          }
        })
        commit('setOrders', data)
      }
      fetchProducts()
    },
    setSnackbarMessage: ({ commit }, payload) => {
      commit('setSnackbarMessage', payload)
    },
    clearSnackbar: ({ commit }) => {
      commit('clearSnackbar')
    }
  },
  mutations: {
    login: (state, user) => {
      state.currentUser = user
    },
    logout: (state) => {
      state.currentUser = null
    },
    setProducts: (state, products) => {
      state.products = {
        data: products,
        wasRequested: true
      }
    },
    addProduct: (state, product) => {
      state.products.data.push(product)
    },
    setProductInTransfer: (state, product) => {
      state.productInTransfer = product
    },
    updateProduct: (state, product) => {
      const allProducts = [...state.products.data]
      allProducts[allProducts.findIndex(_product => _product.id === product.id)] = product
      state.products.data = allProducts
    },
    deleteProduct: (state, id) => {
      state.products.data = state.products.data.filter(product => product.id !== id)
    },
    setCart: (state, products) => {
      state.cart = [...products]
    },
    addToCart: (state, product) => {
      state.cart.push({...product, quantity: 1})
    },
    increaseQuantity: (state, index) => {
      const cart = [...state.cart]
      cart[index].quantity++
      state.cart = cart
    },
    decreaseQuantity: (state, index) => {
      const cart = [...state.cart]
      cart[index].quantity--
      state.cart = cart
    },
    setSnackbarMessage: (state, message) => {
      state.snackbarMessage = message
    },
    clearSnackbar: (state) => {
      state.snackbarMessage = null
    },
    removeFromCart: (state, index) => {
      state.cart.splice(index, 1);
      if (state.cart.length === 0) {
        state.showCart = false
      }
    },
    setOrders: (state, orders) => {
      state.orders = {
        data: [...orders],
        wasRequested: true
      }
    },
    makeOrder: (state, order) => {
      state.orders.data.push(order)
      state.cart = []
      state.showCart = false
    },
    editOrder: (state, order) => {
      const allOrders = [...state.orders.data]
      allOrders[allOrders.findIndex(_order => _order.id === order.id)] = order
      state.orders.data = allOrders
      state.cart = []
      state.showCart = false
    },
    deleteOrder: (state, id) => {
      state.orders.data = state.orders.data.filter(order => order.id !== id)
    },
    toggleShowCart: (state) => {
      state.showCart = !state.showCart
    },
  }
})

export default store