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

        userKeeps: [], //Just in case.. as this could be private, with user.id attached
        userVaults: [], //Just in case.. as this could be private with use.id attached

        vaultKeeps: [],
        activeKeep: {}, //ability to delete keep once selected .. set activekeep.
        activeVault: {}, //need boolean.. set activevault.
    },

    mutations: {

        // USER RELATED
        setUser(state, user) {                  //login() and register()
            state.user = user
        },
        deleteUser(state, user) {               //logout() 
            state.user = user
        },

        // KEEP RELATED

        // getKeeps(state, keeps) {
        //     state.keeps = keeps
        // },
        setKeeps(state, keeps) {                //Shows all keeps on home page
            state.keeps = keeps
        },
        setKeep(state, keep) {                  //Activate single keep, MODAL WITH POPOVER MENU
            state.activeKeep = keep
        },
        removeKeep(state, keep) {               //delete activeD/selected keep from MODAL POPOVER MENU
            state.activeKeep = keep
        },
        createKeep(state, keep) {                    //adds keep to whatever vault you select (by id)
            state.keep = keep
        },
        
        setUserkeeps(state, userKeeps) {        //set userKeeps in user profile
            state.userKeeps = userKeeps
        },

        // VAULT RELATED

        // getVaults(state, vaults) {
        //     state.vaults = vaults
        // },
        setVaults(state, vaults) {               //shows ALL vaults on profile
            state.vaults = vaults
        },
        setVault(state, vault) {                  //shows all keeps in the vault you're in
            state.activeVault = vault
        },
        createVault(state, vault) {                  //adds or create new vault on profile page
            state.vault = vault
        },

        setUserVaults(state, userVaults) {
            state.userVaults = userVaults
        },

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

        // USERRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR

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


        //KEEPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP

        getKeeps({ commit }) {                                     // GET ALL KEEPS [HOME]
            api.get('api/keep')
                .then(res => {
                    commit("setKeeps", res.data)
                })
                .catch(err => {
                    console.log(err)
                })
        },

        viewActiveKeep({ commit, dispatch, state }, keep) {          // POP UP MODAL? WHEN ACTIVE, OFFER MENU [HOME]
            api.get('api/keep' + keep.id, keep)         
            .then(res => {
                commit('setActiveKeep', res.data)
            })
            .catch(err => {
                console.log(err)
            })
        },
        
        editKeep({ dispatch, commit }, keep) {                      // EDIT KEEP [PROFILE]
            api.put('api/keep' + keep.id)
            .then(() => {
                dispatch('getKeeps')
            })
            .catch(err => {
                console.log(err)
            })
        },
        
        removeKeep({ dispatch, commit }, keep) {
            api.delete('api/keep' + keep.id)                          // REMOVE KEEP FROM VAULT [PROFILE]
            .then(() => {                                               // removeKeep MUTATION - alters activeKeep STATE
                commit('removeKeep', res.data)
            })
            .catch(err => {
                console.log(err)
            })
        },
        
        getUserKeeps({ dispatch, commit }, user) {                   // GETS ALL USER KEEPS [PROFILE]
            api.get('api/keep' + user.id)
            .then(res => {
                commit("setUserKeeps", res.data)
            })
            .catch(err => {
                console.log(err)
            })
        },
        
        createKeep({ dispatch }, keep) {                            // CREATE NEW KEEP [HOME]
            api.post('api/keep', keep)
            .then(res => {
                commit('createKeep', res.data)
            })
            .catch(err => {
                console.log(err)
            })
        },

        // VAULTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT
        
        
        getVaults({ commit }, payload) {                        // GETS ALL VAULTS FOR DROP DOWN SELECT W/IN KEEP DIV [HOME]
            api.get('api/vault' + payload)
            .then(res => {
                commit('setVaults', res.data)
            })
            .catch(err => {
                console.log(err)
            })
        },

        viewActiveVault({ commit, dispatch, state}, vault) {
            api.get('api/vault' + vault.id, vault)
            .then(res => {
                commit('setActiveVault', res.data)
            })
            .catch(err => {
                console.log(err)
            })
        },

        addVault({ dispatch }, payload) {                           
            api.post('api/vault', payload)
            .then(res => {
                dispatch('setVaults') //call above action
            })
            .catch(err => {
                console.log(err)
            })
        },

        createVault({ commit, dispatch, state}, vault) {
            api.post('api/vault', vault)
            .then(res => {
                commit("createVault", res.data)
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
