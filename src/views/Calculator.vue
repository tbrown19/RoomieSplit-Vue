<template>
    <div>
        <transition name="slide-fade" mode="out-in">
    
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
            <div v-if="housingInformation" key="loaded">
                <HousingInfoCards :housingInformation='housingInformation' @infoUpdated="updateHousingInformation"></HousingInfoCards>
                <RoomsTable :housingInformation='housingInformation'></RoomsTable>
            </div>
    
        </transition>
    
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

.loading {
    font-size: 2rem;
    padding-bottom: 1rem;
}

.slide-fade-enter-active {
    transition: all .2s ease;
}

.slide-fade-leave-active {
    transition: all .4s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}

.slide-fade-enter,
.slide-fade-leave-to
/* .slide-fade-leave-active for <2.1.8 */

{
    transform: translateY(-10px);
    opacity: 0;
}
</style>
