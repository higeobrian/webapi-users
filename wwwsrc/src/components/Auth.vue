<template>
  <div class="user jumbotron jumbotron-fluid bgImg">
    <div class="row justify-content-center">
    <div class="col-6 card">

    <div class="login" v-if="showLogin">
      <h1>Login</h1>
      <form v-on:submit.prevent="login" class="form">
        <input class="input" type="email" name="email" placeholder="E-mail" id="Email" v-model="user.Email">
        <input class="input" type="password" name="password" placeholder="Password" id="Name" v-model="user.Password">
        <button class="btn btn-primary btn-success" type="submit">Login</button>
      </form>
      <br>
      
      <br>
      <p class="user">Not a user?
        <em @click="toggle"><button type="button" class="btn btn-danger">Register</button></em>
      </p>
    </div>


    <div class="register" v-if="!showLogin">
      <h1>Register</h1>
      <form v-on:submit.prevent="register">
        <input class="input" type="email" name="email" placeholder="e-mail" id="Email" v-model="user.Email">
        <input class="input" type="text" name="name" placeholder="name" id="Name" v-model="user.Username">
        <input class="input" type="password" name="password" placeholder="password" id="Password" v-model="user.Password">
        <button class="btn btn-primary btn-danger" type="submit">Register</button>
      </form>

      <br>
      <div>
      </div>
      <br>
      <p>Already a user?
        <em @click="toggle"><button class="btn btn-primary btn-success" type="submit">Login</button></em>
      </p>

    </div>

  </div>
</div>
  </div>
</template>

<script>
  export default {
    name: 'Login',
   
    mounted(){
   
    },
    data() {
      return {
        user: {
          Email: '',
          Username: '',
          Password: ''
        }, 
        showLogin: true
      }
    },
    computed: {
      currentUser() {
        return this.$store.state.user
      }
    },
    methods: {
      login() {
        this.$store.dispatch('login', this.user)
      },
      register() {
        this.$store.dispatch('register', this.user)
      },
      toggle() {
        this.showLogin = !this.showLogin
      }
    }
  }
</script>

<style scoped>
/* .jumbotron{
    height: 100vh;
}
  .bgImg{ 
    background: url(../assets/travel.jpg);
  }
  .card {
    background-color: rgb(238, 238, 238);
    opacity: .9;
  } */
</style>