<template>
  <div id="chat" class="my-5">
    
    <div class="container" style="text-align:left">
        From : {{username}}<br />
        Message:<br />
        <input name="" class="form-control" id="" cols="30" rows="10" placeholder="New Message" v-on:keyup.enter="sendMessage">
    </div>
    <div v-show="messages.length == 0">
      <img src="https://www.emerson.co.jp/wcsstore/EmersonNorthstarSAS/images/colors/color1/loading.gif" style="width:250;height:250"alt="">
    </div>
    <div v-for="(message,index) in messages" :key="index">
      <div style="text-align:left" v-if="message.username == username">
        <div class="container my-2" style="border: 1px solid grey;">
          <p>me : <br> {{message.text}}</p>
          <span class="time-right">{{message.createdAt}}</span>
        </div>
      </div>  
      <div style="text-align:right;" v-else>
        <div class="container darker my-2">
          <p class="mx-3 my-3">{{message.username}} said : <br> {{message.text}}</p>
          <span class="time-left">{{message.createdAt}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import firebaseApp from '@/assets/config.js'
import axios from 'axios'
export default {
    name: 'chat',
    data() {
        return {
            username: localStorage.getItem('email'),
            messages: [],
            db: firebaseApp.database()
        }
    },
    methods: {
      sendMessage(e) {
        e.preventDefault();
        if(e.target.value){
            const message = {
                username: this.username,
                text: e.target.value,
                createdAt: String(new Date())
            }
            console.log(message)
            // To-Do: Push message to firebase
            this.db.ref('messages').push(message);
            e.target.value = ''
        }
      },
      addZero(i) {
          if (i < 10) {
              i = "0" + i;
          }
          return i;
      }
    },
    mounted(){
      axios.get(`https://blog-server.iqbalmaulana.online//verify`,{
      headers:{
        token : localStorage.getItem("token")
      }
      })
      .then(() => {
        let self = this;
        const itemsRef = this.db.ref('messages');
        itemsRef.on('value', snapshot => {
            let data = snapshot.val();
            let messages = [];
            Object.keys(data).forEach(key => {
                messages.push({
                    id: key,
                    username: data[key].username,
                    text: data[key].text,
                    createdAt: `${new Date(data[key].createdAt).getHours()}:${this.addZero(new Date(data[key].createdAt).getMinutes())}`
                });
            });
            self.messages = messages;
        });
      })
      .catch(()=>{
        this.$router.replace('login')
      })
      
    },
}
</script>
<style>

  .darker {
      border-color: #ccc;
      background-color: #ddd;
  }

  .container::after {
      content: "";
      clear: both;
      display: table;
  }
  .time-right {
      float: right;
      color: #aaa;
      text-align: right;
  }
  .time-left {
      float: left;
      color: #999;
      text-align: left;
  }
</style>
