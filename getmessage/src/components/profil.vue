<template>
    <div>

        <div class="card">
  <img src="#" alt="" style="width:100%">
  <h1>Alihan Yeşil</h1>
  <p class="title">Ad & Soyad, Example</p>

  <p>email</p>
  
  <p>Açıklama</p>
 
    <p>
      <button  @click="trick2">Profil Kaydet</button>
      <button  @click="trick">Profil Düzenle</button>
    </p>
</div>


    </diV>
</template>

<script>
export default {
    data() {
        return {
            

        }
    },
    methods: {
        trick(){
           
        },
        trick2(){
            
        }
    },
    
}
</script>



<style scoped>

.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  max-width: 300px;
  margin: auto;
  text-align: center;
  font-family: arial;
}

.title {
  color: grey;
  font-size: 18px;
}

button {
  border: none;
  outline: 0;
  display: inline-block;
  padding: 8px;
  color: white;
  background-color: #000;
  text-align: center;
  cursor: pointer;
  width: 100%;
  font-size: 18px;
}

a {
  text-decoration: none;
  font-size: 22px;
  color: black;
}

button:hover, a:hover {
  opacity: 0.7;
}
</style>
