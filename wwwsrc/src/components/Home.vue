<template>
<div class="container">
<div class="row">

    <div class="col-6">  
        <form v-on:submit.prevent="addKeep(keep)">
        <input class="input" type="text" name="keepTitle" placeholder="KeepTitle" id="keepTitle" v-model="keep.title">
        <input class="input" type="text" name="keepDescription" placeholder="KeepDecscription" id="keepDescription" v-model="keep.description">
        <input class="input" type="text" name="keepImgUrl" placeholder="keepImgUrl" id="keepImgUrl" v-model="keep.imageUrl">
        <button class="btn btn-primary" type="submit">Create a new Keep</button>
        </form>
    </div>

    <div class="col-6">  
        <form v-on:submit.prevent="addVault(vault)">
        <input class="input" type="text" name="vaulttitle" placeholder="VaultTitle" id="vaultTitle" v-model="vault.title">
        <input class="input" type="text" name="vaultDescription" placeholder="VaultDescription" id="vaultDescription" v-model="vault.description">
        <button class="btn btn-primary" type="submit">Create a new Vault</button>
        </form>
    </div>

    <div class="row">
    <div class="col-12">
        <div v-for="keep in keeps" v-bind:key="keep._id">
        <h2>{{Keep.title}}</h2>
        <h3>{{keep.description}}</h3>
        <img :src="keep.imageUrl" alt="">
        </div>
    </div>
    </div>


    <div class="row">
        <div class="col-12">
    
        <div v-for="vault in vaults" v-bind:key="vault._id">
        <router-link :to="{ name: 'Profile'}"> 
        <button @click="setActiveVault(vault)">{{vault.title}}</button>
        </router-link>

        </div>

        </div>
    </div>

</div>
</div>
</template>

<script>
    export default  {
        name: 'Home',
        
        mounted() {  
        },

        data() {
            return {
                keep: {
                    title: '',
                    description: '',
                    imageUrl: '',
                    userId: '',
                    view: 0
                },
                vault: {
                    title: '',
                    description: ''
                },
                public: true,
            }
        },

        computed: {
            activeKeep() {
                return this.$store.state.activeKeep
            },
            keeps() {
                return this.$store.state.keeps
            },
            vaults() {
                return this.$store.state.vaults
            }
        },

        methods: {
            addKeep() {
            this.$store.dispatch('addKeep', this.keep)
            },
            addVault() {
            this.$store.dispatch('addVault', this.vault)
            },


    //         addPost() {
    //             if (this.user._id) {
    //                 this.post.author = this.user.name
    //                 this.post.userId = this.user._id
    //             }
    //             this.$store.dispatch('addPost', this.post)
    //             this.post = {
    //                 title: '',
    //                 body: '',
    //                 img: '',
    //                 userUpVotes: [],
    //                 userDownVotes: [],
    //                 author: '',
    //                 userId: '',
    //             }
    //         },

    //         toggle() {
    //             this.showAddPost = !this.showAddPost
    //         },

    //         selectPost(post) {
    //             this.$store.state.activePost = post
    //             this.$store.dispatch('getComments', post)
    //             this.$router.push('comment')
    //         },

    //         addUpVote(post) {
    //             post.userUpVotes.push(this.user._id)
    //             this.$store.dispatch('upPost', post)
    //         },

    //         voteCheck(post) {
    //             return (post.userUpVotes.includes(this.user._id))
    //         },

    //         downCheck(post) {
    //             return (post.userDownVotes.includes(this.user._id))
    //         },

    //         addDownVote(post) {
    //             post.userDownVotes.push(this.user._id)
    //             this.$store.dispatch('upPost', post)
    //         },

    //         deletePost(post) {
    //             this.$store.dispatch('deletePost', post)
    //         },

    //         favPost(post) {
    //             this.$store.dispatch('favPost', post)
    //         },
            
    //         unFavPost(post) {
    //             this.$store.dispatch('unFavPost', post)
    //         }
        }
    }
</script>


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