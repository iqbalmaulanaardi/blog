<template>
  <div class="card bg-white text-dark">
      <div class="card-body" style="text-align:left">
        <p>Enter comment here</p>
        <wysiwyg v-model="comment"/>
        <button v-on:click="addComment" class="btn btn-primary my-1">Comment</button>
      </div>
    </div>
</template>

<script>
import wysiwyg from "../../node_modules/vue-wysiwyg/dist/vueWysiwyg.css";
import axios from 'axios'
export default {
  name : "Addcomment",
  data(){
    return {
      comment: ''
    }
  },
  methods: {
    addComment(){
      console.log(this.$route.params)
      axios.post(`https://blog-server.iqbalmaulana.online/comments/${this.$route.params.id}`,{
        content: this.comment
      },{
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data })=>{
          axios.get(`https://blog-server.iqbalmaulana.online/comments/one/${data._id}`,{
            headers: {
              token: localStorage.getItem("token")
            }
          })
          .then((response)=>{
            this.comment = ''
            console.log('ini yg dikirim',response.data)
            this.$emit('trigerredPress',response.data)
          })
        })
        .catch(()=>{
          this.$router.replace('/login')
        })
    }
  }
}
</script>
