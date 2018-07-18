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

export default new vuex.Store({
    state: {
        user: {},
        keeps: [],
        vaults: [],
        views: [],
        vaultKeeps: [],
        public: {},
        userKeeps: [],
        activeKeep: {},
        activeVault: {}
    },

    mutations: {
        setUser(state, user) {
            state.user = user
        },
        deleteUser(state, user) {
            state.user = user
        },
        viewCount(state, views) {
            state.views = views
        },

        // KEEP 

        setKeeps(state, keeps) {                //Shows all keeps on home page
            state.keeps = keeps
        },
        getKeep(state, keep) {                  //Activate single keep, MODAL WITH POPOVER MENU
            state.activeKeep = keep
        },
        removeKeep(state, keep) {               //delete activeD/selected keep from MODAL POPOVER MENU
            state.keeps = keep
        },
        createKeep(state, keep) {                    // GOOD /adds keep to whatever vault you select (by id)
            state.keeps = keep
        },

        setUserKeeps(state, userKeeps) {        //set userKeeps in user profile
            state.userKeeps = userKeeps
        },

        setActiveVault(state, vault) {              // SELECT VAULT [HOME]
            state.activeVault = vault
        },

        setVaults(state, vaults) {            // LOADS USER VAULT ON [PROFILE].VUE 
            state.vaults = vaults
        },

        createVault(state, vault) {                // GOOD/ CREATES VAULT [HOME]
            state.vaults = vault
        },

        // VAULT RELATED

        // getVaults(state, vaults) {
        //     state.vaults = vaults
        // },


        // DO I NEED THIS 2? 
        // setVaults(state, vaults) {               //shows ALL vaults on profile
        //     state.vaults = vaults
        // },

        // VAULTKEEP

        // setVaultKeep(state, vaultKeeps) {             //ALL ... WOULD NEED TO ADD [VAULTKEEPS] TO STATE.
        //     state.vaultKeeps = vaultKeeps
        // },
        // removeVaultKeep(state, vaultKeep) {             //DELETE
        //     state.vaultKeeps = vaultKeep
        // },
        // addVaultKeep(state, vaultKeep) {                    //ADD TO
        //     state.keeps = vaultKeep
        // }, 

    },

    actions: {
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
        authenticate({ commit, dispatch }, payload) {
            auth.get('/authenticate/')
                .then(res => {
                    commit("setUser", res.data)
                })
                .catch(err => {
                    console.log("Invalid")
                })
        },

        editKeep ({ dispatch, commit }, keep) {                  // EDIT KEEP [PROFILE] 
            api.put('api/keep' + keep.id)
                .then(() => {
                    dispatch('setKeeps')
                })
                .catch(err => {
                    console.log(err)
                })
        },

        setKeeps ({ commit }) {                                    // GET ((((ALL)))) KEEPS [HOME]
            api.get('api/keep')
                .then(res => {
                    commit("setKeeps", res.data)
                })
                .catch(err => {
                    console.log(err)
                })
        },

        getUserKeeps ({ commit }, user) {                   // GETS (((((ALL USER))))) KEEPS [PROFILE]
            api.get('api/keep/' + user.id)
                .then(res => {
                    commit("setUserKeeps", res.data)
                })
                .catch(err => {
                    console.log(err)
                })
        },

        getVaults ({ commit }) {                        // GOOD\ GET ALL VAULTS USER [HOME] And [PROFILE]
            api.get('api/vault')                       
                .then(res => {
                    commit('setVaults', res.data)
                })
                .catch(err => {
                    console.log(err)
                })
        },

        viewCount ({ dispatch }, payload) {
            payload.views++
            api.put('api/keep/' + views.id, payload)                 // POP UP MODAL ++ INCREASE VIEW COUNT
                .then(() => {                                       // DISPATCHES TO SETACTIVEKEEP
                    dispatch('setActiveKeep')
                })
                .catch(err => {
                    console.log(err)
                })
        },

        setActiveKeep ({ commit }, payload) {                        // GET ACTIVE KEEP [HOME] and [PROFILE]
            api.get('api/keep/' + keep.id, payload)
                .then(res => {
                    commit("getKeep", res.data)
                })
                .catch(err => {
                    console.log(err)
                })
        },

        removeKeep ({ commit }, keep) {                              // GOOD /
            api.delete('api/keep/' + keep.id)                          // REMOVE KEEP FROM VAULT [PROFILE]
                .then(() => {                                               // removeKeep MUTATION - alters activeKeep STATE
                    commit('removeKeep', res.data)                              // CREATE METHOD FOR [PROFILE]
                })
                .catch(err => {
                    console.log(err)
                })
            },
            
            createKeep ({ commit }, keep) {                           
                api.post('api/keep', keep)
                .then(res => {
                    commit('createKeep', res.data)                  // DO I DISPATCH TO SETKEEPS?
                })
                .catch(err => {
                    console.log(err)
                })
            },

            addKeepToVault ({ dispatch }, vaultKeeps) {                     
            vaultKeeps.added++
            api.post('api/vaultKeeps', vaultKeeps)
            .then(res => {
                dispatch('getVaults')
            })
            .catch(err => {
                console.log(err)
            })
        },

        //    removeKeepFromVault ({dispatch}, payload){                                     
        //     api.post('/vaultkeep/', payload)                                      //REMOVE FROM VAULT
        //       .then(res=>{
        //         console.log(res)
        //         dispatch('setVaultKeeps')
        //       })
        //       .catch(err=>{
        //         console.log(err)
        //       })
        //   },




        // viewKeep({ commit, dispatch, state }, keep) {          // POP UP MODAL? ADD STATEMENT, VIEW COUNT INCREASES.
        //     api.get('api/keep' + keep.id, keep)
        //     .then(res => {
        //         commit('setActiveKeep', res.data)
        //     })
        //     .catch(err => {
        //         console.log(err)
        //     })
        // },



        // VAULTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT



        // viewActiveVault({ commit, dispatch, state }, vault) {                 // DISPATCH TO GETVAULTS? or just use 1 or other.
        //     api.get('api/vault' + vault.id, vault)
        //         .then(res => {
        //             commit('setActiveVault', res.data)
        //         })
        //         .catch(err => {
        //             console.log(err)
        //         })
        // },


        // DO I NEED MORE THAN THE 2 BELOW? 

        setVaults({ commit }, vault) {
            api.get('api/vaultkeeps/', +state.user.id, vault)                   //SET USER VAULY [PROFILE] LOAD KEEPS
                .then(res => {
                    commit("setVaults", res.data)
                })
                .catch(err => {
                    console.log(err)
                })
        },

        createVault({ commit, }, vaultKeeps) {                 // GOOD/ + USER.ID??? ATTACH? 
            api.post('api/vaultkeeps', vaultKeeps)
                .then(res => {
                    commit("createVault", res.data)
                })
                .catch(err => {
                    console.log(err)
                })
        },



        //NOTE: Always add foward slash when you +(ref).


    }
})
