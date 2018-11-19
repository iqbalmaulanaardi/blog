<template>
    <div>
        <router-link to="add"><button class="btn btn-primary btn-block">Add</button></router-link>
        <div class="card bg-light text-dark my-2" v-for="datum in myarticles" :key="datum._id">
            <div class="card-body">
                <div class="row">
                    <div class="col-sm-6"><img :src="datum.image" alt="" width="150" height="150"></div>
                    <div class="col-sm-6" style="text-align:left">
                        <router-link :to="'/blog/' + datum._id"><h1>{{datum.title}}</h1></router-link>
                        <p>Author : {{datum.user_id.email}}</p>
                        <p>Created at : {{datum.createdAt}}</p>
                        <router-link :to="'edit/'+datum._id">
                          <button class="btn btn-warning"><img src="https://img.icons8.com/windows/50/000000/pencil.png" style="width:35%;height:45%"></button>
                        </router-link>
                        <!-- <editarticle></editarticle> -->
                        <button class="btn btn-danger mx-2" v-on:click="deleteArticle(datum._id)"><img src="https://img.icons8.com/windows/50/000000/trash.png" style="width:35%;height:45%" ></button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import editarticle from '@/components/Editarticle.vue'
export default {
  name: 'listAll',
  data () {
    return {
      myarticles: []
    }
  },
  beforeCreate () {
    axios.get(`https://blog-server.iqbalmaulana.online/verify`,{
      headers:{
        token : localStorage.getItem("token")
      }
    })
    .then(() => {
      axios.get(`https://blog-server.iqbalmaulana.online/articles`, {
        headers:{
          token : localStorage.getItem("token")
        }
      })
      .then(({ data }) => {
        this.myarticles = data
      })
    })
    .catch((err) => {
      this.$router.replace('/login')
    })
  },
  methods: {
    deleteArticle(value){
      axios.delete(`https://blog-server.iqbalmaulana.online/articles/${value}`,{
        headers: {
          token: localStorage.getItem("token")
        }
      })
      .then(() => {
        axios.get(`https://blog-server.iqbalmaulana.online/articles`, {
          headers:{
            token : localStorage.getItem("token")
          }
        })
          .then(({ data }) => {
            this.myarticles = data
            this.$router.replace('myblogs')
          })
      })
      .catch((err) => {
        console.log(err)
      })
    }
  }
}
</script>
