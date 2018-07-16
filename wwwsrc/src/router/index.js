import Vue from 'vue'
import Router from 'vue-router'
import Auth from '@/components/Auth'
import Home from '@/components/Home'
import Profile from '@/components/Profile'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home  
    },
    {
      path: '/auth',
      name: 'Auth',
      component: Auth
    },
    { 
    path: '/profile',
    name: 'Profile',
    component: Profile
    }
  ]
})
