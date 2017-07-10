<template>
    <div>
        <div v-if="infoLoaded">
            <HousingInfoCards :housingInformation='housingInformation'></HousingInfoCards>
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

    created: function () {
        this.getHousingInformation(this.$route.params.configId);
    },

    methods: {
        getHousingInformation(configId) {
            return Database.ref('RoomConfigurations/' + configId).once('value').then((roomConfiguration) => {
                const roomsConfiguration = roomConfiguration.val();
                this.housingInformation.rooms = roomsConfiguration.rooms.value;
                this.housingInformation.area = roomsConfiguration.footage.value;
                this.housingInformation.rent = roomsConfiguration.rent.value;
                this.infoLoaded = true;
            });
        },
    },

    data: function () {
        return {
            infoLoaded: false,
            "housingInformation": {
                rooms: '-',
                area: '-',
                rent: '-'
            }

        }
    }
}
</script>
