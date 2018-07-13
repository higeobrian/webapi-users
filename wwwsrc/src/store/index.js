import vue from 'vue'
import vuex from 'vuex'
import axios from 'axios'
import router from '../router'

var production = !window.location.host.includes('localhost');
var baseUrl = production ? '' : '//localhost:5000/';

vue.use(vuex)

var api = axios.create({
    baseURL: baseUrl,
    timeout: 3000,
    withCredentials: true
})

var api = axios.create({
    baseURL: baseUrl + 'profile/',
    timeout: 3000,
    withCredentials: true
})

var auth = axios.create({
    baseURL: baseUrl + 'auth/',
    timeout: 3000,
    withCredentials: true
})

export default {
    state: {
        user: {},
        keeps: [],
        activeKeep: [],
        vaults: [],
        activeVault: [],
    },

    mutations: {
        setUser(state, user) {
            state.user = user
        },
        deleteUser(state, user) {
            state.user = user
        },
        setKeeps(state, keeps) {
            state.keeps = keeps
        },
        setActiveKeep(state, keep) {
            state.activeKeep = keep
        },
        setVaults(state, vaults) {
            state.vaults = vaults
        },
        setActiveVault(state, vault) {
            state.activeVault = vault
        },
        addKeep(state, keep) {
            state.keep = keep
        }, 
        addVault(state, vault) {
            state.vault = vault
        }
    },

    actions: {        
        register({commit}, payload) {
            console.log(payload)
            auth.post('account/register', payload)
                .then(res => {
                    console.log('Successfully Registered')
                    commit('setUser', res.data)
                    router.push({name: 'Home'})
                })
                .catch(err=>{
                    console.log("Invalid")
                })
        },

        login({commit}, payload) {
            auth.post('account/login', payload)
                .then(res => {
                    console.log('Successfully logged in')
                    commit('setUser', res.data.data)
                    router.push({name: 'Home'})
                })
                .catch(err => {
                    console.log("Invalid")
                })
        },

        logout({commit}) {
            auth.delete('account/logout')
                .then(res => {
                    commit('deleteUser')
                    router.push({name: 'Home'})
                })
        },        

        authenticate({commit, dispatch}, payload) {
                auth.get("account/authenticate")
                .then(res => {
                    commit("setUser", res.data)
                })
                .catch(err => {
                    console.log("Invalid")
                })
        },

        getKeeps({commit, dispatch, state}) {
            server.get('api/keeps')
              .then(res => {
                commit("setKeeps", res.data)
              })
              .catch(err => {
                console.log(err)
              })
          },

        getVaults({commit, dispatch, state}) {
                auth.get('api/vaults')
                    .then(res => {
                        commit('setVaults', sort)
                    })
                    .catch(err => {
                        console.log(err)
                    })
            },

        addKeep({ dispatch, commit }, payload) {
                auth.post('/posts', payload)
                    .then(res => {
                        dispatch('addKeep')
                    })
                    .catch(err => {
                        console.log(err)
                      })
        },

        createVault({ dispatch, commit }, payload) {
            auth.post('api/vault', payload)
                .then(res => {
                    dispatch('addVault')
                })
                .catch(err => {
                    console.log(err)
                  })
        },

        createKeep({ dispatch, commit }, payload) {
            auth.post('api/keep', payload)
                .then(res => {
                    dispatch('addkeep')
                })
                .catch(err => {
                    console.log(err)
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
            
        }
    }
