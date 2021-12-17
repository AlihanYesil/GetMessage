<template>
  <div id="app">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <app-header v-if="header"></app-header>
          <hr>
          <router-view> </router-view>  
        </div>
      </div>
    </div>
  </div>
</template>
 
<script>
import Header from "./components/Header";

export default {
  name: "App",
  components: {
    appHeader:Header,
    
  },
  data() {
    return {
      header:true,
      
    }
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

</style>
