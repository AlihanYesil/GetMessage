<template>
  <nav class="navbar nav-pills nav-fill  navbar-expand-lg navbar-light bg-white " >
    
<router-link class="navbar-brand nav-item nav-link" tag="a" to="/index">GetMessage</router-link> 
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
    <div class="navbar-nav">
      
     <router-link tag="a" class="nav-item nav-link"   v-if="isLogin" to="/profil">Profilim</router-link>   
     <router-link tag="a" class="nav-item nav-link" v-if="isLogin" to="/"><span @click="deleteToken" >Çıkış</span></router-link>  
      <router-link tag="a" class="nav-item nav-link" v-if="!isLogin" to="/">Giriş Yap</router-link>
      
      
      
    </div>
  </div>
</nav>

</template>

<script>
export default{
  data() {
    return {
    }
  },
  methods: {
    deleteToken(){
      this.$store.commit("setToken","");
      this.$store.commit("setId","");
      this.$store.commit("setName","");
      this.$store.commit("setSurname","");
      localStorage.removeItem("WelcomeToken");
      localStorage.removeItem("WelcomeId");
      localStorage.removeItem("WelcomeName");
      localStorage.removeItem("WelcomeSurname");
      this.$store.commit("loginChangeStatus",false)
      this.$socket.emit("cikis",this.$store.state.tokenId)
    }
  },
  computed: {
    isLogin(){
      return this.$store.getters.isLogin
    }
  },
}
</script>
