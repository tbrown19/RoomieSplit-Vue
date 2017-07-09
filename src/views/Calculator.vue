<template>
    <div>
        {{ housingInformation }}
        <!--<RoomsTable></RoomsTable>-->
    </div>
</template>


<script>
import RoomsTable from '../components/RoomsTable/table.vue';
import { Database } from '../firebase.js';

export default {
    components: {
        RoomsTable
    },

    methods: {
        loadConfigFromDatabase(configId) {
            Database.ref('RoomConfigurations/' + configId).once('value').then((roomConfiguration) => {
                this.housingInformation.footage = roomConfiguration.val().footage.value;
                this.housingInformation.rent = roomConfiguration.val().rent.value;
                this.housingInformation.rooms = roomConfiguration.val().rooms.value;
            });
            //console.log(RoomConfigurations.child(configId).child("footage"));
        },
    },

    data: function () {
        this.loadConfigFromDatabase(this.$route.params.configId);
        return {
            housingInformation: {
                'rooms': 0,
                'footage': 0,
                'rent': 0
            }
        }
    }
}
</script>
