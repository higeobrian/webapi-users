<template>
<div class="container">
<div class="row">
<div class="col-12">
  
<!--KEEP BY VAULT ID // how to implement this? Mount? -->

        <div v-for="keep in keeps" :key=" keep.id " class="card mb-4 text-center"> 
        <h3><p>Keep Title: {{keep.title}}</p></h3>
        <h3><p>Keep Description: {{keep.description}}</P></h3>
        <img :src="keep.imageUrl " alt=" ">
        <button @click="RemoveKeep(keep)">Remove Keep From Vault</button>

        <form v-on:submit.prevent="editKeep(keep)">
        <input class="input" type="text" name="keepTitle" placeholder="KeepTitle" id="keepTitle" v-model="keep.title">
        <input class="input" type="text" name="keepDescription" placeholder="KeepDecscription" id="keepDescription" v-model="keep.description">
        <input class="input" type="text" name="keepImgUrl" placeholder="keepImgUrl" id="keepImgUrl" v-model="keep.imageUrl">
        <br><input type="checkbox" name="public" value="public" v-model="keep.public">Private?<br>
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

  mounted() {                                                         // everything is now being added to keepvaults
    this.$store.dispatch("getUserKeeps");                                 // userkeeps [] deleted
    this.$store.dispatch("getActiveVault");
    this.$store.dispatch("getUserVaults");
    // this.$store.dispatch("setUser");
  },

  data() {
    return {
      keep: {
        title: "",
        description: "",
        imageUrl: "",
      }  
    };
  },

  methods: {
    editKeep() {
      this.$store.dispatch("editKeep", this.keep);
    },
    removeKeep() {
      this.$store.dispatch("removeKeep", this.keep);
    }
  },

  computed: {
    keeps() {
      return this.$store.state.keeps;
    },
    vaultKeeps() {
      return this.$store.state.vaultKeeps;
    },
    user() {
      return this.$store.state.user;
    }
  }
};
</script>
