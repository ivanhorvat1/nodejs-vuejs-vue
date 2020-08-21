import Vue from 'vue'
import Vuevalidate from 'vuelidate'
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App.vue'

Vue.use(Vuevalidate)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
