import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import axiosInstance from './util/axios'
import VueParticles from 'vue-particles'
Vue.prototype.axios = axiosInstance
Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(VueParticles)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
