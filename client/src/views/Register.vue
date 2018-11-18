<template>
  <div>
    <h1 class="my-2">Register Account</h1>
    <div class="container" style="text-align:left">
      <label for="email">Email:</label>
      <input type="text" class="form-control" id="email" v-model="inputemail">
      <label for="password">Password:</label>
      <input type="password" class="form-control" id="password" v-model="inputpassword">
      <button class="btn btn-outline-primary my-2" v-on:click="register">Register</button>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'register',
  data () {
    return {
      inputemail: '',
      inputpassword: ''
    }
  },
  methods: {
    register () {
      axios.post(`http://localhost:3000/users`, {
        email: this.inputemail,
        password: this.inputpassword
      }, {})
        .then((createduser) => {
          console.log(createduser)
        })
        .catch((err) => {
          console.log(err.response.data.message.errors)
        })
    }
  }
}
</script>
