<template>
    <div>
        <div class="loading" v-if="loading">
            Loading...
        </div>
        <div class="error" v-if="error">
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
        <div v-if="housingInformation">
            <HousingInfoCards :housingInformation='housingInformation' @infoUpdated="updateHousingInformation"></HousingInfoCards>
            <RoomsTable :housingInformation='housingInformation'></RoomsTable>
        </div>
    </div>
</template>


<script>
import RoomsTable from '../components/RoomsTable/table.vue';
import HousingInfoCards from '../components/housing-info-cards.vue';

import { Database } from '../firebase.js';

export default {
    components: {
        RoomsTable, HousingInfoCards
    },

    created() {
        this.getHousingInformation(this.$route.params.configId);
    },

    methods: {
        getHousingInformation(configId) {
            this.error = this.housingInformation = null;
            this.loading = true;

            Database.ref('RoomConfigurations/' + configId).once('value').then((housingInformation) => {
                this.loading = false;

                if (housingInformation.val() == null) {
                    this.error = "No roomie split configuration found for this link."
                }
                else {
                    this.housingInformation = housingInformation.val();
                }
            }, (error) => {
                console.log(error);
                this.error = error;
            });
        },

        updateHousingInformation() {
            const configId = this.$route.params.configId;
            //Get the current room and then update its fields based on the new values
            const currentRoom = Database.ref('RoomConfigurations').child(configId);
            currentRoom.child('numRooms').set(this.housingInformation.numRooms);
            currentRoom.child('area').set(this.housingInformation.area);
            currentRoom.child('rent').set(this.housingInformation.rent);
        }

    },

    data: function () {
        
        return {
            loading: false,
            housingInformation: null,
            error: null
        }
    }
}
</script>

<style>
.message {
    font-size: 1.2rem;
}
</style>
