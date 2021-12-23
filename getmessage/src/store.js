import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state:{
      data:"http://localhost/api",
      token:"",
      tokenId:"",
      name:"",
      surname:"",
      isLogin : false
      
    },
    mutations: {
      setToken (state,token) {
        state.token=token; 
      },setId (state,id) {
        state.tokenId=id; 
      },setName (state,name) {
        state.name=name; 
      },setSurname (state,surname) {
        state.surname=surname; 
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


  