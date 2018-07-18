<template>
<div class="container">
<div class="row">
<div class="col-12">



       <div v-for="vault in vaults" v-bind:key="vault.id">
        <router-link :to="{ name: 'Profile'}">
        <button @click="setVaultKeeps(vault)">
          {{vault.title}}</button>
        </router-link>
        </div> 

  


  <div class="vault">   <!-- maybe add drop down select activeVault? @click -->

    {{vault.title}}
    {{vault.description}}

  </div>





  <div class="keeps">
  <div class="row">
  <div class="col-12">  

    <div v-for="keeps in vaultKeepsVault" v-bind:key="keeps._id">
    {{keeps.title}}
    {{keeps.description}}
    <img :src="keep.imageUrl" alt="">
    </div>  

  </div>
  </div>
  </div>


  </div>
  </div>
  </div>
</template>

<script>
export default {
  name: "Profile",

  mounted() {
    this.$store.dispatch("getUserKeeps");
    this.$store.dispatch("getVaults");
  },

  data() {
    return {
      Keeps: {
        title: "",
        description: "",
        imageUrl: "",
        views: 0
        // id: this.$store.state.activeVault.id
      },
      vaultKeeps: {
        title: "",
        description: "",
        public: 0
      },
      vaults: {
        title: "",
        description: ""
      }
    };
  },

  computed: {
    activeVault() {
      this.$store.dispatch("setUserVault", this.$store.state.activeVault.id);
      return this.$store.state.activeVault;
    }
  },

  methods: {
    removeKeep() {
      this.$store.dispatch("removeKeep", this.keep);
    },
    viewActiveKeep() {
      this.$store.dispatch("viewActiveKeep", this.keep);
    }
  }
};
</script>

<style scoped>
</style>