<template>
    <div v-if="$store.state.user.username=='admin'">
        <p><strong>New Asset for Management</strong></p>
        <form v-on:submit.prevent="submitForm">
            <div class="field">
                <label>Enter Asset Title :</label>
                <div class="control">
                    <input type="text" class="input" v-model="title">
                </div>
            </div>

            <div class="field">
                <label>Asset Description:</label>
                <div class="control">
                    <input type="text" class="input" v-model="details">
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
    </div>
    <div v-else>
        Please Login as admin
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            title: '',
            details: '',
            errors: [],
        }
    },
    methods: {
        submitForm() {
            const token = this.$store.state.user.token
            console.log('submit form')
            this.errors=[]
            if (this.title === '') {
                this.errors.push('Title for asset is empty!')
            }
            if (this.details === '') {
                this.errors.push('Detail for asset is empty!')
            }
            if (!this.errors.length && token){
                axios.defaults.headers.common['Authorization'] = "Token "+token
                const formData = {
                    title: this.title,
                    details: this.details,
                }
                var bodyFormData = new FormData()
                bodyFormData.set('username',this.$store.state.user.username)
                bodyFormData.append('title',formData.title)
                bodyFormData.append('details',formData.details)
                axios
                    .post('/api/v1/drfams/assets', bodyFormData)
                    .then(response => {
                        alert('Asset added successfully')
                        this.$router.push('/dashboard/')
                    })
                    .catch(error => {
                        console.log(error.toJSON())
                    })
            } else {
                axios.defaults.headers.common['Authorization'] = ""
            }
        }
    }
}
</script>