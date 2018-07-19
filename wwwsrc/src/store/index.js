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

var auth = axios.create({
    baseURL: baseUrl + 'account/',
    timeout: 3000,
    withCredentials: true
})

export default new vuex.Store({
    state: {
        user: {},
        keeps: [],
        vaults: [],
        vaultKeeps: [],
        userKeeps: [],
        userVaults: [],
        activeKeep: {},
        activeVault: {}

        // views: {},
        // public: {},
    },

    mutations: {
        setUser(state, user) {
            state.user = user
        },
        deleteUser(state, user) {
            state.user = user
        },
        /////////////////////////////////
        viewCount(state, keep) {                 // view active keep
            state.keeps = keep
        },
        /////////////////////////////////
        getVaults(state, vaults) {
            state.vaults = vaults
        },
        getKeeps(state, keeps) {
            state.keeps = keeps
        },

        setUserVaults(state, userVaults) {
            state.userVaults = userVaults
        },
        setUserKeeps(state, userKeeps) {
            state.userKeeps = userKeeps
        },

        setActiveVault(state, vault) {
            state.activeVault = vault
        },
        setActiveKeep(state, keep) {
            state.activeKeep = keep
        },

        removeUserKeep(state, userKeep) {
            state.userKeeps = userKeep
        },

        createVault(state, vault) {
            state.vaults = vault
        },
        createKeep(state, keep) {
            state.keeps = keep
        }
    },

    actions: {
        viewActiveKeep({ commit }, keep) {
            payload.views++
            api.get('api/keeps/' + keep.id, keep)
                .then(res => {
                    commit('viewCount', res.data)                         // view single keep by id from activeKeep []???????
                })
                .catch(err => {
                    console.log(err)
                })
        },

        getVaults({ commit }) {
            api.get('api/vault')
                .then(res => {
                    commit('getVaults', res.data)                               // get all vaults from vault []
                })
                .catch(err => {
                    console.log(err)
                })
        },

        getKeeps({ commit }) {
            api.get('api/keep')
                .then(res => {
                    commit("getKeeps", res.data)                                 // GET ((((ALL)))) KEEPS [HOME]
                })
                .catch(err => {
                    console.log(err)
                })
        },

        setUserVaults({ commit }) {
            api.get('api/vault/', +user.id)
                .then(res => {
                    commit("setUserVaults", res.data)                 // gets vaultkeeps by user id from vaults []
                })
                .catch(err => {
                    console.log(err)
                })
        },

        setUserKeeps({ commit }) {
            api.get('/api/userkeeps', +user.id)
                .then(res => {
                    commit('setUserKeeps', res.data)                       // get all vaultkeeps from vaultkeeps []
                    console.log(res)
                })
                .catch(err => {
                    console.log(err)
                })
        },

        setActiveVault({ commit }) {
            api.get('/api/vault', + vault.id)
                .then(res => {
                    commit("setActiveVault", res.data)
                })
                .catch(err => {
                    console.log(err)
                })
        },

        setActiveKeep({ commit }) {
            api.get('/api/keep', + keep.id)
                .then(res => {
                    commit("setActiveKeep", res.data)
                })
                .catch(err => {
                    console.log(err)
                })
        },

        addKeepToVault({ commit }, Keep) {                              // only pass keep (obj) if necessary.. api.get unecessary
            vaultKeeps.added++
            api.post('api/vaultKeeps', Keep)
                .then(res => {
                    commit('setUserKeeps')                                 // add keep to keepvaults...[]... not userkeeps? confused.
                })
                .catch(err => {
                    console.log(err)
                })
        },

        createVault({ commit, }, vault) {
            api.post('api/vault', vault)
                .then(res => {
                    commit("createVault", res.data)                             // create vault []
                })
                .catch(err => {
                    console.log(err)
                })
        },

        createKeep({ commit }, keep) {
            api.post('api/keep', keep)
                .then(res => {
                    commit('createKeep', res.data)                              // creates a keep []
                })
                .catch(err => {
                    console.log(err)
                })
        },

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////            

        editKeep({ commit }, keep) {
            api.put('api/keep/' + keep.id, keep)
                .then(res => {
                    commit('getKeeps')                                    // edit keep by keep id, updates keep []
                })
                .catch(err => {
                    console.log(err)
                })                                                                // USED IN [UKEEPS.VUE]                               
        },

        removeKeep({ commit }, keep) {
            api.delete('api/keep/' + keep.id)
                .then(res => {
                    commit('removeKeep', res.data)                          // remove keep from keep []
                })
                .catch(err => {
                    console.log(err)
                })
        },

        removeUserKeep({ commit }, user) {
            api.delete('api/keep/' + user.id, user)
                .then(res => {
                    commit('removeKeep', res.data)                          // remove keep from keep []
                })
                .catch(err => {
                    console.log(err)
                })
        },


        ////////////////////////////////////////////////////////////////////////////////////////////////////

        // removeKeepFromVault({ commit }, vaultKeeps) {    
        //     api.delete('api/vaultKeeps/' + vaultKeeps.vaultId + '/' + vaultKeeps.id)                                       
        //         .then(res => {
        //             commit('removeKeepFromVault', res.data)                             
        //         })                                                          // remove vaultkeep by vault/keep id, removes from vaultkeeps[]
        //         .catch(err => {
        //             console.log(err)
        //         })
        // },

        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //Get all keep by vaultId[]
        // USE IN PROFILE... 

        // setActiveVault({ commit, dispatch, state }, vault) {              
        //     api.get('api/vault' + vault.id, vault)
        //         .then(res => {
        //             commit('setActiveVault', res.data)                   // gets single vault by id from activeVault []
        //         })
        //         .catch(err => {
        //             console.log(err)
        //         })
        // },

        // viewKeep({ commit, dispatch, state }, keep) {                   
        //     api.get('api/keep' + keep.id, keep)
        //     .then(res => {
        //         commit('setActiveKeep', res.data)                        // gets single keep by id from userKeeps []
        //     })
        //     .catch(err => {
        //         console.log(err)
        //     })
        // },


        // setActiveKeep({ commit }, payload) {   
        //     // payload.views++                                               
        //     api.get('api/keep/' + keep.id, payload)
        //         .then(res => {
        //             commit("setKeeps", res.data)                          // get single keep by keep id from keeps []
        //         })
        //         .catch(err => {
        //             console.log(err)
        //         })
        // },

        //VIEWKEEP
        // viewCount({ dispatch }, payload) {//= ACTIVEKEEP
        //     payload.views++
        //     api.put('api/keep/' + keep.id, payload)                
        //         .then(() => {                                       
        //             dispatch('editKeep')                                 // updates single keep by id from keeps []
        //         })
        //         .catch(err => {
        //             console.log(err)
        //         })
        // },

        //NOTE: Always add foward slash when you +(ref).

        register({ commit }, payload) {
            console.log(payload)
            auth.post('/register', payload)
                .then(res => {
                    console.log('Successfully Registered')
                    commit('setUser', res.data)
                    router.push({ name: 'Home' })
                })
                .catch(err => {
                    console.log("Invalid")
                })
        },
        login({ commit }, payload) {
            auth.post('/login/', payload)
                .then(res => {
                    console.log('Successfully logged in')
                    commit('setUser', res.data.data)
                    router.push({ name: 'Home' })
                })
                .catch(err => {
                    console.log("Invalid")
                })
        },
        logout({ commit }) {
            auth.delete('/logout/')
                .then(res => {
                    commit('deleteUser')
                    router.push({ name: 'Home' })
                })
        },
        authenticate({ commit }, payload) {
            auth.get('/authenticate/', payload)
                .then(res => {
                    commit("setUser", res.data)
                })
                .catch(err => {
                    console.log("Invalid")
                })
        },
    }
})
