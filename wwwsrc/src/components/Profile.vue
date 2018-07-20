<template>
<div class="container">
<div class="row">
  <center>
<div class="col-12">

<!-- Display Vault -->

<div class="dropdown mb-3 mt-3">
<select v-model="vault">
<option disabled value = "">Select Vault To View Keeps</option>
<option v-for='vault in vaults' :key="vault.id" :value="vault">{{vault.title}}</option>
</select>
<button type="button" @click="viewActiveVault(vault)" class="btn btn-secondary" data-dismiss="modal">Select Vault To View Keeps</button>
</div>

<div class="displayActiveVault">
  <h3>Active Vault: {{activeVault.title}}</h3>
  <h3>Active Vault Description: {{activeVault.description}} </h3>
  <div v-for="keep in keeps" v-if="!keep.public" :key="keep.id">
    <h5>Keep Title: {{keep.title}}</h5>
     <h5>Keep Description: {{keep.description}}</h5>
    <img :src="keep.imageUrl " alt=" ">

  </div>

  
  <!-- <button type="button" @click="getVaultKeeps()" class="btn btn-secondary" data-dismiss="modal">Add to a Vault</button> -->

  </div>

<!-- <Ukeeps></Ukeeps> -->

<!--ROUTER PUSH THE KEEPS WHEN USER SELECTS A VAULT? -->

</div>
</center>
</div>
</div>
</template>

<script>
import Ukeeps from "./Ukeeps";
export default {
  name: "Profile",
  components: {
    Ukeeps
  },

  mounted() {
    this.$store.dispatch("getVaults");
  },

  data() {
    return {
      keep: {
        title: "",
        description: "",
        imageUrl: "",
        views: 0,
        added: 0,
        public: 0
      },
      vault: {
        title: "",
        description: ""
      },
      activeVault: {},
      vaultKeeps: {}
    };

  },

  computed: {
    keeps() {
      return this.$store.state.keeps;
    },
    vaults() {
      return this.$store.state.vaults;
    },
    vaultKeeps() {
      return this.$store.state.vaultKeeps;
    },
    user() {
      return this.$store.state.user;
    },
    userVaults() {
      return this.$store.state.userVaults;
    },
    userKeeps() {
      return this.$store.state.userKeeps;
    }
  },

  methods: {
    viewActiveVault(vault) {
      this.activeVault = this.vault;                                //added1
      this.$store.dispatch("viewActiveVault", vault);
    }
    //   getVaultKeeps() {
    //  this.$store.dispatch("getVaultKeeps", this.vaultId);
    // }
    // this.activeKeep = keep;
    // $("#viewKeepModal").modal("show");
    // setActiveVault() {
    //   this.$store.dispatch("setActiveVault", this.vault);
    // }
  }
};
</script>

<style scoped>
</style>