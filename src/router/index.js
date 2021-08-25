import Vue from 'vue'
import VueRouter from 'vue-router'
import Products from '../views/Products.vue'
import NewProduct from '../views/NewProduct.vue'
import ProductsAdmin from '../views/ProductsAdmin.vue'
import UsersAdmin from '../views/UsersAdmin.vue'
import Orders from '../views/Orders.vue'
import Support from '../views/Support.vue'
import ContactUs from '../views/ContactUs.vue'
import Notifications from '../views/Notifications.vue'
import FAQ from '../views/FAQ.vue'
import store from '../store'

Vue.use(VueRouter)

const checkRole = (...roles) => (to, from, next) => 
{
  if (!roles.includes(store.state.currentUser.role)) next({ name: 'Products' })
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
    beforeEnter: checkRole('ADMIN')
  },
  {
    path: '/products-admin',
    name: 'ProductsAdmin',
    component: ProductsAdmin,
    beforeEnter: checkRole('ADMIN')
  },
  {
    path: '/notifications',
    name: 'Notifications',
    component: Notifications
  },
  {
    path: '/contact-us',
    name: 'ContactUs',
    component: ContactUs
  },
  {
    path: '/support-admin',
    name: 'Support',
    component: Support,
    beforeEnter: checkRole('ADMIN', "SUPPORT")
  },
  {
    path: '/users-admin',
    name: 'UsersAdmin',
    component: UsersAdmin,
    beforeEnter: checkRole('ADMIN')
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