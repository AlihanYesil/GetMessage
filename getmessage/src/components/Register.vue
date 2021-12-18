<template>
  <div id="kayit">
    <h1>Kaydol</h1>
    <input
      type="text"
      class="form-control"
      name="name"
      @input="userData.ad = $event.target.value"
      v-model="userData.ad"
      placeholder="Ad"
    />
     <small v-if="!$v.userData.ad.required" class="text text-danger">bu alan zorunludur.. </small>

    <input
      type="text"
      name="surname"
      class="form-control"
      @blur="$v.userData.soyad.$touch()"
      @input="userData.soyad = $event.target.value"
      v-model="userData.soyad"
      placeholder="Soyad"
    />
     <small v-if="!$v.userData.soyad.required" class="text text-danger">bu alan zorunludur.. </small>
     <small v-if="!$v.userData.soyad.alpha" class="text text-danger">bu alan zorunludur.. </small>

    <input
      type="email"
      name="email"
      @blur="$v.userData.mail.$touch()"
      class="form-control "
      v-model="userData.mail"
      placeholder="Email"
    />
    
     <small v-if="!$v.userData.mail.email" class="text text-danger">Lütfen Mail adresinizi kontrol edin.. </small>
     <small v-if="!$v.userData.mail.required" class="text text-danger">bu alan zorunludur.. </small>
     
    <input
      type="password"
      name="password"
      class="form-control"
      v-model="userData.sifre"
      placeholder="Şifre"
    />
    <br />
    
     
    <button type="button" class="btn btn-outline-primary" :disabled="$v.$invalid" @click.prevent="submit()">
      Kayıt Ol
    </button>
      <div class="row">
      <div class="col-md-4">
      <router-link tag="a" class="py-4" to="/">Zaten Hesabım var</router-link>
      </div>
    </div>
  </div>
 
</template>


<script>
import {required ,email,alpha} from 'vuelidate/lib/validators'
import axios from 'axios'

export default {
data() {
    return {
        userData:{
            ad:'',
            soyad:'',
            mail:'',
            sifre:''
        }
    }
},
validations :{
  userData:{
    mail: {
      required,
      email
    },
    ad:{
    required,
    alpha
    },
  soyad:{
      required,
      alpha
    },

  }
},

methods:{
submit(){
    axios.post(this.$store.state.data+"/register",{
        email:this.userData.mail,
        password:this.userData.sifre,
        name:this.userData.ad,
        surname:this.userData.soyad
        

    }).then(res=>{
        if(res.data.message == "Kayıt daha önce oluşturulmamış - işlem basarili"){
            this.$router.push({name:'giris'});
        
        }
            
        
    }).catch(() =>
    {
        alert("böyle bir hesap zaten oluşturulmuş");
    });
}
},
}
</script>
<style scoped>
#kayit {
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