<template>
<div class="container">
<div class="row">
<div class="col-12">

<!--Display Vault Card-->
   <div class="row">
                    <div class="col-12">
                        <div v-for="vault in vaults" :key="vault.id " class="card mb-4 text-center ">
                            <h3 class="card-text">Vault Title: {{vault.title}}</h3>
                            <h3 class="card-text">Vault Description: {{vault.description}}</h3>

                        </div>
                    </div>
                </div>
     
<!--View Vault Model-->
            <div class="modal fade" id="viewKeepModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">

                            <h5 class="modal-title" id="exampleModalLabel">{{vault.title}}</h5>

                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                      
                            <h3>{{vault.description}}</h3>

                            <div class="dropdown">
                                <select v-model="vault">
                                    <option disabled value = "">Add to a Vault</option>
                                    <option v-for='vault in vaults' :key="vault.id" :value="vault">{{vault.title}}</option>
                                </select>
                            </div>
                            <!-- <button type="button" @click='addToVault' class="btn btn-secondary" data-dismiss="modal">Add to a Vault</button> -->
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>



            <!--ROUTER PUSH THE KEEPS WHEN USER SELECTS A VAULT? -->

  <Ukeeps></Ukeeps>

  </div>
  </div>
  </div>
</template>

<script>
import Ukeeps from './Ukeeps'
export default {
  name: "Profile",
  components: {
      Ukeeps,
},

  mounted() {
    this.$store.dispatch("getUserKeeps");
    this.$store.dispatch("setKeeps");
    this.$store.dispatch("getVaults");
    this.$store.dispatch("setVaultKeeps");
  },

  data() {
    return {
      keep: {
        title: "",
        description: "",
        imageUrl: "",
        views: 0
      },
      vaultKeep: {
        title: "",
        description: "",
        public: 0
      },
      vault: {
        title: "",
        description: ""
      }
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