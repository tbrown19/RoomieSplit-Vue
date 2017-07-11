<template>
    <div>
        <div class="loading" v-if="loading">
            Loading...
        </div>
        <div class="error" v-if="error">
            {{ error }}
        </div>
        <div v-if="housingInformation">
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
                    console.log("no dater.")
                }
                else {
                    this.housingInformation = housingInformation.val();
                }
            }, (error) => {
                console.log(error);
                this.error = error;
            });
        },

    },

    data: function () {
        1
        return {
            loading: false,
            housingInformation: null,
            error: null
        }
    }
}
</script>
