<template>
    <div>
        <h1>This is all blogs</h1>
        <div class="card bg-light text-dark my-2" v-for="datum in articles" :key="datum._id">
            <div class="card-body">
                <div class="row">
                    <div class="col-sm-6"><img :src="datum.image" alt="" width="150" height="150"></div>
                    <div class="col-sm-6" style="text-align:left">
                        <router-link :to="'/blog/' + datum._id"><h1>{{datum.title}}</h1></router-link>
                        <hr>
                        <small>Author : {{datum.user_id.email}}</small><br>
                        <small>{{getLocalDate(datum.createdAt)}}</small>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'listAll',
  data () {
    return {
      articles: []
    }
  },
  created () {
    axios.get('https://blog-server.iqbalmaulana.online/articles/all/articles', {}, {})
      .then(({ data }) => {
        this.articles = data
      })
      .catch((err) => {
        console.log(err)
      })
  },
  methods:{
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
