import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import {routes} from './routes';
import Vuelidate from 'vuelidate';
import Vuex from 'vuex';
import VueSocketIO from 'vue-socket.io';
import SocketIO from 'socket.io-client';


const socketConnection = SocketIO('http://192.168.137.232:3000');

Vue.config.productionTip = false
Vue.use(Vuex);
 Vue.use(VueRouter);
 Vue.use(Vuelidate);

 const router =new VueRouter({
  routes:routes,
  mode : 'history',

 });

  import store from './store';


  
Vue.use(new VueSocketIO({
  debug : true,
  connection: socketConnection
}));

new Vue({
  router:router,
  store,
  render: h => h(App),
}).$mount('#app')
