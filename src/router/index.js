import Vue from 'vue'
import VueRouter from 'vue-router'
import Products from '../views/Products.vue'
import NewProduct from '../views/NewProduct.vue'
import ProductsAdmin from '../views/ProductsAdmin.vue'
import UsersAdmin from '../views/UsersAdmin.vue'
import Orders from '../views/Orders.vue'
import FAQ from '../views/FAQ.vue'
import store from '../store'

Vue.use(VueRouter)

const checkIfAdmin = (to, from, next) => 
{
  if (store.state.currentUser.role !== 'ADMIN') next({ name: 'Products' })
  else next()
}

const routes = [
  { path: '/', redirect: '/products' },
  {
    path: '/products',
    name: 'Products',
    component: Products
  },
  {
    path: '/product/:id',
    name: 'EditProduct',
    component: NewProduct,
    beforeEnter: checkIfAdmin
  },
  {
    path: '/products-admin',
    name: 'ProductsAdmin',
    component: ProductsAdmin,
    beforeEnter: checkIfAdmin
  },
  {
    path: '/users-admin',
    name: 'UsersAdmin',
    component: UsersAdmin,
    beforeEnter: checkIfAdmin
  },
  {
    path: '/faq',
    name: 'FAQ',
    component: FAQ,
  },
  {
    path: '/orders',
    name: 'Orders',
    component: Orders,
  },
]

const router = new VueRouter({
  routes
})

export default router