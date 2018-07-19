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
        getVaults(state, vaults) {
            state.vaults = vaults       //all
        },
        getKeeps(state, keeps) {
            state.keeps = keeps         //all
        },
        getVaultKeeps(state, vaultKeeps) {
            state.vaultKeeps = vaultKeeps
        },
        viewActiveVault(state, vault) {
            state.activeVault = vault
        },
        //////////////////////////////////EVERYTHING ABOVE WORKS////////////////////////////////////



        setActiveKeep(state, keep) {
            state.activeKeep = keep
        },
        removeUserKeep(state, userKeep) {
            state.userKeeps = userKeep
        },
    },

    // setUserKeeps(state, userKeeps) {
    //     state.userKeeps = userKeeps
    // },

    actions: {

    

        getUserKeeps({ commit }, user) {
            api.get('api/keep/user' + user.id, user)
                .then(res => {
                    commit("setUserKeeps", res.data)
                })
                .catch(err => {
                    console.log(err)
                })
        },

        //////// testing this one brian.

        setUserKeeps({ commit }) {
            api.get('/api/vaulktkeeps/' + user.id)
                .then(res => {
                    commit('setUserKeeps', res.data)                       // get all vaultkeeps from vaultkeeps []
                    console.log(res)
                })
                .catch(err => {
                    console.log(err)
                })
        },

        setUserActiveVault({ commit }) {
            api.get('/api/vault/' + vault.id)
                .then(res => {
                    commit("setActiveVault", res.data)
                })
                .catch(err => {
                    console.log(err)
                })
        },

        setUserActiveKeep({ commit }) {
            api.get('/api/vaultkeeps/' + keep.id)
                .then(res => {
                    commit("setActiveKeep", res.data)
                })
                .catch(err => {
                    console.log(err)
                })
        },

        //////////////////////////////////--------- PROFILE PAGE /////////////////////////////////////////

        viewActiveVault({ commit }, vault) {
            commit('viewActiveVault', vault)
        },


        getVaultKeeps({ commit }, vaultId) {
            api.get('api/vaultkeeps/' + vaultId)
                .then(res => {
                    commit("getVaultKeeps", res.data)                 // gets vaultkeeps by vault id from vaults []
                })
                .catch(err => {
                    console.log(err)
                })
        },

        ////////////////////////////-------- U KEEPS ///////////////////////////////////////////////////            

        editKeep({ commit }, keep) {
            api.put('api/keep/' + keep.id, keep)
                .then(res => {
                    commit('getKeeps')                                    // edit keep by keep id, updates keep []
                })
                .catch(err => {
                    console.log(err)
                })                                                                // USED IN [UKEEPS.VUE]                               
        },


        removeUserKeep({ commit }, user) {
            api.delete('api/vaultKeeps/' + user.id, user)
                .then(res => {
                    commit('getKeeps')                          // remove keep from keep []
                })
                .catch(err => {
                    console.log(err)
                })
        },

        removeVaultKeep({ dispatch }, keep) {
            api.delete('api/vaultkeeps/' + keep.id + '/' + vault.id, keep)
                .then(res => {
                    dispatch('getVaultKeeps')                          // remove keep from keep []
                })
                .catch(err => {
                    console.log(err)
                })
        },

        /////////////////////////////////////// EVERYTHING BELOW IS HOME PAGE/////////////////////////////////////////////////

        //NOTE: Always add foward slash when you +(ref).
        viewActiveKeep({ dispatch }, keep) {
            keep.view++
            api.put('api/keep/' + keep.id, keep)
                .then(res => {
                    dispatch('getKeeps')
                })
                .catch(err => {
                    console.log(err)
                })
        },

        addKeepToVault({ dispatch }, vaultkeep) {
            vaultkeep.added++
            api.post('api/vaultkeeps/', vaultkeep)
                .then(res => {
                    dispatch('getVaultKeeps')
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

        createVault({ dispatch }, vault) {
            api.post('api/vault', vault)
                .then(res => {
                    dispatch('getVaults')
                })
        },

        createKeep({ commit }, keep) {
            api.post('api/keep', keep)
                .then(res => {
                    commit('getKeeps')                              // creates a keep []
                })
                .catch(err => {
                    console.log(err)
                })
        },

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

      // createVaultKeep({ dispatch }, vaultKeep) {
        //     api.post('api/vaultkeeps/' + keep.id + '/' + vault.id + '/' + user.id, vaultKeep)
        //     .then(res => {
            //         dispatch("getVaults")                             
            //     })
            //     .catch(err => {
            //         console.log(err)
            //     })
            // },

 // removeKeepFromVault({ commit }, vaultKeeps) {    
        //     api.delete('api/vaultKeeps/' + vaultKeeps.vaultId + '/' + vaultKeeps.id)                                       
        //         .then(res => {
        //             commit('removeKeepFromVault', res.data)                             
        //         })                                                          // remove vaultkeep by vault/keep id, removes from vaultkeeps[]
        //         .catch(err => {
        //             console.log(err)
        //         })
        // },

        //Get all keep by vaultId[]
        // USE IN PROFILE... 

        // setActiveVault({ commit, dispatch, state }, vault) {              
        //     api.get('api/vault/' + vault.id, vault)
        //         .then(res => {
            //             commit('setActiveVault', res.data)                   // gets single vault by id from activeVault []
        //         })
        //         .catch(err => {
            //             console.log(err)
        //         })
        // },

        // viewKeep({ commit, dispatch, state }, keep) {                   
        //     api.get('api/keep/' + keep.id, keep)
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
