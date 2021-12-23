<template>
  <div id="login">
    <h1>Giriş</h1>
    <input
      type="email"
      name="email"
      v-model="input.email"
      class="form-control"
      placeholder="Email"
    />
    <input
      type="password"
      name="password"
      v-model="input.password"
      class="form-control"
      placeholder="Şifre"
    />
    <br />
    <button type="button" class="btn btn-outline-success " @click="login">
      Giriş Yap
    </button> 

    <div class="row">
      <div class="col-md-4">
      <router-link tag="a" class="py-4" to="/kayit">Hesap Oluştur</router-link>
      </div>
    </div>
  </div>
</template>


<script>
import axios from "axios";
export default {
  data() {
    return {
      input: {
        email: "",
        password: "",
      },
      users: null,
      header: true,
      props: ["header"],
    };
  },
  methods: {
    login() {
      this.header = false;
      
      

      axios.post(this.$store.state.data+ "/login", {
          email: this.input.email,
          password: this.input.password,
        })
        .then((res) => {
         if(res.data.message=="welcome"){
              localStorage.setItem('WelcomeToken',res.data.success.token);
              localStorage.setItem('WelcomeId',res.data.success.id);
              localStorage.setItem('WelcomeName',res.data.success.name);
              localStorage.setItem('WelcomeSurname',res.data.success.surname);
              this.$store.commit("setToken",res.data.success.token);
              this.$store.commit("setId",res.data.success.id);
              this.$store.commit("setName",res.data.success.name);
              this.$store.commit("setSurname",res.data.success.surname);
              this.$router.push("index");
              this.$store.commit("loginChangeStatus",true)
              
              
         }
        }).catch(()=>{
            alert("Hesap veya Şifre yanlış");
        });
    },
  }
};
</script>



<style scoped>
#login {
  width: 500px;
  border: 1px solid #cccccc;
  background-color: #ffffff;
  margin: auto;
  margin-top: 200px;
  padding: 20px;
}
input {
  margin-bottom: 5px;
}
</style>