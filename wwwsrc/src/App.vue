
<template>
  <div id="app">
    <nav class="navbar navbar-dark bg-primary top-header format">
      <a class="navbar-left">

        <router-link :to="{ name: 'Home'}" class="navbar-brand">
        <a>Home</a>
        </router-link>

        <router-link v-if="user.id" :to="{ name: 'Profile'}" class="navbar-brand">
        <a>Profile</a>
        </router-link>
        
        </a>    
      
      <button type="button" class="navbar-brand btn btn-outline-light" @click="login" v-if="!(user.id)">Login/Register</button>
      
      <div v-if="user.id" class="d-flex flex-column">
      <a class="navbar-brand">User: {{user.username}}</a>

      <button class="navbar-brand btn btn-outline-light" @click="logout">Log Out</button>

      </div>
    </nav>

    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
mounted()
{
  this.$store.dispatch("authenticate")
},

computed: {
      user() {
        return this.$store.state.user   
        }
  },
methods: {
      login() {
        this.$router.push({name:"Auth"})   //push user auth page
      },
      logout() {
        this.$store.dispatch("logout")   //dispatch
      }
  }
}
</script>

<style>
body {
  background: #dd7c21;
}
/* .top-header {
  background-image: url("../D20.png");
} */
/* #app {
  font-family: "Metal Mania", cursive;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 60px;
} */
</style>