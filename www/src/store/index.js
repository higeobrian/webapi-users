import vue from 'vue'
import vuex from 'vuex'
import axios from 'axios'
import router from '../router'

let auth = axios.create({
    baseURL: 'http://localhost:3000/api',
    timeout: 3000
})

vue.use(vuex)

export default new vuex.Store({
    state: {
        user: {},
        posts: [],
        comments: [],
        subComments: [],
        activePost: {},
        activeComment: {},
        sortUp: true
    },

    mutations: {
        setUser(state, user) {
            state.user = user
        },
        setPost(state, post) {
            state.posts = post
        },
        setComments(state, comments) {
            state.comments = comments
        },
        setSubComments(state, subComments) {
            state.subComments = subComments
        }
    },

    actions: {
        getUsers({ dispatch, commit }, user) {
            if (user.name.length >= 3 && user.name.length <= 10) {
                auth.post('/login', user)
                    .then(res => {
                        commit('setUser', res.data)
                        router.push('/')
                    })
                    .catch(err => {
                        console.error(err)
                    })
            }
        },

        addUsers({ dispatch, commit }, user) {
            if (user.name.length >= 3 && user.name.length <= 10) {
                auth.post('/create', user).then(res => {
                    commit('setUser', res.data)
                    router.push('/')
                })
                    .catch(err => {
                        console.error(err)
                    })
            }
        },

        getPosts({ dispatch, commit, state }) {
            auth.get('/posts')
                .then(res => {
                    if (state.sortUp) {
                        var sort = res.data.sort((a, b) => {
                            return b.userUpVotes.length - a.userUpVotes.length
                        })
                    } else {
                        var sort = res.data.sort((a, b) => {
                            return a.userUpVotes.length - b.userUpVotes.length
                        })
                    }
                    commit('setPost', sort)
                })
        },
        getFavs({ dispatch, commit, state }, post) {
            var favs = state.user.favorites
            var favorites = []
            for (let i = 0; i < favs.length; i++) {
                const postId = favs[i];
                auth.get('/posts/' + postId)
                .then(res => {
                    favorites.push(res.data)
                })
            }
            commit('setPost', favorites)
        },
        addPost({ dispatch, commit }, post) {
            auth.post('/posts', post)
                .then(res => {
                    dispatch('getPosts')
                })
        },
        getComments({ dispatch, commit }, post) {
            auth.get('/comments?postId=' + post._id)
                .then(res => {
                    var sort = res.data.sort((a, b) => {
                        return b.userUpVotes.length - a.userUpVotes.length
                    })
                    console.log(res)
                    commit('setComments', res.data)
                })
        },
        addComment({ dispatch, commit, state }, comment) {
            auth.post('/comments', comment)
                .then(res => {
                    dispatch('getComments', state.activePost)
                })
        },
        getSubComments({ dispatch, commit }, comment) {
            auth.get('/sub-comments?commentId=' + comment._id)
                .then(res => {
                    var sort = res.data.sort((a, b) => {
                        b.userUpVotes.length - a.userUpVotes.length
                    })
                    console.log(res)
                    commit('setSubComments', res.data)
                })
        },
        addSubComment({ dispatch, commit, state }, subComment) {
            auth.post('/sub-comments', subComment)
                .then(res => {
                    dispatch('getSubComments', state.activeComment)
                })
        },
        upPost({ dispatch, commit }, post) {
            auth.put('posts/' + post._id, post)
                .then(res => {
                    dispatch('getPosts')
                })
        },
        upComment({ dispatch, commit }, comment) {
            auth.put('comments/' + comment._id, comment)
                .then(res => {
                    dispatch('getComments')
                })
        },
        upSubComment({ dispatch, commit }, subComment) {
            auth.put('sub-comments/' + subComment._id, subComment)
                .then(res => {
                    dispatch('getSubComments')
                })
        },
        deletePost({ dispatch, commit }, post) {
            auth.delete('/posts/' + post._id)
                .then(() => {
                    dispatch('getPosts')
                })
        },
        deleteComment({ dispatch, commit }, comment) {
            auth.delete('/comments/' + comment._id)
                .then(() => {
                    dispatch('getComments')
                })
        },
        deleteSubComments({ dispatch, commit }, subComment) {
            auth.delete('/sub-comments/' + subComment._id)
                .then(() => {
                    dispatch('getSubComments')
                })
        },
        signOut({ dispatch, commit, state }) {
            var signedOut = {}
            commit('setUser', signedOut)
        },
        favPost({ dispatch, commit, state }, post) {
            state.user.favorites.push(post)
            auth.put('users/' + state.user._id, state.user)
                .then(res => {
                    commit('setUser', res.data.user)
                })
        },
        unFavPost({ dispatch, commit, state }, post) {
            var index = state.user.favorites.indexOf(post._id)
            state.user.favorites.splice(index, 1)
            auth.put('users/' + state.user._id, state.user)
                .then(res => {
                    commit('setUser', res.data.user)
                })
        }
    }
})

