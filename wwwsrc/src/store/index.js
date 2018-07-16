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

// var api = axios.create({
//     baseURL: baseUrl + 'profile/',
//     timeout: 3000,
//     withCredentials: true
// })

var auth = axios.create({
    baseURL: baseUrl + 'auth/',
    timeout: 3000,
    withCredentials: true
})

export default {
    state: {
        user: {},
        keeps: [],
        vaults: [],
        activeVault: [], //need boolean
    },

    mutations: {
        setUser(state, user) {
            state.user = user
        },
        deleteUser(state, user) {
            state.user = user
        },
        setKeeps(state, keeps) { //shows all keeps home
            state.keeps = keeps
        },
        deleteKeep(state, keep) {
            state.keeps = keep
        },
        setVaults(state, vaults) { //shows all vaults on profile
            state.vaults = vaults
        },
        setActiveVault(state, vault) { //shows all keeps in the vault you're in
            state.activeVault = vault
        },
        addKeep(state, keep) { //adds keep to whatever vault you select (by id)
            state.keep = keep
        }, 
        addVault(state, vault) { //adds or create new vault on profile page
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

        getKeeps({commit, dispatch, state}) {   //get all keeps 
            server.get('api/keeps')
              .then(res => {
                commit("setKeeps", res.data)
              })
              .catch(err => {
                console.log(err)
              })
          },

        getVaults({commit, dispatch, state}) {    //get all vaults
                auth.get('api/vaults')
                    .then(res => {
                        commit('setVaults', sort)
                    })
                    .catch(err => {
                        console.log(err)
                    })
            },

        addKeep({ dispatch, commit }, payload) {    //add keep to vault selected (vault id) attached w/ user id.
                auth.post('/posts', payload)
                    .then(res => {
                        dispatch('addKeep')
                    })
                    .catch(err => {
                        console.log(err)
                      })
        },

        createVault({ dispatch, commit }, payload) {    //create vault with user id attached
            auth.post('api/vault', payload)
                .then(res => {
                    dispatch('addVault')
                })
                .catch(err => {
                    console.log(err)
                  })
        },

        createKeep({ dispatch, commit }, payload) {    //create keep with user id attached.
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
           

        deleteKeep({ dispatch, commit }, keep) {
                api.delete('/keep/' + keep.id)
                    .then(() => {
                        commit('deleteKeep', res.data)
                    })
                    .catch(err => {
                        console.log(err)
                    })
        },
      
        signOut({ dispatch, commit, state }) {
                var signedOut = {}
                commit('setUser', signedOut)
        },
      
            
        }
    }
