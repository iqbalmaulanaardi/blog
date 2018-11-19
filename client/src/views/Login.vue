<template>
  <div>
    <h1 class="my-2">Welcome, please login</h1>
    <div class="container" style="text-align:left">
        <label for="email">Email:</label>
        <input type="text" class="form-control" id="email" v-model="inputemail">
        <label for="password">Password:</label>
        <input type="password" class="form-control" id="password" v-model="inputpassword">
        <button class="btn btn-outline-primary my-2" v-on:click="login">Log in</button>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      inputemail: '',
      inputpassword: '',
      isLogin: false
    }
  },
  methods: {
    login () {
      axios.post(`https://blog-server.iqbalmaulana.online/users/signin`, {
        email: this.inputemail,
        password: this.inputpassword
      }, {})
        .then(({ data }) => {
          localStorage.setItem('token', data.token)
          localStorage.setItem('email', data.email)
          this.isLogin = true
          this.$emit('isLogin', this.isLogin)
          this.$router.replace('/')
        })
        .catch((err) => {
          console.log(err.response.data)
        })
    }
  }
}
</script>
