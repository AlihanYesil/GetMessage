import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import {routes} from './routes';
import Vuelidate from 'vuelidate';
import Vuex from 'vuex';
import VueSocketIO from 'vue-socket.io';



Vue.config.productionTip = false
Vue.use(Vuex);
 Vue.use(VueRouter);
 Vue.use(Vuelidate);
 Vue.use(new VueSocketIO({
  connection: 'http://localhost:3000'}));

 const router =new VueRouter({
  routes:routes,
  mode : 'history',

 });

  import store from './store';


new Vue({
  router:router,
  store,
  render: h => h(App),
}).$mount('#app')
