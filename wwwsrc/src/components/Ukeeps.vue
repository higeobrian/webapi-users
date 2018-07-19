<template>
<div class="container">
<div class="row">
<div class="col-12">

<div v-for="keep in vaultKeeps" :key="keep.id" class="card mb-4 text-center">    

        <h3><p>Keep Title: {{keep.title}}</p></h3>
        <h3><p>Keep Description: {{keep.description}}</P></h3>
        <img :src="keep.imageUrl" alt="photo">
        <center>
        <button class="btn2">Added:{{keep.added}}</button>
        <button class="btn3">Views:{{keep.view}}</button>
        <button @click="RemoveKeep(keep)">Remove Keep From Vault</button></center>

<br><br><br>
<form v-on:submit.prevent="editKeep(keep)">

        <input class="input" type="text" name="keepTitle" placeholder="KeepTitle" id="keepTitle" v-model="keep.title">
        <input class="input" type="text" name="keepDescription" placeholder="KeepDecscription" id="keepDescription" v-model="keep.description">
        <input class="input" type="text" name="keepImgUrl" placeholder="keepImgUrl" id="keepImgUrl" v-model="keep.imageUrl">
        <br><select v-model="keep.public">
        <option disabled value="">Make Image Public?</option>
        <option value="0">Public</option>
        <option value="1">Private</option>
        </select><br>
        <button class="btn btn-primary" type="submit">Edit Keep</button>

  </form>                           
  </div>
  </div>
  </div>

</div>
</template>


<script>
export default {
  name: "Ukeeps",

  mounted() {                                                         
    this.$store.dispatch("getVaultKeeps", this.vaultId);                               
  },

  data() {
    return {
      keep: {                        // DISPLAYS ALL KEEPS FROM ACTIVEVAULT (VAULT ID)
        title: "",
        description: "",
        imageUrl: "",
        views: 0,
        // added: 0,
        // public: 0
      },
      vault: {
        title: "",
        description: ""      
      },
      vaultKeep: {}
    };
  },

  methods: {
    editKeep() {
      this.$store.dispatch("editKeep", this.keep);
    },
    removemVaultKeep() {
      this.$store.dispatch("removeVaultKeep", this.keep);
    }
  },

  computed: {
    keeps() {
      return this.$store.state.keeps
    },
    vaultKeeps() {
      return this.$store.state.vaultKeeps
    },
    userKeeps() {
      return this.$store.state.userKeeps
    },
    user() {
      return this.$store.state.user
    },
  }
};
</script>
