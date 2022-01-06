
<template>
    

<div v-if="$store.state.user.isAuthenticated">
    <div class="signup">
        <div class="hero is-info">
            <div class="hero-body has-text-centered">
                <h1 class="title"> Welcome, {{ $store.state.user.username}} !</h1>
            </div>
        </div>

        <section class="section">
        <div class="container">
            <div class="columns">
                <div div class="column is-2">
                    <aside class="menu">
                        <p class="menu-label">
                            Dashboard
                        </p>
                        <ul class="menu-list">
                            <li><router-link to="/dashboard/" :key="$route.fullPath">My Bookings</router-link></li>
                            <li><router-link to="/dashboard/createasset" v-show="$store.state.user.username=='admin'" :key="$route.fullPath">Create Asset</router-link></li>
                        </ul>
                        <p class="menu-label">
                            Assets
                        </p>
                        <ul class="menu-list">
                            <li v-for="asset in $store.state.assets" v-bind:key="asset.id" >
                                <router-link :to="'/dashboard/asset/'+asset.id" :key="$route.fullPath" >{{asset.title}}</router-link>
                            </li>
                        </ul>
                    </aside>
                </div>

                <div class="column is-10">
                    <router-view />
                </div>
            </div>



        </div>
        </section>

    </div>
</div>
<div v-else>
    <div>
        Please login
    </div>
</div>
</template>

<script>
import axios from 'axios'
export default {
    beforeCreate() {
        console.log('dashboard beforecreate')
        const token = this.$store.state.user.token  
        if (token) {
        axios.defaults.headers.common['Authorization'] = "Token "+token

        axios
            .get('/api/v1/users/me/')
            .then(response => {
                const username = response.data.username
                    this.$store.commit('setUsername', username)
                    localStorage.setItem('username', username)
            })
            .catch(error => {
            console.log(error.toJSON())
            })
        axios
            .get('/api/v1/drfams/assets')
            .then(response => {
                const assets = response.data
                console.log(assets)
                this.$store.commit('setAssets', assets)
                localStorage.setItem('assets', assets)
            })
            .catch(error => {
                console.log(error.toJSON())
            })

        } else {
        axios.defaults.headers.common['Authorization'] = ""
        }
  }
}
</script>