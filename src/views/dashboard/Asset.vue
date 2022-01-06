<template>
    <div>
        Create booking for <strong> {{ $store.state.assets[this.$route.params.id-1].title }} </strong>:
        <br>
        <p>{{ $store.state.assets[this.$route.params.id-1].details }}</p>

        <form v-on:submit.prevent="submitForm">
            <div class="field">
                <label>Select Date :</label>
                <div class="control">
                    <input type="date" class="input" v-model="date" v-bind:change="onDateChange()" >
                </div>
            </div>
            <div class="field">
                <label>Select Date Slot: <span class="text is-light">(slots are of 30 min)</span></label> <br>
                <div id="mydiv" class="select">
                    <select v-model="time">
                        <option v-for="time_block in time_blocks" v-bind:key="time_block" :value="time_block" v-show="ifNotPresent(time_block)">{{ time_block }}</option>
                    </select>
                </div>
            </div>
            <div class="notification is-danger is-light" v-if="errors.length">
                <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
            </div>

            <br>
            <div class="field">
                <div class="control">
                    <button class="button is-dark">Submit</button>
                </div>
            </div>
        </form>

        <!-- <table class="table">
        <thead>
            <tr>
                <th>Mon</th>
                <th>Tue</th>
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
    </table> -->
    <!-- <div>{{serv_tblock}}</div>
    <div>{{$store.state.assetbookings}}</div> -->
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data(){
        return {
            date: null,
            time: null,
            time_blocks: ['08:30','09:00','09:30','10:00','10:30','11:00','11:30','13:30','14:00','14:30','15:00','15:30','16:00','16:30'],
            errors: [],
            serv_tdBlocks:[],
            serv_tblock:[],
            new_tb: [],
        }
    },
    beforeRouteUpdate(to, from, next) {
        next()
        // this.$router.go()
        this.new_tb= []
        const token = this.$store.state.user.token;  
        console.log('beforecreate asset');
        if (token) {
            axios.defaults.headers.common['Authorization'] = "Token "+token
            var bodyFormData = new FormData()
            bodyFormData.set('username',this.$store.state.user.username)
            bodyFormData.append('asset', to.params.id)
            console.log('beforecreate axios asset');
            axios
                .post('/api/v1/drfams/assetbookings',bodyFormData)
                .then(response => {
                    const assetbookings = response.data
                    
                    this.$store.commit('setAssetbookings', assetbookings)
                    localStorage.setItem('assetbookings', assetbookings)
                    this.serv_tdBlocks=[]
                    this.serv_tblock= []
                    for (let ab of this.$store.state.assetbookings){
                        this.serv_tdBlocks.push(ab.time_block)
                    }
                    // console.log(this.serv_tdBlocks)
                    console.log('commited')
                })
                .catch(error => {
                    console.log(error.toJSON())
                })
        } else {
            axios.defaults.headers.common['Authorization'] = ""
        }
    },
    methods: {
        submitForm() {
            const dateTime_block = this.date+' '+this.time
            console.log(dateTime_block)
            this.errors=[]
            if (this.date === null) {
                this.errors.push('Please select the date!')
            }
            if (this.time === null) {
                this.errors.push('Please select the time!')
            }
            if (!this.errors.length){
                var bodyFormData = new FormData()
                bodyFormData.set('user',this.$store.state.user.username)
                bodyFormData.append('asset',this.$route.params.id)
                bodyFormData.append('time_block',dateTime_block)

                axios
                    .post('/api/v1/drfams/bookings/add', bodyFormData)
                    .then(response => {
                        alert('Booking added successfully')
                        this.$router.push('/dashboard/')
                    })
                    .catch(error => {
                        console.log(error.toJSON())
                    })
            }
        },
        onDateChange(){
            this.serv_tblock = []
            for (let stdb of this.serv_tdBlocks){
                const Ary = stdb.split(" ")
                if(Ary[0]===this.date){
                    this.serv_tblock.push(Ary[1])
                }
            }
        },
        ifNotPresent(tb){
            if (this.serv_tblock.length){
            for (let check of this.serv_tblock){
                if(tb===check){return false}
                else{ return true}
            } }else {
                return true
            }
        }
    },
}
</script>