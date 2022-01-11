<template>

  <div class="container">
    
    <div class="row clearfix">
   <div class="container float-right" style="width:400px; ">
      <div class="card">
        <div class="card-header">
          
          <span> {{this.$store.state.name}} {{this.$store.state.surname}}</span>
        </div>
        <div class="card-body" >

        </div>
      </div>
    </div>  
      <div class="col-lg-12">
        <div class="card chat-app">


          <div  id="plist" class="people-list">
            <!-- <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text"><i class="fa fa-search"></i></span>
              </div>
              <input type="text" class="form-control" placeholder="Search..." />
            </div>  -->
              
            <ul class="list-unstyled chat-list mt-2 mb-0 my_scroll_div">
              <template v-for="user in users" >
              <li
                class="clearfix"
                v-if="$store.state.tokenId!==user.id"
                :class="[(room==user.id) ? 'active': '']"
                :key="user.id"
                @click="enterRoom({aliciId:user.id,socketId:user.socketId,name:user.name,surname:user.surname})">
                <img :src="'https://ui-avatars.com/api/?name='+user.name+user.surname" alt="avatar" />
                <div class="about">
                  <a class="name" style="text-decoration:none;" >
                    {{ user.name }} {{user.surname}}
                    </a>
                  
                  <div class="status" >
                    <i class="fa fa-circle online"></i>
                    online
                  </div>
                </div>
              </li>
              </template>
            </ul>
          </div>
           

          <div class="chat" >
            <div class=" chat-header clearfix" >
              <div class="row">
                 
                <div class=" col-lg-6">
                  <a href="javascript:void(0);" data-toggle="modal" data-target="#view_info" >
                    <img :src="'https://ui-avatars.com/api/?name='+this.chatUser" alt="avatar"/>
                  </a>
                  <div class="chat-about">
                    <h6 class="m-b-0">{{this.chatUser}}</h6>
                    <small v-if="this.room">Last seen: </small>
                  </div>
                </div>
               
               
              </div>
            </div>

            <div  class="chat-history  my_scroll_div" ref="msgContainer">
              <ul class="m-b-0" >
                  <li id="chat-history" class="clearfix" :key="index" v-for="(Mesajlar,index) in GelenMesaj" >
                    <div class="message  " :class="[ chatController(Mesajlar) ? 'float-right my-message' : 'float-left   other-message' ]">
                       <span v-html="[this.room==Mesajlar.room] ? Mesajlar.mesaj  : ''"></span>
                          <br>
                        <small>{{Mesajlar.time}}</small>
                       </div>
                  </li>



              </ul>
             
            </div>
                  <template v-if="!this.room">
                    <p class="text-danger">Kullanıcı Seçmedin!!</p>
                      </template>
            <div class="chat-message clearfix" >
              <div class="input-group mb-0">
               
                <input type="text" class="form-control" v-model="Mesaj" v-on:keydown.enter="sendMessage" placeholder="Mesaj" />
                <div class="input-group-prepend">
                <input type="submit" class="btn btn-outline-dark" @click="sendMessage" value="Gönder"/>
                </div>
              </div>
            </div>
          </div>


        </div>
      </div>
    </div>
   

  </div>

  
    
</template>




<script>
import axios from "axios";

export default {
  data() {
    return {
      gelenBilgi: [],
      Mesaj: "",
      GelenMesaj: [],
      users:[],
      room:"",
      chatUser:"",
    };
  },
  sockets: {
    users(data) {
      this.users = data;
    },
    messages(data) {
      let GelenMesajlar = data.filter(GelenMesajlar => this.room==GelenMesajlar.room && this.$store.state.tokenId==GelenMesajlar.gndrnId || this.room==GelenMesajlar.gndrnId && this.$store.state.tokenId==GelenMesajlar.room)
      this.GelenMesaj = GelenMesajlar;
      }
  },
  methods: {
    enterRoom(ID) {
      this.room=ID.aliciId;
      this.$socket.emit("room",{
        aliciId:this.room,
        gndrnId:this.$store.state.tokenId,
        });
      this.chatUser=ID.name+" "+ID.surname;
    },
    
     sendMessage() {
      let z = new Date()
       if(this.Mesaj!=="" && this.room !==""){
          this.$socket.emit('new_message', {
        id: this.$store.state.tokenId,
        message: this.Mesaj,
        name : this.$store.state.name,
        room:this.room,
        time:z.getHours()+':'+z.getMinutes(),
      });
      this.Mesaj = "";  
    }
    
       },
      
    chatController(mesaj){
       
        if( mesaj.gndrnId  == this.$store.state.tokenId){
          return true;
        }else{
          return false;
        }
    },
    chatUsersLogin(){
      this.login = true;
      this.$socket.emit('new_user',{
          id:this.$store.state.tokenId,
          name:this.$store.state.name,
          surname:this.$store.state.surname
      });
    }
  },
  
  created: function () {
    axios({
      method: "post",
      url: this.$store.state.data + "/data",
    }).then((res) => {
     
     this.gelenBilgi = res.data;
    
    });


  },
  mounted() {
      this.chatUsersLogin();
  },
  watch: {
    GelenMesaj: function() {
      this.$nextTick(function() {
        var container = this.$refs.msgContainer;
        container.scrollTop = container.scrollHeight + 120;
      });
    },
    room: function() {
      this.$nextTick(function() {
        var container = this.$refs.msgContainer;
        container.scrollTop = container.scrollHeight + 120;
      });
    },

  }
  
};
</script>









<style scoped>
body {
  background-color: #f4f7f6;
  margin-top: 20px;
}
.card {
  background: #b3b1b785;
  transition: 0.5s;
  border: 0;
  margin-bottom: 30px;
  border-radius: 0.55rem;
  position: relative;
  width: 100%;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 10%);
}
.chat-app .people-list {
  width: 280px;
  position: absolute;
  left: 0;
  top: 0;
  padding: 20px;
  z-index: 7;
}

.chat-app .chat {
  margin-left: 280px;
  border-left: 1px solid #eaeaea;
}
.my_scroll_div{
    overflow-y: auto;
    max-height: 500px;
}
.people-list {
  -moz-transition: 0.5s;
  -o-transition: 0.5s;
  -webkit-transition: 0.5s;
  transition: 0.5s;
}

.people-list .chat-list li {
  padding: 10px 15px;
  list-style: none;
  border-radius: 3px;
}

.people-list .chat-list li:hover {
  background: #efefef;
  cursor: pointer;
}

.people-list .chat-list li.active {
  background: #898484;
}

.people-list .chat-list li .name {
  font-size: 15px;
}

.people-list .chat-list img {
  width: 45px;
  border-radius: 50%;
}

.people-list img {
  float: left;
  border-radius: 50%;
}

.people-list .about {
  float: left;
  padding-left: 8px;
}

.people-list .status {
  color: #999;
  font-size: 13px;
}

.chat .chat-header {
  padding: 15px 20px;
  border-bottom: 2px solid #f4f7f6;
}

.chat .chat-header img {
  float: left;
  border-radius: 40px;
  width: 40px;
}

.chat .chat-header .chat-about {
  float: left;
  padding-left: 10px;
}

.chat .chat-history {
  padding: 20px;
  border-bottom: 2px solid #fff;
  height: 500px;
}

.chat .chat-history ul {
  padding: 0;
}

.chat .chat-history ul li {
  list-style: none;
  margin-bottom: 30px;
}

.chat .chat-history ul li:last-child {
  margin-bottom: 0px;
}

.chat .chat-history .message-data {
  margin-bottom: 15px;
}

.chat .chat-history .message-data img {
  border-radius: 40px;
  width: 40px;
}

.chat .chat-history .message {
  color: #444;
  padding: 18px 20px;
  line-height: 26px;
  font-size: 16px;
  border-radius: 7px;
  display: inline-block;
  position: relative;
}

.chat .chat-history .my-message {
  background: #8cedca;
  max-width: 300px;
}

.chat .chat-history .other-message {
  background: #e3e3e3;
  max-width: 300px;

}

.chat .chat-message {
  padding: 20px;
}

.online,
.offline,
.me {
  margin-right: 2px;
  font-size: 8px;
  vertical-align: middle;
}

.online {
  color: #86c541;
}

.offline {
  color: #e47297;
}

.me {
  color: #1d8ecd;
}

.float-right {
  float: right;
}

.clearfix:after {
  visibility: hidden;
  display: block;
  font-size: 0;
  content: " ";
  clear: both;
  height: 0;
}

@media only screen and (max-width: 767px) {
  .chat-app .people-list {
    height: 465px;
    width: 100%;
    overflow-x: auto;
    background: #fff;
    left: -400px;
    display: none;
  }
  .chat-app .people-list.open {
    left: 0;
  }
  .chat-app .chat {
    margin: 0;
  }
  .chat-app .chat .chat-header {
    border-radius: 0.55rem 0.55rem 0 0;
  }
  .chat-app .chat-history {
    height: 300px;
    overflow-x: auto;
  }
}

@media only screen and (min-width: 768px) and (max-width: 992px) {
  .chat-app .chat-list {
    height: 650px;
    overflow-x: auto;
  }
  .chat-app .chat-history {
    height: 600px;
    overflow-x: auto;
  }
}

@media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (orientation: landscape) and (-webkit-min-device-pixel-ratio: 1) {
  .chat-app .chat-list {
    height: 480px;
    overflow-x: auto;
  }
  .chat-app .chat-history {
    height: calc(100vh - 350px);
    overflow-x: auto;
  }
}
</style>
