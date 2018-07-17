<template>
<div class="container">
<div class="row">
<div class="col-12">

  <div class="vault">
    {{activeVault.Title}}
    {{activeVault.Description}}

    <div v-for="keeps in activeVault" v-bind:key="keeps._id">
    {{keeps.Title}}
    {{keeps.Description}}
    </div>
  </div>

    </div>
  </div>
  </div>
</template>

<script>
export default {
  name: "Vault",
  data() {
    return {
      vault: {
        id: this.$store.state.activeVault.id
      }
    };
  },
  mounted() {
  },
  computed: {
    activeVault() {
      this.$store.dispatch("setVaultKeep", this.$store.state.activeVault.id);
      return this.$store.state.activeVault;
    }
  },

  methods:{
    removeKeep(){
      this.$store.dispatch('removeKeep', this.keep)
    }
  }
};
</script>

<style scoped>
</style>