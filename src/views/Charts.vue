<template>
    <div>
        <slide-fade-out-in>
            <div class="loading has-text-centered" v-if="loading" key="loading">
                <h1>Loading...</h1>
            </div>
    
            <el-row type="flex" justify="center" v-if="error" key="error">
                <el-col :span="14" :lg="{span:12}">
                    <b-notification type="is-danger" has-icon>
                        {{ error }}
                    </b-notification>
                </el-col>
            </el-row>
    
            <div v-if="!loading && !error" key="loaded">
                <index></index>
            </div>
        </slide-fade-out-in>
    
    </div>
</template>

<script>
import Index from '../components/charts/Index.vue';
import SlideFadeOutIn from '../components/transitions/SlideFadeOutIn.vue';
// import { updateRoomConfigruationRooms } from '../services/firebase-actions.js';
import { mapGetters, mapActions } from 'vuex';

export default {

    created() {
        console.log(this.$store.getters.rooms);
        if (this.$store.getters.rooms.length === 0) {
            console.log('do we get in here??');
            this.loadRoomConfiguration(this.$route.params.configId);
        }
    },

    components: {
        Index, SlideFadeOutIn
    },
    computed: {
        ...mapGetters({
            loading: 'isLoadingFromDatabase',
            error: 'getFirebaseActionErrors',
            roomConfiguration: 'roomConfiguration'
        })
    },

    methods: {
        ...mapActions([
            'loadRoomConfiguration'
        ])
    }
};
</script>

<style lang="scss">
.error {
    max-width: 50%;
}
</style>
