<template>
<div class="container">
<div class="row">
<div class="col-12">


  <div class="vault">

    {{vaultKeeps.title}}
    {{vaultKeeps.description}}

    <div v-for="keeps in vaultKeepsVault" v-bind:key="keeps._id">
    {{vaultKeeps.title}}
    {{vaultKeeps.description}}
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
        this.$store.dispatch('setVaultKeeps');
      },

  data() {
    return {
      vaultKeeps: {
        title: '',
        description: '',
        imageUrl: '',
        views: ''
        // id: this.$store.state.activeVault.id
      },
      // keep: {
      //   title: '',
      //   description: '',
      // }
    };
  },

  computed: {
    activeVault() {
      this.$store.dispatch("setUserVault", this.$store.state.activeVault.id);
      return this.$store.state.activeVault;
    }
  },

  methods:{
    removeKeep(){
      this.$store.dispatch('removeKeep', this.keep)
    }, 
    viewActiveKeep(){
      this.$store.dispatch('viewActiveKeep', this.keep)
    }
  }
};

</script>

<style scoped>
</style>