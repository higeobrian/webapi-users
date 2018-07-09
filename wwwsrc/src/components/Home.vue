<template>
    <div class="Home">
        <button class="butt" @click="toggle" v-if="user._id">Add post</button>
        <div v-if="showAddPost">
            <form v-on:submit.prevent="addPost" id='post'>
                <div class="form-group">
                    <input class="register" type="text" name="title" placeholder=" Title" v-model="post.title">
                    <input class="register" type="text" name="body" placeholder=" Your post here...." v-model="post.body">
                    <input class="register" type="url" name="img" placeholder=" Image" v-model="post.img">
                </div>
                <button class="butt" type="submit">Post</button>
            </form>
        </div>

        <div>
            <div class="post" v-for="post in posts">
                    <div class="card container-fluid center">
                            <div class="card-body">
                <a @click="selectPost(post)">
                    <h4>{{post.title}}</h4>
                </a>
                <img :src="post.img" alt="">
                <p>{{post.body}}</p>
                <p>Author: {{post.author}}</p>
                <p>upvotes: {{post.userUpVotes.length}}</p>
                <p>downvotes: {{post.userDownVotes.length}}</p>
                <button :disabled="voteCheck(post)" v-if="user._id" @click="addUpVote(post)">up vote</button>
                <button :disabled="downCheck(post)" v-if="user._id" @click="addDownVote(post)">down vote</button>
                <button v-if="post.userId == user._id" @click="deletePost(post)">Delete</button>
                <div v-if="user._id">
                        <button @click="favPost(post)" v-if="!(user.favorites.includes(post._id))"><i class="far fa-star"></i></button>
                        <button @click="unFavPost(post)" v-else><i class="fas fa-star"></i></button>
                </div>
            </div>
            </div>
            </div>
        </div>



    </div>
</template>


<script>
    export default {
        name: 'Home',
        mounted() {
            this.$store.dispatch('getPosts')
        },
        data() {
            return {
                post: {
                    title: '',
                    body: '',
                    img: '',
                    userUpVotes: [],
                    userDownVotes: [],
                    author: '',
                    userId: '',
                },
                showAddPost: false,
            }
        },
        computed: {
            posts() {
                return this.$store.state.posts
            },
            user() {
                var user = this.$store.state.user
                return user
            }
        },
        methods: {
            addPost() {
                if (this.user._id) {
                    this.post.author = this.user.name
                    this.post.userId = this.user._id
                }
                this.$store.dispatch('addPost', this.post)
                this.post = {
                    title: '',
                    body: '',
                    img: '',
                    userUpVotes: [],
                    userDownVotes: [],
                    author: '',
                    userId: '',
                }
            },
            toggle() {
                this.showAddPost = !this.showAddPost
            },
            selectPost(post) {
                this.$store.state.activePost = post
                this.$store.dispatch('getComments', post)
                this.$router.push('comment')
            },
            addUpVote(post) {
                post.userUpVotes.push(this.user._id)
                this.$store.dispatch('upPost', post)
            },
            voteCheck(post) {
                return (post.userUpVotes.includes(this.user._id))
            },
            downCheck(post) {
                return (post.userDownVotes.includes(this.user._id))
            },
            addDownVote(post) {
                post.userDownVotes.push(this.user._id)
                this.$store.dispatch('upPost', post)
            },
            deletePost(post) {
                this.$store.dispatch('deletePost', post)
            },
            favPost(post) {
                this.$store.dispatch('favPost', post)
            },
            unFavPost(post) {
                this.$store.dispatch('unFavPost', post)
            }
        }
    }
</script>


<style scoped>


.card{
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
}
</style>