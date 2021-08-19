import Vue from 'vue'
import VueRouter from 'vue-router'
import Products from '../views/Products.vue'
import NewProduct from '../views/NewProduct.vue'
import Orders from '../views/Orders.vue'
import store from "../store"

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/products' },
  {
    path: '/products',
    name: 'Products',
    component: Products
  },
  {
    path: '/new-product',
    name: 'NewProduct',
    component: NewProduct,
    beforeEnter: (to, from, next) => 
    {
      if (store.state.currentUser.role !== 'ADMIN') next({ name: 'Products' })
      else next()
    }
  },
  {
    path: '/orders',
    name: 'Orders',
    component: Orders
  },
]

const router = new VueRouter({
  routes
})

export default router