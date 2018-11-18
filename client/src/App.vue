<template>
<div>
  <nav class="navbar navbar-expand-lg navbar-light bg-light" v-if="isLogin == false">
    <router-link to="/" class="mx-2">Blogs</router-link>
    <router-link to="/login" class="mx-2">Login</router-link>
    <router-link to="/register" class="mx-2">Register</router-link>
  </nav>
  <nav class="navbar navbar-expand-lg navbar-light bg-light" v-if="isLogin == true">
    <router-link to="/" class="mx-2">Blogs</router-link>
    <router-link to="/blog/myblogs" class="mx-2">My Blogs</router-link>
    <router-link to="/livechat" class="mx-2">Visit Live Chat</router-link>
    <a href="#" v-on:click="signout" class="mx-2">Sign Out</a>
  </nav>
  <div class="container" style="text-align:center" >
    <router-view @isLogin="validasi"/>
  </div>
</div>
</template>


<script>
export default {
  data() {
    return {
      isLogin: false
    }
  },
  created: function () {
    if (localStorage.getItem('token')) {
      this.isLogin = true
    }else{
      this.isLogin = false
    }
  },
  methods: {
    validasi() {
      console.log(this)
      this.isLogin = true
    },
    signout() {
      this.isLogin = false
      localStorage.removeItem('token')
      localStorage.removeItem('email')
      this.$router.replace('/login')
    }
  }
}
</script>

