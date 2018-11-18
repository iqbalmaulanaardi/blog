<template>
  <div>
    <div class="card bg-light text-dark my-2">
      <div class="card-body" style="text-align:left">
        <div class="row">
          <div class="col-sm-3"><img :src="article.image" alt="" width="150" height="150"></div>
          <div class="col-sm-9" style="text-align:left">
            <h2>{{ this.article.title }}</h2>
            <!-- <small>Author: {{ article.user_id.email }}</small><br> -->
            <small>{{ getLocalDate(article.createdAt) }}</small>
          </div>
        </div>
        <hr>
        <p v-html="article.content"></p>
        <hr>
        <a style="float:right;display:inline-block;cursor:pointer" @click="isPressedFunction"><img src="https://img.icons8.com/windows/50/000000/comments.png" width="30" height="30"></a> 
        <addcomment @trigerredPress="onChildClick" v-show="isPressed == true">
        </addcomment>
      </div>
    </div>

    <allcomments :commentsfromparent="comments" @assignNewData="assignNewData" style="height: 500px; overflow: scroll;"></allcomments>
  </div>
</template>
<script>
import axios from 'axios'
import addcomment from '@/components/Addcomment.vue'
import allcomments from '@/components/Allcomments.vue'
export default {
  data () {
    return {
      article: {},
      isPressed: false,
      comments: []
    }
  },
  created (){
    let self = this
    axios.get(`http://localhost:3000/articles/one/${this.$route.params.id}`,{
      headers: {
        token: localStorage.getItem("token")
      }
    })
      .then(( {data} ) => {
        axios.get(`http://localhost:3000/comments/${this.$route.params.id}`,{
          headers: {
            token: localStorage.getItem("token")
          }
        })
        .then((response)=>{
          self.article = data
          self.comments = response.data
        })
      })
      .catch((err) => {
         this.$router.replace('/login')
      })
  },
  methods: {
    assignNewData(value){
      this.comments = value
    },
    onChildClick (value) {
      this.isPressed = false
      this.comments.push(value)
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
    },
    isPressedFunction(){
      axios.get(`http://localhost:3000/verify`,{
        headers:{
          token : localStorage.getItem("token")
        }
      })
      .then(() => {
        if(!this.isPressed){
          this.isPressed = true
        }else {
          this.isPressed = false
        }
      })
      .catch(() => {
        this.$router.replace('/login')
      })
      
    },
    renewComment(){
      let self = this
      self.isPressed = false
      axios.get(`http://localhost:3000/comments/${this.$route.params.id}`,{
          headers: {
            token: localStorage.getItem("token")
          }
        })
        .then((response)=>{
          self.comments = response.data
        })
        .cath((err)=>{
          console.log(err)
        })
    }
  },
  components: {
    addcomment,
    allcomments
  }
}
</script>
