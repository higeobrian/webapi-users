<template>
<div class="container">
<div class="row">

    <div class="col-6">  
        <form v-on:submit.prevent="createKeep(keep)">
        <input class="input" type="text" name="keepTitle" placeholder="KeepTitle" id="keepTitle" v-model="keep.title">
        <input class="input" type="text" name="keepDescription" placeholder="KeepDecscription" id="keepDescription" v-model="keep.description">
        <input class="input" type="text" name="keepImgUrl" placeholder="keepImgUrl" id="keepImgUrl" v-model="keep.imageUrl">
        
        <br><input type="checkbox" name="public" value="public" v-model="keep.public">Private?<br>
        
        <button class="btn btn-primary" type="submit">Create a new Keep</button>
        </form>
    </div>

    <div class="col-6">  
        <form v-on:submit.prevent="createVault(vault)">
        <input class="input" type="text" name="vaulttitle" placeholder="VaultTitle" id="vaultTitle" v-model="vault.title">
        <input class="input" type="text" name="vaultDescription" placeholder="VaultDescription" id="vaultDescription" v-model="vault.description">
        <button class="btn btn-primary" type="submit">Create a new Vault</button>
        </form>
    </div>

</div> <!-- end row -->

<div class="row">
    <div class="col-12">

        <div v-for="keep in keeps" v-bind:key="keep.id" class="card mb-4 text-center">
        <h3 class="card-text">{{keep.title}}</h3>
        <h3 class="card-text">{{keep.description}}</h3>
        <img :src="keep.imageUrl" alt="">

        <button class="btn" data-toggle="modal" data-target="#viewKeepModal" @click="viewCount(keep)">View</button>
        <button class="btn" @click="addKeepVault(keep)">Add to Vault </button>
        <span># of Views:{{keep.views}}</span>
        <span># added to Vaults:{{vault.added}}</span>
        </div>

    </div>
</div>

<div class="row">
   <div class="col-12">  

       <div v-for="vault in vaults" v-bind:key="vault._id">
        <router-link :to="{ name: 'Profile'}">
        <button @click="setVaultKeeps(vault)">{{vault.title}}</button>
        </router-link>
        </div> 

   </div></div>
        <!-- NEED TO CREATE DROP DOWN SELECT -->
        <!-- NEED TO INCORPORATE ROUTER PUSH -->
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