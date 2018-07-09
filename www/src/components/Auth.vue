<template>
  <div class="Auth">

    <div class="row login text-white d-flex align-items-center" v-if="showLogin">
      <h1>Login</h1>
      <form v-on:submit.prevent="login" class="form">
        <input class="input text-white" type="text" name="name" placeholder=" username" id="name" v-model="user.name">
        <button class="butt" type="submit">Login</button>
      </form>
      <p class="user">Not a user ?
        <em @click="toggle">Register</em>
      </p>
    </div>
    <div class="register text-white" v-if="!showLogin">
      <h1>Register</h1>
      <form v-on:submit.prevent="register">
        <input class="register text-white" type="text" name="name" id="name" v-model="user.name">
        <button class="butt" type="submit">Register</button>
      </form>
      <p>Already a user?
        <em @click="toggle">Login</em>
      </p>
    </div>

  </div>
</template>


<script>
  export default {
    name: 'Auth',
    data() {
      return {
        user: {
          name: ''
        },
        showLogin: true
      }
    },
    computed: {},
    methods: {
      toggle() {
        this.showLogin = !this.showLogin
      },
      register() {
        this.$store.dispatch('addUsers', this.user)
      },
      login() {
        this.$store.dispatch('getUsers', this.user)
      }
    }
  }
</script>
<style scoped>
.login{
  background-image: url('../../D&D.jpg');
  height: 22rem;
  margin-top: 10rem;
  margin-left: 7rem;
  font-size: 2rem
}
.bgColor{
  background-color: #550b11;
}
.user{
  margin-left:2rem
}
.form{
 margin-left:1rem

}
.input{
  border-radius: 1rem;
  background-color:#470308;
}
.butt{
  height:4rem;
  border-radius: 2rem;
  background: #969696;
}
.register{
  background:rgb(61, 24, 24);
  border-radius: 1rem;
  margin-left:1rem
}


</style>