<template>
    <div class="signup">
        <div class="hero is-info">
            <div class="hero-body has-text-centered">
                <h1 class="title">Sign Up</h1>
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
                                <label>Email:</label>
                                <div class="control">
                                    <input type="email" class="input" v-model="email">
                                </div>
                            </div>

                            <div class="field">
                                <label>Password:</label>
                                <div class="control">
                                    <input type="password" class="input" v-model="password">
                                </div>
                            </div>

                            <div class="field">
                                <label>Re-Enter Password:</label>
                                <div class="control">
                                    <input type="password" class="input" v-model="password2">
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
                        Or <router-link to="/login" >Login here</router-link> if you have already registered
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
            email: '',
            password: '',
            password2: '',
            errors: [],
        }
    },
    methods: {
        submitForm() {
            console.log('submit form')

            this.errors=[]

            if (this.username === '') {
                this.errors.push('Username is empty!')
            }
            if (this.email === '') {
                this.errors.push('Email is empty!')
            }
            if (this.password === '') {
                this.errors.push('Password is empty!')
            }
            if (this.password !== this.password2) {
                this.errors.push('passwords do not match!')
            }
            if (!this.errors.length) {
                const formData = {
                    username: this.username,
                    email: this.email,
                    password: this.password
                }

                axios
                    .post('/api/v1/users/', formData)
                    .then(response => {
                        this.$router.push('/login')
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
