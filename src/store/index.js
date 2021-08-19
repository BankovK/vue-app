import moment from 'moment'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    currentUser: null,
    products: [
      {id: 1, name: 'Product1', price: '87', imageUrl: 'https://blogs.uoregon.edu/natewoodburyaad250/files/2012/10/PSD_Food_illustrations_3190_pancakes_with_butter-1wi1tz5.jpg'},
      {id: 2, name: 'Product2', price: '87', imageUrl: 'https://blogs.uoregon.edu/natewoodburyaad250/files/2012/10/PSD_Food_illustrations_3190_pancakes_with_butter-1wi1tz5.jpg'},
      {id: 3, name: 'Product3', price: '87', imageUrl: 'https://blogs.uoregon.edu/natewoodburyaad250/files/2012/10/PSD_Food_illustrations_3190_pancakes_with_butter-1wi1tz5.jpg'},
      {id: 4, name: 'Product4', price: '87', imageUrl: 'https://blogs.uoregon.edu/natewoodburyaad250/files/2012/10/PSD_Food_illustrations_3190_pancakes_with_butter-1wi1tz5.jpg'},
      {id: 5, name: 'Product5', price: '87', imageUrl: 'https://blogs.uoregon.edu/natewoodburyaad250/files/2012/10/PSD_Food_illustrations_3190_pancakes_with_butter-1wi1tz5.jpg'},
      {id: 6, name: 'Product6', price: '87', imageUrl: 'https://blogs.uoregon.edu/natewoodburyaad250/files/2012/10/PSD_Food_illustrations_3190_pancakes_with_butter-1wi1tz5.jpg'}
    ],
    orders: [],
    cart: [],
    showCart: false
  },
  mutations: {
    login: (state, user) => {
      state.currentUser = user
    },
    logout: (state) => {
      state.currentUser = null
    },
    addProduct: (state, product) => {
      state.products.push({
        id: state.products.length + 1,
        imageUrl: 'https://blogs.uoregon.edu/natewoodburyaad250/files/2012/10/PSD_Food_illustrations_3190_pancakes_with_butter-1wi1tz5.jpg',
        ...product
      })
    },
    addToCart: (state, product) => {
      state.cart.push(product)
    },
    removeFromCart: (state, index) => {
      state.cart.splice(index, 1);
      if (state.cart.length === 0) {
        state.showCart = false
      }
    },
    makeOrder: (state) => {
      state.orders.push({
        id: state.orders.length + 1,
        products: [...state.cart],
        totalPrice: state.cart.reduce((sum, product) => sum + +product.price, 0),
        orderTime: moment().toISOString()
      })
      state.cart = []
      state.showCart = false
    },
    toggleShowCart: (state) => {
      state.showCart = !state.showCart
    },
  }
})

export default store