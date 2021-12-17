import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state:{
      login:"http://localhost/api/login",
      data:"http://localhost/api/data",
      register:"http://localhost/api/register",
      user:{
      token:localStorage.WelcomeToken,
      tokenId:localStorage.WelcomeId,
      }
    }
  });


  