<template>
    <div class="signup">
        <div class="hero is-info">
            <div class="hero-body has-text-centered">
                <h1 class="title">Login</h1>
            </div>
        </div>

        <section class="section">
            <div class="container">
                <div class="columns">
                    <div class="box column is-4 is-offset-4">
                        <form v-on:submit.prevent="submitForm">
                            <div class="field">
                                <label>Username:</label>
                                <div class="control">
                                    <input type="text" class="input" v-model="username">
                                </div>
                            </div>

                            <div class="field">
                                <label>Password:</label>
                                <div class="control">
                                    <input type="password" class="input" v-model="password">
                                </div>
                            </div>

                            <div class="notification is-danger is-light" v-if="errors.length">
                                <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
                            </div>

                            <div class="field">
                                <div class="control">
                                    <button class="button is-dark">Submit</button>
                                </div>
                            </div>

                        </form>

                        <hr>
                        Or <router-link to="/signup" >Sign-Up here</router-link> if you are not registered!
                    </div>
                </div>
            </div>
        </section>
        
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            username: '',
            password: '',
            errors: [],
        }
    },
    methods: {
        submitForm() {
            console.log('submit form')

            axios.defaults.headers.common['Authorization'] = ""

            localStorage.removeItem('token')

            this.errors=[]

            if (this.username === '') {
                this.errors.push('Username is empty!')
            }
            if (this.password === '') {
                this.errors.push('Password is empty!')
            }
            if (!this.errors.length) {
                const formData = {
                    username: this.username,
                    password: this.password
                }

                axios
                    .post('/api/v1/token/login/', formData)
                    .then(response => {
                        const token = response.data.auth_token
                        this.$store.commit('setToken', token)
                        axios.defaults.headers.common['Authorization'] = "Token "+token
                        localStorage.setItem('token',token)
                        this.$router.push('/dashboard/')
                    })
                    .catch(error => {
                        if (error.response) {
                            for (const property in error.response.data){
                                this.error.push(`${property}: ${error.response.data[property]}`)
                            }
                            console.log(JSON.stringify(error.response.data))
                        } else if (error.message) {
                            this.error.push('Something went wrong. Please try again')
                            console.log(JSON.stringify(error.response.data))
                        }
                    })
            }
        }
    }
}
</script>