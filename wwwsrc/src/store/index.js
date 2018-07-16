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
    baseURL: baseUrl + 'account/',
    timeout: 3000,
    withCredentials: true
})

export default new vuex.store ({
    state: {
        user: {},
        keeps: [],
        vaults: [],
        vaultKeeps: [],
        activeKeep: {}, //ability to delete keep once selected
        activeVault: {}, //need boolean
    },

    mutations: {

        // USER RELATED
        setUser(state, user) {                  //login()
            state.user = user
        },
        deleteUser(state, user) {               //logout() 
            state.user = user
        },

        // KEEP RELATED
        setKeeps(state, keeps) {                //shows ALL keeps home
            state.keeps = keeps
        },
        setKeep(state, keep) {
            state.activeKeep = keep
        },
        deleteKeep(state, keep) {               //delete active/select keep
            state.activeKeep = keep
        },

        // VAULT RELATED
        setVaults(state, vaults) {               //shows ALL vaults on profile
            state.vaults = vaults
        },
        setVault(state, vault) {                  //shows all keeps in the vault you're in
            state.activeVault = vault
        },

        // ADD KEEP/VAULT
        // addKeep(state, keep) {                    //adds keep to whatever vault you select (by id)
        //     state.keep = keep
        // },
        // addVault(state, vault) {                  //adds or create new vault on profile page
        //     state.vault = vault
        // },




        // VAULTKEEP
        // setVaultKeep(state, vaultKeeps) {             //ALL
        //     state.vaultKeeps = vaultKeeps
        // },
        // removeVaultKeep(state, vaultKeep) {             //delete
        //     state.vaultKeeps = vaultKeep
        // },
        // addVaultKeep(state, vaultKeep) {                    //create
        //     state.keeps = vaultKeep
        // }, 
        
    },

    actions: {        
        register({commit}, payload) {
            console.log(payload)
            auth.post('/register', payload)
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
            auth.post('/login/', payload)
                .then(res => {
                    console.log('Successfully logged in')
                    commit('setUser', res.data.data)                               //login res.data.data
                    router.push({name: 'Home'})
                })
                .catch(err => {
                    console.log("Invalid")
                })
        },

        logout({commit}) {
            auth.delete('/logout/')
                .then(res => {
                    commit('deleteUser')
                    router.push({name: 'Home'})
                })
        },        

        authenticate({commit, dispatch}, payload) {
                auth.get('/authenticate/')
                .then(res => {
                    commit("setUser", res.data)
                })
                .catch(err => {
                    console.log("Invalid")
                })
        },

        getKeeps({commit}) {   //get all keeps 
            server.get('/keep/')
              .then(res => {
                commit("setKeeps", res.data)
              })
              .catch(err => {
                console.log(err)
              })
          },

        getVaults({commit}, payload) {    //get all vaults
                api.get('/vault/'+payload)
                    .then(res => {
                        commit('setVaults', res.data)
                    })
                    .catch(err => {
                        console.log(err)
                    })
            },

        addKeep({ dispatch }, payload) {    //add keep to vault selected (vault id) attached w/ user id.
                api.post('/keep/', payload)
                    .then(res => {
                        dispatch('getKeeps')
                    })
                    .catch(err => {
                        console.log(err)
                      })
        },

        addVault({ dispatch}, payload) {    //create vault with user id attached
            auth.post('vaults', payload)
                .then(res => {
                    dispatch('getVaults') //call above action
                })
                .catch(err => {
                    console.log(err)
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

        // setVaultKeeps({commit, state}){
        //      api.get('/vaultkeep/' +state.user.id)
        //      .then(res=>{
        //        commit('vaultKeeps', res.data)
        //        console.log(res)
        //      })
        //    },

        //    addVaultKeep({dispatch}, payload){
        //     api.post('/vaultkeep/', payload)
        //       .then(res=>{
        //         console.log(res)
        //         dispatch('setVaultKeeps')
        //       })
        //       .catch(err=>{
        //         console.log(err)
        //       })
        //   },
        
        }
    })
