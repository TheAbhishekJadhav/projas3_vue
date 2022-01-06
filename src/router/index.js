import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import SignUp from '../views/SignUp.vue'
import Login from '../views/Login.vue'
import Dashboard from '../views/dashboard/Dashboard'
import Bookings from '../views/dashboard/Bookings'
import MyAccount from '../views/dashboard/MyAccount'
import CreateAsset from '../views/dashboard/CreateAsset'
import Asset from '../views/dashboard/Asset'


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignUp
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/dashboard/myaccount',
    name: 'myacount',
    component: MyAccount
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    children: [
      {
        path: '',
        name: 'bookings',
        component: Bookings,
      },
      {
        path: 'createasset',
        name: 'createasset',
        component: CreateAsset,
      },
      {
        path: 'asset/:id',
        name: 'asset',
        component: Asset,
      },
    ]
  },

  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkExactActiveClass: 'is-active'
})

export default router
