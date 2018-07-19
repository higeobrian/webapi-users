<template>
<div class="container">

<div class="row">    
    <div class="col-6 align-self-center"><br>  
        <form v-on:submit.prevent="createKeep(keep)">
        <input class="input " type="text" name="keepTitle" placeholder="KeepTitle" id="keepTitle" v-model="keep.title">
        <input class="input" type="text" name="keepDescription" placeholder="KeepDecscription" id="keepDescription" v-model="keep.description">
        <input class="input" type="text" name="keepImgUrl" placeholder="keepImgUrl" id="keepImgUrl" v-model="keep.imageUrl">
        <br>
        <select v-model="keep.public">
        <option disabled value="">Make Image Public?</option>
        <option value="0">Public</option>
        <option value="1">Private</option>
        </select>
        <br>
        <button class="btn btn-primary" type="submit">Create a new Keep</button>
        </form>
    </div>

    <div class="col-6 align-self-center">  
        <form v-on:submit.prevent="createVault(vault)">
        <input class="input" type="text" name="vaultTitle" placeholder="VaultTitle" id="vaultTitle" v-model="vault.title"><br>
        <input class="input" type="text" name="vaultDescription" placeholder="VaultDescription" id="vaultDescription" v-model="vault.description"><br>
        <button class="btn btn-primary" type="submit">Create a new Vault</button>
        </form>
    </div>
</div> <!-- end row -->
<br>


<div class="row">
<div class="col-12">
<div v-for="keep in keeps" v-if="!keep.public" :key="keep.id"> <!-- display all keeps -->
     <h5>Keep Title: {{keep.title}}</h5>
     <h5>Keep Description: {{keep.description}}</h5>
     <img :src="keep.imageUrl " alt=" ">
     <button class="btn" data-toggle="modal" data-target="#viewKeepModal" @click="viewActiveKeep(keep)">View</button>
     <button class="btn2">Added:{{keep.added}}</button>
      <button class="btn3">Views:{{keep.view}}</button>
</div>
</div>
</div>



<div class="modal fade" id="viewKeepModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
<div class="modal-dialog" role="document">
<div class="modal-content">
<div class="modal-header">


<!--View Keep Model-->

<h5 class="modal-title" id="exampleModalLabel">{{activeKeep.title}}</h5>
<button type="button" class="close" data-dismiss="modal" aria-label="Close">
<span aria-hidden="true">&times;</span>
</button>
</div>
<div class="modal-body">

<img :src="activeKeep.imageUrl" alt="">
<h3>{{activeKeep.description}}</h3>

<div class="dropdown">
<select v-model="vault">
<option disabled value = "">Add to a Vault</option>
<option v-for='vault in vaults' :key="vault.id" :value="vault">{{vault.title}}</option>
</select>
</div>

<button type="button" @click="addKeepToVault()" class="btn btn-secondary" data-dismiss="modal">Add to a Vault</button>
<button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>


</div>
</div>
</div>
</div>
</div>
</template>

<script>
export default {
  name: "Home",

  mounted() {
    this.$store.dispatch("getKeeps");
    this.$store.dispatch("getVaults");
  },

  data() {
    return {
      keep: {
        title: "",
        description: "",
        imageUrl: ""
        // views: 0,
        // public: 0,
        // added: 0
      },
      vault: {
        title: "",
        description: ""
      },
      vaultKeeps: {},
      activeKeep: {}
    };
  },

  methods: {
    createKeep() {
      this.$store.dispatch("createKeep", this.keep);
    },
    createVault() {
      this.$store.dispatch("createVault", this.vault);
    },
    viewActiveKeep(keep) {
      this.activeKeep = keep;
      this.$store.dispatch("viewActiveKeep", keep);
      $("#viewKeepModal").modal("show");
    },
    addKeepToVault() {
      this.$store.dispatch("addKeepToVault", {
        keepId: this.activeKeep.id,
        vaultId: this.vault.id
      });
    }
  },

  computed: {
    keeps() {
      return this.$store.state.keeps;
    },
    vaults() {
      return this.$store.state.vaults;
    },
    user() {
      return this.$store.state.user;
    }
    // vaultKeeps() {
    //   return this.$store.state.vaultKeeps;
    // }
  }
};
</script>



















<!--
            // addPost() {
            //     if (this.user._id) {
            //         this.post.author = this.user.name
            //         this.post.userId = this.user._id
            //     }
            //     this.$store.dispatch('addPost', this.post)
            //     this.post = {
            //         title: '',
            //         body: '',
            //         img: '',
            //         userUpVotes: [],
            //         userDownVotes: [],
            //         author: '',
            //         userId: '',
            //     }
            // },

            // toggle() {
            //     this.showAddPost = !this.showAddPost
            // },

            // selectPost(post) {
            //     this.$store.state.activePost = post
            //     this.$store.dispatch('getComments', post)
            //     this.$router.push('comment')
            // },

            // addUpVote(post) {
            //     post.userUpVotes.push(this.user._id)
            //     this.$store.dispatch('upPost', post)
            // },

            // voteCheck(post) {
            //     return (post.userUpVotes.includes(this.user._id))
            // },

            // downCheck(post) {
            //     return (post.userDownVotes.includes(this.user._id))
            // },

            // addDownVote(post) {
            //     post.userDownVotes.push(this.user._id)
            //     this.$store.dispatch('upPost', post)
            // },

            // deletePost(post) {
            //     this.$store.dispatch('deletePost', post)
            // },

            // favPost(post) {
            //     this.$store.dispatch('favPost', post)
            // },

            // unFavPost(post) {
            //     this.$store.dispatch('unFavPost', post)
            // }

-->
<style scoped>
/* .card{
background-image: url('../../D20.png');
margin-bottom: 1rem;
margin-top: 1rem;
width: 30rem;
font-weight: 4rem
}
.butt{
    background: rgb(78, 78, 78);
    border-radius: 2rem;
    margin-top:1rem ;
    margin-bottom: 1rem
}
.register{
  background:rgb(61, 24, 24);
  border-radius: 1rem;
  margin-left:1rem
}
.center {
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 50%;
} */
</style>