<template>
    <table class="table">
        <thead>
            <tr>
                <th>No</th>
                <th>User</th>
                <th>Asset</th>
                <th>Booking Date/Time</th>
                <th>Created At</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(booking, index) in $store.state.bookings" v-bind:key="booking.id">
                <th>{{ index+1 }}</th>
                <td>{{ booking.user }}</td>
                <td>{{ booking.asset[0] }}</td>
                <td>{{ booking.time_block }}</td>
                <td>{{ booking.created_at }}</td>
            </tr>
        </tbody>
    </table>
</template>

<script>
import axios from 'axios'
export default {
    beforeCreate() {
        const token = this.$store.state.user.token
        var bodyFormData = new FormData()
        bodyFormData.set('username',this.$store.state.user.username)
        if (token) {
            axios.defaults.headers.common['Authorization'] = "Token "+token
            axios
                .post('api/v1/drfams/bookings/get', bodyFormData)
                .then(response => {
                    const bookings = response.data
                    console.log(bookings)
                    this.$store.commit('setBookings', bookings)
                    localStorage.setItem('Bookings', bookings)
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