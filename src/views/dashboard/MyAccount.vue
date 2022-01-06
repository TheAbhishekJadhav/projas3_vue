<template>
  <div class="about">
    <h1>This is an my account page</h1>

    <section class="section">
      <button @click="logout()" class="button is-danger">Log out</button>
    </section>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    methods: {
        logout() {
            console.log('logout')
            axios.defaults.headers.common['Authorization'] = ""
            localStorage.removeItem('token')
            this.$store.commit('removeToken')
            this.$router.push('/')
        }
    }
}
</script>