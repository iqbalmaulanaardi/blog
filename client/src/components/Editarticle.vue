<template>
  <div>
    <h1>Edit Article</h1>
     <form>
        <div class="form-group">
            <label for="title">Title</label>
            <input id="title" type="text" class="form-control"
             aria-describedby="emailHelp" placeholder="Enter Title" v-model="inputtitle">
        </div>
        <div class="form-group">
          <wysiwyg v-model="inputdescription"/>
        </div>
    </form>
    <button v-on:click="editarticle" class="btn btn-primary btn-block">Submit</button>
  </div>
</template>
<script>
import axios from 'axios'

export default {
  name: 'Addarticle',
  data () {
    return {
      inputtitle: '',
      inputdescription: ''
    }
  },
  mounted: function(){
    console.log(localStorage.getItem("token"))
    axios.get(`https://blog-server.iqbalmaulana.online/articles/one/${this.$route.params.id}`, {
      headers:{
        token: localStorage.getItem("token")
      }
    })
      .then(( {data} ) => {
        this.inputtitle = data.title,
        this.inputdescription = data.content
      })
      .catch((err) => {
        this.$router.replace('/login')
      })
  },
  methods: {
    editarticle (){
      let obj = {
        title: this.inputtitle,
        content: this.inputdescription
      }
      axios.put(`https://blog-server.iqbalmaulana.online/articles/${this.$route.params.id}`, obj, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(({ data }) => {
        console.log(data)
        // this.$emit('editarticle', data)
        this.$router.replace('/blog/myblogs')
      })
      .catch((err) => {
        console.log(err)
      })
    }
  }
}
</script>

