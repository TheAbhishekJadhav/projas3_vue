<template>
  <div class="home">
    <nav
      class="navbar"
      role="navigation"
      aria-label="main navigation"
      style="min-height: 5rem"
    >
      <div class="navbar-brand">
          <a class="navbar-item is-size-4" href="/">ESAIP Asset Management</a>
      </div>

      <div id="navbar-item" class="navbar-menu">
          <div class="navbar-start">
            <router-link to="/" class="navbar-item">Home</router-link>
            <router-link to="/about" class="navbar-item">About</router-link>
            <router-link v-show="$store.state.user.isAuthenticated" to="/dashboard" class="navbar-item">Dashboard</router-link>
          </div>
      </div>

      <div class="navbar-end">
          <div class="navbar-item" v-if="$store.state.user.isAuthenticated">
            <div class="buttons">
              <button @click="logout()" class="button is-danger">Log out</button>
            </div>
          </div>
          <div class="navbar-item" v-else>
            <div class="buttons">
              <router-link to="/signup" class="button is-primary">
                <strong>Sign up</strong>
              </router-link>
              <router-link to="/login" class="button is-light"> Log in </router-link>
            </div>
          </div>
      </div>
    </nav>

    <router-view/>

    <footer class="footer" style="margin-top:auto;">
      <div class="content has-text-centered">
        <p>
          Copyright (c) ESAIP 2021
        </p>
      </div>
    </footer>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  // name: App,
  beforeCreate() {
    console.log('app beforecreate')
    this.$store.commit('initializeStore')
    const token = this.$store.state.user.token  
    if (token) {
      axios.defaults.headers.common['Authorization'] = "Token "+token
    } else {
      axios.defaults.headers.common['Authorization'] = ""
    }
  },
  methods: {
    async logout() {
      console.log('logout')
      await axios
        .post('/api/v1/token/logout/', this.$store.state.user.token)
        .then(response => {
          console.log('logout')
        })
        .catch(error => {
          console.log(error.toJSON())
        })
      axios.defaults.headers.common['Authorization'] = ""
      localStorage.removeItem('token')
      this.$store.commit('removeToken')
      localStorage.removeItem('username')
      this.$store.commit('removeUsername')
      localStorage.removeItem('assets')
      this.$store.commit('removeAssets')
      localStorage.removeItem('bookings')
      this.$store.commit('removeBookings')
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss">
@import "../node_modules/bulma";


// #app {
//   font-family: Avenir, Helvetica, Arial, sans-serif;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
//   text-align: center;
//   color: #2c3e50;
// }

// #nav {
//   padding: 30px;

//   a {
//     font-weight: bold;
//     color: #2c3e50;

//     &.router-link-exact-active {
//       color: #42b983;
//     }
//   }
// }
</style>
