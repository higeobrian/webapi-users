<template>
<div class="container">
<div class="row">
    
    <div class="col-6 align-self-center"><br>  
        <form v-on:submit.prevent="createKeep(keep)">
        <input class="input" type="text" name="keepTitle" placeholder="KeepTitle" id="keepTitle" v-model="keep.title">
        <input class="input" type="text" name="keepDescription" placeholder="KeepDecscription" id="keepDescription" v-model="keep.description">
        <input class="input" type="text" name="keepImgUrl" placeholder="keepImgUrl" id="keepImgUrl" v-model="keep.imageUrl">
        <br><input type="checkbox" name="public" value="public" v-model="keep.public">Private?<br>
        <button class="btn btn-primary" type="submit">Create a new Keep</button>
        </form>
    </div>

    <div class="col-6 align-self-center">  
        <form v-on:submit.prevent="createVault(vault)">
        <input class="input" type="text" name="vaulttitle" placeholder="VaultTitle" id="vaultTitle" v-model="vault.title">
        <input class="input" type="text" name="vaultDescription" placeholder="VaultDescription" id="vaultDescription" v-model="vault.description">
        <button class="btn btn-primary" type="submit">Create a new Vault</button>
        </form>
    </div>

</div> <!-- end row -->
<br>

<div class="row">
    <div class="col-12 align-self-center">
        <div v-for="keep in keeps" v-bind:key="keep.id">
        <h3 class="card-text">{{keep.title}}</h3>
        <h3 class="card-text">{{keep.description}}</h3>
        <img :src="keep.imageUrl" alt="">
</div>
</div>


<div class="viewKeepModal">

<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#viewKeepModal" @click="setActiveKeep(keep)">
  Click to View and Add To Vault
</button>

<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>

      <div class="modal-body"> <!-- BODY -->
        <h4> class="card-text">{{keep.title}}</h4>
        <h4> class="card-text">{{keep.description}}</h4>
        <img :src="keep.imageUrl" alt="">
        <div class="view"># of Views:{{keep.views}}</div>
        <div class="added"># added to Vaults:{{vault.added}}</div>
      </div>

      <div class="modal-footer"> <!-- FOOTER -->
         <select v-model="vault">
      <option disabled value=''>Select A Vault: </option>
      <option v-for="vault in vaults" :key="vault.id" :value="vault">{{vault.title}}</option>
      </select>
      <button @click="addKeepToVault(keep)">Add Keep To Vault: </button>
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
  name: "Home",

  mounted() {
    this.$store.dispatch("setKeeps");
    this.$store.dispatch("getVaults");
  },

  data() {
    return {
      keep: {
        title: "",
        description: "",
        imageUrl: "",
        views: 0,
        public: 0
      },
      vault: {
        title: "",
        description: ""
      },
      vaultKeep: {
        added: 0
      }
    };
  },
  methods: {
    createKeep() {
      this.$store.dispatch("createKeep", this.keep);
    },
    createVault() {
      this.$store.dispatch("createVault", this.vault);
    },
    viewCount() {
      this.$store.dispatch("viewCount", this.keep);
    }, 
    addKeepToVault() {
      this.$store.dispatch("addKeepToVault", this.keep);
    }, 
    setActiveVault() {
      this.$store.dispatch("setActiveVault", this.vault);
    },
    setActiveKeep() {
      this.$store.dispatch("SetActiveKeep", this.keep);
    }
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