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

  created: function () {
    axios({
      method: "post",
      url: this.$store.state.data,
    });
  },
  methods: {
    login() {
      this.header = false;
      
      

      axios.post(this.$store.state.login, {
          email: this.input.email,
          password: this.input.password,
        })
        .then((res) => {
         if(res.data.message=="welcome"){
              localStorage.setItem('WelcomeToken',res.data.success.token)
              localStorage.setItem('WelcomeId',res.data.success.id)
              this.$router.push("index");
          
         }
        }).catch(()=>{
            alert("Hesap veya Şifre yanlış");
        });
    },
  },
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