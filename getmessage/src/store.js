import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state:{
      data:"http://localhost/api",
      token:"",
      tokenId:"",
      isLogin : false
      
    },
    mutations: {
      setToken (state,token) {
        state.token=token; 
      },
      loginChangeStatus(state,status){
        if(status){
          state.isLogin = true
        }else{
          state.isLogin = false
        }
      }
    },
    getters : {
      isLogin(state){
        return state.isLogin
      }
   
   }
});


  