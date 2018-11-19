<template>
  <div>
    <div class="card bg-light text-dark my-2" style="padding:5px;">
      <div class="container card bg-white text-dark my-2" v-for="(elem,index) in commentsfromparent" :key="index">
        <div class="my-3" style="text-align:left;">
          <div>
            <p>{{elem.user_id.email}}</p>
            <button class="btn btn-danger mx-2" v-show="elem.user_id.email == logged_in_user" v-on:click="deleteComment(elem._id)" style="float:right;"><img src="https://img.icons8.com/windows/50/000000/trash.png" style="width:35%;height:45%" ></button>
            <button class="btn btn-light mx-2" v-show="elem.user_id.email !== logged_in_user" style="float:right;"><img src="https://img.icons8.com/windows/50/000000/speech-bubble.png" style="width:35%;height:45%" @click="personalMessage(elem.user_id.email)"></button>
          </div>
          {{getLocalDate(elem.createdAt)}}
          <hr>
          {{elem.content}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebaseApp from '@/assets/config.js'
import axios from 'axios'
export default {
  data(){
    return {
      db: firebaseApp.database(),
      logged_in_user: localStorage.getItem('email'),
      nameNewRoom: ''
    }
  },
  props : ['commentsfromparent'],
  created(){

  },
  methods: {
    personalMessage(value){
      console.log('kalau liat ini berarti belum jadi hehe')
    },
    deleteComment(value){
      console.log('ini apa',value)
      axios.delete(`https://blog-server.iqbalmaulana.online/comments/${this.$route.params.id}/${value}`,{
          headers: {
            token: localStorage.getItem("token")
          }
        })
        .then(({ data }) => {
          console.log('parent bakal dirubah ama ini', data)
          this.commentsfromparent = data
          this.$emit('assignNewData', data)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getLocalDate(value){
      var now= new Date(value), 
      ampm= 'AM', 
      h= now.getHours(), 
      m= now.getMinutes(), 
      s= now.getSeconds();
      if(h>= 12){
          if(h>12) h -= 12;
          ampm= 'PM';
      }

      if(m<10) m= '0'+m;
      if(s<10) s= '0'+s;
      return now.toLocaleDateString()+ ' ' + h + ':' + m + ' ' + ampm;
    }
  }
}
</script>

<style>

</style>
