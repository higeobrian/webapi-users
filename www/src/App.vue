<template>
  <div id="app">
    <nav class="navbar navbar-light top-header">
      <div>
          <a class="navbar-brand" @click="getPosts">Home</a>
          <a class="navbar-brand" v-if="user._id" @click="getFavs">Favorites</a>
      </div>
      <a class="navbar-brand" @click="login" v-if="!(user._id)">Sign up/Login</a>
      <div v-if="user._id" class="d-flex flex-column">
        <a class="navbar-brand">User: {{user.name}}</a>
        <a class="navbar-brand" @click="signOut">Sign out</a>
      </div>
    </nav>
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'App',
    computed: {
      user() {
        var user = this.$store.state.user
        return user
      }
    },
    methods: {
      getPosts() {
        this.$router.push('/')
      },
      login() {
        this.$router.push('auth')
      },
      signOut() {
        this.$store.dispatch('signOut')
      },
      getFavs() {
        this.$router.push('favs')
        this.$store.dispatch('getFavs')
      }
    }
  }
</script>

<style>
  body {
    background: #67020a;
  }

  .top-header {
    background-image: url('../D20.png');
  }

  #app {

    font-family: 'Metal Mania', cursive;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    margin-top: 60px;
  }
</style>