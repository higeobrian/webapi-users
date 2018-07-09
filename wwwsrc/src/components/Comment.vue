<template>
    <div>
        <div class="post">
            <h3>Title: {{activePost.title}}</h3>
            <h3>Body: {{activePost.body}} </h3>
            <img :src="activePost.img" alt="" srcset="">
        </div>
        <button @click="toggle" v-if="user._id">Add comment</button>
        <div v-if="showAddComment">
            <form v-on:submit.prevent="addComment">
                <div class="form-group">
                    <input type="text" name="title" placeholder="Title" v-model="comment.title">
                    <input type="text" name="body" placeholder="Your comment here...." v-model="comment.body">
                    <input type="url" name="img" placeholder="Image" v-model="comment.img">
                </div>
                <button type="submit">Post</button>
            </form>
        </div>
        <div class="comments" v-for="comment in comments">
            <h3>User: {{comment.author}}</h3>
            <a @click="selectComment(comment)">
                <h4>title: {{comment.title}}</h4>
            </a>
            <img :src="comment.img" alt="">
            <p>{{comment.body}}</p>
            <p>upvotes: {{comment.userUpVotes.length}}</p>
            <p>downvotes: {{comment.userDownVotes.length}}</p>
            <button :disabled="voteCheck(comment)" v-if="user._id" @click="addUpVote(comment)">up vote</button>
            <button :disabled="voteCheck(comment)" v-if="user._id" @click="addDownVote(comment)">down vote</button>
            <button v-if="comment.userId == user._id" @click="deleteComment(comment)">Delete</button>
        </div>


    </div>
</template>


<script>
    export default {
        name: 'comment',
        data() {
            return {
                comment: {
                    title: '',
                    body: '',
                    img: '',
                    userUpVotes: [],
                    userDownVotes: [],
                    author: '',
                    userId: '',//may be incorect
                    postId: ''
                },
                showAddComment: false,
            }
        },
        computed: {
            comments() {
                return this.$store.state.comments
            },
            activePost() {
                return this.$store.state.activePost
            },
            user() {
                return this.$store.state.user
            }
        },
        methods: {
            toggle() {
                this.showAddComment = !this.showAddComment
            },
            addComment() {
                this.comment.postId = this.activePost._id
                if (this.user._id) {
                    this.comment.author = this.user.name
                    this.comment.userId = this.user._id
                }
                this.$store.dispatch('addComment', this.comment)
                this.comment = {
                    title: '',
                    body: '',
                    img: '',
                    userUpVotes: [],
                    userDownVotes: [],
                    author: '',
                    userId: '',//may be incorect
                    postId: ''
                }
            },
            selectComment(comment) {
                this.$store.state.activeComment = comment
                this.$store.dispatch('getSubComments', comment)
                this.$router.push('sub-comment')
            },
            addUpVote(comment) {
                comment.userUpVotes.push(this.user._id)
                this.$store.dispatch('upComment', comment)
            },
            voteCheck(comment) {
                return (comment.userUpVotes.includes(this.user._id))
            },
            addUpVote(comment) {
                comment.userDownVotes.push(this.user._id)
                this.$store.dispatch('upComment', comment)
            },
            deleteComment(comment) {
                this.$store.dispatch('deleteComment', comment)
            }
        }
    }
</script>


<style scoped>
</style>