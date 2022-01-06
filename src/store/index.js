import { createStore } from 'vuex'

export default createStore({
  state: {
    user: {
      token: '',
      isAuthenticated: false,
      username: '',
    },
    assets: [],
    bookings: [],
    assetbookings:[],
  },
  mutations: {
    initializeStore(state) {
      if (localStorage.getItem('token')){
        state.user.token = localStorage.getItem('token')
        state.user.isAuthenticated = true
      } else {
        state.user.token = ''
        state.user.isAuthenticated = false
      }

      if (localStorage.getItem('username')){
        state.user.username = localStorage.getItem('username')
      } else {
        state.user.username = ''
      }

      if (localStorage.getItem('assets')) {
        state.assets = localStorage.getItem('assets')
      } else {
        state.assets = []
      }

      if (localStorage.getItem('bookings')) {
        state.bookings = localStorage.getItem('bookings')
      } else {
        state.bookings = []
      }

      if (localStorage.getItem('assetbookings')) {
        state.assetbookings = localStorage.getItem('assetbookings')
      } else {
        state.assetbookings = []
      }

    },
    setToken(state, token) {
      state.user.token = token
      state.user.isAuthenticated = true
    },
    removeToken(state){
      state.user.token = ''
      state.user.isAuthenticated = false
    },
    setUsername(state, username){
      state.user.username = username
    },
    removeUsername(state){
      state.user.username = ''
    },
    setAssets(state, assets){
      state.assets = assets
    },
    removeAssets(state){
      state.assets = []
    },
    setBookings(state, bookings){
      state.bookings = bookings
    },
    removeBookings(state){
      state.bookings = []
    },
    setAssetbookings(state, assetbookings){
      state.assetbookings = assetbookings
    },
    removeAssetbookings(state){
      state.assetbookings = []
    },
  },
  actions: {
  },
  modules: {
  }
})
