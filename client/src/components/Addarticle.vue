<template>
  <div>
    <h1>Add Article</h1>
     <form>
        <div class="form-group">
            <label for="title">Title</label>
            <input id="title" type="text" class="form-control"
             aria-describedby="emailHelp" placeholder="Enter Title" v-model="inputtitle">
        </div>
        <div class="form-group">
          <wysiwyg v-model="inputdescription"/>
          <label for="file" style="text-align:left">Head Picture: </label>
          <input type="file" class="form-control-file" id="file" ref="file" v-on:change="handleFileUpload()">
        </div>
    </form>
    <button v-on:click="addarticle" class="btn btn-primary btn-block">Submit</button>
  </div>
</template>
<script>
import wysiwyg from "../../node_modules/vue-wysiwyg/dist/vueWysiwyg.css";
import axios from 'axios'
export default {
  name: 'Addarticle',
  data () {
    return {
      inputtitle: '',
      inputdescription: '',
      file: ''
    }
  },
  beforeCreate: function(){
    axios.get(`https://blog-server.iqbalmaulana.online/verify`,{
      headers: {
        token: localStorage.getItem("token")
      }
    })
      .then(() => {
        
      })
      .catch((err) => {
        this.$router.replace('/login')
      })
  },
  methods: {
    addarticle (){
      console.log(this.inputdescription)
      let formData = new FormData()
          formData.append('image', this.file)
          formData.append('title', this.inputtitle)
          formData.append('content', this.inputdescription)
      axios.post('https://blog-server.iqbalmaulana.online/articles', formData, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(({ data }) => {
        this.$router.push('myblogs')
      })
      .catch((err) => {
        console.log(err)
      })
    },
    handleFileUpload() {
          this.file = this.$refs.file.files[0];
    },
  }
}
</script>

