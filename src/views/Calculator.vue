<template>
    <div>
        <HousingInfoCards :rooms="this.rooms" :area="this.area" :rent="this.rent"></HousingInfoCards>
        <RoomsTable :housingInformation="housingInformation"></RoomsTable>
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

    computed: {
        rooms: function(){
            return this.housingInformation.rooms;
        }
    },

    watch: {
        housingInformation: function(){
            console.log("watching it.")
        }
    },

    methods: {
        loadConfigFromDatabase(configId) {
            Database.ref('RoomConfigurations/' + configId).once('value').then((roomConfiguration) => {
                const roomsConfiguration = roomConfiguration.val();
                this.rooms = roomsConfiguration.rooms.value;
                this.area = roomsConfiguration.footage.value;
                this.rent = roomsConfiguration.rent.value;
                this.$store.commit('addHousingInformation', this.housingInformation);
                console.log(this.housingInformation)
            });
            //console.log(RoomConfigurations.child(configId).child("footage"));
        },
    },

    data: function () {
        this.loadConfigFromDatabase(this.$route.params.configId);
        return {
            rooms: '-',
            area: '-',
            rent: '-'
        }
    }
}
</script>
