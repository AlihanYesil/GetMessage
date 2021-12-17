<template>
  <nav class="navbar nav-pills nav-fill  navbar-expand-lg navbar-light bg-white " >
    
  <router-link class="navbar-brand nav-item nav-link" tag="a" to="">GetMessage</router-link> 
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
    <div class="navbar-nav">
      
      
      <router-link tag="a" class="nav-item nav-link"  v-if="bilgi" to="/">Çıkış</router-link>
      <router-link tag="a" class="nav-item nav-link" v-if="!bilgi" to="/">Giriş Yap</router-link>
      
      
    </div>
  </div>
</nav>

</template>

<script>
export default{
data() {
  return {
    
      token:"",
      tokenId:""
  }
},
computed:{
  bilgi(){

  if(this.$store.state.user.token){
    return true
  }else{
    return false
  }
 
}
},
}
</script>
