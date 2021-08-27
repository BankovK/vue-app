import Vue from 'vue'
import App from './App.vue'
import VueI18n from 'vue-i18n'
import router from './router'
import store from './store'
import { BootstrapVueIcons } from 'bootstrap-vue'
import 'bootstrap-vue/dist/bootstrap-vue-icons.min.css'
import en from './i18/en.json'
import ru from './i18/ru.json'


Vue.use(VueI18n)
Vue.use(BootstrapVueIcons)

const messages = {
  en,
  ru
}

const i18n = new VueI18n({
  locale: localStorage.getItem('locale') || 'en', // set locale
  messages, // set locale messages
})

Vue.config.productionTip = false

new Vue({
  i18n,
  router,
  store,
  render: h => h(App),
}).$mount('#app')
