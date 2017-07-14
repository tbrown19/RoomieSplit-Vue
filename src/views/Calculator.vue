<template>
    <div>
        <slide-fade-out-in>
    
            <div class="loading has-text-centered" v-if="loading" key="loading">
                <h1>Loading...</h1>
            </div>
    
            <div class="error" v-if="error" key="error">
                <article class="message is-danger">
                    <div class="message-header">
                        <p>
                            <strong>Error</strong>!
                        </p>
                    </div>
                    <div class="message-body">
                        {{ error }}
                    </div>
                </article>
            </div>
    
            <div v-if="roomConfiguration" key="loaded">
                <updatable-inputs :inputs="inputs" :roomConfiguration="roomConfiguration" @saveInput="triggerRoomConfigruationUpdate"></updatable-inputs>
                <rooms-table :roomConfiguration="roomConfiguration"></rooms-table>
            </div>
        </slide-fade-out-in>
    
    </div>
</template>


<script>
import UpdatableInputs from '../components/calculator/RoomConfiguration/UpdatableInputs.vue';
import RoomsTable from '../components/calculator/RoomsTable/Table.vue';
import SlideFadeOutIn from '../components/transitions/SlideFadeOutIn.vue';
import { getRoomConfiguration, updateRoomConfiguration } from '../services/firebase-actions.js';

export default {

    created() {
        this.handleGetRoomConfiguration();
    },

    components: {
        UpdatableInputs, RoomsTable, SlideFadeOutIn
    },

    methods: {
        handleGetRoomConfiguration() {
            const id = this.$route.params.configId;
            this.loading = true;

            getRoomConfiguration(id).then((roomConfiguration) => {
                this.loading = false;
                console.log(roomConfiguration);
                this.roomConfiguration = roomConfiguration;
            }, (error) => {
                this.loading = false;
                this.error = error;
            });
        },

        triggerRoomConfigruationUpdate(inputKey, inputValue) {
            this.roomConfiguration[inputKey] = inputValue;
            const id = this.$route.params.configId;
            console.log(this.roomConfiguration);
            updateRoomConfiguration(id, this.roomConfiguration);
        }

    },

    data: function () {
        return {
            inputs: {
                'numRooms': {
                    'name': 'rooms',
                    'min': 1,
                    'max': 10,
                    'tooltip': 'The total number of rooms.'
                },
                'area': {
                    'name': 'area',
                    'min': 1,
                    'max': 10000,
                    'tooltip': 'The total area of the entire living space.'
                },
                'rent': {
                    'name': 'rent',
                    'min': 1,
                    'max': 100000,
                    'tooltip': 'The cost of rent.'
                }
            },
            roomConfiguration: null,
            loading: false,
            error: null
        };
    }
};
</script>

<style lang="scss">

</style>
